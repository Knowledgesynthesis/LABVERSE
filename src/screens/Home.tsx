import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Flame, FlaskConical, Network, OctagonAlert, Play, Stethoscope, Target } from 'lucide-react';
import { cases, interactives, lessonById, lessons, modules, questions } from '../content';
import useAppStore from '../store';
import { dueQuestionIds, moduleMastery, nextLesson, streak } from '../lib/mastery';
import { HUE, MODULE_ICON } from '../lib/moduleStyle';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Ring } from '../components/ui/ProgressBar';
import { cn } from '../lib/utils';

export function Home() {
  const progress = useAppStore((s) => s.progress);
  const next = nextLesson(progress);
  const due = dueQuestionIds(progress).length;
  const answered = Object.values(progress.questions);
  const accuracy = answered.length ? Math.round((100 * answered.filter((q) => q.lastResult).length) / answered.length) : null;
  const started = Object.keys(progress.lessons).length + answered.length + Object.keys(progress.cases).length > 0;
  const last = progress.lastLocation;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border bg-card p-6 md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/25 to-sky-500/10 blur-3xl" aria-hidden />
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Clinical chemistry, connected</p>
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
          Read any lab panel the way an expert does — and know why.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Evidence-based lessons with built-in retrieval practice, simulators that obey real physiology, stepwise cases, and spaced review that
          brings back what you are about to forget.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {next ? (
            <Link to={`/lessons/${next.id}`}>
              <Button size="lg">
                <Play className="h-4 w-4" />
                {started ? 'Continue' : 'Start'}: {next.title}
              </Button>
            </Link>
          ) : (
            <Link to="/practice">
              <Button size="lg">
                <BrainCircuit className="h-4 w-4" /> Curriculum complete — keep it fresh
              </Button>
            </Link>
          )}
          <Link to="/interactives">
            <Button size="lg" variant="outline">
              <FlaskConical className="h-4 w-4" /> Explore the labs
            </Button>
          </Link>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-5">
          {[
            ['Modules', modules.length],
            ['Lessons', lessons.length],
            ['Questions', questions.length + cases.reduce((a, c) => a + c.steps.length, 0)],
            ['Cases', cases.length],
            ['Simulators', interactives.length],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-2xl font-bold tabular">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {started && (
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 pt-5">
              <BrainCircuit className="h-9 w-9 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Due for review</p>
                <p className="text-2xl font-bold tabular">{due}</p>
              </div>
              <Link to="/practice/review">
                <Button size="sm" disabled={!due}>
                  Review
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-5">
              <Target className="h-9 w-9 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Question accuracy (latest attempt)</p>
                <p className="text-2xl font-bold tabular">{accuracy === null ? '—' : `${accuracy}%`}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-5">
              <Flame className="h-9 w-9 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Day streak</p>
                <p className="text-2xl font-bold tabular">{streak(progress.activeDays)}</p>
              </div>
              {last && (
                <Link to={last.path} className="ml-auto max-w-[45%] truncate text-right text-xs text-primary hover:underline">
                  Resume: {last.title}
                </Link>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold tracking-tight">Modules</h2>
          <Link to="/learn" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            Full curriculum <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = MODULE_ICON[m.id];
            const hue = HUE[m.hue];
            const mm = moduleMastery(m, progress);
            return (
              <Link key={m.id} to={`/modules/${m.id}`} className="group">
                <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <CardContent className="flex h-full flex-col gap-3 pt-5">
                    <div className="flex items-start gap-3">
                      <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', hue.soft)}>
                        <Icon className={cn('h-5 w-5', hue.text)} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold leading-tight">{m.title}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {m.lessons.length} lessons · {m.cases.length} cases · {m.interactives.length} labs
                        </p>
                      </div>
                      <Ring value={mm.mastery} className={hue.ring}>
                        {mm.mastery}
                      </Ring>
                    </div>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                    <p className={cn('mt-auto text-xs font-medium', mm.level === 'Not started' ? 'text-muted-foreground' : hue.text)}>{mm.level}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <QuickLink to="/map" icon={Network} title="Systems Map" text="See how sodium, potassium, acid–base, kidney, liver, minerals and hormones constrain each other." />
        <QuickLink to={`/lessons/must-not-miss`} icon={OctagonAlert} title={lessonById['must-not-miss'].title} text="Fourteen chemistry patterns that need action within the hour." />
        <QuickLink to="/cases" icon={Stethoscope} title="Clinical cases" text="Stepwise cases with immediate feedback — including spurious results that should not be treated." />
      </section>
    </div>
  );
}

function QuickLink({ to, icon: Icon, title, text }: { to: string; icon: typeof Network; title: string; text: string }) {
  return (
    <Link to={to} className="group rounded-lg border bg-card p-5 transition-colors hover:bg-accent/50">
      <Icon className="mb-3 h-6 w-6 text-primary" />
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </Link>
  );
}
