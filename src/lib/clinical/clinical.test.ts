import { describe, expect, it } from 'vitest';
import { albuminCorrectedAG, anionGap, deltaRatio, hhHCO3, hhPH, interpretABG } from './acidBase';
import { assessTonicity, calcOsm, correctedSodium, deltaNaPerLitre, freeWaterDeficit, totalBodyWater } from './electrolytes';
import {
  ckdEpi2012Cys,
  ckdEpi2021Cr,
  ckdEpi2021CrCys,
  cockcroftGault,
  fena,
  feUrea,
  gfrCategory,
  kdigoAkiStage,
  KDIGO_HEATMAP,
  simulateCreatinine,
} from './renal';
import { childPugh, hysLaw, injuryPattern, meld3, rFactor } from './hepatic';
import { evaluateWestgard, generateRuns, rcv, sigmaMetric } from './qc';
import { applyArtifacts, BASE_PANELS, detectClues, NO_ARTIFACTS } from './specimen';
import { toSI } from '../units';

describe('Henderson–Hasselbalch', () => {
  it('returns 7.40 for HCO3 24 / PaCO2 40', () => {
    expect(hhPH(24, 40)).toBeCloseTo(7.4, 2);
  });
  it('round-trips', () => {
    expect(hhHCO3(hhPH(12, 26), 26)).toBeCloseTo(12, 6);
  });
});

describe('anion gap', () => {
  it('computes and albumin-corrects', () => {
    expect(anionGap(140, 104, 24)).toBe(12);
    expect(albuminCorrectedAG(10, 2.0)).toBe(15);
  });
  it('delta ratio is undefined when HCO3 ≥ 24', () => {
    expect(deltaRatio(20, 24)).toBeNull();
    expect(deltaRatio(26, 8)).toBe(1);
  });
});

describe('interpretABG', () => {
  it('DKA with appropriate compensation and Δ/Δ ≈ 1', () => {
    const r = interpretABG({ paco2: 20, hco3: 8, na: 132, cl: 98, albumin: 4 });
    expect(r.primary).toBe('metabolic acidosis');
    expect(r.disorders[0]).toBe('high anion gap metabolic acidosis');
    expect(r.disorders).not.toContain('concurrent respiratory acidosis');
    expect(r.delta).toBeCloseTo(1, 2);
  });
  it('flags inadequate respiratory compensation', () => {
    const r = interpretABG({ paco2: 32, hco3: 10 });
    expect(r.disorders).toContain('concurrent respiratory acidosis');
  });
  it('chronic respiratory acidosis with normal-ish pH is not called normal', () => {
    const r = interpretABG({ paco2: 60, hco3: 32, chronicity: 'chronic' });
    expect(r.primary).toBe('respiratory acidosis');
    expect(r.steps.find((s) => s.label === '3. Compensation')?.status).toBe('ok');
  });
  it('acute respiratory acidosis fits acute range', () => {
    const r = interpretABG({ paco2: 70, hco3: 27 });
    expect(r.primary).toBe('respiratory acidosis');
    expect(r.status).toBe('acidemia');
    expect(r.disorders).toEqual(['respiratory acidosis']);
  });
  it('detects a hidden HAGMA + metabolic alkalosis with near-normal gas', () => {
    const r = interpretABG({ paco2: 40, hco3: 24, na: 140, cl: 92, albumin: 4 });
    expect(r.disorders).toContain('high anion gap metabolic acidosis');
    expect(r.disorders).toContain('concurrent metabolic alkalosis');
  });
  it('identifies mixed respiratory acidosis + metabolic alkalosis at normal pH', () => {
    const r = interpretABG({ paco2: 60, hco3: 36 });
    expect(r.disorders.join(' ')).toMatch(/respiratory acidosis/);
    expect(r.disorders.join(' ')).toMatch(/metabolic alkalosis/);
  });
  it('salicylate pattern: respiratory alkalosis + HAGMA', () => {
    const r = interpretABG({ paco2: 22, hco3: 15, na: 140, cl: 102, albumin: 4 });
    expect(r.disorders).toContain('high anion gap metabolic acidosis');
    expect(r.disorders.join(' ')).toMatch(/respiratory alkalosis/);
  });
  it('flags a measured pH inconsistent with HH', () => {
    const r = interpretABG({ paco2: 40, hco3: 24, measuredPH: 7.2 });
    expect(r.steps[0].status).toBe('alert');
  });
});

