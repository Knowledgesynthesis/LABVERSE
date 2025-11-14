import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProgress,
  AppSettings,
  AssessmentScore,
} from '../types';

interface AppState {
  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // User Progress
  progress: UserProgress;
  completeLesson: (lessonId: string) => void;
  completeInteractive: (interactiveId: string) => void;
  completeCase: (caseId: string) => void;
  recordAssessmentScore: (assessmentId: string, score: number, totalPoints: number) => void;
  updateTimeSpent: (minutes: number) => void;

  // Navigation state
  currentModuleId: string | null;
  currentLessonId: string | null;
  setCurrentModule: (moduleId: string | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial settings
      settings: {
        theme: 'dark',
        fontSize: 'medium',
        highContrast: false,
        reduceMotion: false,
        offlineMode: false,
        notificationsEnabled: true,
      },

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // Initial progress
      progress: {
        lessonsCompleted: [],
        interactivesCompleted: [],
        casesCompleted: [],
        assessmentScores: {},
        totalTimeSpent: 0,
        currentStreak: 0,
        lastAccessDate: new Date().toISOString(),
        achievements: [],
      },

      completeLesson: (lessonId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            lessonsCompleted: state.progress.lessonsCompleted.includes(lessonId)
              ? state.progress.lessonsCompleted
              : [...state.progress.lessonsCompleted, lessonId],
          },
        })),

      completeInteractive: (interactiveId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            interactivesCompleted: state.progress.interactivesCompleted.includes(interactiveId)
              ? state.progress.interactivesCompleted
              : [...state.progress.interactivesCompleted, interactiveId],
          },
        })),

      completeCase: (caseId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            casesCompleted: state.progress.casesCompleted.includes(caseId)
              ? state.progress.casesCompleted
              : [...state.progress.casesCompleted, caseId],
          },
        })),

      recordAssessmentScore: (assessmentId, score, totalPoints) =>
        set((state) => {
          const existingScore = state.progress.assessmentScores[assessmentId];
          const newScore: AssessmentScore = {
            assessmentId,
            score,
            totalPoints,
            completedAt: new Date().toISOString(),
            attempts: existingScore ? existingScore.attempts + 1 : 1,
          };

          return {
            progress: {
              ...state.progress,
              assessmentScores: {
                ...state.progress.assessmentScores,
                [assessmentId]: newScore,
              },
            },
          };
        }),

      updateTimeSpent: (minutes) =>
        set((state) => ({
          progress: {
            ...state.progress,
            totalTimeSpent: state.progress.totalTimeSpent + minutes,
          },
        })),

      // Navigation
      currentModuleId: null,
      currentLessonId: null,

      setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),
      setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),
    }),
    {
      name: 'labverse-storage',
      partialize: (state) => ({
        settings: state.settings,
        progress: state.progress,
      }),
    }
  )
);

export default useAppStore;
