import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, OctagonAlert, RotateCcw, Stethoscope, Trophy } from 'lucide-react';
import { caseById, cases, moduleById, modules } from '../content';
import useAppStore from '../store';
import { HUE } from '../lib/moduleStyle';
import { NotFound, PageHeader } from '../components/PageHeader';
import { QuestionCard } from '../components/QuestionCard';
import { LabTable, UnitsToggle } from '../components/LabTable';
import { RefList } from '../components/RefList';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { cn } from '../lib/utils';
import type { ModuleId } from '../types';

export function CasesList() {
  const progress = useAppStore((s) => s.progress);
  const [filter, setFilter] = useState<'all' | 'mnm' | ModuleId>('all');
  const list = cases.filter((c) => filter === 'all' || (filter === 'mnm' ? c.mustNotMiss : c.moduleId === filter));
  return (
    <div>
      <PageHeader title="Clinical cases" subtitle="Work each case one decision at a time. Feedback after every step, a full explanation at the end, and your score is saved." />
      <div className="mb-5 flex flex-wrap gap-2">
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
          All ({cases.length})
        </Chip>
        <Chip active={filter === 'mnm'} onClick={() => setFilter('mnm')}>
          <OctagonAlert className="h-3.5 w-3.5" /> Must not miss
        </Chip>
        {modules
          .filter((m) => m.cases.length)
          .map((m) => (
            <Chip key={m.id} active={filter === m.id} onClick={() => setFilter(m.id)}>
              {m.short}
            </Chip>
          ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((c) => {
          const m = moduleById[c.moduleId];
          const r = progress.cases[c.id];
          return (
            <Link key={c.id} to={`/cases/${c.id}`} className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-3 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold leading-snug">{c.title}</h2>
                    {r && (
                      <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-success tabular">
                        <CheckCircle2 className="h-4 w-4" /> {r.score}/{r.total}
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{c.presentation}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', HUE[m.hue].soft, HUE[m.hue].text)}>{m.short}</span>
                    <Badge variant="secondary" className="capitalize">
                      {c.difficulty}
                    </Badge>
                    <Badge variant="secondary">{c.steps.length} steps</Badge>
                    {c.mustNotMiss && (
                      <Badge variant="destructive">
                        <OctagonAlert className="h-3 w-3" /> Must not miss
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors',
        active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-accent'
      )}
    >
      {children}
    </button>
  );
}

export function CaseDetail() {
  const { caseId } = useParams();
  const c = caseId ? caseById[caseId] : undefined;
  const setLastLocation = useAppStore((s) => s.setLastLocation);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (c) setLastLocation(`/cases/${c.id}`, c.title);
  }, [c, setLastLocation]);

  if (!c) return <NotFound what="Case" back="/cases" />;
  return <CaseRunner key={`${c.id}-${attempt}`} caseId={c.id} attempt={attempt} onRetry={() => setAttempt((a) => a + 1)} />;
}

function CaseRunner({ caseId, attempt, onRetry }: { caseId: string; attempt: number; onRetry: () => void }) {
  const c = caseById[caseId];
  const { completeCase, progress } = useAppStore();
  const [results, setResults] = useState<boolean[]>([]);
  const [revealed, setRevealed] = useState(1);
  const answeredCount = results.filter((x) => x !== undefined).length;
  const score = useMemo(() => results.filter(Boolean).length, [results]);
  const finished = answeredCount === c.steps.length;
  const prior = progress.cases[c.id];

  const onAnswered = (i: number, ok: boolean) => {
    const next = [...results];
    next[i] = ok;
    setResults(next);
    if (next.filter((x) => x !== undefined).length === c.steps.length) completeCase(c.id, next.filter(Boolean).length, c.steps.length);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        back={{ to: '/cases', label: 'All cases' }}
        title={c.title}
        eyebrow={
          <>
            <Badge variant="secondary">{moduleById[c.moduleId].short}</Badge>
            <Badge variant="secondary" className="capitalize">
              {c.difficulty}
            </Badge>
            {c.mustNotMiss && (
              <Badge variant="destructive">
                <OctagonAlert className="h-3 w-3" /> Must not miss
              </Badge>
            )}
            {prior && !finished && <Badge variant="success">Best so far {prior.score}/{prior.total}</Badge>}
          </>
        }
        actions={<UnitsToggle />}
      />

      <Card>
        <CardContent className="space-y-5 pt-5">
          <div className="flex gap-3">
            <Stethoscope className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <p className="leading-relaxed">{c.presentation}</p>
          </div>
          <LabTable panels={c.panels} />
        </CardContent>
      </Card>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Step {Math.min(revealed, c.steps.length)} of {c.steps.length}
          </span>
          <span className="font-medium tabular">
            {score}/{answeredCount} correct
          </span>
        </div>
        <ProgressBar value={(100 * answeredCount) / c.steps.length} label="Case progress" />
      </div>

      <div className="space-y-4">
        {c.steps.slice(0, revealed).map((s, i) => (
          <div key={`${attempt}-${s.id}`} className="animate-fade-up">
            <QuestionCard question={s} salt={attempt} label={`Step ${i + 1}`} onAnswered={(ok) => onAnswered(i, ok)} />
            {results[i] !== undefined && i === revealed - 1 && revealed < c.steps.length && (
              <div className="mt-3 flex justify-end">
                <Button onClick={() => setRevealed((r) => r + 1)}>
                  Next step <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {finished && (
        <div className="space-y-5 animate-fade-up">
          <Card className="border-primary/40">
            <CardContent className="space-y-4 pt-5">
              <div className="flex flex-wrap items-center gap-3">
                <Trophy className="h-6 w-6 text-primary" />
                <p className="text-lg font-semibold">
                  {score}/{c.steps.length} correct
                </p>
                <Button variant="outline" size="sm" className="ml-auto" onClick={onRetry}>
                  <RotateCcw className="h-4 w-4" /> Retry case
                </Button>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Diagnosis</p>
                <p className="text-lg font-semibold text-primary">{c.diagnosis}</p>
              </div>
              <p className="leading-relaxed">{c.reasoning}</p>
              <ul className="space-y-1.5">
                {c.takeaways.map((t) => (
                  <li key={t} className="flex gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {t}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <RefList ids={c.refs} />
        </div>
      )}
    </div>
  );
}