describe('osmolality & sodium', () => {
  it('calculated osmolality', () => {
    expect(calcOsm(140, 90, 14)).toBeCloseTo(290, 0);
    expect(calcOsm(140, 90, 14, 370)).toBeCloseTo(390, 0);
  });
  it('flags pseudohyponatremia', () => {
    const r = assessTonicity({ na: 126, glucose: 95, bun: 12, measuredOsm: 288 });
    expect(r.notes.join(' ')).toMatch(/pseudohyponatremia/);
  });
  it('corrected sodium (Katz vs Hillier)', () => {
    expect(correctedSodium(130, 600, 1.6)).toBeCloseTo(138, 5);
    expect(correctedSodium(130, 600, 2.4)).toBeCloseTo(142, 5);
  });
  it('Adrogué–Madias: 3% saline in a 70 kg man with Na 115', () => {
    const tbw = totalBodyWater(70, 'male', false);
    expect(tbw).toBe(42);
    expect(deltaNaPerLitre(513, 0, 115, tbw)).toBeCloseTo(9.26, 2);
  });
  it('free water deficit', () => {
    expect(freeWaterDeficit(160, 42)).toBeCloseTo(6, 5);
  });
});

describe('kidney', () => {
  it('CKD-EPI 2021 creatinine matches published calculator values', () => {
    expect(ckdEpi2021Cr(1.0, 50, 'male')).toBeCloseTo(92, 0);
    expect(ckdEpi2021Cr(1.0, 50, 'female')).toBeCloseTo(68.6, 1);
  });
  it('cystatin equations behave sensibly', () => {
    const cys = ckdEpi2012Cys(1.0, 50, 'male');
    const both = ckdEpi2021CrCys(1.0, 1.0, 50, 'male');
    expect(cys).toBeGreaterThan(70);
    expect(cys).toBeLessThan(90);
    expect(both).toBeGreaterThan(70);
    expect(both).toBeLessThan(100);
  });
  it('Cockcroft–Gault', () => {
    expect(cockcroftGault(1.0, 60, 72, 'male')).toBeCloseTo(80, 5);
  });
  it('G categories and heat map', () => {
    expect(gfrCategory(44)).toBe('G3b');
    expect(KDIGO_HEATMAP.G3a.A2).toBe('high');
    expect(KDIGO_HEATMAP.G2.A1).toBe('low');
  });
  it('FENa and FEUrea', () => {
    expect(fena(12, 138, 120, 3.2)).toBeCloseTo(0.232, 3);
    expect(feUrea(300, 68, 120, 3.2)).toBeCloseTo(11.76, 1);
  });
  it('KDIGO AKI staging', () => {
    expect(kdigoAkiStage(1.1, 3.2)).toBe(2);
    expect(kdigoAkiStage(1.0, 1.3)).toBe(1);
    expect(kdigoAkiStage(1.5, 4.6)).toBe(3);
    expect(kdigoAkiStage(1.0, 1.2)).toBe(0);
  });
  it('creatinine lags after abrupt GFR loss', () => {
    const pts = simulateCreatinine({ baselineCr: 1.0, age: 50, sex: 'male', weightKg: 70, gfrFraction: 0.1, days: 5 });
    const day1 = pts.find((p) => p.day === 1)!;
    const day5 = pts[pts.length - 1];
    expect(day1.cr).toBeGreaterThan(1.5);
    expect(day1.naiveEGFR).toBeGreaterThan(day1.trueGFR * 2);
    expect(day5.cr).toBeGreaterThan(day1.cr);
    expect(day5.cr).toBeLessThan(10.5); // steady state = 10 × baseline
  });
});

