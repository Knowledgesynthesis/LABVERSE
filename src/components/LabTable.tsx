import type { CasePanel } from '../types';
import useAppStore from '../store';
import { SI, toSI } from '../lib/units';
import { cn } from '../lib/utils';

function fmt(v: number, dp?: number) {
  if (dp !== undefined) return v.toFixed(dp);
  return Number.isInteger(v) ? v.toLocaleString() : String(v);
}

export function LabTable({ panels }: { panels: CasePanel[] }) {
  const units = useAppStore((s) => s.settings.units);
  return (
    <div className="space-y-4">
      {panels.map((panel) => (
        <div key={panel.title}>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{panel.title}</p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Test</th>
                  <th className="px-3 py-2 font-medium">Result</th>
                  <th className="px-3 py-2 font-medium">Reference</th>
                </tr>
              </thead>
              <tbody>
                {panel.labs.map((lab) => {
                  const numeric = typeof lab.value === 'number';
                  const flag =
                    numeric && lab.low !== undefined && (lab.value as number) < lab.low
                      ? 'L'
                      : numeric && lab.high !== undefined && (lab.value as number) > lab.high
                        ? 'H'
                        : '';
                  const useSI = units === 'si' && lab.analyte && numeric;
                  const si = useSI ? SI[lab.analyte!] : undefined;
                  const value = useSI ? fmt(toSI(lab.analyte!, lab.value as number), si!.dp) : numeric ? fmt(lab.value as number) : String(lab.value);
                  const unit = useSI ? si!.unit : lab.unit;
                  const range =
                    lab.refText ??
                    (lab.low !== undefined && lab.high !== undefined
                      ? useSI
                        ? `${fmt(toSI(lab.analyte!, lab.low), si!.dp)}–${fmt(toSI(lab.analyte!, lab.high), si!.dp)}`
                        : `${fmt(lab.low)}–${fmt(lab.high)}`
                      : '—');
                  return (
                    <tr key={lab.name} className="border-t">
                      <td className="px-3 py-2">
                        {lab.name}
                        {lab.note && <span className="block text-xs text-muted-foreground">{lab.note}</span>}
                      </td>
                      <td className={cn('px-3 py-2 font-semibold tabular whitespace-nowrap', flag && 'text-destructive')}>
                        {value} <span className="font-normal text-muted-foreground">{unit}</span>
                        {flag && <span className="ml-1.5 rounded bg-destructive/15 px-1 text-[0.65rem] font-bold">{flag}</span>}
                      </td>
                      <td className="px-3 py-2 text-xs text-muted-foreground tabular whitespace-nowrap">{range}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export function UnitsToggle() {
  const { settings, updateSettings } = useAppStore();
  return (
    <div className="inline-flex rounded-md border p-0.5 text-xs" role="group" aria-label="Units">
      {(['conventional', 'si'] as const).map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => updateSettings({ units: u })}
          aria-pressed={settings.units === u}
          className={cn('rounded px-2.5 py-1 font-medium', settings.units === u ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
        >
          {u === 'si' ? 'SI units' : 'Conventional'}
        </button>
      ))}
    </div>
  );
}
