import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, BrainCircuit, CalendarClock, GraduationCap, RotateCcw, Shuffle, Timer, Trophy } from 'lucide-react';
import { lessonForQuestion, moduleById, modules, questionById, questions, questionsForModule } from '../content';
import type { ModuleId, Question } from '../types';
import useAppStore, { BOX_INTERVAL_DAYS } from '../store';
import { dueQuestionIds, moduleMastery } from '../lib/mastery';
import { shuffle } from '../lib/quiz';
import { HUE, MODULE_ICON } from '../lib/moduleStyle';
import { NotFound, PageHeader } from '../components/PageHeader';
import { QuestionCard } from '../components/QuestionCard';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { cn } from '../lib/utils';

export function PracticeHub() {
  const progress = useAppStore((s) => s.progress);
  const due = dueQuestionIds(progress);
  const seen = Object.keys(progress.questions).length;
  const weak = Object.entries(progress.questions).filter(([, s]) => !s.lastResult).length;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Practice & review"
        subtitle="Retrieval practice with spaced repetition: questions you miss return immediately, questions you get right come back after 1, 3, 7, 16 and 35 days."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <ModeCard
          to="/practice/review"
          icon={CalendarClock}
          title="Spaced review"
          text={due.length ? `${due.length} question${due.length === 1 ? '' : 's'} due now.` : seen ? 'Nothing due — come back later.' : 'Answer some questions first; they will be scheduled here.'}
          disabled={!due.length}
          cta="Start review"
        />
        <ModeCard to="/practice/mixed" icon={Shuffle} title="Mixed exam (20)" text="Twenty questions drawn across all modules, like a real exam block." cta="Start exam" />
        <ModeCard
          to="/practice/weak"
          icon={RotateCcw}
          title="Weak spots"
          text={weak ? `${weak} question${weak === 1 ? '' : 's'} you last answered incorrectly.` : 'No weak spots recorded yet.'}
          disabled={!weak}
          cta="Drill weak spots"
        />
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Module quizzes</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = MODULE_ICON[m.id];
            const mm = moduleMastery(m, progress);
            return (
              <Link key={m.id} to={`/practice/module/${m.id}`} className="flex items-center gap-3 rounded-lg border bg-card p-4 hover:bg-accent/40">
                <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', HUE[m.hue].soft)}>
                  <Icon className={cn('h-4 w-4', HUE[m.hue].text)} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-muted-foreground tabular">
                    {mm.questionsCorrect}/{mm.questionsTotal} correct
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border bg-card p-5 text-sm">
        <p className="mb-2 flex items-center gap-2 font-semibold">
          <BrainCircuit className="h-4 w-4 text-primary" /> Why this works
        </p>
        <p className="text-muted-foreground">
          Testing yourself (retrieval practice) and spacing reviews over time produce far more durable learning than re-reading — two of the
          best-replicated findings in learning science. Options are shuffled on every attempt so you learn the content, not the letter.
        </p>
      </section>
    </div>
  );
}

