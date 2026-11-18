/**
 * Liver chemistry patterns. ACG 2017 (Kwo et al.) for R ratio and magnitude bands;
 * MELD 3.0 per Kim et al., Gastroenterology 2021 (OPTN allocation score since July 2023).
 */

export type Pattern = 'hepatocellular' | 'cholestatic' | 'mixed' | 'normal enzymes';

export function rFactor(alt: number, altUln: number, alp: number, alpUln: number): number {
  return alt / altUln / (alp / alpUln);
}

export function injuryPattern(alt: number, altUln: number, alp: number, alpUln: number): Pattern {
  if (alt <= altUln && alp <= alpUln) return 'normal enzymes';
  const r = rFactor(alt, altUln, alp, alpUln);
  if (r >= 5) return 'hepatocellular';
  if (r <= 2) return 'cholestatic';
  return 'mixed';
}

/** ACG 2017 magnitude bands for aminotransferase elevation. */
export function magnitude(value: number, uln: number): string {
  if (value <= uln) return 'within reference';
  if (value > 10000) return 'massive (> 10,000 IU/L)';
  const x = value / uln;
  if (x < 2) return 'borderline (< 2× ULN)';
  if (x <= 5) return 'mild (2–5× ULN)';
  if (x <= 15) return 'moderate (5–15× ULN)';
  return 'severe (> 15× ULN)';
}

export function astAltComment(ast: number, alt: number): string {
  const r = ast / alt;
  if (r >= 2) return `AST/ALT ${r.toFixed(1)} (≥ 2): alcohol-associated liver disease likely (typically AST < 300–400); also cirrhosis, muscle injury, hemolysis, Wilson disease.`;
  if (r > 1) return `AST/ALT ${r.toFixed(1)} (> 1): consider cirrhosis of any cause, alcohol, muscle source (check CK) or ischemic injury.`;
  return `AST/ALT ${r.toFixed(1)} (≤ 1): typical of viral, MASLD and most drug-induced hepatocellular injury.`;
}

export interface Meld3Input {
  bilirubin: number;
  inr: number;
  creatinine: number;
  sodium: number;
  albumin: number;
  female: boolean;
  dialysis?: boolean;
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

export function meld3(i: Meld3Input): number {
  const bili = Math.max(1, i.bilirubin);
  const inr = Math.max(1, i.inr);
  const cr = i.dialysis ? 3 : clamp(i.creatinine, 1, 3);
  const na = clamp(i.sodium, 125, 137);
  const alb = clamp(i.albumin, 1.5, 3.5);
  const score =
    1.33 * (i.female ? 1 : 0) +
    4.56 * Math.log(bili) +
    0.82 * (137 - na) -
    0.24 * (137 - na) * Math.log(bili) +
    9.09 * Math.log(inr) +
    11.14 * Math.log(cr) +
    1.85 * (3.5 - alb) -
    1.83 * (3.5 - alb) * Math.log(cr) +
    6;
  return Math.round(score);
}

export type Ascites = 'none' | 'mild' | 'moderate-severe';
export type Encephalopathy = 'none' | 'grade 1-2' | 'grade 3-4';

export function childPugh(bili: number, albumin: number, inr: number, ascites: Ascites, he: Encephalopathy) {
  const pts =
    (bili < 2 ? 1 : bili <= 3 ? 2 : 3) +
    (albumin > 3.5 ? 1 : albumin >= 2.8 ? 2 : 3) +
    (inr < 1.7 ? 1 : inr <= 2.3 ? 2 : 3) +
    (ascites === 'none' ? 1 : ascites === 'mild' ? 2 : 3) +
    (he === 'none' ? 1 : he === 'grade 1-2' ? 2 : 3);
  const cls = pts <= 6 ? 'A' : pts <= 9 ? 'B' : 'C';
  return { points: pts, cls };
}

/** Hy's law signal: hepatocellular injury (ALT > 3× ULN) with bilirubin > 2× ULN and ALP < 2× ULN. */
export function hysLaw(alt: number, altUln: number, bili: number, biliUln: number, alp: number, alpUln: number) {
  return alt > 3 * altUln && bili > 2 * biliUln && alp < 2 * alpUln;
}
