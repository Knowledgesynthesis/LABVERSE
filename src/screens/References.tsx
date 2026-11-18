import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { cases, lessons, references } from '../content';
import type { Reference } from '../types';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

const KINDS: Array<Reference['kind'] | 'all'> = ['all', 'guideline', 'consensus', 'trial', 'study', 'review', 'standard'];

export function References() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>('all');
  const citedBy = useMemo(() => {
    const map: Record<string, { to: string; title: string }[]> = {};
    lessons.forEach((l) => l.refs.forEach((r) => (map[r] ??= []).push({ to: `/lessons/${l.id}`, title: l.title })));
    cases.forEach((c) => c.refs.forEach((r) => (map[r] ??= []).push({ to: `/cases/${c.id}`, title: `Case: ${c.title}` })));
    return map;
  }, []);
  const list = references.filter((r) => kind === 'all' || r.kind === kind).sort((a, b) => b.year - a.year || a.citation.localeCompare(b.citation));
  const latest = Math.max(...references.map((r) => r.year));

  return (
    <div>
      <PageHeader
        title="Evidence library"
        subtitle={`Every lesson and case is built on these ${references.length} sources — guidelines, consensus statements, trials and laboratory standards (newest: ${latest}). Content reviewed November 2026.`}
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className={cn('rounded-full border px-3 py-1 text-sm capitalize', kind === k ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-accent')}
          >
            {k === 'all' ? `All (${references.length})` : k}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {list.map((r) => (
          <li key={r.id} className="rounded-lg border bg-card p-4">
            <div className="flex flex-wrap items-start gap-3">
              <Badge variant="secondary" className="capitalize">
                {r.kind}
              </Badge>
              <a href={r.url} target="_blank" rel="noreferrer" className="min-w-0 flex-1 text-sm leading-snug hover:text-primary hover:underline">
                {r.citation} <ExternalLink className="inline h-3 w-3" aria-hidden />
              </a>
            </div>
            {citedBy[r.id] && (
              <p className="mt-2 text-xs text-muted-foreground">
                Used in:{' '}
                {citedBy[r.id].map((c, i) => (
                  <span key={c.to}>
                    {i > 0 && ' · '}
                    <Link to={c.to} className="text-primary hover:underline">
                      {c.title}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
