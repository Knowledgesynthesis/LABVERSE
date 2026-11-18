import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './screens/Home';
import { Learn } from './screens/Learn';
import { ModuleOverview } from './screens/ModuleOverview';
import { Lesson } from './screens/Lesson';
import { CaseDetail, CasesList } from './screens/Cases';
import { PracticeHub, QuizSession } from './screens/Practice';
import { Progress } from './screens/Progress';
import { Glossary } from './screens/Glossary';
import { References } from './screens/References';
import { SystemsMap } from './screens/SystemsMap';
import { Settings } from './screens/Settings';
import { InteractiveRoute, InteractivesList } from './screens/Interactives';
import { NotFound } from './components/PageHeader';

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/modules" element={<Navigate to="/learn" replace />} />
            <Route path="/modules/:moduleId" element={<ModuleOverview />} />
            <Route path="/lessons/:lessonId" element={<Lesson />} />
            <Route path="/interactives" element={<InteractivesList />} />
            <Route path="/interactives/:labId" element={<InteractiveRoute />} />
            <Route path="/cases" element={<CasesList />} />
            <Route path="/cases/:caseId" element={<CaseDetail />} />
            <Route path="/practice" element={<PracticeHub />} />
            <Route path="/practice/module/:moduleId" element={<QuizSession />} />
            <Route path="/practice/:mode" element={<QuizSession />} />
            <Route path="/map" element={<SystemsMap />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/references" element={<References />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
