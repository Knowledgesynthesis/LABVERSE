import { Link, useParams } from 'react-router-dom';
import { BrainCircuit, CheckCircle2, Circle, Clock, FlaskConical, OctagonAlert, Stethoscope } from 'lucide-react';
import { caseById, interactiveById, lessonById, moduleById } from '../content';
import type { ModuleId } from '../types';
import useAppStore from '../store';
import { moduleMastery } from '../lib/mastery';
import { HUE, MODULE_ICON } from '../lib/moduleStyle';
import { NotFound, PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { cn } from '../lib/utils';

export function ModuleOverview() {
  const { moduleId } = useParams();
  const progress = useAppStore((s) => s.progress);
  const m = moduleById[moduleId as ModuleId];
  if (!m) return <NotFound what="Module" />;
  const Icon = MODULE_ICON[m.id];
  const hue = HUE[m.hue];
  const mm = moduleMastery(m, progress);

  return (
    <div className="space-y-6">
      <PageHeader
        back={{ to: '/learn', label: 'Curriculum' }}
        title={m.title}
        subtitle={m.description}
        eyebrow={
          <span className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold', hue.soft, hue.text)}>
            <Icon className="h-3.5 w-3.5" /> {m.short}
          </span>
        }
        actions={
          <Link to={`/practice/module/${m.id}`}>
            <Button>
              <BrainCircuit className="h-4 w-4" /> Module quiz
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">By the end you will</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {m.outcomes.map((o) => (
                <li key={o} className="flex gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {o}
                </li>
              ))}
            </ul>
            {m.prerequisites.length > 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                Builds on:{' '}
                {m.prerequisites.map((p, i) => (
                  <span key={p}>
                    {i > 0 && ', '}
                    <Link className="text-primary hover:underline" to={`/modules/${p}`}>
                      {moduleById[p].title}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mastery · {mm.mastery}%</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Meter label="Lessons" a={mm.lessonsDone} b={mm.lessonsTotal} cls={hue.solid} />
            <Meter label="Questions correct" a={mm.questionsCorrect} b={mm.questionsTotal} cls={hue.solid} />
            {mm.casesTotal > 0 && <Meter label="Case score" a={Math.round(mm.casesScore * 100)} b={100} cls={hue.solid} suffix="%" />}
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Lessons</h2>
        <ol className="space-y-2">
          {m.lessons.map((id, i) => {
            const l = lessonById[id];
            const done = !!progress.lessons[id];
            return (
              <li key={id}>
                <Link to={`/lessons/${id}`} className="flex items-center gap-4 rounded-lg border bg-card p-4 hover:bg-accent/40">
                  <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold', done ? 'bg-success/15 text-success' : 'bg-muted')}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{l.title}</p>
                    <p className="text-sm text-muted-foreground">{l.summary}</p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
                    <Clock className="h-3.5 w-3.5" /> {l.minutes} min
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {m.cases.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Cases</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {m.cases.map((id) => {
              const c = caseById[id];
              const r = progress.cases[id];
              return (
                <Link key={id} to={`/cases/${id}`} className="flex items-start gap-3 rounded-lg border bg-card p-4 hover:bg-accent/40">
                  <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{c.title}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="capitalize">
                        {c.difficulty}
                      </Badge>
                      {c.mustNotMiss && (
                        <Badge variant="destructive">
                          <OctagonAlert className="h-3 w-3" /> Must not miss
                        </Badge>
                      )}
                    </div>
                  </div>
                  {r ? <span className="text-sm font-semibold text-success tabular">{r.score}/{r.total}</span> : <Circle className="h-4 w-4 text-muted-foreground/50" />}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {m.interactives.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Interactive labs</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {m.interactives.map((id) => {
              const lab = interactiveById[id];
              return (
                <Link key={id} to={`/interactives/${id}`} className="flex items-start gap-3 rounded-lg border bg-card p-4 hover:bg-accent/40">
                  <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{lab.title}</p>
                    <p className="text-sm text-muted-foreground">{lab.summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function Meter({ label, a, b, cls, suffix = '' }: { label: string; a: number; b: number; cls: string; suffix?: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular">
          {a}
          {suffix ? suffix : `/${b}`}
        </span>
      </div>
      <ProgressBar value={b ? (100 * a) / b : 0} barClass={cls} label={label} />
    </div>
  );
}
