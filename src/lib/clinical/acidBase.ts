/**
 * Acid–base calculations. Conventional units: PaCO₂ mmHg, HCO₃⁻/Na/Cl mmol/L, albumin g/dL.
 * Compensation rules follow Berend et al., NEJM 2014;371:1434 and Kraut & Madias, CJASN 2007.
 */

export const PCO2_SOLUBILITY = 0.03; // mmol/L per mmHg
export const PK = 6.1;
export const NORMAL = { pH: 7.4, paco2: 40, hco3: 24, agAnchor: 10, agUpper: 12, albumin: 4.0 } as const;

const round = (x: number, dp = 1) => Math.round(x * 10 ** dp) / 10 ** dp;

export function hhPH(hco3: number, paco2: number): number {
  return PK + Math.log10(hco3 / (PCO2_SOLUBILITY * paco2));
}

export function hhHCO3(pH: number, paco2: number): number {
  return PCO2_SOLUBILITY * paco2 * 10 ** (pH - PK);
}

export function anionGap(na: number, cl: number, hco3: number, k = 0): number {
  return na + k - (cl + hco3);
}

/** Figge correction: +2.5 mmol/L for every 1 g/dL albumin below 4.0. */
export function albuminCorrectedAG(ag: number, albumin: number): number {
  return ag + 2.5 * (NORMAL.albumin - albumin);
}

/** Δ/Δ ratio = (AG − anchor) / (24 − HCO₃⁻). Returns null when HCO₃⁻ ≥ 24 (ratio undefined). */
export function deltaRatio(ag: number, hco3: number, anchor: number = NORMAL.agAnchor): number | null {
  const dHCO3 = NORMAL.hco3 - hco3;
  if (dHCO3 <= 0) return null;
  return (ag - anchor) / dHCO3;
}

export interface Range {
  low: number;
  high: number;
}

export const expected = {
  /** Winter's formula: PaCO₂ = 1.5 × HCO₃⁻ + 8 ± 2 */
  metabolicAcidosis: (hco3: number): Range => ({ low: 1.5 * hco3 + 6, high: 1.5 * hco3 + 10 }),
  /** PaCO₂ rises ~0.7 mmHg per 1 mmol/L rise in HCO₃⁻ (± 2) */
  metabolicAlkalosis: (hco3: number): Range => ({
    low: 40 + 0.7 * (hco3 - 24) - 2,
    high: 40 + 0.7 * (hco3 - 24) + 2,
  }),
  /** HCO₃⁻ rises 1 per 10 mmHg (acute) */
  acuteRespAcidosis: (paco2: number): Range => ({
    low: 24 + 0.1 * (paco2 - 40) - 2,
    high: 24 + 0.1 * (paco2 - 40) + 2,
  }),
  /** HCO₃⁻ rises 3.5–4 per 10 mmHg (chronic, after 3–5 days) */
  chronicRespAcidosis: (paco2: number): Range => ({
    low: 24 + 0.35 * (paco2 - 40) - 2,
    high: 24 + 0.4 * (paco2 - 40) + 2,
  }),
  /** HCO₃⁻ falls 2 per 10 mmHg (acute) */
  acuteRespAlkalosis: (paco2: number): Range => ({
    low: 24 - 0.2 * (40 - paco2) - 2,
    high: 24 - 0.2 * (40 - paco2) + 2,
  }),
  /** HCO₃⁻ falls 4–5 per 10 mmHg (chronic) */
  chronicRespAlkalosis: (paco2: number): Range => ({
    low: 24 - 0.5 * (40 - paco2) - 2,
    high: 24 - 0.4 * (40 - paco2) + 2,
  }),
};

export type Primary =
  | 'normal'
  | 'metabolic acidosis'
  | 'metabolic alkalosis'
  | 'respiratory acidosis'
  | 'respiratory alkalosis';

