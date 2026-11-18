import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ckdEpi2021Cr, simulateCreatinine } from '../lib/clinical/renal';
import type { Sex } from '../lib/clinical/electrolytes';
import { LabShell, Panel, Presets, Readout, Slider, Toggle } from './shared';

interface S {
  baseline: number;
  age: number;
  weight: number;
  remaining: number; // %
  recovery: number; // day, 0 = none
  production: number; // % drop
}

const PRESETS: { label: string; values: S; note: string }[] = [
  { label: 'Anuric ATN', values: { baseline: 1.0, age: 55, weight: 80, remaining: 2, recovery: 0, production: 0 }, note: 'GFR near zero' },
  { label: 'Halved GFR', values: { baseline: 1.0, age: 55, weight: 80, remaining: 50, recovery: 0, production: 0 }, note: 'Creatinine heads to 2.0 — slowly' },
  { label: 'Septic, frail', values: { baseline: 0.7, age: 82, weight: 50, remaining: 20, recovery: 0, production: 40 }, note: 'Low muscle + reduced generation blunt the rise' },
  { label: 'Recovers day 3', values: { baseline: 1.0, age: 55, weight: 80, remaining: 10, recovery: 3, production: 0 }, note: 'Creatinine keeps rising briefly after recovery' },
];

export default function CreatinineKinetics() {
  const [sex, setSex] = useState<Sex>('male');
  const [s, setS] = useState<S>(PRESETS[0].values);
  const [active, setActive] = useState(PRESETS[0].label);
  const set = (k: keyof S) => (v: number) => {
    setActive('');
    setS((x) => ({ ...x, [k]: v }));
  };

  const data = useMemo(
    () =>
      simulateCreatinine({
        baselineCr: s.baseline,
        age: s.age,
        sex,
        weightKg: s.weight,
        gfrFraction: s.remaining / 100,
        recoveryDay: s.recovery > 0 ? s.recovery : undefined,
        productionDrop: s.production / 100,
        days: 7,
      }),
    [s, sex]
  );
  const gfr0 = ckdEpi2021Cr(s.baseline, s.age, sex);
  const d1 = data.find((p) => p.day === 1)!;
  const d2 = data.find((p) => p.day === 2)!;
  const firstStage = (st: number) => data.find((p) => p.stage >= st)?.day;
  const steady = (s.baseline * 100) / Math.max(s.remaining, 0.5) * (1 - s.production / 100);
  const tau = (s.weight * (sex === 'male' ? 0.6 : 0.5) * 1000) / Math.max(1, (gfr0 * s.remaining) / 100) / 60; // hours

  return (
    <LabShell
      id="creatinine-kinetics"
      lessons={['aki-vs-ckd', 'gfr-assessment']}
      insights={[
        'Creatinine is a lagging indicator: on day 1 after an abrupt GFR collapse, "eGFR" can still look like moderate CKD.',
        'The lower the remaining GFR, the longer creatinine takes to reach its new steady state (time constant ≈ body water ÷ GFR).',
        'Reduced creatinine generation (sepsis, sarcopenia) and low weight blunt the rise — AKI is easily missed in frail patients.',
        'After recovery creatinine peaks and falls over days; a falling creatinine still does not give a valid eGFR until it stabilizes.',
      ]}
    >
      <Panel title="Scenarios" right={<Toggle label="Sex" value={sex} onChange={setSex} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />}>
        <Presets presets={PRESETS} active={active} onPick={(v, l) => (setS(v), setActive(l))} />
      </Panel>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <Panel title="Inputs">
          <div className="space-y-4">
            <Slider label="Baseline creatinine" unit="mg/dL" value={s.baseline} min={0.4} max={3} step={0.05} dp={2} onChange={set('baseline')} />
            <Slider label="Age" unit="years" value={s.age} min={18} max={95} step={1} onChange={set('age')} />
            <Slider label="Weight" unit="kg" value={s.weight} min={40} max={150} step={1} onChange={set('weight')} />
            <Slider label="GFR remaining after insult" unit="%" value={s.remaining} min={1} max={100} step={1} onChange={set('remaining')} />
            <Slider label="Recovery on day (0 = none)" unit="day" value={s.recovery} min={0} max={6} step={0.5} dp={1} onChange={set('recovery')} />
            <Slider label="Fall in creatinine generation" unit="%" value={s.production} min={0} max={50} step={5} onChange={set('production')} hint="Sepsis can reduce generation substantially" />
          </div>
        </Panel>
        <Panel title="7-day course">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" type="number" domain={[0, 7]} ticks={[0, 1, 2, 3, 4, 5, 6, 7]} tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} />
                <YAxis yAxisId="cr" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} width={36} />
                <YAxis yAxisId="gfr" orientation="right" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} width={36} />
                <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', fontSize: 12 }} labelFormatter={(d) => `Day ${d}`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line yAxisId="cr" type="monotone" dataKey="cr" name="Creatinine (mg/dL)" stroke="var(--color-primary)" strokeWidth={2.5} dot={false} />
                <Line yAxisId="gfr" type="stepAfter" dataKey="trueGFR" name="True GFR (mL/min)" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line yAxisId="gfr" type="monotone" dataKey="naiveEGFR" name='"eGFR" from creatinine' stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Readout label="Creatinine day 1" value={d1.cr.toFixed(2)} unit="mg/dL" note={`"eGFR" ${d1.naiveEGFR} vs true ${d1.trueGFR}`} />
            <Readout label="Creatinine day 2" value={d2.cr.toFixed(2)} unit="mg/dL" note={`KDIGO stage ${d2.stage}`} />
            <Readout label="New steady state" value={steady > 20 ? '> 20' : steady.toFixed(1)} unit="mg/dL" note={`τ ≈ ${tau > 200 ? '> 200' : tau.toFixed(0)} h`} />
            <Readout label="KDIGO stage 1 / 3 reached" value={`${firstStage(1) ?? '—'} / ${firstStage(3) ?? '—'}`} unit="days" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            One-compartment model: V·dCr/dt = G − GFR·Cr (Waikar &amp; Bonventre 2009); V = total body water; G fixed by the baseline steady state. Baseline GFR {gfr0.toFixed(0)} mL/min.
          </p>
        </Panel>
      </div>
    </LabShell>
  );
}
