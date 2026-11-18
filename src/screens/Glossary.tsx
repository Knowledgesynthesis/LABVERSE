import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { glossaryTerms, lessonById } from '../content';
import { PageHeader } from '../components/PageHeader';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/utils';

export function Glossary() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [cat, setCat] = useState<string>('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(glossaryTerms.map((t) => t.category)))], []);
  const byId = useMemo(() => Object.fromEntries(glossaryTerms.map((t) => [t.id, t])), []);
  const needle = q.trim().toLowerCase();
  const list = glossaryTerms
    .filter((t) => cat === 'All' || t.category === cat)
    .filter((t) => !needle || `${t.term} ${t.abbr ?? ''} ${t.definition} ${t.clinical ?? ''}`.toLowerCase().includes(needle))
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div>
      <PageHeader title="Glossary" subtitle={`${glossaryTerms.length} terms, each with the clinical point that matters and a link to the lesson that teaches it.`} />
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search terms, abbreviations, definitions…"
          className="pl-9"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setParams(e.target.value ? { q: e.target.value } : {}, { replace: true });
          }}
          aria-label="Search glossary"
        />
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={cn('rounded-full border px-3 py-1 text-sm', cat === c ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-accent')}
          >
            {c}
          </button>
        ))}
      </div>
      {list.length === 0 && <p className="text-muted-foreground">No terms match.</p>}
      <dl className="grid gap-3 md:grid-cols-2">
        {list.map((t) => (
          <div key={t.id} id={t.id} className="rounded-lg border bg-card p-4">
            <dt className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold">{t.term}</span>
              {t.abbr && <span className="text-sm text-muted-foreground">{t.abbr}</span>}
              <span className="ml-auto text-[0.65rem] uppercase tracking-wide text-muted-foreground">{t.category}</span>
            </dt>
            <dd className="mt-2 space-y-2 text-sm">
              <p>{t.definition}</p>
              {t.clinical && <p className="text-muted-foreground">{t.clinical}</p>}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {t.related.map((r) =>
                  byId[r] ? (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setCat('All');
                        setQ(byId[r].term);
                      }}
                      className="rounded-full bg-secondary px-2 py-0.5 text-xs hover:bg-accent"
                    >
                      {byId[r].abbr ?? byId[r].term}
                    </button>
                  ) : null
                )}
                {t.lessonId && (
                  <Link to={`/lessons/${t.lessonId}`} className="ml-auto inline-flex items-center gap-1 text-xs text-primary hover:underline">
                    {lessonById[t.lessonId].title} <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
