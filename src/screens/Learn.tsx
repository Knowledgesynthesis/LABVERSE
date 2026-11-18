import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { lessonById, moduleById, modules } from '../content';
import useAppStore from '../store';
import { moduleMastery } from '../lib/mastery';
import { HUE, MODULE_ICON } from '../lib/moduleStyle';
import { PageHeader } from '../components/PageHeader';
import { ProgressBar } from '../components/ui/ProgressBar';
import { cn } from '../lib/utils';

export function Learn() {
  const progress = useAppStore((s) => s.progress);
  const totalMinutes = modules.reduce((a, m) => a + m.lessons.reduce((b, id) => b + (lessonById[id]?.minutes ?? 0), 0), 0);
  return (
    <div>
      <PageHeader
        title="Curriculum"
        subtitle={`Nine modules, ordered so each builds on the last (~${Math.round(totalMinutes / 60)} hours of lessons, plus cases and labs). Prerequisites are suggestions — jump in anywhere.`}
      />
      <ol className="space-y-5">
        {modules.map((m, i) => {
          const Icon = MODULE_ICON[m.id];
          const hue = HUE[m.hue];
          const mm = moduleMastery(m, progress);
          return (
            <li key={m.id} className="rounded-xl border bg-card">
              <div className="flex flex-wrap items-center gap-4 p-5">
                <span className={cn('flex h-11 w-11 items-center justify-center rounded-lg', hue.soft)}>
                  <Icon className={cn('h-5 w-5', hue.text)} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Module {i + 1}</p>
                  <Link to={`/modules/${m.id}`} className="text-lg font-semibold hover:text-primary">
                    {m.title}
                  </Link>
                  {m.prerequisites.length > 0 && (
                    <p className="text-xs text-muted-foreground">Builds on: {m.prerequisites.map((p) => moduleById[p].short).join(', ')}</p>
                  )}
                </div>
                <div className="w-full sm:w-48">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{mm.level}</span>
                    <span className="font-semibold tabular">{mm.mastery}%</span>
                  </div>
                  <ProgressBar value={mm.mastery} barClass={hue.solid} label={`${m.title} mastery`} />
                </div>
              </div>
              <ul className="border-t">
                {m.lessons.map((id) => {
                  const l = lessonById[id];
                  const done = !!progress.lessons[id];
                  return (
                    <li key={id} className="border-b last:border-b-0">
                      <Link to={`/lessons/${id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-accent/40">
                        {done ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success" /> : <Circle className="h-5 w-5 shrink-0 text-muted-foreground/50" />}
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{l.title}</span>
                          <span className="block truncate text-xs text-muted-foreground">{l.summary}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {l.minutes}m
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
