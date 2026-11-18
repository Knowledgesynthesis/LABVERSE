import { useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Lightbulb } from 'lucide-react';
import { interactiveById, lessonById, moduleById } from '../content';
import useAppStore from '../store';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

export function LabShell({
  id,
  children,
  insights,
  lessons = [],
  actions,
}: {
  id: string;
  children: React.ReactNode;
  insights?: string[];
  lessons?: string[];
  actions?: React.ReactNode;
}) {
  const meta = interactiveById[id];
  const { visitLab, setLastLocation } = useAppStore();
  useEffect(() => {
    visitLab(id);
    setLastLocation(`/interactives/${id}`, meta.title);
  }, [id, meta.title, visitLab, setLastLocation]);
  return (
    <div className="space-y-6">
      <PageHeader
        back={{ to: '/interactives', label: 'Interactive labs' }}
        title={meta.title}
        subtitle={meta.summary}
        eyebrow={
          <>
            <Badge variant="secondary">{moduleById[meta.moduleId].short}</Badge>
            {meta.skills.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </>
        }
        actions={actions}
      />
      {children}
      {(insights?.length || lessons.length) && (
        <div className="grid gap-4 md:grid-cols-2">
          {insights && insights.length > 0 && (
            <section className="rounded-lg border bg-card p-5">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Lightbulb className="h-4 w-4 text-amber-500" /> What to notice
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {insights.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {lessons.length > 0 && (
            <section className="rounded-lg border bg-card p-5">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <GraduationCap className="h-4 w-4 text-primary" /> Learn the theory
              </p>
              <ul className="space-y-1.5 text-sm">
                {lessons.map((l) => (
                  <li key={l}>
                    <Link to={`/lessons/${l}`} className="text-primary hover:underline">
                      {lessonById[l]?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  normal,
  onChange,
  dp,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  normal?: [number, number];
  onChange: (v: number) => void;
  dp?: number;
  hint?: string;
}) {
  const id = useId();
  const decimals = dp ?? (step < 0.1 ? 2 : step < 1 ? 1 : 0);
  const abnormal = normal && (value < normal[0] || value > normal[1]);
  const pct = (x: number) => ((x - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <label htmlFor={id} className="min-w-0 text-sm font-medium">
          {label}
        </label>
        <div className="ml-auto flex min-w-0 items-center gap-1">
          <input
            type="number"
            aria-label={`${label} value`}
            value={Number(value.toFixed(decimals))}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
            }}
            className={cn('w-[4.75rem] rounded border bg-card px-1.5 py-0.5 text-right text-sm font-semibold tabular', abnormal ? 'text-destructive' : 'text-foreground')}
          />
          {unit && <span className="whitespace-nowrap text-xs text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <div className="relative">
        {normal && (
          <div
            className="pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 rounded bg-success/25"
            style={{ left: `${pct(Math.max(min, normal[0]))}%`, width: `${pct(Math.min(max, normal[1])) - pct(Math.max(min, normal[0]))}%` }}
            aria-hidden
          />
        )}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full cursor-pointer"
        />
      </div>
      {(normal || hint) && (
        <p className="text-xs text-muted-foreground">
          {normal && `Reference ${normal[0]}–${normal[1]}${unit ? ' ' + unit : ''}`}
          {normal && hint && ' · '}
          {hint}
        </p>
      )}
    </div>
  );
}

export function Readout({
  label,
  value,
  unit,
  status = 'neutral',
  note,
  big,
}: {
  label: string;
  value: string;
  unit?: string;
  status?: 'ok' | 'warn' | 'alert' | 'neutral';
  note?: React.ReactNode;
  big?: boolean;
}) {
  const color = { ok: 'text-success', warn: 'text-warning', alert: 'text-destructive', neutral: 'text-foreground' }[status];
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn('font-bold tabular', big ? 'text-3xl' : 'text-xl', color)}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-muted-foreground">{unit}</span>}
      </p>
      {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

export function Presets<T>({ presets, onPick, active }: { presets: { label: string; values: T; note?: string }[]; onPick: (v: T, label: string) => void; active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((p) => (
        <button
          key={p.label}
          type="button"
          title={p.note}
          onClick={() => onPick(p.values, p.label)}
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            active === p.label ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-accent'
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export function Panel({ title, children, className, right }: { title: string; children: React.ReactNode; className?: string; right?: React.ReactNode }) {
  return (
    <section className={cn('rounded-xl border bg-card p-5', className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

export function Toggle<T extends string>({ value, options, onChange, label }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div className="inline-flex flex-wrap rounded-md border p-0.5" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn('rounded px-2.5 py-1 text-xs font-medium', value === o.value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
