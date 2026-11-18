/**
 * Water, sodium and osmolality calculations (conventional units: mg/dL for glucose, BUN, ethanol).
 */

export type Sex = 'female' | 'male';

/** Calculated serum osmolality (mOsm/kg). Ethanol term uses ÷3.7 (Purssell 2001). */
export function calcOsm(na: number, glucose: number, bun: number, ethanol = 0): number {
  return 2 * na + glucose / 18 + bun / 2.8 + ethanol / 3.7;
}

/** Effective osmolality (tonicity): urea crosses membranes freely and is excluded. */
export function effectiveOsm(na: number, glucose: number): number {
  return 2 * na + glucose / 18;
}

export function osmolalGap(measured: number, calculated: number): number {
  return measured - calculated;
}

/** Glucose-corrected sodium. Katz: 1.6 per 100 mg/dL; Hillier: 2.4 per 100 mg/dL above 100. */
export function correctedSodium(na: number, glucose: number, factor: 1.6 | 2.4 = 1.6): number {
  return na + (factor * Math.max(0, glucose - 100)) / 100;
}

/** Total body water fraction (Adrogué–Madias): men 0.6, women 0.5; elderly men 0.5, elderly women 0.45. */
export function tbwFraction(sex: Sex, elderly: boolean): number {
  if (sex === 'male') return elderly ? 0.5 : 0.6;
  return elderly ? 0.45 : 0.5;
}

export function totalBodyWater(weightKg: number, sex: Sex, elderly: boolean): number {
  return weightKg * tbwFraction(sex, elderly);
}

/**
 * Adrogué–Madias: change in serum Na after 1 L of infusate.
 * ΔNa = (infusate Na + infusate K − serum Na) / (TBW + 1)
 */
export function deltaNaPerLitre(infusateNa: number, infusateK: number, serumNa: number, tbw: number): number {
  return (infusateNa + infusateK - serumNa) / (tbw + 1);
}

/** Free-water deficit (L) to bring Na to target (default 140). */
export function freeWaterDeficit(serumNa: number, tbw: number, target = 140): number {
  return tbw * (serumNa / target - 1);
}

export const INFUSATES = {
  'hypertonic-3': { label: '3% NaCl', na: 513 },
  'saline-0.9': { label: '0.9% NaCl', na: 154 },
  'ringer-lactate': { label: "Lactated Ringer's", na: 130 },
  'saline-0.45': { label: '0.45% NaCl', na: 77 },
  d5w: { label: 'D5W (free water)', na: 0 },
} as const;

export type InfusateId = keyof typeof INFUSATES;

export interface TonicityInput {
  na: number;
  glucose: number;
  bun: number;
  measuredOsm?: number;
  ethanol?: number;
}

export interface TonicityResult {
  calculated: number;
  effective: number;
  gap?: number;
  correctedNa16: number;
  correctedNa24: number;
  /** Low Na⁺ with normal measured osmolality — indirect-ISE artifact. */
  pseudo: boolean;
  notes: string[];
}

export function assessTonicity(i: TonicityInput): TonicityResult {
  const calculated = calcOsm(i.na, i.glucose, i.bun, i.ethanol ?? 0);
  const effective = effectiveOsm(i.na, i.glucose);
  const gap = i.measuredOsm !== undefined ? osmolalGap(i.measuredOsm, calculated) : undefined;
  const notes: string[] = [];
  const c16 = correctedSodium(i.na, i.glucose, 1.6);
  const c24 = correctedSodium(i.na, i.glucose, 2.4);

  const pseudo = i.na < 135 && i.measuredOsm !== undefined && i.measuredOsm >= 280 && i.glucose < 250;
  if (i.na < 135) {
    if (pseudo)
      notes.push(
        'Low Na with normal measured osmolality → pseudohyponatremia (lipids or paraprotein displacing plasma water on indirect ISE). Confirm on a blood-gas (direct ISE) analyzer.'
      );
    else if (i.glucose >= 250)
      notes.push(
        `Hyperglycemia pulls water out of cells (hypertonic hyponatremia). Glucose-corrected Na ≈ ${c16.toFixed(0)}–${c24.toFixed(0)} mmol/L.`
      );
    else notes.push('Hypotonic hyponatremia → next: urine osmolality, urine Na, volume status.');
  }
  if (i.na > 145) notes.push('Hypernatremia is always hypertonic → water deficit relative to Na.');
  if (gap !== undefined) {
    if (gap > 10 && pseudo)
      notes.push(
        `The apparent osmolal gap (${gap.toFixed(0)}) is an artifact: the calculation uses the falsely low Na⁺. Recalculate with a direct-ISE Na⁺.`
      );
    else if (gap > 10)
      notes.push(
        `Osmolal gap ${gap.toFixed(0)} (> 10): unmeasured osmoles — ethanol (if not entered), methanol, ethylene glycol, isopropanol, propylene glycol, mannitol, glycine. A normal gap does NOT exclude late toxic-alcohol poisoning.`
      );
    else if (gap < -5) notes.push('Negative gap: check for calculation units, sample handling or analytic error.');
  }
  if (i.glucose >= 600 && effective > 300)
    notes.push('Glucose ≥ 600 mg/dL with effective osmolality > 300 → meets the HHS hyperosmolality criterion (2024 consensus).');
  return { calculated, effective, gap, correctedNa16: c16, correctedNa24: c24, pseudo, notes };
}
