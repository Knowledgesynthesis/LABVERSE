import { describe, expect, it } from 'vitest';
import {
  caseById,
  cases,
  glossaryTerms,
  interactiveById,
  interactives,
  lessonById,
  lessons,
  mapEdges,
  mapNodes,
  moduleById,
  modules,
  questionById,
  questions,
  referenceById,
  references,
} from './index';
import { hhPH } from '../lib/clinical/acidBase';
import { optionOrder } from '../lib/quiz';
import type { CaseLab, ClinicalCase } from '../types';

const dupes = (ids: string[]) => ids.filter((id, i) => ids.indexOf(id) !== i);

describe('identifiers', () => {
  it('are unique within each collection', () => {
    expect(dupes(lessons.map((l) => l.id))).toEqual([]);
    expect(dupes(questions.map((q) => q.id))).toEqual([]);
    expect(dupes(cases.map((c) => c.id))).toEqual([]);
    expect(dupes(glossaryTerms.map((g) => g.id))).toEqual([]);
    expect(dupes(references.map((r) => r.id))).toEqual([]);
    expect(dupes(modules.map((m) => m.id))).toEqual([]);
    expect(dupes(interactives.map((i) => i.id))).toEqual([]);
    const stepIds = cases.flatMap((c) => c.steps.map((s) => `${c.id}/${s.id}`));
    expect(dupes(stepIds)).toEqual([]);
    expect(dupes(cases.flatMap((c) => c.steps.map((s) => s.id)))).toEqual([]);
  });
});

describe('modules', () => {
  it('reference existing lessons, cases and interactives of the same module', () => {
    modules.forEach((m) => {
      m.lessons.forEach((id) => {
        expect(lessonById[id], `${m.id} → lesson ${id}`).toBeDefined();
        expect(lessonById[id].moduleId).toBe(m.id);
      });
      m.cases.forEach((id) => {
        expect(caseById[id], `${m.id} → case ${id}`).toBeDefined();
        expect(caseById[id].moduleId).toBe(m.id);
      });
      m.interactives.forEach((id) => expect(interactiveById[id], `${m.id} → lab ${id}`).toBeDefined());
      m.prerequisites.forEach((id) => expect(moduleById[id]).toBeDefined());
    });
  });
  it('every lesson and case belongs to a module list', () => {
    const listedLessons = new Set(modules.flatMap((m) => m.lessons));
    const listedCases = new Set(modules.flatMap((m) => m.cases));
    lessons.forEach((l) => expect(listedLessons.has(l.id), l.id).toBe(true));
    cases.forEach((c) => expect(listedCases.has(c.id), c.id).toBe(true));
  });
  it('every interactive is linked from its module', () => {
    interactives.forEach((i) => expect(moduleById[i.moduleId].interactives, i.id).toContain(i.id));
  });
});

describe('lessons', () => {
  it('have objectives, takeaways, references and at least one knowledge check', () => {
    lessons.forEach((l) => {
      expect(l.objectives.length, l.id).toBeGreaterThanOrEqual(2);
      expect(l.takeaways.length, l.id).toBeGreaterThanOrEqual(2);
      expect(l.refs.length, l.id).toBeGreaterThanOrEqual(1);
      expect(l.blocks.some((b) => b.type === 'check'), l.id).toBe(true);
      expect(l.minutes).toBeGreaterThan(0);
    });
  });
  it('checks point to questions of the same module; labs to interactives', () => {
    lessons.forEach((l) =>
      l.blocks.forEach((b) => {
        if (b.type === 'check') {
          expect(questionById[b.id], `${l.id} → ${b.id}`).toBeDefined();
          expect(questionById[b.id].moduleId).toBe(l.moduleId);
        }
        if (b.type === 'lab') expect(interactiveById[b.id], `${l.id} → lab ${b.id}`).toBeDefined();
        if (b.type === 'table') b.rows.forEach((r) => expect(r.length, `${l.id} table row`).toBe(b.headers.length));
      })
    );
  });
  it('every module question is embedded in a lesson or reachable by quiz', () => {
    const embedded = new Set(lessons.flatMap((l) => l.blocks.filter((b) => b.type === 'check').map((b) => (b as { id: string }).id)));
    // all questions must at least belong to a module with lessons
    questions.forEach((q) => expect(moduleById[q.moduleId]).toBeDefined());
    expect(embedded.size).toBeGreaterThanOrEqual(questions.length * 0.9);
  });
});

describe('questions and case steps', () => {
  const bodies = [...questions, ...cases.flatMap((c) => c.steps)];
  it('are well formed', () => {
    bodies.forEach((q) => {
      expect(q.stem.length, q.id).toBeGreaterThanOrEqual(8);
      expect(q.explanation.length, q.id).toBeGreaterThan(20);
      if (q.kind === 'mcq') {
        expect(q.options.length, q.id).toBeGreaterThanOrEqual(3);
        expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
        expect(q.answer, q.id).toBeLessThan(q.options.length);
        expect(dupes(q.options), q.id).toEqual([]);
      } else {
        expect(Number.isFinite(q.value), q.id).toBe(true);
        expect(q.tolerance, q.id).toBeGreaterThanOrEqual(0);
      }
    });
  });
  it('module questions reference valid sources', () => {
    questions.forEach((q) => (q.refs ?? []).forEach((r) => expect(referenceById[r], `${q.id} → ${r}`).toBeDefined()));
  });
  it('displayed answer positions are balanced after shuffling', () => {
    const mcq = bodies.filter((q) => q.kind === 'mcq');
    const counts = [0, 0, 0, 0, 0];
    mcq.forEach((q) => {
      if (q.kind !== 'mcq') return;
      const order = optionOrder(q.id, q.options.length, 0);
      counts[Math.min(order.indexOf(q.answer), 4)] += 1;
    });
    expect(Math.max(...counts) / mcq.length).toBeLessThan(0.4);
  });
  it('options do not rely on position ("all/none of the above")', () => {
    bodies.forEach((q) => {
      if (q.kind === 'mcq') q.options.forEach((o) => expect(o, q.id).not.toMatch(/(all|none|both) of the (above|options)/i));
    });
  });
});

