import { Link } from 'react-router-dom';
import { AlertTriangle, BookMarked, FlaskConical, Gem, Info, OctagonAlert, ArrowRight } from 'lucide-react';
import type { Block, CalloutTone } from '../../types';
import { interactiveById, questionById } from '../../content';
import useAppStore from '../../store';
import { cn, slug } from '../../lib/utils';
import { Rich } from '../Rich';
import { QuestionCard } from '../QuestionCard';

const CALLOUT: Record<CalloutTone, { cls: string; icon: typeof Info; label: string }> = {
  pearl: { cls: 'border-violet-500/40 bg-violet-500/5', icon: Gem, label: 'Pearl' },
  pitfall: { cls: 'border-amber-500/50 bg-amber-500/5', icon: AlertTriangle, label: 'Pitfall' },
  danger: { cls: 'border-red-500/50 bg-red-500/5', icon: OctagonAlert, label: 'Must not miss' },
  evidence: { cls: 'border-sky-500/40 bg-sky-500/5', icon: BookMarked, label: 'Evidence' },
  info: { cls: 'border-border bg-muted/40', icon: Info, label: 'Note' },
};

const ICON_COLOR: Record<CalloutTone, string> = {
  pearl: 'text-violet-600 dark:text-violet-400',
  pitfall: 'text-amber-600 dark:text-amber-400',
  danger: 'text-red-600 dark:text-red-400',
  evidence: 'text-sky-600 dark:text-sky-400',
  info: 'text-muted-foreground',
};

export function BlockView({ block }: { block: Block }) {
  const recordAnswer = useAppStore((s) => s.recordAnswer);
  switch (block.type) {
    case 'h':
      return (
        <h2 id={slug(block.text)} className="mt-10 mb-3 scroll-mt-20 text-xl font-bold tracking-tight first:mt-0">
          {block.text}
        </h2>
      );
    case 'h3':
      return <h3 className="mt-6 mb-2 text-base font-semibold">{block.text}</h3>;
    case 'p':
      return (
        <p className="mb-4 leading-relaxed text-foreground/90">
          <Rich text={block.text} />
        </p>
      );
    case 'ul':
    case 'ol': {
      const Tag = block.type === 'ul' ? 'ul' : 'ol';
      return (
        <Tag className={cn('mb-4 space-y-2 pl-5', block.type === 'ul' ? 'list-disc' : 'list-decimal')}>
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed text-foreground/90 marker:text-muted-foreground">
              <Rich text={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case 'table':
      return (
        <figure className="mb-5">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted/60">
                <tr>
                  {block.headers.map((hd, i) => (
                    <th key={i} scope="col" className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                      <Rich text={hd} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="border-t align-top">
                    {row.map((cell, j) => (
                      <td key={j} className={cn('px-3 py-2 leading-snug', j === 0 && 'font-medium')}>
                        <Rich text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-1.5 text-xs text-muted-foreground"><Rich text={block.caption} /></figcaption>}
        </figure>
      );
    case 'formula':
      return (
        <div className="mb-5 rounded-lg border bg-muted/40 p-4">
          <p className="font-mono text-sm leading-relaxed sm:text-[0.95rem]">{block.expr}</p>
          {block.where && (
            <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
              {block.where.map((w, i) => (
                <li key={i}>
                  <Rich text={w} />
                </li>
              ))}
            </ul>
          )}
          {block.note && (
            <p className="mt-2 text-sm text-foreground/80">
              <Rich text={block.note} />
            </p>
          )}
        </div>
      );
    case 'callout': {
      const c = CALLOUT[block.tone];
      const Icon = c.icon;
      return (
        <aside className={cn('mb-5 flex gap-3 rounded-lg border-l-4 border p-4', c.cls)}>
          <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', ICON_COLOR[block.tone])} aria-hidden />
          <div>
            <p className={cn('mb-1 text-xs font-bold uppercase tracking-wide', ICON_COLOR[block.tone])}>{block.title ?? c.label}</p>
            <p className="text-sm leading-relaxed">
              <Rich text={block.text} />
            </p>
          </div>
        </aside>
      );
    }
    case 'steps':
      return (
        <div className="mb-5">
          {block.title && <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{block.title}</p>}
          <ol className="relative space-y-3 border-l-2 border-primary/30 pl-6">
            {block.steps.map((s, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[2.05rem] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="font-semibold leading-snug">
                  <Rich text={s.title} />
                </p>
                {s.detail && (
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground/85">
                    <Rich text={s.detail} />
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      );
    case 'check': {
      const q = questionById[block.id];
      if (!q) return null;
      return (
        <div className="my-6">
          <QuestionCard question={q} label="Check yourself" onAnswered={(ok) => recordAnswer(q.id, ok)} />
        </div>
      );
    }
    case 'lab': {
      const lab = interactiveById[block.id];
      if (!lab) return null;
      return (
        <Link
          to={`/interactives/${lab.id}`}
          className="group mb-5 flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
        >
          <FlaskConical className="h-8 w-8 shrink-0 text-primary" aria-hidden />
          <div className="min-w-0">
            <p className="text-sm font-semibold">Try it: {lab.title}</p>
            <p className="text-sm text-muted-foreground">{block.text}</p>
          </div>
          <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
        </Link>
      );
    }
    default:
      return null;
  }
}
