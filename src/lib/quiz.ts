import type { QuestionBody } from '../types';

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Deterministic permutation of option indices for a question and attempt salt.
 * Removes positional cues from authored answer keys while keeping a stable order within an attempt.
 */
export function optionOrder(id: string, n: number, salt = 0): number[] {
  let seed = hash(`${id}:${salt}`) || 1;
  const rand = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/** Parses a typed numeric answer, accepting commas and a leading/trailing unit. */
export function parseNumeric(input: string): number | null {
  const cleaned = input.replace(/,/g, '').match(/-?\d+(\.\d+)?/);
  if (!cleaned) return null;
  const v = Number(cleaned[0]);
  return Number.isFinite(v) ? v : null;
}

export function isCorrect(q: QuestionBody, response: number | string | null | undefined): boolean {
  if (response === null || response === undefined || response === '') return false;
  if (q.kind === 'mcq') return response === q.answer;
  const v = typeof response === 'number' ? response : parseNumeric(response);
  return v !== null && Math.abs(v - q.value) <= q.tolerance + 1e-9;
}

export function shuffle<T>(items: T[], seed: number): T[] {
  const order = optionOrder(String(seed), items.length, seed);
  return order.map((i) => items[i]);
}
