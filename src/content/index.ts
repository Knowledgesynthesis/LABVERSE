import type { ClinicalCase, Lesson, ModuleId, Question } from '../types';
import * as electrolytes from './modules/electrolytes';
import * as acidBase from './modules/acidBase';
import * as renal from './modules/renal';
import * as hepatic from './modules/hepatic';
import * as endocrine from './modules/endocrine';
import * as minerals from './modules/minerals';
import * as cardiac from './modules/cardiac';
import * as integrated from './modules/integrated';
import * as labErrors from './modules/labErrors';
import { modules, interactives } from './modules';

export { modules, interactives };
export { glossaryTerms } from './glossary';
export { references, referenceById } from './references';
export { mapNodes, mapEdges } from './systemsMap';

const all = [electrolytes, acidBase, renal, hepatic, endocrine, minerals, cardiac, integrated, labErrors];

export const lessons: Lesson[] = all.flatMap((m) => m.lessons);
export const questions: Question[] = all.flatMap((m) => m.questions);
export const cases: ClinicalCase[] = all.flatMap((m) => m.cases);

export const lessonById = Object.fromEntries(lessons.map((l) => [l.id, l])) as Record<string, Lesson>;
export const questionById = Object.fromEntries(questions.map((q) => [q.id, q])) as Record<string, Question>;
export const caseById = Object.fromEntries(cases.map((c) => [c.id, c])) as Record<string, ClinicalCase>;
export const moduleById = Object.fromEntries(modules.map((m) => [m.id, m])) as Record<ModuleId, (typeof modules)[number]>;
export const interactiveById = Object.fromEntries(interactives.map((i) => [i.id, i])) as Record<string, (typeof interactives)[number]>;

/** Lessons in curriculum order (module order, then lesson order within module). */
export const orderedLessons: Lesson[] = [...modules]
  .sort((a, b) => a.order - b.order)
  .flatMap((m) => m.lessons.map((id) => lessonById[id]).filter(Boolean));

export function questionsForModule(moduleId: ModuleId) {
  return questions.filter((q) => q.moduleId === moduleId);
}

export function lessonForQuestion(questionId: string): Lesson | undefined {
  return lessons.find((l) => l.blocks.some((b) => b.type === 'check' && b.id === questionId));
}
