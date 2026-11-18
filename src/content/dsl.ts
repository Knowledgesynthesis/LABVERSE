import type { Block, CalloutTone } from '../types';

/** Compact authoring helpers for lesson blocks. Inline text supports **bold**, *italic* and `code`. */
export const h = (text: string): Block => ({ type: 'h', text });
export const h3 = (text: string): Block => ({ type: 'h3', text });
export const p = (text: string): Block => ({ type: 'p', text });
export const ul = (...items: string[]): Block => ({ type: 'ul', items });
export const ol = (...items: string[]): Block => ({ type: 'ol', items });
export const table = (headers: string[], rows: string[][], caption?: string): Block => ({ type: 'table', headers, rows, caption });
export const formula = (expr: string, where?: string[], note?: string): Block => ({ type: 'formula', expr, where, note });
const callout =
  (tone: CalloutTone) =>
  (text: string, title?: string): Block => ({ type: 'callout', tone, text, title });
export const pearl = callout('pearl');
export const pitfall = callout('pitfall');
export const danger = callout('danger');
export const evidence = callout('evidence');
export const info = callout('info');
export const check = (id: string): Block => ({ type: 'check', id });
export const steps = (title: string, ...items: [string, string?][]): Block => ({
  type: 'steps',
  title,
  steps: items.map(([t, d]) => ({ title: t, detail: d })),
});
export const lab = (id: string, text: string): Block => ({ type: 'lab', id, text });

export const doi = (x: string) => `https://doi.org/${x}`;
export const pubmed = (q: string) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}`;
