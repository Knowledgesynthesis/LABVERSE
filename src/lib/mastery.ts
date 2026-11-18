import type { Module, Progress } from '../types';
import { orderedLessons, questionsForModule } from '../content';
import { isDue } from '../store';

export interface ModuleMastery {
  lessonsDone: number;
  lessonsTotal: number;
  questionsCorrect: number;
  questionsTotal: number;
  casesScore: number; // 0–1
  casesDone: number;
  casesTotal: number;
  mastery: number; // 0–100
  level: 'Not started' | 'Novice' | 'Developing' | 'Proficient' | 'Mastered';
}

export function moduleMastery(m: Module, p: Progress): ModuleMastery {
  const lessonsDone = m.lessons.filter((id) => p.lessons[id]).length;
  const qs = questionsForModule(m.id);
  const questionsCorrect = qs.filter((q) => p.questions[q.id]?.lastResult).length;
  const caseResults = m.cases.map((id) => p.cases[id]);
  const casesDone = caseResults.filter(Boolean).length;
  const casesScore = m.cases.length
    ? caseResults.reduce((acc, r) => acc + (r ? r.score / r.total : 0), 0) / m.cases.length
    : 0;
  const L = m.lessons.length ? lessonsDone / m.lessons.length : 0;
  const Q = qs.length ? questionsCorrect / qs.length : 0;
  const hasCases = m.cases.length > 0;
  const mastery = Math.round(100 * (hasCases ? 0.3 * L + 0.5 * Q + 0.2 * casesScore : 0.35 * L + 0.65 * Q));
  const touched = lessonsDone + casesDone + qs.filter((q) => p.questions[q.id]).length > 0;
  const level: ModuleMastery['level'] = !touched
    ? 'Not started'
    : mastery >= 90
      ? 'Mastered'
      : mastery >= 70
        ? 'Proficient'
        : mastery >= 40
          ? 'Developing'
          : 'Novice';
  return {
    lessonsDone,
    lessonsTotal: m.lessons.length,
    questionsCorrect,
    questionsTotal: qs.length,
    casesScore,
    casesDone,
    casesTotal: m.cases.length,
    mastery,
    level,
  };
}

export function dueQuestionIds(p: Progress): string[] {
  const now = Date.now();
  return Object.entries(p.questions)
    .filter(([, s]) => isDue(s, now))
    .sort((a, b) => new Date(a[1].due).getTime() - new Date(b[1].due).getTime())
    .map(([id]) => id);
}

export function nextLesson(p: Progress) {
  return orderedLessons.find((l) => !p.lessons[l.id]);
}

export function streak(days: string[]): number {
  if (!days.length) return 0;
  const set = new Set(days);
  let count = 0;
  const d = new Date();
  // allow streak to continue if today not yet active
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}
