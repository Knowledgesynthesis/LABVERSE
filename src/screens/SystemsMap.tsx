import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { lessonById, mapEdges, mapNodes } from '../content';
import type { MapNode } from '../content/systemsMap';
import { PageHeader } from '../components/PageHeader';
import { cn } from '../lib/utils';

const GROUP_COLOR: Record<MapNode['group'], string> = {
  water: 'fill-sky-500',
  'acid-base': 'fill-violet-500',
  kidney: 'fill-teal-500',
  minerals: 'fill-lime-600',
  liver: 'fill-amber-500',
  endocrine: 'fill-rose-500',
  muscle: 'fill-red-500',
};

const GROUP_LABEL: Record<MapNode['group'], string> = {
  water: 'Water & electrolytes',
  'acid-base': 'Acid–base',
  kidney: 'Kidney',
  minerals: 'Minerals',
  liver: 'Liver & proteins',
  endocrine: 'Endocrine',
  muscle: 'Muscle',
};

export function SystemsMap() {
  const [sel, setSel] = useState<string>('k');
  const byId = useMemo(() => Object.fromEntries(mapNodes.map((n) => [n.id, n])), []);
  const links = mapEdges.filter((e) => e.a === sel || e.b === sel);
  const neighbors = new Set(links.flatMap((e) => [e.a, e.b]));
  const node = byId[sel];

  return (
    <div>
      <PageHeader
        title="Systems map"
        subtitle="Lab values are not independent. Select an analyte to see what it constrains and what constrains it — every link is a mechanism you can use at the bedside."
      />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-xl border bg-card p-2">
          <svg viewBox="0 0 1000 700" className="h-auto w-full" role="img" aria-label="Network of laboratory analytes and their physiological links">
            {mapEdges.map((e, i) => {
              const a = byId[e.a];
              const b = byId[e.b];
              const on = e.a === sel || e.b === sel;
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={cn('transition-all', on ? 'stroke-primary' : 'stroke-border')}
                  strokeWidth={on ? 3 : 1.5}
                  strokeOpacity={on ? 0.95 : 0.7}
                />
              );
            })}
            {mapNodes.map((n) => {
              const active = n.id === sel;
              const near = neighbors.has(n.id);
              return (
                <g
                  key={n.id}
                  role="button"
                  tabIndex={0}
                  aria-label={n.name}
                  aria-pressed={active}
                  onClick={() => setSel(n.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSel(n.id))}
                  className="cursor-pointer outline-none"
                  opacity={active || near || !sel ? 1 : 0.35}
                >
                  <circle cx={n.x} cy={n.y} r={active ? 38 : 32} className={cn(GROUP_COLOR[n.group], 'transition-all')} fillOpacity={active ? 1 : 0.85} />
                  {active && <circle cx={n.x} cy={n.y} r={46} fill="none" className="stroke-primary" strokeWidth={3} />}
                  <text x={n.x} y={n.y + 6} textAnchor="middle" className="pointer-events-none fill-white text-[17px] font-bold">
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="flex flex-wrap gap-3 px-3 pb-2 text-xs text-muted-foreground">
            {Object.entries(GROUP_LABEL).map(([g, label]) => (
              <span key={g} className="inline-flex items-center gap-1.5">
                <svg width="10" height="10" aria-hidden>
                  <circle cx="5" cy="5" r="5" className={GROUP_COLOR[g as MapNode['group']]} />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
        <aside className="rounded-xl border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{GROUP_LABEL[node.group]}</p>
          <h2 className="text-xl font-bold">{node.name}</h2>
          <p className="mb-4 text-sm text-muted-foreground">{links.length} connections</p>
          <ul className="space-y-3">
            {links.map((e, i) => {
              const other = byId[e.a === sel ? e.b : e.a];
              return (
                <li key={i} className="rounded-lg border p-3 text-sm">
                  <button type="button" onClick={() => setSel(other.id)} className="mb-1 font-semibold text-primary hover:underline">
                    ↔ {other.name}
                  </button>
                  <p className="leading-snug">{e.text}</p>
                  <Link to={`/lessons/${e.lessonId}`} className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                    {lessonById[e.lessonId].title} <ArrowRight className="h-3 w-3" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
