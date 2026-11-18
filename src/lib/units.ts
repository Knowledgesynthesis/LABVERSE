import type { AnalyteKey } from '../types';

/** Conventional → SI multiplication factors. */
export const SI: Record<AnalyteKey, { factor: number; unit: string; dp: number }> = {
  glucose: { factor: 0.0555, unit: 'mmol/L', dp: 1 },
  bun: { factor: 0.357, unit: 'mmol/L (urea)', dp: 1 },
  creatinine: { factor: 88.4, unit: 'µmol/L', dp: 0 },
  calcium: { factor: 0.2495, unit: 'mmol/L', dp: 2 },
  magnesium: { factor: 0.4114, unit: 'mmol/L', dp: 2 },
  phosphate: { factor: 0.3229, unit: 'mmol/L', dp: 2 },
  bilirubin: { factor: 17.1, unit: 'µmol/L', dp: 0 },
  albumin: { factor: 10, unit: 'g/L', dp: 0 },
  protein: { factor: 10, unit: 'g/L', dp: 0 },
  cholesterol: { factor: 0.02586, unit: 'mmol/L', dp: 2 },
  triglycerides: { factor: 0.01129, unit: 'mmol/L', dp: 2 },
  ft4: { factor: 12.87, unit: 'pmol/L', dp: 1 },
  ft3: { factor: 1.536, unit: 'pmol/L', dp: 1 },
  cortisol: { factor: 27.59, unit: 'nmol/L', dp: 0 },
  urate: { factor: 59.48, unit: 'µmol/L', dp: 0 },
  ammonia: { factor: 0.587, unit: 'µmol/L', dp: 0 },
  pco2: { factor: 0.1333, unit: 'kPa', dp: 1 },
  ethanol: { factor: 0.217, unit: 'mmol/L', dp: 1 },
  hba1c: { factor: 1, unit: 'mmol/mol', dp: 0 },
};

/** Converts a conventional value to SI. HbA1c uses the IFCC master equation. */
export function toSI(key: AnalyteKey, value: number): number {
  if (key === 'hba1c') return (value - 2.15) * 10.929;
  return value * SI[key].factor;
}

export function formatSI(key: AnalyteKey, value: number): string {
  const v = toSI(key, value);
  return v.toFixed(SI[key].dp);
}
