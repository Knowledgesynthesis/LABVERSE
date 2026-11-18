import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, BookOpen, FlaskConical, Stethoscope, BookMarked, Layers } from 'lucide-react';
import { cases, glossaryTerms, interactives, lessons, modules } from '../../content';
import { cn } from '../../lib/utils';

interface Item {
  kind: 'Lesson' | 'Lab' | 'Case' | 'Term' | 'Module';
  title: string;
  hint: string;
  path: string;
  haystack: string;
}

const ICON = { Lesson: BookOpen, Lab: FlaskConical, Case: Stethoscope, Term: BookMarked, Module: Layers } as const;

function buildIndex(): Item[] {
  const items: Item[] = [];
  modules.forEach((m) => items.push({ kind: 'Module', title: m.title, hint: m.short, path: `/modules/${m.id}`, haystack: `${m.title} ${m.description}` }));
  lessons.forEach((l) =>
    items.push({
      kind: 'Lesson',
      title: l.title,
      hint: l.summary,
      path: `/lessons/${l.id}`,
      haystack: `${l.title} ${l.summary} ${l.blocks.map((b) => (b.type === 'h' || b.type === 'h3' ? b.text : '')).join(' ')} ${l.takeaways.join(' ')}`,
    })
  );
  interactives.forEach((i) => items.push({ kind: 'Lab', title: i.title, hint: i.summary, path: `/interactives/${i.id}`, haystack: `${i.title} ${i.summary} ${i.skills.join(' ')}` }));
  cases.forEach((c) => items.push({ kind: 'Case', title: c.title, hint: c.diagnosis, path: `/cases/${c.id}`, haystack: `${c.title} ${c.presentation}` }));
  glossaryTerms.forEach((g) =>
    items.push({ kind: 'Term', title: g.abbr ? `${g.term} (${g.abbr})` : g.term, hint: g.definition, path: `/glossary?q=${encodeURIComponent(g.term)}`, haystack: `${g.term} ${g.abbr ?? ''} ${g.definition}` })
  );
  return items;
}

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index
      .map((it) => {
        const title = norm(it.title);
        const hay = norm(it.haystack);
        if (!terms.every((t) => hay.includes(t) || title.includes(t))) return null;
        const score = terms.reduce((s, t) => s + (title.startsWith(t) ? 6 : title.includes(t) ? 3 : 1), 0) + (it.kind === 'Term' ? 0.5 : 0);
        return { it, score };
      })
      .filter((x): x is { it: Item; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.it);
  }, [q, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement))) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setQ('');
        setActive(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  const close = () => {
    setOpen(false);
    setQ('');
    setActive(0);
  };

  const go = (it: Item) => {
    close();
    navigate(it.path);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-sm items-center gap-2 rounded-md border bg-card px-3 text-sm text-muted-foreground hover:bg-accent"
        aria-label="Search LabVerse"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Search lessons, labs, terms…</span>
        <span className="sm:hidden">Search</span>
        <kbd className="ml-auto hidden rounded border bg-muted px-1.5 text-[0.65rem] sm:inline">Ctrl K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 p-4 pt-[10vh] backdrop-blur-sm" onClick={close}>
          <div className="w-full max-w-xl overflow-hidden rounded-xl border bg-card shadow-2xl" role="dialog" aria-modal="true" aria-label="Search" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 border-b px-4">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, results.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === 'Enter' && results[active]) go(results[active]);
                }}
                placeholder="e.g. anion gap, biotin, MELD, FENa"
                className="h-12 w-full bg-transparent text-sm outline-none"
                aria-label="Search query"
              />
            </div>
            <ul className="max-h-[60vh] overflow-y-auto p-2" role="listbox">
              {q && !results.length && <li className="p-4 text-sm text-muted-foreground">No matches.</li>}
              {results.map((it, i) => {
                const Icon = ICON[it.kind];
                return (
                  <li key={`${it.kind}-${it.path}`} role="option" aria-selected={i === active}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(it)}
                      className={cn('flex w-full items-start gap-3 rounded-md p-2.5 text-left', i === active && 'bg-accent')}
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{it.title}</p>
                        <p className="line-clamp-1 text-xs text-muted-foreground">{it.hint}</p>
                      </div>
                      <span className="ml-auto shrink-0 text-[0.65rem] uppercase tracking-wide text-muted-foreground">{it.kind}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
