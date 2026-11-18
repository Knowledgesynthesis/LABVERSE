export type ModuleId =
  | 'electrolytes'
  | 'acid-base'
  | 'renal'
  | 'hepatic'
  | 'endocrine'
  | 'minerals'
  | 'cardiac'
  | 'integrated'
  | 'lab-errors';

export type BloomLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

export interface Module {
  id: ModuleId;
  title: string;
  short: string;
  description: string;
  /** Tailwind-friendly hue used for accents (see lib/moduleStyle). */
  hue: 'sky' | 'violet' | 'teal' | 'amber' | 'rose' | 'lime' | 'red' | 'indigo' | 'orange';
  prerequisites: ModuleId[];
  outcomes: string[];
  lessons: string[];
  cases: string[];
  interactives: string[];
  order: number;
}

export type CalloutTone = 'pearl' | 'pitfall' | 'danger' | 'evidence' | 'info';

export type Block =
  | { type: 'h'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'formula'; expr: string; where?: string[]; note?: string }
  | { type: 'callout'; tone: CalloutTone; title?: string; text: string }
  | { type: 'check'; id: string }
  | { type: 'steps'; title?: string; steps: { title: string; detail?: string }[] }
  | { type: 'lab'; id: string; text: string };

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  title: string;
  summary: string;
  minutes: number;
  bloom: BloomLevel;
  objectives: string[];
  blocks: Block[];
  takeaways: string[];
  refs: string[];
}

export interface McqQuestion {
  kind: 'mcq';
  id: string;
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface NumericQuestion {
  kind: 'numeric';
  id: string;
  stem: string;
  value: number;
  tolerance: number;
  unit?: string;
  explanation: string;
}

export type QuestionBody = McqQuestion | NumericQuestion;

export type Question = QuestionBody & {
  moduleId: ModuleId;
  difficulty: 1 | 2 | 3;
  tags: string[];
  refs?: string[];
};

export type AnalyteKey =
  | 'glucose'
  | 'bun'
  | 'creatinine'
  | 'calcium'
  | 'magnesium'
  | 'phosphate'
  | 'bilirubin'
  | 'albumin'
  | 'protein'
  | 'cholesterol'
  | 'triglycerides'
  | 'ft4'
  | 'ft3'
  | 'cortisol'
  | 'urate'
  | 'ammonia'
  | 'pco2'
  | 'ethanol'
  | 'hba1c';

export interface CaseLab {
  name: string;
  value: number | string;
  unit: string;
  /** Reference interval used for flagging (conventional units). */
  low?: number;
  high?: number;
  /** Free-text interval when a numeric one does not fit (e.g., "negative"). */
  refText?: string;
  analyte?: AnalyteKey;
  note?: string;
}

export interface CasePanel {
  title: string;
  labs: CaseLab[];
}

export interface ClinicalCase {
  id: string;
  moduleId: ModuleId;
  title: string;
  difficulty: 'core' | 'intermediate' | 'advanced';
  mustNotMiss?: boolean;
  presentation: string;
  panels: CasePanel[];
  steps: QuestionBody[];
  diagnosis: string;
  reasoning: string;
  takeaways: string[];
  refs: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  abbr?: string;
  category: string;
  definition: string;
  clinical?: string;
  related: string[];
  lessonId?: string;
}

export interface Reference {
  id: string;
  citation: string;
  url: string;
  kind: 'guideline' | 'trial' | 'review' | 'standard' | 'consensus' | 'study';
  year: number;
}

export interface InteractiveMeta {
  id: string;
  title: string;
  summary: string;
  moduleId: ModuleId;
  skills: string[];
}

export interface QuestionStat {
  box: number;
  due: string;
  attempts: number;
  correct: number;
  lastResult: boolean;
  lastAt: string;
}

export interface CaseResult {
  score: number;
  total: number;
  completedAt: string;
}

export interface QuizSession {
  id: string;
  mode: string;
  moduleId?: ModuleId;
  score: number;
  total: number;
  at: string;
}

export interface Progress {
  lessons: Record<string, string>;
  cases: Record<string, CaseResult>;
  labs: Record<string, string>;
  questions: Record<string, QuestionStat>;
  sessions: QuizSession[];
  activeDays: string[];
  lastLocation?: { path: string; title: string; at: string };
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  textSize: 'sm' | 'md' | 'lg';
  reduceMotion: boolean;
  units: 'conventional' | 'si';
}
