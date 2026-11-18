import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings, ModuleId, Progress, QuestionStat, QuizSession } from '../types';

/** Leitner intervals in days for boxes 0–5. Box 0 = due immediately (answered wrong). */
export const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];

export const today = () => new Date().toISOString().slice(0, 10);

const emptyProgress = (): Progress => ({
  lessons: {},
  cases: {},
  labs: {},
  questions: {},
  sessions: [],
  activeDays: [],
});

const defaultSettings: AppSettings = {
  theme: 'dark',
  textSize: 'md',
  reduceMotion: false,
  units: 'conventional',
};

interface AppState {
  settings: AppSettings;
  progress: Progress;
  updateSettings: (s: Partial<AppSettings>) => void;
  completeLesson: (id: string) => void;
  uncompleteLesson: (id: string) => void;
  recordAnswer: (questionId: string, correct: boolean) => void;
  completeCase: (id: string, score: number, total: number) => void;
  visitLab: (id: string) => void;
  recordSession: (s: Omit<QuizSession, 'id' | 'at'> & { moduleId?: ModuleId }) => void;
  setLastLocation: (path: string, title: string) => void;
  resetProgress: () => void;
  importProgress: (p: Progress) => void;
}

function touch(p: Progress): Progress {
  const d = today();
  if (p.activeDays[p.activeDays.length - 1] === d) return p;
  return { ...p, activeDays: [...p.activeDays, d].slice(-400) };
}

function nextStat(prev: QuestionStat | undefined, correct: boolean): QuestionStat {
  const now = new Date();
  const box = correct ? Math.min(5, (prev?.box ?? 0) + 1) : 0;
  const due = new Date(now.getTime() + BOX_INTERVAL_DAYS[box] * 86400000);
  return {
    box,
    due: due.toISOString(),
    attempts: (prev?.attempts ?? 0) + 1,
    correct: (prev?.correct ?? 0) + (correct ? 1 : 0),
    lastResult: correct,
    lastAt: now.toISOString(),
  };
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      progress: emptyProgress(),

      updateSettings: (s) => set((st) => ({ settings: { ...st.settings, ...s } })),

      completeLesson: (id) =>
        set((st) =>
          st.progress.lessons[id]
            ? st
            : { progress: touch({ ...st.progress, lessons: { ...st.progress.lessons, [id]: new Date().toISOString() } }) }
        ),

      uncompleteLesson: (id) =>
        set((st) => {
          const lessons = { ...st.progress.lessons };
          delete lessons[id];
          return { progress: { ...st.progress, lessons } };
        }),

      recordAnswer: (questionId, correct) =>
        set((st) => ({
          progress: touch({
            ...st.progress,
            questions: { ...st.progress.questions, [questionId]: nextStat(st.progress.questions[questionId], correct) },
          }),
        })),

      completeCase: (id, score, total) =>
        set((st) => ({
          progress: touch({
            ...st.progress,
            cases: { ...st.progress.cases, [id]: { score, total, completedAt: new Date().toISOString() } },
          }),
        })),

      visitLab: (id) =>
        set((st) =>
          st.progress.labs[id] ? st : { progress: touch({ ...st.progress, labs: { ...st.progress.labs, [id]: new Date().toISOString() } }) }
        ),

      recordSession: (s) =>
        set((st) => ({
          progress: touch({
            ...st.progress,
            sessions: [...st.progress.sessions, { ...s, id: crypto.randomUUID?.() ?? String(Date.now()), at: new Date().toISOString() }].slice(-100),
          }),
        })),

      setLastLocation: (path, title) =>
        set((st) => ({ progress: { ...st.progress, lastLocation: { path, title, at: new Date().toISOString() } } })),

      resetProgress: () => set({ progress: emptyProgress() }),

      importProgress: (p) => set({ progress: { ...emptyProgress(), ...p } }),
    }),
    {
      name: 'labverse-storage',
      version: 2,
      partialize: (st) => ({ settings: st.settings, progress: st.progress }),
      migrate: (persisted, version) => {
        const old = (persisted ?? {}) as Record<string, unknown>;
        if (version < 2) {
          const oldProgress = (old.progress ?? {}) as { lessonsCompleted?: string[]; casesCompleted?: string[] };
          const oldSettings = (old.settings ?? {}) as { theme?: AppSettings['theme']; reduceMotion?: boolean };
          const stamp = new Date().toISOString();
          const progress = emptyProgress();
          (oldProgress.lessonsCompleted ?? []).forEach((id) => (progress.lessons[id] = stamp));
          return {
            settings: { ...defaultSettings, theme: oldSettings.theme ?? 'dark', reduceMotion: !!oldSettings.reduceMotion },
            progress,
          };
        }
        return persisted as { settings: AppSettings; progress: Progress };
      },
    }
  )
);

export default useAppStore;

export function isDue(stat: QuestionStat | undefined, now = Date.now()) {
  return !!stat && new Date(stat.due).getTime() <= now;
}