describe('liver', () => {
  it('R factor and pattern', () => {
    expect(rFactor(1450, 56, 142, 147)).toBeCloseTo(26.8, 1);
    expect(injuryPattern(1450, 56, 142, 147)).toBe('hepatocellular');
    expect(injuryPattern(85, 40, 520, 120)).toBe('cholestatic');
  });
  it('MELD 3.0 floors at 6 for normal labs', () => {
    expect(meld3({ bilirubin: 1, inr: 1, creatinine: 1, sodium: 137, albumin: 3.5, female: false })).toBe(6);
  });
  it('MELD 3.0 rises with decompensation', () => {
    const s = meld3({ bilirubin: 3.5, inr: 1.9, creatinine: 1.4, sodium: 129, albumin: 2.6, female: true });
    expect(s).toBeGreaterThan(25);
    expect(s).toBeLessThan(35);
  });
  it('Child-Pugh', () => {
    expect(childPugh(1.5, 3.8, 1.2, 'none', 'none')).toEqual({ points: 5, cls: 'A' });
    expect(childPugh(3.5, 2.6, 1.9, 'moderate-severe', 'grade 1-2').cls).toBe('C');
  });
  it("Hy's law", () => {
    expect(hysLaw(600, 40, 3.0, 1.2, 100, 120)).toBe(true);
    expect(hysLaw(600, 40, 3.0, 1.2, 400, 120)).toBe(false);
  });
});

describe('QC', () => {
  it('in-control runs rarely reject', () => {
    const v = evaluateWestgard(generateRuns(7, 20, 'none', 0, 1)).filter((x) => x.rule !== '1-2s');
    expect(v.length).toBeLessThanOrEqual(2);
  });
  it('a 3 SD shift triggers systematic rules', () => {
    const v = evaluateWestgard(generateRuns(7, 20, 'shift', 3, 10));
    expect(v.some((x) => x.rule === '2-2s' || x.rule === '4-1s' || x.rule === '1-3s')).toBe(true);
  });
  it('R-4s detects opposite extremes', () => {
    const v = evaluateWestgard([{ run: 1, z: [2.5, -2.3] }]);
    expect(v.map((x) => x.rule)).toContain('R-4s');
  });
  it('sigma and RCV', () => {
    expect(sigmaMetric(10, 1, 1.5)).toBeCloseTo(6, 5);
    expect(rcv(3, 4.5)).toBeCloseTo(15.0, 0);
  });
});

describe('specimen artifacts', () => {
  const truth = BASE_PANELS.healthy.panel;
  it('no artifacts → unchanged', () => {
    const r = applyArtifacts(truth, NO_ARTIFACTS);
    expect(r.na).toBeCloseTo(truth.na, 6);
    expect(r.k).toBeCloseTo(truth.k, 6);
  });
  it('EDTA contamination: K up, Ca down', () => {
    const r = applyArtifacts(truth, { ...NO_ARTIFACTS, edtaFraction: 0.3 });
    expect(r.k).toBeGreaterThan(6.5);
    expect(r.ca).toBeLessThan(6);
    expect(r.mg).toBeLessThan(truth.mg * 0.8);
    expect(detectClues(r, truth, { ...NO_ARTIFACTS, edtaFraction: 0.3 }).join(' ')).toMatch(/EDTA/);
  });
  it('D5W contamination mixes exactly', () => {
    const r = applyArtifacts(truth, { ...NO_ARTIFACTS, fluid: 'd5w', fluidFraction: 0.1 });
    expect(r.glucose).toBeCloseTo(0.9 * 92 + 500, 6);
    expect(r.na).toBeCloseTo(126, 6);
  });
  it('indirect ISE pseudohyponatremia only with indirect method', () => {
    const ind = applyArtifacts(truth, { ...NO_ARTIFACTS, triglycerides: 4000 });
    const dir = applyArtifacts(truth, { ...NO_ARTIFACTS, triglycerides: 4000, method: 'direct' });
    expect(ind.na).toBeLessThan(135);
    expect(dir.na).toBeCloseTo(140, 6);
  });
});

describe('units', () => {
  it('converts common analytes', () => {
    expect(toSI('glucose', 180)).toBeCloseTo(10, 0);
    expect(toSI('creatinine', 1)).toBeCloseTo(88.4, 1);
    expect(toSI('hba1c', 6.5)).toBeCloseTo(47.5, 0);
  });
});
