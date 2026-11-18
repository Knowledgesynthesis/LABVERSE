/**
 * Statistical QC: Westgard multirules (Westgard et al., Clin Chem 1981), Sigma metric,
 * and reference change value (RCV) from biological variation.
 */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(rand: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export type ErrorScenario = 'none' | 'shift' | 'trend' | 'imprecision' | 'outlier';

export interface QCRun {
  run: number;
  z: [number, number];
}

/** Generates z-scores for two control levels. Errors begin at `startRun`. */
export function generateRuns(
  seed: number,
  n: number,
  scenario: ErrorScenario,
  magnitude: number,
  startRun: number
): QCRun[] {
  const rand = mulberry32(seed);
  const runs: QCRun[] = [];
  for (let r = 1; r <= n; r++) {
    let z1 = gaussian(rand);
    let z2 = gaussian(rand);
    if (r >= startRun) {
      if (scenario === 'shift') {
        z1 += magnitude;
        z2 += magnitude;
      } else if (scenario === 'trend') {
        const k = (r - startRun + 1) * (magnitude / 10);
        z1 += k;
        z2 += k;
      } else if (scenario === 'imprecision') {
        z1 *= magnitude;
        z2 *= magnitude;
      } else if (scenario === 'outlier' && r === startRun) {
        z1 = magnitude >= 0 ? 3.4 : -3.4;
      }
    }
    runs.push({ run: r, z: [round2(z1), round2(z2)] });
  }
  return runs;
}

const round2 = (x: number) => Math.round(x * 100) / 100;

export type RuleId = '1-2s' | '1-3s' | '2-2s' | 'R-4s' | '4-1s' | '10x';

export const RULES: Record<RuleId, { reject: boolean; error: 'random' | 'systematic' | 'warning'; text: string }> = {
  '1-2s': { reject: false, error: 'warning', text: 'One control beyond ±2 SD — warning; inspect with the other rules (expected ~1 in 20 controls by chance).' },
  '1-3s': { reject: true, error: 'random', text: 'One control beyond ±3 SD — reject; usually random error (or a large systematic shift).' },
  '2-2s': { reject: true, error: 'systematic', text: 'Two consecutive controls beyond the same ±2 SD limit (across levels in a run, or the same level across runs) — systematic error.' },
  'R-4s': { reject: true, error: 'random', text: 'Within one run, one control beyond +2 SD and another beyond −2 SD (range > 4 SD) — random error.' },
  '4-1s': { reject: true, error: 'systematic', text: 'Four consecutive controls beyond the same ±1 SD limit — systematic error (shift).' },
  '10x': { reject: true, error: 'systematic', text: 'Ten consecutive controls on the same side of the mean — systematic error (bias, drift).' },
};

export interface Violation {
  run: number;
  rule: RuleId;
  level?: 0 | 1;
}

/** Evaluates each run against prior data. Returns all violations by run. */
export function evaluateWestgard(runs: QCRun[]): Violation[] {
  const v: Violation[] = [];
  // flattened chronological series (L1 then L2 within each run)
  const flat: number[] = [];
  runs.forEach((r, idx) => {
    const [a, b] = r.z;
    const push = (rule: RuleId, level?: 0 | 1) => v.push({ run: r.run, rule, level });
    [a, b].forEach((z, lvl) => {
      if (Math.abs(z) > 3) push('1-3s', lvl as 0 | 1);
      else if (Math.abs(z) > 2) push('1-2s', lvl as 0 | 1);
    });
    // 2-2s within run
    if ((a > 2 && b > 2) || (a < -2 && b < -2)) push('2-2s');
    // 2-2s across runs, same level
    if (idx > 0) {
      const p = runs[idx - 1].z;
      [0, 1].forEach((lvl) => {
        const c = r.z[lvl];
        const q = p[lvl];
        if ((c > 2 && q > 2) || (c < -2 && q < -2)) push('2-2s', lvl as 0 | 1);
      });
    }
    // R-4s within run
    if ((a > 2 && b < -2) || (a < -2 && b > 2)) push('R-4s');
    flat.push(a, b);
    // 4-1s on last four values in sequence
    const last4 = flat.slice(-4);
    if (last4.length === 4 && (last4.every((z) => z > 1) || last4.every((z) => z < -1))) push('4-1s');
    // 10x on last ten values in sequence
    const last10 = flat.slice(-10);
    if (last10.length === 10 && (last10.every((z) => z > 0) || last10.every((z) => z < 0))) push('10x');
  });
  // de-duplicate identical run/rule pairs
  const seen = new Set<string>();
  return v.filter((x) => {
    const key = `${x.run}-${x.rule}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function firstRejection(violations: Violation[]): Violation | undefined {
  return violations.find((x) => RULES[x.rule].reject);
}

/** Sigma metric = (TEa − |bias|) / CV, all in %. */
export function sigmaMetric(teaPct: number, biasPct: number, cvPct: number): number {
  return (teaPct - Math.abs(biasPct)) / cvPct;
}

/** Westgard Sigma Rules summary for two control levels. */
export function sigmaRecommendation(sigma: number): string {
  if (sigma >= 6) return 'World-class: 1-3s with 2 controls once per run is enough.';
  if (sigma >= 5) return 'Excellent: 1-3s / 2-2s / R-4s with 2 controls per run.';
  if (sigma >= 4) return 'Good: 1-3s / 2-2s / R-4s / 4-1s with 4 controls per run (or 2 controls × 2 runs).';
  if (sigma >= 3) return 'Marginal: full multirule (incl. 8x) with 6–8 controls per run; increase QC frequency.';
  return 'Poor (< 3σ): QC cannot reliably detect medically important error — improve the method or replace it.';
}

/** Reference change value (%) for two serial results: √2 · z · √(CVa² + CVi²). */
export function rcv(cvaPct: number, cviPct: number, z = 1.96): number {
  return Math.SQRT2 * z * Math.sqrt(cvaPct ** 2 + cviPct ** 2);
}
