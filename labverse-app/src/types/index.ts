// Learner levels
export type LearnerLevel = 'medical-student' | 'resident' | 'fellow' | 'attending' | 'pathologist';

// Module categories
export type ModuleCategory =
  | 'electrolytes'
  | 'acid-base'
  | 'renal'
  | 'hepatic'
  | 'endocrine'
  | 'metabolic'
  | 'integrated'
  | 'lab-errors';

// Bloom's taxonomy levels
export type BloomLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

// Lab value with units and reference ranges
export interface LabValue {
  id: string;
  name: string;
  abbreviation: string;
  value?: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
    criticalLow?: number;
    criticalHigh?: number;
  };
  category: string;
  description?: string;
}

// Module structure
export interface Module {
  id: string;
  title: string;
  category: ModuleCategory;
  description: string;
  icon: string;
  prerequisites: string[]; // IDs of prerequisite modules
  learnerLevels: LearnerLevel[];
  bloomLevel: BloomLevel;
  estimatedTime: number; // in minutes
  lessons: string[]; // Lesson IDs
  interactives: string[]; // Interactive IDs
  cases: string[]; // Case IDs
  assessments: string[]; // Assessment IDs
  order: number;
}

// Lesson content
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: LessonContent[];
  objectives: string[];
  bloomLevel: BloomLevel;
  estimatedTime: number;
  prerequisites: string[];
  order: number;
}

export interface LessonContent {
  type: 'text' | 'heading' | 'list' | 'image' | 'table' | 'formula' | 'callout';
  content: string | string[] | TableContent;
  level?: number; // for headings
  calloutType?: 'info' | 'warning' | 'success' | 'error' | 'clinical-pearl';
}

export interface TableContent {
  headers: string[];
  rows: string[][];
}

// Interactive simulators
export interface Interactive {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'electrolyte-dynamics' | 'acid-base' | 'renal-handling' | 'hepatic-pattern' | 'endocrine-axes' | 'analyzer-error';
  parameters: InteractiveParameter[];
  outputs: InteractiveOutput[];
  presets: InteractivePreset[];
  instructions: string[];
  learningPoints: string[];
}

export interface InteractiveParameter {
  id: string;
  name: string;
  unit: string;
  min: number;
  max: number;
  default: number;
  step: number;
  description: string;
}

export interface InteractiveOutput {
  id: string;
  name: string;
  unit: string;
  formula?: string; // For display purposes
  description: string;
  normalRange?: {
    min: number;
    max: number;
  };
}

export interface InteractivePreset {
  id: string;
  name: string;
  description: string;
  values: Record<string, number>;
  expectedLearning: string;
}

// Clinical cases
export interface ClinicalCase {
  id: string;
  moduleId: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  presentation: string;
  labValues: LabValue[];
  questions: CaseQuestion[];
  diagnosis: string;
  reasoning: string;
  learningPoints: string[];
  mustNotMiss?: boolean;
}

export interface CaseQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'short-answer' | 'interpretation';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

// Assessment items
export interface Assessment {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  passingScore: number; // percentage
  timeLimit?: number; // in minutes
}

export interface AssessmentQuestion {
  id: string;
  type: 'mcq' | 'multi-select' | 'drag-drop' | 'interpretation' | 'free-text';
  question: string;
  options?: string[];
  correctAnswer: string | string[] | number[];
  explanation: string;
  rationale: string;
  bloomLevel: BloomLevel;
  points: number;
}

// Glossary
export interface GlossaryTerm {
  id: string;
  term: string;
  abbreviation?: string;
  definition: string;
  category: string;
  relatedTerms: string[]; // IDs of related terms
  clinicalRelevance?: string;
}

// User progress tracking
export interface UserProgress {
  userId?: string; // Optional for offline use
  lessonsCompleted: string[];
  interactivesCompleted: string[];
  casesCompleted: string[];
  assessmentScores: Record<string, AssessmentScore>;
  totalTimeSpent: number; // in minutes
  currentStreak: number; // days
  lastAccessDate: string;
  achievements: Achievement[];
}

export interface AssessmentScore {
  assessmentId: string;
  score: number;
  totalPoints: number;
  completedAt: string;
  attempts: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
  icon: string;
}

// Theme and settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reduceMotion: boolean;
  offlineMode: boolean;
  notificationsEnabled: boolean;
}

// Error types for analyzer module
export interface AnalyzerError {
  id: string;
  type: 'pre-analytic' | 'analytic' | 'post-analytic';
  name: string;
  description: string;
  causes: string[];
  effects: string[];
  prevention: string[];
  examples: string[];
}
