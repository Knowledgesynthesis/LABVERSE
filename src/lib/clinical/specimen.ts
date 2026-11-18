/**
 * Pre-analytic artifact model for the Specimen Integrity Lab.
 * IV-fluid and EDTA mixing and indirect-ISE water displacement are mass-balance calculations;
 * hemolysis, storage, platelet and biotin effects are illustrative magnitudes drawn from
 * interference studies (actual effects are analyzer- and assay-specific).
 */

export type AnalyteId =
  | 'na'
  | 'k'
  | 'cl'
  | 'hco3'
  | 'glucose'
  | 'bun'
  | 'cr'
  | 'ca'
  | 'mg'
  | 'phos'
  | 'alp'
  | 'ast'
  | 'ld'
  | 'tsh'
  | 'ft4';

export type Panel = Record<AnalyteId, number>;

export const ANALYTES: Record<AnalyteId, { label: string; unit: string; low: number; high: number; dp: number }> = {
  na: { label: 'Sodium', unit: 'mmol/L', low: 135, high: 145, dp: 0 },
  k: { label: 'Potassium', unit: 'mmol/L', low: 3.5, high: 5.0, dp: 1 },
  cl: { label: 'Chloride', unit: 'mmol/L', low: 98, high: 107, dp: 0 },
  hco3: { label: 'Total CO₂', unit: 'mmol/L', low: 22, high: 29, dp: 0 },
  glucose: { label: 'Glucose', unit: 'mg/dL', low: 70, high: 99, dp: 0 },
  bun: { label: 'BUN', unit: 'mg/dL', low: 7, high: 20, dp: 0 },
  cr: { label: 'Creatinine', unit: 'mg/dL', low: 0.6, high: 1.2, dp: 2 },
  ca: { label: 'Calcium', unit: 'mg/dL', low: 8.6, high: 10.2, dp: 1 },
  mg: { label: 'Magnesium', unit: 'mg/dL', low: 1.7, high: 2.3, dp: 1 },
  phos: { label: 'Phosphate', unit: 'mg/dL', low: 2.5, high: 4.5, dp: 1 },
  alp: { label: 'ALP', unit: 'U/L', low: 40, high: 129, dp: 0 },
  ast: { label: 'AST', unit: 'U/L', low: 10, high: 40, dp: 0 },
  ld: { label: 'LD', unit: 'U/L', low: 125, high: 220, dp: 0 },
  tsh: { label: 'TSH (immunoassay)', unit: 'mIU/L', low: 0.4, high: 4.0, dp: 2 },
  ft4: { label: 'Free T4 (immunoassay)', unit: 'ng/dL', low: 0.8, high: 1.8, dp: 2 },
};

export const BASE_PANELS: Record<string, { label: string; panel: Panel }> = {
  healthy: {
    label: 'Healthy outpatient',
    panel: { na: 140, k: 4.2, cl: 103, hco3: 25, glucose: 92, bun: 14, cr: 0.9, ca: 9.4, mg: 2.0, phos: 3.5, alp: 75, ast: 22, ld: 170, tsh: 1.8, ft4: 1.2 },
  },
  ckd: {
    label: 'CKD G4 on ACE inhibitor',
    panel: { na: 137, k: 5.3, cl: 106, hco3: 19, glucose: 110, bun: 58, cr: 3.1, ca: 8.7, mg: 2.3, phos: 5.2, alp: 110, ast: 18, ld: 190, tsh: 2.4, ft4: 1.1 },
  },
};

export type FluidId = 'none' | 'ns' | 'lr' | 'd5w' | 'd5halfK';

export const FLUIDS: Record<FluidId, { label: string; comp: Partial<Panel> }> = {
  none: { label: 'None', comp: {} },
  ns: { label: '0.9% NaCl', comp: { na: 154, cl: 154 } },
  lr: { label: "Lactated Ringer's", comp: { na: 130, k: 4, cl: 109, ca: 5.4 } },
  d5w: { label: 'D5W', comp: { glucose: 5000 } },
  d5halfK: { label: 'D5 ½NS + 20 mmol/L KCl', comp: { na: 77, cl: 97, k: 20, glucose: 5000 } },
};