function ModeCard({ to, icon: Icon, title, text, cta, disabled }: { to: string; icon: typeof Timer; title: string; text: string; cta: string; disabled?: boolean }) {
  return (
    <Card>
      <CardContent className="flex h-full flex-col gap-3 pt-5">
        <Icon className="h-7 w-7 text-primary" />
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
        <Link to={disabled ? '#' : to} className="mt-auto" aria-disabled={disabled} onClick={(e) => disabled && e.preventDefault()}>
          <Button size="sm" disabled={disabled}>
            {cta}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export function QuizSession() {
  const params = useParams();
  const moduleId = params.moduleId;
  const mode = moduleId ? 'module' : params.mode;
  const navigate = useNavigate();
  const { progress, recordAnswer, recordSession } = useAppStore();
  const [seed] = useState(() => Date.now() % 100000);

  const pool: Question[] = useMemo(() => {
    if (mode === 'module' && moduleId) return shuffle(questionsForModule(moduleId as ModuleId), seed);
    if (mode === 'review') return dueQuestionIds(progress).map((id) => questionById[id]).filter(Boolean).slice(0, 25);
    if (mode === 'weak')
      return shuffle(
        Object.entries(progress.questions)
          .filter(([, s]) => !s.lastResult)
          .map(([id]) => questionById[id])
          .filter(Boolean),
        seed
      ).slice(0, 25);
    if (mode === 'mixed') return shuffle(questions, seed).slice(0, 20);
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps -- freeze the pool for the session
  }, [mode, moduleId, seed]);

  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  if (mode === 'module' && !moduleById[moduleId as ModuleId]) return <NotFound what="Module" back="/practice" />;
  const title =
    mode === 'module' ? `${moduleById[moduleId as ModuleId].title} quiz` : mode === 'review' ? 'Spaced review' : mode === 'weak' ? 'Weak spots' : 'Mixed exam';

  if (!pool.length)
    return (
      <div>
        <PageHeader back={{ to: '/practice', label: 'Practice' }} title={title} />
        <p className="text-muted-foreground">Nothing to practice here right now.</p>
      </div>
    );

  const done = Object.keys(answers).length === pool.length && i >= pool.length - 1 && answers[pool[pool.length - 1].id] !== undefined;
  const correct = Object.values(answers).filter(Boolean).length;
  const q = pool[i];

  const finish = () => {
    if (!saved) {
      recordSession({ mode: mode ?? 'mixed', moduleId: mode === 'module' ? (moduleId as ModuleId) : undefined, score: correct, total: pool.length });
      setSaved(true);
    }
    setI(pool.length);
  };

  if (i >= pool.length) {
    const missed = pool.filter((p) => !answers[p.id]);
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeader back={{ to: '/practice', label: 'Practice' }} title={`${title} — results`} />
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 pt-5">
            <Trophy className="h-10 w-10 text-primary" />
            <div>
              <p className="text-3xl font-bold tabular">{Math.round((100 * correct) / pool.length)}%</p>
              <p className="text-sm text-muted-foreground tabular">
                {correct} of {pool.length} correct
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" onClick={() => navigate(0)}>
                <RotateCcw className="h-4 w-4" /> New set
              </Button>
              <Link to="/practice">
                <Button>Done</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        {missed.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold">Revisit</h2>
            <ul className="space-y-2">
              {missed.map((m) => {
                const l = lessonForQuestion(m.id);
                return (
                  <li key={m.id} className="rounded-lg border bg-card p-4 text-sm">
                    <p className="mb-1">{m.stem}</p>
                    {l && (
                      <Link to={`/lessons/${l.id}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                        <GraduationCap className="h-3.5 w-3.5" /> {l.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Missed questions are back in your review queue now; correct ones return in {BOX_INTERVAL_DAYS[1]}–{BOX_INTERVAL_DAYS[5]} days.</p>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <PageHeader back={{ to: '/practice', label: 'Practice' }} title={title} />
      <div>
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-muted-foreground tabular">
            Question {i + 1} of {pool.length}
          </span>
          <span className="font-medium tabular">{correct} correct</span>
        </div>
        <ProgressBar value={(100 * Object.keys(answers).length) / pool.length} label="Quiz progress" />
      </div>
      <QuestionCard
        key={`${q.id}-${seed}`}
        question={q}
        salt={seed}
        label={moduleById[q.moduleId].short}
        onAnswered={(ok) => {
          recordAnswer(q.id, ok);
          setAnswers((a) => ({ ...a, [q.id]: ok }));
        }}
      />
      {answers[q.id] !== undefined && (
        <div className="flex justify-end">
          {i < pool.length - 1 ? (
            <Button onClick={() => setI(i + 1)}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={finish}>{done ? 'See results' : 'Finish'}</Button>
          )}
        </div>
      )}
    </div>
  );
}
