import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookMarked,
  BrainCircuit,
  FlaskConical,
  GraduationCap,
  Home,
  Library,
  Menu,
  Moon,
  Network,
  Settings,
  Stethoscope,
  Sun,
  X,
} from 'lucide-react';
import useAppStore from '../../store';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { GlobalSearch } from './Search';
import { dueQuestionIds } from '../../lib/mastery';

const NAV = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/learn', label: 'Curriculum', icon: GraduationCap },
  { to: '/interactives', label: 'Interactive Labs', icon: FlaskConical },
  { to: '/cases', label: 'Clinical Cases', icon: Stethoscope },
  { to: '/practice', label: 'Practice & Review', icon: BrainCircuit },
  { to: '/map', label: 'Systems Map', icon: Network },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/glossary', label: 'Glossary', icon: BookMarked },
  { to: '/references', label: 'Evidence Library', icon: Library },
  { to: '/settings', label: 'Settings', icon: Settings },
];

function useApplySettings() {
  const settings = useAppStore((s) => s.settings);
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = settings.theme === 'dark' || (settings.theme === 'system' && mq.matches);
      root.classList.toggle('dark', dark);
      root.style.colorScheme = dark ? 'dark' : 'light';
    };
    apply();
    root.dataset.text = settings.textSize;
    root.classList.toggle('reduce-motion', settings.reduceMotion);
    if (settings.theme === 'system') {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
  }, [settings]);
}

export function MainLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { settings, updateSettings, progress } = useAppStore();
  const due = dueQuestionIds(progress).length;
  useApplySettings();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const isDark =
    settings.theme === 'dark' || (settings.theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[70] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="flex h-14 items-center gap-3 px-3 md:px-5">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-2 font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-sm">
              <FlaskConical className="h-4.5 w-4.5" />
            </span>
            <span className="hidden text-lg sm:inline">LabVerse</span>
          </Link>
          <div className="mx-auto flex w-full max-w-sm justify-center">
            <GlobalSearch />
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={() => updateSettings({ theme: isDark ? 'light' : 'dark' })}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {open && <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setOpen(false)} aria-hidden />}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r bg-card transition-transform md:top-14 md:z-30 md:h-[calc(100vh-3.5rem)] md:translate-x-0 md:bg-background',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Main navigation"
      >
        <div className="flex h-14 items-center justify-between border-b px-4 md:hidden">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-primary/12 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
              {to === '/practice' && due > 0 && (
                <span className="ml-auto rounded-full bg-primary px-1.5 text-[0.65rem] font-bold text-primary-foreground tabular">{due}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <p className="border-t p-4 text-[0.7rem] leading-snug text-muted-foreground">
          Learning resource. Verify against local protocols and your laboratory&apos;s reference intervals.
        </p>
      </aside>

      <main id="main" className="md:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