export interface Artifacts {
  fistClench: boolean;
  fluid: FluidId;
  fluidFraction: number; // 0–0.5
  edtaFraction: number; // fraction of K2EDTA blood carried over, 0–0.3
  hemolysisGL: number; // free hemoglobin g/L, 0–10
  delayHours: number; // unspun, no fluoride
  storage: 'room' | 'fridge';
  platelets: number; // ×10⁹/L
  triglycerides: number; // mg/dL
  totalProtein: number; // g/dL
  method: 'indirect' | 'direct';
  biotinMg: number; // dose taken within ~8 h of sampling
}

export const NO_ARTIFACTS: Artifacts = {
  fistClench: false,
  fluid: 'none',
  fluidFraction: 0,
  edtaFraction: 0,
  hemolysisGL: 0,
  delayHours: 0,
  storage: 'room',
  platelets: 250,
  triglycerides: 120,
  totalProtein: 7,
  method: 'indirect',
  biotinMg: 0,
};

const waterFraction = (tgMgDl: number, tpGdl: number) => 99.1 - 1.03 * (0.6 + tgMgDl / 1000) - 0.73 * tpGdl;
const NORMAL_WATER = waterFraction(120, 7);

export function applyArtifacts(truth: Panel, a: Artifacts): Panel {
  const p: Panel = { ...truth };

  // 1. In vivo, at the arm: repeated fist clenching releases muscle K⁺ (Don et al., NEJM 1990: +1–2 mmol/L).
  if (a.fistClench) p.k += 1.0;

  // 2. Drawing above an IV: exact mixing.
  if (a.fluid !== 'none' && a.fluidFraction > 0) {
    const f = a.fluidFraction;
    const comp = FLUIDS[a.fluid].comp;
    (Object.keys(p) as AnalyteId[]).forEach((k) => {
      p[k] = (1 - f) * p[k] + f * (comp[k] ?? 0);
    });
  }

  // 3. K2EDTA carry-over: ~4.5 mmol/L EDTA and ~9 mmol/L K⁺ per unit fraction; EDTA chelates Ca, Mg (and Zn → ALP falls).
  if (a.edtaFraction > 0) {
    const f = a.edtaFraction;
    p.k += 9 * f;
    const edta = 4.5 * f; // mmol/L chelating capacity, shared by Ca²⁺ and Mg²⁺ in proportion to concentration
    const caMmol = p.ca * 0.2495;
    const mgMmol = p.mg * 0.4114;
    const caShare = caMmol / (caMmol + mgMmol);
    p.ca = Math.max(caMmol * 0.05, caMmol - edta * caShare) / 0.2495;
    p.mg = Math.max(mgMmol * 0.1, mgMmol - edta * (1 - caShare)) / 0.4114;
    p.alp *= Math.max(0.15, 1 - 4 * f);
  }

  // 4. In vitro hemolysis (illustrative per g/L free Hb): K⁺ ≈ +0.3 mmol/L, LD ≈ +110 U/L, AST ≈ +8 U/L, phosphate ≈ +0.1 mg/dL.
  if (a.hemolysisGL > 0) {
    const h = a.hemolysisGL;
    p.k += 0.3 * h;
    p.ld += 110 * h;
    p.ast += 8 * h;
    p.phos += 0.1 * h;
    p.mg += 0.04 * h;
  }

  // 5. Delayed processing of unspun blood without a glycolysis inhibitor.
  if (a.delayHours > 0) {
    const t = a.delayHours;
    if (a.storage === 'room') {
      p.glucose *= Math.max(0.2, 1 - 0.06 * t); // ~5–7%/h
      p.k += t > 6 ? 0.08 * (t - 6) : -0.03 * t; // pump runs on glucose, then fails
      p.phos += 0.05 * t;
      p.ld += 3 * t;
    } else {
      p.glucose *= Math.max(0.4, 1 - 0.02 * t);
      p.k += Math.min(2.5, 0.2 * t); // Na⁺/K⁺-ATPase inhibited at 4 °C → K⁺ leaks out
      p.phos += 0.03 * t;
    }
  }

  // 6. Serum K⁺ includes K⁺ released by platelets during clotting (~0.15 mmol/L per 100 ×10⁹/L).
  if (a.platelets > 250) p.k += (0.15 * (a.platelets - 250)) / 100;

  // 7. Indirect ISE (pre-diluted sample) assumes ~93% plasma water; lipid/protein excess displaces water.
  if (a.method === 'indirect') {
    const factor = waterFraction(a.triglycerides, a.totalProtein) / NORMAL_WATER;
    p.na *= factor;
    p.k *= factor;
    p.cl *= factor;
  }

  // 8. Biotin (streptavidin–biotin immunoassays): sandwich assays (TSH) read low, competitive (FT4) read high.
  if (a.biotinMg >= 5) {
    const f = Math.min(0.9, a.biotinMg / 100);
    p.tsh *= 1 - f;
    p.ft4 *= 1 + f;
  }

  (Object.keys(p) as AnalyteId[]).forEach((k) => {
    p[k] = Math.max(0, p[k]);
  });
  return p;
}