export interface AbgInput {
  paco2: number;
  hco3: number;
  /** If provided, checked against Henderson–Hasselbalch for internal consistency. */
  measuredPH?: number;
  na?: number;
  cl?: number;
  albumin?: number;
  chronicity?: 'acute' | 'chronic' | 'unknown';
  agAnchor?: number;
}

export interface AbgStep {
  label: string;
  detail: string;
  status?: 'ok' | 'warn' | 'alert';
}

export interface AbgResult {
  pH: number;
  status: 'acidemia' | 'alkalemia' | 'normal pH';
  primary: Primary;
  disorders: string[];
  steps: AbgStep[];
  ag?: number;
  correctedAG?: number;
  delta?: number | null;
  consistencyError?: number;
}

const within = (x: number, r: Range) => x >= r.low && x <= r.high;
const fmt = (r: Range) => `${round(r.low)}–${round(r.high)}`;

export function interpretABG(input: AbgInput): AbgResult {
  const { paco2, hco3, chronicity = 'unknown' } = input;
  const pH = hhPH(hco3, paco2);
  const steps: AbgStep[] = [];
  const disorders: string[] = [];

  // Step 0 — internal consistency
  let consistencyError: number | undefined;
  if (input.measuredPH !== undefined) {
    consistencyError = input.measuredPH - pH;
    const bad = Math.abs(consistencyError) > 0.03;
    steps.push({
      label: 'Internal consistency',
      detail: `Henderson–Hasselbalch predicts pH ${pH.toFixed(2)}; reported ${input.measuredPH.toFixed(2)}${
        bad ? ' — discordant by > 0.03: suspect transcription error, venous/arterial mix-up or a delayed sample; repeat before interpreting.' : ' — consistent.'
      }`,
      status: bad ? 'alert' : 'ok',
    });
  }

  const status: AbgResult['status'] = pH < 7.35 ? 'acidemia' : pH > 7.45 ? 'alkalemia' : 'normal pH';
  steps.push({
    label: '1. pH',
    detail: `pH ${pH.toFixed(2)} → ${status}.`,
    status: status === 'normal pH' ? 'ok' : 'warn',
  });

  const highCO2 = paco2 > 45;
  const lowCO2 = paco2 < 35;
  const lowHCO3 = hco3 < 22;
  const highHCO3 = hco3 > 26;

  // Step 2 — primary process. The side of 7.40 the pH falls on identifies the dominant process,
  // which also resolves "normal pH" mixed disorders.
  let primary: Primary = 'normal';
  const anyAbnormal = highCO2 || lowCO2 || lowHCO3 || highHCO3;
  if (anyAbnormal || status !== 'normal pH') {
    const metAcidDev = Math.log10(24 / hco3); // > 0 when HCO₃⁻ is low
    const respAcidDev = Math.log10(paco2 / 40); // > 0 when PaCO₂ is high
    if (pH < 7.4) {
      if (lowHCO3 && highCO2) {
        primary = metAcidDev >= respAcidDev ? 'metabolic acidosis' : 'respiratory acidosis';
      } else if (lowHCO3) primary = 'metabolic acidosis';
      else if (highCO2) primary = 'respiratory acidosis';
      else primary = metAcidDev >= respAcidDev ? 'metabolic acidosis' : 'respiratory acidosis';
    } else {
      if (highHCO3 && lowCO2) {
        primary = -metAcidDev >= -respAcidDev ? 'metabolic alkalosis' : 'respiratory alkalosis';
      } else if (highHCO3) primary = 'metabolic alkalosis';
      else if (lowCO2) primary = 'respiratory alkalosis';
      else primary = -metAcidDev >= -respAcidDev ? 'metabolic alkalosis' : 'respiratory alkalosis';
    }
  }

  steps.push({
    label: '2. Primary process',
    detail:
      primary === 'normal'
        ? 'PaCO₂ and HCO₃⁻ within reference — no primary disturbance on the gas. Still calculate the anion gap: a high-AG acidosis plus a metabolic alkalosis can net out to a normal gas.'
        : `${cap(primary)} (PaCO₂ ${paco2} mmHg, HCO₃⁻ ${hco3} mmol/L; pH moves in the direction of the primary change).`,
    status: primary === 'normal' ? 'ok' : 'warn',
  });

  // Step 3 — compensation
  if (primary === 'metabolic acidosis') {
    const r = expected.metabolicAcidosis(hco3);
    let d = `Winter's: expected PaCO₂ ${fmt(r)} mmHg; measured ${paco2}.`;
    if (paco2 > r.high) {
      disorders.push('concurrent respiratory acidosis');
      d += ' Higher than expected → concurrent respiratory acidosis (inadequate ventilation — fatigue, sedation, neuromuscular weakness).';
    } else if (paco2 < r.low) {
      disorders.push('concurrent respiratory alkalosis');
      d += ' Lower than expected → concurrent respiratory alkalosis (sepsis, salicylate, liver failure, pain).';
    } else d += ' Appropriate.';
    steps.push({ label: '3. Compensation', detail: d, status: within(paco2, r) ? 'ok' : 'alert' });
  } else if (primary === 'metabolic alkalosis') {
    const r = expected.metabolicAlkalosis(hco3);
    let d = `Expected PaCO₂ ≈ 40 + 0.7 × ΔHCO₃⁻ = ${fmt(r)} mmHg; measured ${paco2}.`;
    if (paco2 > r.high) {
      disorders.push('concurrent respiratory acidosis');
      d += ' Higher → concurrent respiratory acidosis.';
    } else if (paco2 < r.low) {
      disorders.push('concurrent respiratory alkalosis');
      d += ' Lower → concurrent respiratory alkalosis.';
    } else d += ' Appropriate (respiratory compensation rarely pushes PaCO₂ above ~55).';
    steps.push({ label: '3. Compensation', detail: d, status: within(paco2, r) ? 'ok' : 'alert' });
  } else if (primary === 'respiratory acidosis' || primary === 'respiratory alkalosis') {
    const acid = primary === 'respiratory acidosis';
    const ra = acid ? expected.acuteRespAcidosis(paco2) : expected.acuteRespAlkalosis(paco2);
    const rc = acid ? expected.chronicRespAcidosis(paco2) : expected.chronicRespAlkalosis(paco2);
    const fitsA = within(hco3, ra);
    const fitsC = within(hco3, rc);
    let d = `Expected HCO₃⁻: acute ${fmt(ra)}, chronic ${fmt(rc)} mmol/L; measured ${hco3}.`;
    let st: AbgStep['status'] = 'ok';
    const lo = Math.min(ra.low, rc.low);
    const hi = Math.max(ra.high, rc.high);
    if (chronicity === 'acute' && !fitsA) {
      st = 'alert';
      if (hco3 > ra.high) disorders.push('concurrent metabolic alkalosis (or more chronic process than stated)');
      else disorders.push('concurrent metabolic acidosis');
      d += ' Outside the acute range for the stated timing.';
    } else if (chronicity === 'chronic' && !fitsC) {
      st = 'alert';
      if (hco3 > rc.high) disorders.push('concurrent metabolic alkalosis');
      else disorders.push(acid ? 'acute-on-chronic process or concurrent metabolic acidosis' : 'concurrent metabolic alkalosis or acute process');
      d += ' Outside the chronic range.';
    } else if (hco3 > hi) {
      st = 'alert';
      disorders.push('concurrent metabolic alkalosis');
      d += ' Above both ranges → concurrent metabolic alkalosis.';
    } else if (hco3 < lo) {
      st = 'alert';
      disorders.push('concurrent metabolic acidosis');
      d += ' Below both ranges → concurrent metabolic acidosis.';
    } else if (fitsA && !fitsC) d += ' Fits an acute process.';
    else if (fitsC && !fitsA) d += ' Fits a chronic (≥ 3–5 day) process.';
    else if (fitsA && fitsC) d += ' Fits acute and chronic ranges (small ΔPaCO₂) — use history.';
    else d += ' Between ranges → acute-on-chronic or evolving process; use history.';
    steps.push({ label: '3. Compensation', detail: d, status: st });
  } else {
    steps.push({ label: '3. Compensation', detail: 'Not applicable.', status: 'ok' });
  }

  // Step 4 — anion gap
  let ag: number | undefined;
  let cag: number | undefined;
  let delta: number | null | undefined;
  if (input.na !== undefined && input.cl !== undefined) {
    const anchor = input.agAnchor ?? NORMAL.agAnchor;
    ag = anionGap(input.na, input.cl, hco3);
    cag = input.albumin !== undefined ? albuminCorrectedAG(ag, input.albumin) : ag;
    const high = cag > NORMAL.agUpper;
    let d = `AG = ${input.na} − (${input.cl} + ${hco3}) = ${round(ag)}`;
    if (input.albumin !== undefined && input.albumin !== NORMAL.albumin)
      d += `; albumin-corrected ${round(cag)} (albumin ${input.albumin} g/dL)`;
    d += high ? ' → HIGH anion gap.' : ' → not elevated.';
    if (cag < 3)
      d += ' Very low/negative AG: check for lab error, hypoalbuminemia, IgG paraprotein, lithium, bromide/iodide (pseudohyperchloremia) or severe hypercalcemia/hypermagnesemia.';
    steps.push({ label: '4. Anion gap', detail: d, status: high ? 'alert' : 'ok' });
    if (high) {
      if (primary !== 'metabolic acidosis') disorders.push('high anion gap metabolic acidosis');
      delta = deltaRatio(cag, hco3, anchor);
      let dd: string;
      if (delta === null) {
        dd = `HCO₃⁻ ≥ 24 despite a high AG → a metabolic alkalosis must coexist (e.g., vomiting + ketoacidosis).`;
        disorders.push('concurrent metabolic alkalosis');
      } else {
        dd = `Δ/Δ = (${round(cag)} − ${anchor}) / (24 − ${hco3}) = ${delta.toFixed(2)}. `;
        if (delta < 0.4) dd += '< 0.4 → mainly hyperchloremic (normal-AG) acidosis.';
        else if (delta < 0.8) {
          dd += '0.4–0.8 → combined high-AG + normal-AG acidosis (e.g., DKA with renal ketoanion loss, or AKI + diarrhea).';
          disorders.push('concurrent normal anion gap acidosis');
        } else if (delta <= 2) dd += '0.8–2 → pure high-AG acidosis (DKA ≈ 1, lactic ≈ 1.6).';
        else {
          dd += '> 2 → concurrent metabolic alkalosis or pre-existing high HCO₃⁻ (chronic respiratory acidosis).';
          disorders.push('concurrent metabolic alkalosis');
        }
        dd += ' Treat Δ/Δ as supportive, not definitive: wide physiological variation.';
      }
      steps.push({ label: '5. Delta ratio', detail: dd, status: 'warn' });
    } else if (primary === 'metabolic acidosis') {
      steps.push({
        label: '5. Next step',
        detail: 'Normal-AG acidosis: GI HCO₃⁻ loss vs renal (RTA). Urine AG or urine osmolal gap estimates NH₄⁺ excretion.',
        status: 'warn',
      });
    }
  }

  if (primary !== 'normal') {
    const label =
      primary === 'metabolic acidosis' && cag !== undefined
        ? cag > NORMAL.agUpper
          ? 'high anion gap metabolic acidosis'
          : 'normal anion gap (hyperchloremic) metabolic acidosis'
        : primary;
    const rest = disorders.filter((d) => d !== label);
    disorders.length = 0;
    disorders.push(label, ...rest);
  }

  return { pH, status, primary, disorders: dedupe(disorders), steps, ag, correctedAG: cag, delta, consistencyError };
}

function dedupe(list: string[]) {
  return Array.from(new Set(list));
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
