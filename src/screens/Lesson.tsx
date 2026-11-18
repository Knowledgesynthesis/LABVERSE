import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ListChecks, RotateCcw, Target } from 'lucide-react';
import { lessonById, moduleById, orderedLessons } from '../content';
import useAppStore from '../store';
import { HUE } from '../lib/moduleStyle';
import { BlockView } from '../components/lesson/Blocks';
import { RefList } from '../components/RefList';
import { NotFound, PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn, slug } from '../lib/utils';

export function Lesson() {
  const { lessonId } = useParams();
  const lesson = lessonId ? lessonById[lessonId] : undefined;
  const { progress, completeLesson, uncompleteLesson, setLastLocation } = useAppStore();

  useEffect(() => {
    if (lesson) setLastLocation(`/lessons/${lesson.id}`, lesson.title);
  }, [lesson, setLastLocation]);

  if (!lesson) return <NotFound what="Lesson" back="/learn" />;
  const m = moduleById[lesson.moduleId];
  const hue = HUE[m.hue];
  const done = !!progress.lessons[lesson.id];
  const idx = orderedLessons.findIndex((l) => l.id === lesson.id);
  const prev = orderedLessons[idx - 1];
  const next = orderedLessons[idx + 1];
  const headings = lesson.blocks.filter((b) => b.type === 'h') as { type: 'h'; text: string }[];
  const checks = lesson.blocks.filter((b) => b.type === 'check').length;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-10">
      <article className="min-w-0">
        <PageHeader
          back={{ to: `/modules/${m.id}`, label: m.title }}
          title={lesson.title}
          subtitle={lesson.summary}
          eyebrow={
            <>
              <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', hue.soft, hue.text)}>{m.short}</span>
              <Badge variant="secondary">
                <Clock className="h-3 w-3" /> {lesson.minutes} min
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {lesson.bloom}
              </Badge>
              <Badge variant="secondary">
                <ListChecks className="h-3 w-3" /> {checks} checks
              </Badge>
              {done && (
                <Badge variant="success">
                  <CheckCircle2 className="h-3 w-3" /> Completed
                </Badge>
              )}
            </>
          }
        />

        <section className="mb-8 rounded-lg border bg-card p-5">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Target className="h-4 w-4 text-primary" /> You will be able to
          </p>
          <ul className="grid gap-1.5 text-sm sm:grid-cols-2">
            {lesson.objectives.map((o) => (
              <li key={o} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {o}
              </li>
            ))}
          </ul>
        </section>

        <div className="max-w-3xl">
          {lesson.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </div>

        <section className="mt-10 max-w-3xl rounded-lg border border-primary/30 bg-primary/5 p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">Bottom line</h2>
          <ul className="space-y-2">
            {lesson.takeaways.map((t) => (
              <li key={t} className="flex gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 max-w-3xl">
          <RefList ids={lesson.refs} />
        </div>

        <div className="mt-10 flex max-w-3xl flex-wrap items-center gap-3 border-t pt-6">
          {done ? (
            <Button variant="outline" onClick={() => uncompleteLesson(lesson.id)}>
              <RotateCcw className="h-4 w-4" /> Mark as not done
            </Button>
          ) : (
            <Button onClick={() => completeLesson(lesson.id)}>
              <CheckCircle2 className="h-4 w-4" /> Mark complete
            </Button>
          )}
          <div className="ml-auto flex gap-2">
            {prev && (
              <Link to={`/lessons/${prev.id}`}>
                <Button variant="ghost" aria-label={`Previous: ${prev.title}`}>
                  <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Previous</span>
                </Button>
              </Link>
            )}
            {next && (
              <Link to={`/lessons/${next.id}`} onClick={() => !done && completeLesson(lesson.id)}>
                <Button variant="secondary" aria-label={`Next: ${next.title}`}>
                  <span className="max-w-[12rem] truncate">Next: {next.title}</span> <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </article>

      {headings.length > 2 && (
        <nav className="no-print hidden lg:block" aria-label="On this page">
          <div className="sticky top-20 space-y-1 text-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</p>
            {headings.map((hd) => (
              <a key={hd.text} href={`#${slug(hd.text)}`} className="block truncate py-0.5 text-muted-foreground hover:text-foreground">
                {hd.text}
              </a>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
