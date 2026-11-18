import type { Sex } from './electrolytes';

/** CKD-EPI 2021 creatinine equation (race-free). Inker et al., NEJM 2021;385:1737. */
export function ckdEpi2021Cr(scr: number, age: number, sex: Sex): number {
  const female = sex === 'female';
  const k = female ? 0.7 : 0.9;
  const a = female ? -0.241 : -0.302;
  const r = scr / k;
  return 142 * Math.min(r, 1) ** a * Math.max(r, 1) ** -1.2 * 0.9938 ** age * (female ? 1.012 : 1);
}

/** CKD-EPI 2012 cystatin C equation. */
export function ckdEpi2012Cys(scys: number, age: number, sex: Sex): number {
  const r = scys / 0.8;
  return 133 * Math.min(r, 1) ** -0.499 * Math.max(r, 1) ** -1.328 * 0.996 ** age * (sex === 'female' ? 0.932 : 1);
}

/** CKD-EPI 2021 creatinine–cystatin C equation (race-free). */
export function ckdEpi2021CrCys(scr: number, scys: number, age: number, sex: Sex): number {
  const female = sex === 'female';
  const k = female ? 0.7 : 0.9;
  const a = female ? -0.219 : -0.144;
  const r = scr / k;
  const c = scys / 0.8;
  return (
    135 *
    Math.min(r, 1) ** a *
    Math.max(r, 1) ** -0.544 *
    Math.min(c, 1) ** -0.323 *
    Math.max(c, 1) ** -0.778 *
    0.9961 ** age *
    (female ? 0.963 : 1)
  );
}

/** Cockcroft–Gault creatinine clearance (mL/min, not indexed to BSA). */
export function cockcroftGault(scr: number, age: number, weightKg: number, sex: Sex): number {
  return (((140 - age) * weightKg) / (72 * scr)) * (sex === 'female' ? 0.85 : 1);
}

export type GCategory = 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5';
export type ACategory = 'A1' | 'A2' | 'A3';

export function gfrCategory(egfr: number): GCategory {
  if (egfr >= 90) return 'G1';
  if (egfr >= 60) return 'G2';
  if (egfr >= 45) return 'G3a';
  if (egfr >= 30) return 'G3b';
  if (egfr >= 15) return 'G4';
  return 'G5';
}

/** UACR in mg/g. */
export function albuminuriaCategory(uacrMgG: number): ACategory {
  if (uacrMgG < 30) return 'A1';
  if (uacrMgG <= 300) return 'A2';
  return 'A3';
}

export type Risk = 'low' | 'moderate' | 'high' | 'very high';

/** KDIGO 2024 heat map (prognosis of CKD by GFR and albuminuria category). */
export const KDIGO_HEATMAP: Record<GCategory, Record<ACategory, Risk>> = {
  G1: { A1: 'low', A2: 'moderate', A3: 'high' },
  G2: { A1: 'low', A2: 'moderate', A3: 'high' },
  G3a: { A1: 'moderate', A2: 'high', A3: 'very high' },
  G3b: { A1: 'high', A2: 'very high', A3: 'very high' },
  G4: { A1: 'very high', A2: 'very high', A3: 'very high' },
  G5: { A1: 'very high', A2: 'very high', A3: 'very high' },
};

export const G_LABELS: Record<GCategory, string> = {
  G1: '≥ 90 · normal or high',
  G2: '60–89 · mildly decreased',
  G3a: '45–59 · mildly–moderately decreased',
  G3b: '30–44 · moderately–severely decreased',
  G4: '15–29 · severely decreased',
  G5: '< 15 · kidney failure',
};

/** Fractional excretion (%) of Na. */
export function fena(uNa: number, sNa: number, uCr: number, sCr: number): number {
  return ((uNa * sCr) / (sNa * uCr)) * 100;
}

/** Fractional excretion (%) of urea (BUN). */
export function feUrea(uUrea: number, sUrea: number, uCr: number, sCr: number): number {
  return ((uUrea * sCr) / (sUrea * uCr)) * 100;
}

/** KDIGO 2012 AKI creatinine stage (0 = criteria not met). Assumes the rise occurred within the KDIGO windows. */
export function kdigoAkiStage(baselineCr: number, currentCr: number, onRRT = false): 0 | 1 | 2 | 3 {
  const ratio = currentCr / baselineCr;
  if (onRRT || ratio >= 3 || (currentCr >= 4 && currentCr - baselineCr >= 0.3)) return 3;
  if (ratio >= 2) return 2;
  if (ratio >= 1.5 || currentCr - baselineCr >= 0.3) return 1;
  return 0;
}

export interface KineticsInput {
  baselineCr: number;
  age: number;
  sex: Sex;
  weightKg: number;
  /** Fraction of baseline GFR remaining after the insult (0–1). */
  gfrFraction: number;
  /** Day the GFR recovers to baseline (optional). */
  recoveryDay?: number;
  /** Fractional fall in creatinine generation (critical illness, sepsis, muscle loss), 0–0.5. */
  productionDrop?: number;
  days: number;
}

export interface KineticsPoint {
  day: number;
  cr: number;
  trueGFR: number;
  naiveEGFR: number;
  stage: number;
}

/**
 * One-compartment creatinine kinetics (Waikar & Bonventre, JASN 2009):
 * V·dCr/dt = G − GFR·Cr, with V = total body water and G fixed by the pre-injury steady state.
 */
export function simulateCreatinine(i: KineticsInput): KineticsPoint[] {
  const gfr0 = ckdEpi2021Cr(i.baselineCr, i.age, i.sex); // mL/min (per 1.73 m², used as absolute here)
  const vDl = i.weightKg * (i.sex === 'male' ? 0.6 : 0.5) * 10;
  const g = gfr0 * (i.baselineCr / 100) * (1 - (i.productionDrop ?? 0)); // mg/min
  const pts: KineticsPoint[] = [];
  let cr = i.baselineCr;
  const stepMin = 30;
  const total = i.days * 1440;
  for (let t = 0; t <= total; t += stepMin) {
    const day = t / 1440;
    const recovered = i.recoveryDay !== undefined && day >= i.recoveryDay;
    const gfr = recovered ? gfr0 : gfr0 * i.gfrFraction;
    if (t % 360 === 0) {
      pts.push({
        day: Math.round(day * 100) / 100,
        cr: Math.round(cr * 100) / 100,
        trueGFR: Math.round(gfr),
        naiveEGFR: Math.round(ckdEpi2021Cr(cr, i.age, i.sex)),
        stage: kdigoAkiStage(i.baselineCr, cr),
      });
    }
    const dcr = ((g - (gfr * cr) / 100) / vDl) * stepMin;
    cr = Math.max(0.1, cr + dcr);
  }
  return pts;
}
