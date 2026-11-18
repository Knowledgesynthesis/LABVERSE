import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, OctagonAlert, RotateCcw } from 'lucide-react';
import { expected, interpretABG, type Range } from '../lib/clinical/acidBase';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { LabShell, Panel, Presets, Readout, Slider, Toggle } from './shared';

interface State {
  paco2: number;
  hco3: number;
  na: number;
  cl: number;
  albumin: number;
}

const NORMAL: State = { paco2: 40, hco3: 24, na: 140, cl: 104, albumin: 4 };

const PRESETS: { label: string; values: State; note: string }[] = [
  { label: 'Normal', values: NORMAL, note: 'Healthy adult' },
  { label: 'DKA', values: { paco2: 19, hco3: 7, na: 131, cl: 96, albumin: 4.2 }, note: 'Pure high-AG acidosis, Δ/Δ ≈ 1' },
  { label: 'Sepsis, tiring', values: { paco2: 38, hco3: 12, na: 138, cl: 100, albumin: 3 }, note: 'Lactic acidosis + respiratory acidosis' },
  { label: 'Diarrhea', values: { paco2: 29, hco3: 15, na: 138, cl: 115, albumin: 4 }, note: 'Normal-AG acidosis' },
  { label: 'Vomiting', values: { paco2: 48, hco3: 34, na: 138, cl: 92, albumin: 4 }, note: 'Metabolic alkalosis, compensated' },
  { label: 'Opioid overdose', values: { paco2: 70, hco3: 27, na: 140, cl: 103, albumin: 4 }, note: 'Acute respiratory acidosis' },
  { label: 'Stable COPD', values: { paco2: 60, hco3: 32, na: 140, cl: 96, albumin: 4 }, note: 'Chronic respiratory acidosis' },
  { label: 'Salicylate', values: { paco2: 22, hco3: 15, na: 140, cl: 102, albumin: 4 }, note: 'Respiratory alkalosis + high-AG acidosis' },
  { label: 'Pregnancy', values: { paco2: 30, hco3: 20, na: 136, cl: 106, albumin: 3.6 }, note: 'Chronic respiratory alkalosis, normal pH' },
  { label: 'Triple disorder', values: { paco2: 28, hco3: 22, na: 140, cl: 88, albumin: 4 }, note: 'Vomiting + ketoacidosis + sepsis hyperventilation' },
];

// Map geometry
const W = 600;
const H = 440;
const M = { l: 48, r: 14, t: 14, b: 40 };
const P = { min: 10, max: 100 };
const Hc = { min: 0, max: 50 };
const X = (p: number) => M.l + ((p - P.min) / (P.max - P.min)) * (W - M.l - M.r);
const Y = (h: number) => M.t + (1 - (h - Hc.min) / (Hc.max - Hc.min)) * (H - M.t - M.b);
const invX = (x: number) => P.min + ((x - M.l) / (W - M.l - M.r)) * (P.max - P.min);
const invY = (y: number) => Hc.min + (1 - (y - M.t) / (H - M.t - M.b)) * (Hc.max - Hc.min);

const range = (a: number, b: number, n = 24) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);

/** Band where PaCO₂ depends on HCO₃⁻ (metabolic primaries). */
function bandByH(h0: number, h1: number, fn: (h: number) => Range) {
  const lo = range(h0, h1).map((h) => `${X(fn(h).low)},${Y(h)}`);
  const hi = range(h1, h0).map((h) => `${X(fn(h).high)},${Y(h)}`);
  return [...lo, ...hi].join(' ');
}
/** Band where HCO₃⁻ depends on PaCO₂ (respiratory primaries). */
function bandByP(p0: number, p1: number, fn: (p: number) => Range) {
  const lo = range(p0, p1).map((p) => `${X(p)},${Y(fn(p).low)}`);
  const hi = range(p1, p0).map((p) => `${X(p)},${Y(fn(p).high)}`);
  return [...lo, ...hi].join(' ');
}

const BANDS = [
  { id: 'ma', label: 'Metabolic acidosis', cls: 'fill-red-500 stroke-red-500', points: bandByH(3, 24, expected.metabolicAcidosis), lx: 15, ly: 6 },
  { id: 'malk', label: 'Metabolic alkalosis', cls: 'fill-blue-500 stroke-blue-500', points: bandByH(24, 46, expected.metabolicAlkalosis), lx: 50, ly: 44 },
  { id: 'ara', label: 'Acute resp. acidosis', cls: 'fill-orange-500 stroke-orange-500', points: bandByP(40, 100, expected.acuteRespAcidosis), lx: 80, ly: 26 },
  { id: 'cra', label: 'Chronic resp. acidosis', cls: 'fill-amber-500 stroke-amber-500', points: bandByP(40, 100, expected.chronicRespAcidosis), lx: 74, ly: 41 },
  { id: 'aralk', label: 'Acute resp. alkalosis', cls: 'fill-teal-500 stroke-teal-500', points: bandByP(12, 40, expected.acuteRespAlkalosis), lx: 13, ly: 21 },
  { id: 'cralk', label: 'Chronic resp. alkalosis', cls: 'fill-green-500 stroke-green-500', points: bandByP(12, 40, expected.chronicRespAlkalosis), lx: 13, ly: 13 },
];

