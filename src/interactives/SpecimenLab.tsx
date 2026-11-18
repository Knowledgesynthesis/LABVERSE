import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Search, Shuffle, XCircle } from 'lucide-react';
import {
  ANALYTES,
  applyArtifacts,
  BASE_PANELS,
  detectClues,
  flag,
  FLUIDS,
  NO_ARTIFACTS,
  type AnalyteId,
  type Artifacts,
  type FluidId,
} from '../lib/clinical/specimen';
import { mulberry32 } from '../lib/clinical/qc';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { LabShell, Panel, Slider, Toggle } from './shared';

const MYSTERIES: { id: string; label: string; make: (r: () => number) => Partial<Artifacts> }[] = [
  { id: 'hemolysis', label: 'In vitro hemolysis', make: (r) => ({ hemolysisGL: 2 + Math.round(r() * 4) }) },
  { id: 'edta', label: 'K₂EDTA contamination', make: (r) => ({ edtaFraction: 0.15 + r() * 0.15 }) },
  { id: 'saline', label: 'Saline drip-arm contamination', make: (r) => ({ fluid: 'ns', fluidFraction: 0.15 + r() * 0.2 }) },
  { id: 'dextrose', label: 'Dextrose drip-arm contamination', make: (r) => ({ fluid: 'd5w', fluidFraction: 0.1 + r() * 0.15 }) },
  { id: 'delay', label: 'Delayed processing (room temp)', make: (r) => ({ delayHours: 6 + Math.round(r() * 10), storage: 'room' }) },
  { id: 'fridge', label: 'Refrigerated unspun blood', make: (r) => ({ delayHours: 5 + Math.round(r() * 6), storage: 'fridge' }) },
  { id: 'lipemia', label: 'Lipemia on indirect ISE', make: (r) => ({ triglycerides: 4000 + Math.round(r() * 2000) }) },
  { id: 'biotin', label: 'Biotin interference', make: (r) => ({ biotinMg: 100 + Math.round(r() * 200) }) },
];

const ORDER: AnalyteId[] = ['na', 'k', 'cl', 'hco3', 'glucose', 'bun', 'cr', 'ca', 'mg', 'phos', 'alp', 'ast', 'ld', 'tsh', 'ft4'];

