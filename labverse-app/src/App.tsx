import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './screens/Home';
import { ModuleOverview } from './screens/ModuleOverview';
import { Lesson } from './screens/Lesson';
import { Glossary } from './screens/Glossary';
import { Settings } from './screens/Settings';
import { Progress } from './screens/Progress';
import { CasesList, CaseDetail } from './screens/Cases';
import { InteractivesList, ElectrolyteDynamics } from './screens/Interactives';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Navigate to="/" replace />} />
            <Route path="/modules/:moduleId" element={<ModuleOverview />} />
            <Route path="/lessons/:lessonId" element={<Lesson />} />
            <Route path="/interactives" element={<InteractivesList />} />
            <Route
              path="/interactives/electrolyte-dynamics"
              element={<ElectrolyteDynamics />}
            />
            <Route path="/cases" element={<CasesList />} />
            <Route path="/cases/:caseId" element={<CaseDetail />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