function isopleth(pH: number) {
  const pts: string[] = [];
  for (let p = P.min; p <= P.max; p += 1) {
    const h = 0.03 * p * 10 ** (pH - 6.1);
    if (h > Hc.max) break;
    pts.push(`${X(p)},${Y(h)}`);
  }
  return pts.join(' ');
}

function labelPos(pH: number) {
  const pAtTop = Hc.max / (0.03 * 10 ** (pH - 6.1));
  if (pAtTop <= P.max) return { x: X(pAtTop) + 2, y: M.t + 10 };
  const h = 0.03 * P.max * 10 ** (pH - 6.1);
  return { x: X(P.max) - 26, y: Y(h) - 4 };
}

export default function AcidBaseLab() {
  const [s, setS] = useState<State>(NORMAL);
  const [chronicity, setChronicity] = useState<'unknown' | 'acute' | 'chronic'>('unknown');
  const [measured, setMeasured] = useState('');
  const [active, setActive] = useState('Normal');
  const set = (k: keyof State) => (v: number) => {
    setActive('');
    setS((x) => ({ ...x, [k]: v }));
  };
  const measuredPH = measured.trim() === '' ? undefined : Number(measured);
  const r = useMemo(
    () => interpretABG({ ...s, chronicity, measuredPH: measuredPH !== undefined && Number.isFinite(measuredPH) ? measuredPH : undefined }),
    [s, chronicity, measuredPH]
  );
  const hPlus = 24 * (s.paco2 / s.hco3);

  const onMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const { x, y } = pt.matrixTransform(ctm.inverse());
    const p = Math.round(Math.min(P.max, Math.max(P.min, invX(x))));
    const h = Math.round(Math.min(48, Math.max(2, invY(y))));
    setActive('');
    setS((v) => ({ ...v, paco2: p, hco3: h }));
  };

  return (
    <LabShell
      id="acid-base-simulator"
      lessons={['acid-base-intro', 'metabolic-acidosis', 'metabolic-alkalosis', 'respiratory-disorders']}
      insights={[
        'Every pH isopleth is a straight line through the origin: the same HCO₃⁻/PaCO₂ ratio gives the same pH.',
        'Compensation bands run toward pH 7.40 but never cross it — a point beyond its band means a second disorder.',
        'The "Triple disorder" preset has a near-normal HCO₃⁻; only the anion gap and Δ/Δ expose the hidden acidosis and alkalosis.',
        'Respiratory bands widen with time: compare acute and chronic ranges for the same PaCO₂.',
      ]}
      actions={
        <Button variant="outline" onClick={() => (setS(NORMAL), setActive('Normal'), setMeasured(''))}>
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      }
    >
      <Panel title="Scenarios">
        <Presets presets={PRESETS} active={active} onPick={(v, label) => (setS(v), setActive(label))} />
      </Panel>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <Panel title="Acid–base map (click to place a gas)">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full cursor-crosshair select-none" onClick={onMapClick} role="img" aria-label="Acid–base map of HCO₃⁻ versus PaCO₂ with compensation bands and pH isopleths">
            {[20, 40, 60, 80, 100].map((p) => (
              <g key={`x${p}`}>
                <line x1={X(p)} x2={X(p)} y1={M.t} y2={H - M.b} className="stroke-border" strokeDasharray="2 4" />
                <text x={X(p)} y={H - M.b + 16} textAnchor="middle" className="fill-muted-foreground text-[11px]">
                  {p}
                </text>
              </g>
            ))}
            {[0, 10, 20, 30, 40, 50].map((h) => (
              <g key={`y${h}`}>
                <line x1={M.l} x2={W - M.r} y1={Y(h)} y2={Y(h)} className="stroke-border" strokeDasharray="2 4" />
                <text x={M.l - 8} y={Y(h) + 4} textAnchor="end" className="fill-muted-foreground text-[11px]">
                  {h}
                </text>
              </g>
            ))}
            <text x={(W + M.l) / 2} y={H - 6} textAnchor="middle" className="fill-muted-foreground text-[12px]">
              PaCO₂ (mmHg)
            </text>
            <text x={14} y={(H - M.b) / 2} textAnchor="middle" transform={`rotate(-90 14 ${(H - M.b) / 2})`} className="fill-muted-foreground text-[12px]">
              HCO₃⁻ (mmol/L)
            </text>
            {[7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7].map((pH) => {
              const lp = labelPos(pH);
              return (
                <g key={pH}>
                  <polyline points={isopleth(pH)} fill="none" className={pH === 7.4 ? 'stroke-foreground/50' : 'stroke-muted-foreground/30'} strokeWidth={pH === 7.4 ? 1.5 : 1} />
                  <text x={lp.x} y={lp.y} className="fill-muted-foreground text-[10px]">
                    {pH.toFixed(1)}
                  </text>
                </g>
              );
            })}
            {BANDS.map((b) => (
              <g key={b.id}>
                <polygon points={b.points} className={b.cls} fillOpacity={0.18} strokeOpacity={0.5} strokeWidth={1} />
                <text x={X(b.lx)} y={Y(b.ly)} className={cn('text-[10px] font-semibold', b.cls.split(' ')[0])}>
                  {b.label}
                </text>
              </g>
            ))}
            <rect x={X(35)} y={Y(26)} width={X(45) - X(35)} height={Y(22) - Y(26)} className="fill-foreground/10 stroke-foreground/50" strokeWidth={1} />
            <circle cx={X(s.paco2)} cy={Y(s.hco3)} r={9} className="fill-primary stroke-background" strokeWidth={3} />
            <circle cx={X(s.paco2)} cy={Y(s.hco3)} r={15} fill="none" className="stroke-primary" strokeWidth={1.5} strokeOpacity={0.6} />
          </svg>
          <p className="mt-2 text-xs text-muted-foreground">Bands = expected compensation (± 2). Grey box = normal (PaCO₂ 35–45, HCO₃⁻ 22–26). Diagonal lines = pH isopleths.</p>
        </Panel>

        <div className="space-y-5">
          <Panel title="Inputs">
            <div className="space-y-4">
              <Slider label="PaCO₂" unit="mmHg" value={s.paco2} min={10} max={100} step={1} normal={[35, 45]} onChange={set('paco2')} />
              <Slider label="HCO₃⁻" unit="mmol/L" value={s.hco3} min={2} max={50} step={1} normal={[22, 26]} onChange={set('hco3')} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Slider label="Na⁺" unit="mmol/L" value={s.na} min={110} max={170} step={1} onChange={set('na')} />
                <Slider label="Cl⁻" unit="mmol/L" value={s.cl} min={70} max={135} step={1} onChange={set('cl')} />
                <Slider label="Albumin" unit="g/dL" value={s.albumin} min={1} max={5.5} step={0.1} onChange={set('albumin')} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">Respiratory timing</span>
                <Toggle
                  label="Chronicity"
                  value={chronicity}
                  onChange={setChronicity}
                  options={[
                    { value: 'unknown', label: 'Unknown' },
                    { value: 'acute', label: 'Acute' },
                    { value: 'chronic', label: '> 3–5 days' },
                  ]}
                />
              </div>
              <label className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium">Reported pH (optional validity check)</span>
                <input
                  value={measured}
                  onChange={(e) => setMeasured(e.target.value)}
                  inputMode="decimal"
                  placeholder="e.g. 7.21"
                  className="w-24 rounded border bg-card px-2 py-1 tabular"
                />
              </label>
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="Interpretation">
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="pH (Henderson–Hasselbalch)" value={r.pH.toFixed(2)} status={r.status === 'normal pH' ? 'ok' : 'alert'} note={r.status} big />
          <Readout label="[H⁺]" value={hPlus.toFixed(0)} unit="nmol/L" />
          <Readout label="Anion gap (albumin-corrected)" value={r.correctedAG !== undefined ? r.correctedAG.toFixed(1) : '—'} unit="mmol/L" status={(r.correctedAG ?? 0) > 12 ? 'alert' : 'ok'} note={r.ag !== undefined ? `uncorrected ${r.ag.toFixed(1)}` : undefined} />
          <Readout label="Δ/Δ" value={r.delta === undefined ? '—' : r.delta === null ? 'n/a' : r.delta.toFixed(2)} note={r.delta === null ? 'HCO₃⁻ ≥ 24 with high AG' : undefined} />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {r.disorders.length === 0 ? (
            <span className="rounded-full bg-success/15 px-3 py-1 text-sm font-semibold text-success">No acid–base disorder</span>
          ) : (
            r.disorders.map((d, i) => (
              <span key={d} className={cn('rounded-full px-3 py-1 text-sm font-semibold capitalize', i === 0 ? 'bg-primary text-primary-foreground' : 'bg-warning/15 text-warning')}>
                {i === 0 ? 'Primary: ' : '+ '}
                {d}
              </span>
            ))
          )}
        </div>
        <ol className="space-y-2">
          {r.steps.map((st) => {
            const Icon = st.status === 'alert' ? OctagonAlert : st.status === 'warn' ? AlertTriangle : CheckCircle2;
            return (
              <li key={st.label} className="flex gap-3 rounded-lg border p-3 text-sm">
                <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', st.status === 'alert' ? 'text-destructive' : st.status === 'warn' ? 'text-warning' : 'text-success')} />
                <div>
                  <p className="font-semibold">{st.label}</p>
                  <p className="text-muted-foreground">{st.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Panel>
    </LabShell>
  );
}