function ResultTable({ truth, reported, hideTruth }: { truth: Record<AnalyteId, number>; reported: Record<AnalyteId, number>; hideTruth?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
          <tr>
            <th className="px-3 py-2 font-medium">Analyte</th>
            <th className="px-3 py-2 font-medium">{hideTruth ? 'Previous result' : 'True value'}</th>
            <th className="px-3 py-2 font-medium">Reported</th>
            <th className="px-3 py-2 font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          {ORDER.map((id) => {
            const a = ANALYTES[id];
            const t = truth[id];
            const v = reported[id];
            const f = flag(id, v);
            const pct = t ? ((v - t) / t) * 100 : 0;
            const big = Math.abs(pct) >= 10;
            return (
              <tr key={id} className="border-t">
                <td className="px-3 py-1.5">
                  {a.label} <span className="text-xs text-muted-foreground">{a.unit}</span>
                </td>
                <td className="px-3 py-1.5 tabular text-muted-foreground">{t.toFixed(a.dp)}</td>
                <td className={cn('px-3 py-1.5 font-semibold tabular', f && 'text-destructive')}>
                  {v.toFixed(a.dp)} {f && <span className="ml-1 rounded bg-destructive/15 px-1 text-[0.65rem]">{f}</span>}
                </td>
                <td className={cn('px-3 py-1.5 tabular text-xs', big ? 'font-semibold text-warning' : 'text-muted-foreground')}>
                  {Math.abs(pct) < 0.5 ? '—' : `${pct > 0 ? '+' : ''}${pct.toFixed(0)}%`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function SpecimenLab() {
  const [mode, setMode] = useState<'build' | 'mystery'>('build');
  const [base, setBase] = useState<keyof typeof BASE_PANELS>('healthy');
  const [a, setA] = useState<Artifacts>(NO_ARTIFACTS);
  const set = <K extends keyof Artifacts>(k: K) => (v: Artifacts[K]) => setA((x) => ({ ...x, [k]: v }));
  const truth = BASE_PANELS[base].panel;
  const reported = useMemo(() => applyArtifacts(truth, a), [truth, a]);
  const clues = useMemo(() => detectClues(reported, truth, a), [reported, truth, a]);

  // mystery
  const [seed, setSeed] = useState(1);
  const [guess, setGuess] = useState<string | null>(null);
  const [tally, setTally] = useState({ right: 0, total: 0 });
  const mystery = useMemo(() => {
    const r = mulberry32(seed * 9973);
    const m = MYSTERIES[Math.floor(r() * MYSTERIES.length)];
    const panelKey = r() > 0.5 ? 'healthy' : 'ckd';
    const art = { ...NO_ARTIFACTS, ...m.make(r) };
    return { m, panelKey: panelKey as keyof typeof BASE_PANELS, art, rep: applyArtifacts(BASE_PANELS[panelKey].panel, art) };
  }, [seed]);

  return (
    <LabShell
      id="analyzer-error"
      lessons={['error-types', 'hemolysis-interference', 'potassium-disorders']}
      insights={[
        'Contamination is pure arithmetic: every analyte moves toward the composition of the contaminant in proportion to the fraction.',
        'EDTA raises K⁺ while chelating Ca²⁺ and Mg²⁺ — a combination no living patient produces.',
        'Pseudohyponatremia appears only with the indirect ISE method; switch to direct ISE and it vanishes.',
        'Delta checks against the previous result are the laboratory\'s best automated defence.',
      ]}
      actions={
        <Toggle
          label="Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'build', label: 'Build an artifact' },
            { value: 'mystery', label: 'Mystery specimen' },
          ]}
        />
      }
    >
      {mode === 'build' ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <Panel
            title="Artifacts"
            right={
              <Button size="sm" variant="ghost" onClick={() => setA(NO_ARTIFACTS)}>
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </Button>
            }
          >
            <div className="space-y-4">
              <Toggle label="Patient" value={base} onChange={setBase} options={Object.entries(BASE_PANELS).map(([k, v]) => ({ value: k as keyof typeof BASE_PANELS, label: v.label }))} />
              <Slider label="Hemolysis (free Hb)" unit="g/L" value={a.hemolysisGL} min={0} max={10} step={0.5} dp={1} onChange={set('hemolysisGL')} />
              <Slider label="K₂EDTA carry-over" unit="fraction" value={a.edtaFraction} min={0} max={0.3} step={0.01} dp={2} onChange={set('edtaFraction')} />
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="fluid">
                  Drip-arm contamination
                </label>
                <select id="fluid" value={a.fluid} onChange={(e) => set('fluid')(e.target.value as FluidId)} className="block w-full rounded-md border bg-card px-2 py-1.5 text-sm">
                  {Object.entries(FLUIDS).map(([k, f]) => (
                    <option key={k} value={k}>
                      {f.label}
                    </option>
                  ))}
                </select>
                {a.fluid !== 'none' && <Slider label="Fraction of sample that is fluid" unit="fraction" value={a.fluidFraction} min={0} max={0.5} step={0.01} dp={2} onChange={set('fluidFraction')} />}
              </div>
              <Slider label="Delay before separation" unit="h" value={a.delayHours} min={0} max={24} step={1} onChange={set('delayHours')} />
              {a.delayHours > 0 && <Toggle label="Storage" value={a.storage} onChange={set('storage')} options={[{ value: 'room', label: 'Room temp' }, { value: 'fridge', label: 'Refrigerated' }]} />}
              <Slider label="Platelets" unit="×10⁹/L" value={a.platelets} min={150} max={1500} step={50} onChange={set('platelets')} />
              <Slider label="Triglycerides" unit="mg/dL" value={a.triglycerides} min={50} max={6000} step={50} onChange={set('triglycerides')} />
              <Slider label="Total protein" unit="g/dL" value={a.totalProtein} min={5} max={14} step={0.2} dp={1} onChange={set('totalProtein')} />
              <Toggle label="Na⁺ method" value={a.method} onChange={set('method')} options={[{ value: 'indirect', label: 'Indirect ISE (chemistry)' }, { value: 'direct', label: 'Direct ISE (blood gas)' }]} />
              <Slider label="Biotin dose (last 8 h)" unit="mg" value={a.biotinMg} min={0} max={300} step={5} onChange={set('biotinMg')} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={a.fistClench} onChange={(e) => set('fistClench')(e.target.checked)} /> Fist clenching / prolonged tourniquet
              </label>
            </div>
          </Panel>
          <div className="space-y-5">
            <Panel title="What the laboratory reports">
              <ResultTable truth={truth} reported={reported} />
              <p className="mt-2 text-xs text-muted-foreground">Mixing and ISE effects are mass-balance calculations; hemolysis, storage, platelet and biotin magnitudes are illustrative and analyzer-specific.</p>
            </Panel>
            <Panel title="What an expert notices">
              {clues.length === 0 ? (
                <p className="text-sm text-muted-foreground">No artifact signatures — the specimen looks trustworthy.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {clues.map((c) => (
                    <li key={c} className="flex gap-2 rounded-md border-l-4 border-warning bg-warning/5 p-3">
                      <Search className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Panel title={`Mystery specimen — ${BASE_PANELS[mystery.panelKey].label}`} right={<span className="text-sm font-semibold tabular">{tally.right}/{tally.total}</span>}>
            <ResultTable truth={BASE_PANELS[mystery.panelKey].panel} reported={mystery.rep} hideTruth />
          </Panel>
          <Panel title="What happened to this sample?">
            <div className="space-y-2">
              {MYSTERIES.map((m) => {
                const isAns = m.id === mystery.m.id;
                const chosen = guess === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={!!guess}
                    onClick={() => {
                      setGuess(m.id);
                      setTally((t) => ({ right: t.right + (isAns ? 1 : 0), total: t.total + 1 }));
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md border p-2.5 text-left text-sm',
                      !guess && 'hover:bg-accent',
                      guess && isAns && 'border-success bg-success/10',
                      guess && chosen && !isAns && 'border-destructive bg-destructive/10'
                    )}
                  >
                    {guess && isAns && <CheckCircle2 className="h-4 w-4 text-success" />}
                    {guess && chosen && !isAns && <XCircle className="h-4 w-4 text-destructive" />}
                    {m.label}
                  </button>
                );
              })}
            </div>
            {guess && (
              <div className="mt-4 space-y-3">
                <ul className="space-y-1.5 text-sm">
                  {detectClues(mystery.rep, BASE_PANELS[mystery.panelKey].panel, mystery.art).map((c) => (
                    <li key={c} className="rounded-md bg-muted/50 p-2">
                      {c}
                    </li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  onClick={() => {
                    setSeed((s) => s + 1);
                    setGuess(null);
                  }}
                >
                  <Shuffle className="h-4 w-4" /> Next specimen
                </Button>
              </div>
            )}
          </Panel>
        </div>
      )}
    </LabShell>
  );
}