describe('references and glossary', () => {
  it('all cited references exist and have URLs', () => {
    [...lessons.flatMap((l) => l.refs), ...cases.flatMap((c) => c.refs)].forEach((r) => expect(referenceById[r], r).toBeDefined());
    references.forEach((r) => expect(r.url, r.id).toMatch(/^https:\/\//));
  });
  it('glossary links resolve', () => {
    const ids = new Set(glossaryTerms.map((g) => g.id));
    glossaryTerms.forEach((g) => {
      g.related.forEach((r) => expect(ids.has(r), `${g.id} → ${r}`).toBe(true));
      if (g.lessonId) expect(lessonById[g.lessonId], `${g.id} → ${g.lessonId}`).toBeDefined();
    });
  });
  it('systems map edges resolve', () => {
    const ids = new Set(mapNodes.map((n) => n.id));
    mapEdges.forEach((e) => {
      expect(ids.has(e.a), e.a).toBe(true);
      expect(ids.has(e.b), e.b).toBe(true);
      expect(lessonById[e.lessonId], e.lessonId).toBeDefined();
    });
  });
});

const findLab = (c: ClinicalCase, pred: (l: CaseLab) => boolean) => c.panels.flatMap((p) => p.labs).find(pred);
const num = (l?: CaseLab) => (l && typeof l.value === 'number' ? l.value : undefined);

describe('case physiology is internally consistent', () => {
  it('lab reference ranges are ordered', () => {
    cases.forEach((c) =>
      c.panels.forEach((p) =>
        p.labs.forEach((l) => {
          if (l.low !== undefined && l.high !== undefined) expect(l.low, `${c.id} ${l.name}`).toBeLessThanOrEqual(l.high);
        })
      )
    );
  });
  it('blood gases obey Henderson–Hasselbalch (± 0.03)', () => {
    cases.forEach((c) => {
      const pH = num(findLab(c, (l) => l.name === 'pH'));
      const pco2 = num(findLab(c, (l) => l.name === 'PaCO₂'));
      const hco3 = num(findLab(c, (l) => l.name === 'HCO₃⁻'));
      if (pH !== undefined && pco2 !== undefined && hco3 !== undefined)
        expect(Math.abs(hhPH(hco3, pco2) - pH), c.id).toBeLessThanOrEqual(0.03);
    });
  });
  it('anion-gap and osmolality answers match the panel', () => {
    cases.forEach((c) => {
      const na = num(findLab(c, (l) => l.name === 'Sodium'));
      const cl = num(findLab(c, (l) => l.name === 'Chloride'));
      const hco3 = num(findLab(c, (l) => l.name === 'HCO₃⁻' || l.name === 'Bicarbonate' || l.name === 'Total CO₂'));
      const glu = num(findLab(c, (l) => l.name === 'Glucose'));
      const bun = num(findLab(c, (l) => l.name === 'BUN'));
      const mosm = num(findLab(c, (l) => l.name === 'Osmolality (measured)'));
      c.steps.forEach((s) => {
        if (s.kind !== 'numeric') return;
        const stem = s.stem.toLowerCase();
        if (stem.includes('anion gap') && na && cl && hco3) expect(s.value, `${c.id} AG`).toBeCloseTo(na - cl - hco3, 5);
        if (stem.includes('osmolal gap') && na && glu !== undefined && bun !== undefined && mosm)
          expect(Math.abs(s.value - (mosm - (2 * na + glu / 18 + bun / 2.8))), `${c.id} osm gap`).toBeLessThanOrEqual(s.tolerance);
        if (stem.includes('effective osmolality') && na && glu)
          expect(Math.abs(s.value - (2 * na + glu / 18)), `${c.id} eff osm`).toBeLessThanOrEqual(s.tolerance);
      });
      if (mosm && na && glu !== undefined && bun !== undefined) {
        const calc = 2 * na + glu / 18 + bun / 2.8;
        expect(mosm - calc, `${c.id} measured osm should not be below calculated by > 5`).toBeGreaterThan(-5);
      }
    });
  });
});

describe('copy quality', () => {
  it('contains no placeholders or obsolete claims', () => {
    const text = JSON.stringify({ lessons, questions, cases, glossaryTerms });
    expect(text).not.toMatch(/\bTODO\b|\blorem\b|\bplaceholder\b/i);
    expect(text).not.toMatch(/race coefficient (is|was) (included|used)/i);
    expect(text).not.toMatch(/Kayexalate/i);
    expect(text).not.toMatch(/NAFLD(?! \)|\)|,)/); // only allowed as "formerly NAFLD"
  });
});
