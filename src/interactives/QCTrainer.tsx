import { useMemo, useState } from 'react';
import { CartesianGrid, Line, ReferenceLine, ResponsiveContainer, Scatter, ComposedChart, Tooltip, XAxis, YAxis } from 'recharts';
import { CheckCircle2, Shuffle, XCircle } from 'lucide-react';
import { evaluateWestgard, firstRejection, generateRuns, rcv, RULES, sigmaMetric, sigmaRecommendation, type ErrorScenario } from '../lib/clinical/qc';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { LabShell, Panel, Readout, Slider, Toggle } from './shared';

const SCENARIOS: { value: ErrorScenario; label: string }[] = [
  { value: 'none', label: 'In control' },
  { value: 'shift', label: 'Systematic shift' },
  { value: 'trend', label: 'Trend / drift' },
  { value: 'imprecision', label: 'Increased imprecision' },
  { value: 'outlier', label: 'Single outlier' },
];

function LJChart({ runs, level, violations }: { runs: { run: number; z: [number, number] }[]; level: 0 | 1; violations: Set<number> }) {
  const data = runs.map((r) => ({ run: r.run, z: r.z[level], bad: violations.has(r.run) ? r.z[level] : null }));
  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 6, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="run" tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} />
          <YAxis domain={[-4.5, 4.5]} ticks={[-3, -2, -1, 0, 1, 2, 3]} tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} tickFormatter={(v) => (v === 0 ? 'x̄' : `${v > 0 ? '+' : ''}${v}s`)} />
          {[-3, 3].map((y) => (
            <ReferenceLine key={y} y={y} stroke="var(--color-destructive)" strokeDasharray="4 3" />
          ))}
          {[-2, 2].map((y) => (
            <ReferenceLine key={y} y={y} stroke="#f59e0b" strokeDasharray="4 3" />
          ))}
          {[-1, 1].map((y) => (
            <ReferenceLine key={y} y={y} stroke="var(--color-border)" />
          ))}
          <ReferenceLine y={0} stroke="var(--color-muted-foreground)" />
          <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', fontSize: 12 }} formatter={(v) => [`${Number(v).toFixed(2)} SD`, 'z']} labelFormatter={(r) => `Run ${r}`} />
          <Line type="linear" dataKey="z" stroke="var(--color-primary)" strokeWidth={1.5} dot={{ r: 3 }} isAnimationActive={false} />
          <Scatter dataKey="bad" fill="var(--color-destructive)" shape="circle" isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function QCTrainer() {
  const [scenario, setScenario] = useState<ErrorScenario>('shift');
  const [magnitude, setMagnitude] = useState(2.5);
  const [start, setStart] = useState(12);
  const [seed, setSeed] = useState(7);
  const runs = useMemo(() => generateRuns(seed, 25, scenario, scenario === 'imprecision' ? Math.max(1, magnitude) : magnitude, start), [seed, scenario, magnitude, start]);
  const violations = useMemo(() => evaluateWestgard(runs), [runs]);
  const rejectRuns = new Set(violations.filter((v) => RULES[v.rule].reject).map((v) => v.run));
  const first = firstRejection(violations);

  // Sigma & RCV
  const [tea, setTea] = useState(10);
  const [bias, setBias] = useState(2);
  const [cv, setCv] = useState(2);
  const sigma = sigmaMetric(tea, bias, cv);
  const [cva, setCva] = useState(3);
  const [cvi, setCvi] = useState(4.5);
  const rcvValue = rcv(cva, cvi);

  // Quiz
  const [qSeed, setQSeed] = useState(101);
  const [answer, setAnswer] = useState<string | null>(null);
  const [tally, setTally] = useState({ right: 0, total: 0 });
  const quiz = useMemo(() => {
    const opts: ErrorScenario[] = ['none', 'shift', 'imprecision', 'trend'];
    const sc = opts[qSeed % opts.length];
    const qr = generateRuns(qSeed, 20, sc, sc === 'imprecision' ? 2.2 : sc === 'trend' ? 3 : 2.5, 8);
    const v = evaluateWestgard(qr);
    const rej = v.filter((x) => RULES[x.rule].reject);
    const truth = rej.length === 0 ? 'accept' : rej.some((x) => RULES[x.rule].error === 'systematic') ? 'systematic' : 'random';
    return { qr, v, truth, set: new Set(rej.map((x) => x.run)) };
  }, [qSeed]);

  return (
    <LabShell
      id="qc-westgard"
      lessons={['qc-basics', 'error-types']}
      insights={[
        'A shift fires 2-2s, 4-1s and 10x — rules built to catch systematic error; a single 1-3s often comes first only when the shift is large.',
        'Increased imprecision fires 1-3s and R-4s: the spread widens without the mean moving.',
        '1-2s alone is a warning, not a rejection — about 1 in 20 controls exceed 2 SD by chance (1 in 10 runs with two controls).',
        'High-Sigma methods (≥ 6) need little QC; low-Sigma methods cannot be rescued by more rules.',
      ]}
    >
      <Panel
        title="Simulate a QC history (two control levels)"
        right={
          <Button size="sm" variant="outline" onClick={() => setSeed((s) => s + 1)}>
            <Shuffle className="h-3.5 w-3.5" /> New random data
          </Button>
        }
      >
        <div className="mb-4 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <Toggle label="Error scenario" value={scenario} onChange={setScenario} options={SCENARIOS} />
          </div>
          {scenario !== 'none' && (
            <>
              <Slider
                label={scenario === 'imprecision' ? 'SD multiplier' : scenario === 'trend' ? 'Drift (SD per 10 runs)' : 'Magnitude'}
                unit={scenario === 'imprecision' ? '×' : 'SD'}
                value={magnitude}
                min={scenario === 'imprecision' ? 1 : 0.5}
                max={4}
                step={0.1}
                dp={1}
                onChange={setMagnitude}
              />
              <Slider label="Error begins at run" value={start} min={2} max={24} step={1} onChange={setStart} />
            </>
          )}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-semibold text-muted-foreground">Control level 1</p>
            <LJChart runs={runs} level={0} violations={rejectRuns} />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-muted-foreground">Control level 2</p>
            <LJChart runs={runs} level={1} violations={rejectRuns} />
          </div>
        </div>
        <div className="mt-4">
          {first ? (
            <p className="mb-2 text-sm">
              First rejection at <span className="font-semibold">run {first.run}</span> ({first.rule}){scenario !== 'none' && ` — ${first.run - start} run(s) after the error began`}.
            </p>
          ) : (
            <p className="mb-2 text-sm text-success">No rejection rule violated — runs accepted.</p>
          )}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(RULES) as (keyof typeof RULES)[]).map((rule) => {
              const hits = violations.filter((v) => v.rule === rule);
              return (
                <div key={rule} title={RULES[rule].text} className={cn('rounded-lg border px-3 py-2 text-xs', hits.length ? (RULES[rule].reject ? 'border-destructive bg-destructive/10' : 'border-warning bg-warning/10') : 'opacity-60')}>
                  <p className="font-bold">{rule}</p>
                  <p className="text-muted-foreground">
                    {hits.length ? `runs ${hits.map((h) => h.run).slice(0, 6).join(', ')}${hits.length > 6 ? '…' : ''}` : 'not triggered'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Sigma metric">
          <div className="grid gap-4 sm:grid-cols-3">
            <Slider label="TEa" unit="%" value={tea} min={2} max={30} step={0.5} dp={1} onChange={setTea} />
            <Slider label="|Bias|" unit="%" value={bias} min={0} max={10} step={0.1} dp={1} onChange={setBias} />
            <Slider label="CV" unit="%" value={cv} min={0.3} max={10} step={0.1} dp={1} onChange={setCv} />
          </div>
          <div className="mt-4 grid grid-cols-[8rem_minmax(0,1fr)] items-center gap-3">
            <Readout label="Sigma" value={sigma.toFixed(1)} status={sigma >= 5 ? 'ok' : sigma >= 3 ? 'warn' : 'alert'} big />
            <p className="text-sm">{sigmaRecommendation(sigma)}</p>
          </div>
        </Panel>
        <Panel title="Reference change value">
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider label="Analytical CV (CVa)" unit="%" value={cva} min={0.5} max={10} step={0.1} dp={1} onChange={setCva} />
            <Slider label="Within-subject CV (CVi)" unit="%" value={cvi} min={0.5} max={30} step={0.1} dp={1} onChange={setCvi} hint="EFLM database: creatinine ~4.5, K⁺ ~4.6, glucose ~5" />
          </div>
          <div className="mt-4 grid grid-cols-[8rem_minmax(0,1fr)] items-center gap-3">
            <Readout label="RCV (95%, two-sided)" value={`±${rcvValue.toFixed(1)}`} unit="%" big />
            <p className="text-sm">Serial results must differ by more than ~{rcvValue.toFixed(0)}% before the change exceeds analytical plus biological noise.</p>
          </div>
        </Panel>
      </div>

      <Panel title="Judge the run" right={<span className="text-sm font-semibold tabular">{tally.right}/{tally.total}</span>}>
        <div className="grid gap-4 lg:grid-cols-2">
          <LJChart runs={quiz.qr} level={0} violations={answer ? quiz.set : new Set()} />
          <LJChart runs={quiz.qr} level={1} violations={answer ? quiz.set : new Set()} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { v: 'accept', l: 'Accept — in control' },
            { v: 'random', l: 'Reject — random error' },
            { v: 'systematic', l: 'Reject — systematic error' },
          ].map((o) => {
            const isAns = o.v === quiz.truth;
            const chosen = answer === o.v;
            return (
              <button
                key={o.v}
                type="button"
                disabled={!!answer}
                onClick={() => {
                  setAnswer(o.v);
                  setTally((t) => ({ right: t.right + (isAns ? 1 : 0), total: t.total + 1 }));
                }}
                className={cn('flex items-center gap-2 rounded-md border px-3 py-2 text-sm', !answer && 'hover:bg-accent', answer && isAns && 'border-success bg-success/10', answer && chosen && !isAns && 'border-destructive bg-destructive/10')}
              >
                {answer && isAns && <CheckCircle2 className="h-4 w-4 text-success" />}
                {answer && chosen && !isAns && <XCircle className="h-4 w-4 text-destructive" />}
                {o.l}
              </button>
            );
          })}
        </div>
        {answer && (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <p className="flex-1">
              {quiz.v.filter((x) => RULES[x.rule].reject).length === 0
                ? 'No rejection rules fired (1-2s warnings alone do not reject).'
                : `Rules fired: ${Array.from(new Set(quiz.v.filter((x) => RULES[x.rule].reject).map((x) => x.rule))).join(', ')}.`}
            </p>
            <Button size="sm" onClick={() => (setQSeed((s) => s + 1), setAnswer(null))}>
              <Shuffle className="h-4 w-4" /> Next chart
            </Button>
          </div>
        )}
      </Panel>
    </LabShell>
  );
}