export function flag(id: AnalyteId, v: number): 'L' | 'H' | '' {
  const a = ANALYTES[id];
  if (v < a.low) return 'L';
  if (v > a.high) return 'H';
  return '';
}

/** What a laboratory scientist or alert clinician would notice in the reported panel. */
export function detectClues(reported: Panel, prior: Panel, a: Artifacts): string[] {
  const c: string[] = [];
  if (a.hemolysisGL >= 0.5)
    c.push(`Hemolysis index ≈ ${a.hemolysisGL.toFixed(1)} g/L free Hb: K⁺, LD, AST, phosphate and Mg are released from red cells — report with comment or reject per analyzer H-index limits.`);
  if (reported.k > 6 && reported.ca < 7.5)
    c.push('Very high K⁺ with very low Ca (and low ALP/Mg): the K₂EDTA contamination signature — recollect; never treat this K⁺ without confirming.');
  if (reported.glucose > 3 * prior.glucose && reported.glucose > 300)
    c.push('Glucose many-fold above the prior with diluted other analytes: dextrose-containing IV fluid contamination. Recollect from the opposite arm.');
  if (a.fluid === 'ns' && a.fluidFraction >= 0.1)
    c.push('Cl⁻ rises and every non-saline analyte (BUN, creatinine, Ca, proteins) falls in proportion: saline contamination dilution pattern.');
  if (a.delayHours >= 2 && a.storage === 'room')
    c.push('Delayed processing at room temperature: glycolysis lowers glucose (~5–7%/h) unless a fluoride/citrate tube is used or plasma is separated promptly.');
  if (a.delayHours >= 2 && a.storage === 'fridge')
    c.push('Refrigerated unspun blood: Na⁺/K⁺-ATPase stops at 4 °C, K⁺ leaks into plasma (spurious hyperkalemia).');
  if (a.platelets >= 500 && reported.k > ANALYTES.k.high)
    c.push('Thrombocytosis: serum K⁺ is raised by platelet K⁺ released during clotting. Measure plasma (lithium heparin) K⁺ — a normal plasma value confirms pseudohyperkalemia.');
  if (a.method === 'indirect' && (a.triglycerides >= 1000 || a.totalProtein >= 10) && reported.na < 135)
    c.push('Low Na⁺ on indirect ISE with extreme lipids/protein: pseudohyponatremia. Direct ISE (blood-gas analyzer) Na⁺ and measured osmolality will be normal.');
  if (a.biotinMg >= 5)
    c.push('Biotin intake: streptavidin-based immunoassays err — sandwich (TSH, troponin, PTH) falsely low, competitive (FT4, FT3) falsely high, mimicking hyperthyroidism. Re-test after stopping biotin (≥ 2–3 days for high doses) or use a non-biotin platform.');
  if (a.fistClench) c.push('Fist clenching / prolonged tourniquet raises K⁺ by ~1–2 mmol/L — common cause of unexplained mild hyperkalemia in outpatients.');

  const deltas: string[] = [];
  if (Math.abs(reported.k - prior.k) >= 1) deltas.push('K⁺');
  if (Math.abs(reported.na - prior.na) >= 6) deltas.push('Na⁺');
  if (Math.abs(reported.ca - prior.ca) >= 1.5) deltas.push('Ca');
  if (prior.glucose > 0 && Math.abs(reported.glucose - prior.glucose) / prior.glucose >= 0.5) deltas.push('glucose');
  if (deltas.length) c.push(`Delta check fails for ${deltas.join(', ')} versus the patient's previous result — verify identity and specimen before release.`);
  return c;
}
