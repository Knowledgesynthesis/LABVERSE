import { useState } from 'react';
import {
  albuminuriaCategory,
  ckdEpi2012Cys,
  ckdEpi2021Cr,
  ckdEpi2021CrCys,
  cockcroftGault,
  fena,
  feUrea,
  G_LABELS,
  gfrCategory,
  KDIGO_HEATMAP,
  type GCategory,
  type Risk,
} from '../lib/clinical/renal';
import type { Sex } from '../lib/clinical/electrolytes';
import { cn } from '../lib/utils';
import { LabShell, Panel, Readout, Slider, Toggle } from './shared';

const RISK_CLS: Record<Risk, string> = {
  low: 'bg-green-500/80 text-white',
  moderate: 'bg-yellow-400/90 text-black',
  high: 'bg-orange-500/90 text-white',
  'very high': 'bg-red-600/90 text-white',
};

export default function KidneyLab() {
  const [sex, setSex] = useState<Sex>('female');
  const [age, setAge] = useState(62);
  const [weight, setWeight] = useState(70);
  const [crUnit, setCrUnit] = useState<'mg' | 'umol'>('mg');
  const [scr, setScr] = useState(1.3);
  const [useCys, setUseCys] = useState(true);
  const [cys, setCys] = useState(1.4);
  const [uacr, setUacr] = useState(120);

  const [sNa, setSNa] = useState(138);
  const [uNa, setUNa] = useState(20);
  const [sCr2, setSCr2] = useState(2.4);
  const [uCr, setUCr] = useState(110);
  const [sBun, setSBun] = useState(48);
  const [uUrea, setUUrea] = useState(450);
  const [diuretic, setDiuretic] = useState(false);

  const cr = scr;
  const eCr = ckdEpi2021Cr(cr, age, sex);
  const eCys = ckdEpi2012Cys(cys, age, sex);
  const eBoth = ckdEpi2021CrCys(cr, cys, age, sex);
  const best = useCys ? eBoth : eCr;
  const g = gfrCategory(best);
  const a = albuminuriaCategory(uacr);
  const cg = cockcroftGault(cr, age, weight, sex);
  const discordant = useCys && Math.abs(eCr - eCys) / Math.max(eCr, eCys) > 0.25;

  const fe = fena(uNa, sNa, uCr, sCr2);
  const fu = feUrea(uUrea, sBun, uCr, sCr2);

  const crDisplay = crUnit === 'mg' ? scr : Math.round(scr * 88.4);
  const setCrDisplay = (v: number) => setScr(crUnit === 'mg' ? v : Math.round((v / 88.4) * 100) / 100);

  return (
    <LabShell
      id="renal-handling"
      lessons={['renal-intro', 'gfr-assessment', 'aki-vs-ckd']}
      insights={[
        'Move creatinine from 0.7 to 1.0 mg/dL in a 30-year-old: eGFR falls by ~30 mL/min. Move it from 3.0 to 3.3: barely 3 — the hyperbola.',
        'Set an older, light patient: Cockcroft–Gault diverges sharply from eGFR. Drug labels using CrCl can mislead dosing.',
        'Lower the cystatin C with the same creatinine (e.g., high muscle mass): the combined equation pulls eGFR toward the truth.',
        'Albuminuria moves risk as much as GFR: a G2 patient with A3 albuminuria is "high risk".',
        'Toggle "on loop diuretic": FENa becomes unreliable while FEUrea still discriminates.',
      ]}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="eGFR inputs">
          <div className="mb-4 flex flex-wrap gap-3">
            <Toggle label="Sex" value={sex} onChange={setSex} options={[{ value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }]} />
            <Toggle label="Creatinine unit" value={crUnit} onChange={setCrUnit} options={[{ value: 'mg', label: 'mg/dL' }, { value: 'umol', label: 'µmol/L' }]} />
            <Toggle label="Cystatin C" value={useCys ? 'on' : 'off'} onChange={(v) => setUseCys(v === 'on')} options={[{ value: 'off', label: 'Creatinine only' }, { value: 'on', label: '+ Cystatin C' }]} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider label="Age" unit="years" value={age} min={18} max={100} step={1} onChange={setAge} />
            <Slider label="Weight" unit="kg" value={weight} min={35} max={180} step={1} onChange={setWeight} hint="Cockcroft–Gault only" />
            <Slider
              label="Serum creatinine"
              unit={crUnit === 'mg' ? 'mg/dL' : 'µmol/L'}
              value={crDisplay}
              min={crUnit === 'mg' ? 0.3 : 27}
              max={crUnit === 'mg' ? 10 : 884}
              step={crUnit === 'mg' ? 0.05 : 1}
              dp={crUnit === 'mg' ? 2 : 0}
              onChange={setCrDisplay}
            />
            {useCys && <Slider label="Cystatin C" unit="mg/L" value={cys} min={0.4} max={6} step={0.05} dp={2} normal={[0.6, 1.0]} onChange={setCys} />}
            <Slider label="UACR" unit="mg/g" value={uacr} min={0} max={2000} step={5} normal={[0, 30]} onChange={setUacr} />
          </div>
        </Panel>
        <Panel title="Estimates">
          <div className="grid grid-cols-2 gap-3">
            <Readout label="CKD-EPI 2021 creatinine" value={eCr.toFixed(0)} unit="mL/min/1.73 m²" status={useCys ? 'neutral' : 'ok'} />
            {useCys && <Readout label="CKD-EPI 2012 cystatin C" value={eCys.toFixed(0)} unit="mL/min/1.73 m²" />}
            {useCys && <Readout label="CKD-EPI 2021 cr–cys (preferred)" value={eBoth.toFixed(0)} unit="mL/min/1.73 m²" status="ok" />}
            <Readout label="Cockcroft–Gault CrCl" value={cg.toFixed(0)} unit="mL/min" note="Not BSA-indexed; legacy drug labels" />
          </div>
          {discordant && (
            <p className="mt-3 rounded-md border-l-4 border-warning bg-warning/5 p-3 text-sm">
              eGFRcr and eGFRcys differ by &gt; 25%: suspect a non-GFR determinant (muscle mass, diet, steroids, thyroid disease, inflammation). Use the combined equation or measure GFR.
            </p>
          )}
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">
              KDIGO: <span className="font-bold">{g}</span> {a} — {KDIGO_HEATMAP[g][a]} risk
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="p-1 text-left font-medium text-muted-foreground">GFR</th>
                    {(['A1', 'A2', 'A3'] as const).map((x) => (
                      <th key={x} className="p-1 font-medium text-muted-foreground">
                        {x} {x === 'A1' ? '< 30' : x === 'A2' ? '30–300' : '> 300'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(G_LABELS) as GCategory[]).map((gc) => (
                    <tr key={gc}>
                      <td className="whitespace-nowrap p-1 font-medium">
                        {gc} <span className="text-muted-foreground">{G_LABELS[gc].split(' · ')[0]}</span>
                      </td>
                      {(['A1', 'A2', 'A3'] as const).map((ac) => {
                        const on = gc === g && ac === a;
                        return (
                          <td key={ac} className="p-0.5">
                            <div className={cn('rounded py-1.5 text-center capitalize', RISK_CLS[KDIGO_HEATMAP[gc][ac]], on ? 'ring-4 ring-primary ring-offset-1 ring-offset-card font-bold' : 'opacity-60')}>
                              {on ? '● ' : ''}
                              {KDIGO_HEATMAP[gc][ac]}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">CKD requires abnormality for &gt; 3 months. Not valid while creatinine is changing (AKI).</p>
          </div>
        </Panel>
      </div>

      <Panel title="Urine indices in AKI">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider label="Serum Na⁺" unit="mmol/L" value={sNa} min={115} max={165} step={1} onChange={setSNa} />
            <Slider label="Urine Na⁺" unit="mmol/L" value={uNa} min={2} max={200} step={1} onChange={setUNa} />
            <Slider label="Serum creatinine" unit="mg/dL" value={sCr2} min={0.5} max={10} step={0.1} onChange={setSCr2} />
            <Slider label="Urine creatinine" unit="mg/dL" value={uCr} min={10} max={300} step={5} onChange={setUCr} />
            <Slider label="BUN" unit="mg/dL" value={sBun} min={5} max={150} step={1} onChange={setSBun} />
            <Slider label="Urine urea nitrogen" unit="mg/dL" value={uUrea} min={50} max={1500} step={10} onChange={setUUrea} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={diuretic} onChange={(e) => setDiuretic(e.target.checked)} /> On a loop diuretic
            </label>
          </div>
          <div className="space-y-3">
            <Readout
              label="FENa"
              value={fe.toFixed(2)}
              unit="%"
              status={diuretic ? 'neutral' : fe < 1 ? 'ok' : fe > 2 ? 'alert' : 'warn'}
              note={diuretic ? 'Unreliable on diuretics — use FEUrea' : fe < 1 ? 'Na⁺-avid: prerenal physiology (or contrast, rhabdo, early obstruction, GN, HRS)' : fe > 2 ? 'Tubular Na⁺ wasting: ATN (or CKD, diuretics)' : 'Indeterminate'}
            />
            <Readout
              label="FEUrea"
              value={fu.toFixed(0)}
              unit="%"
              status={fu < 35 ? 'ok' : fu > 50 ? 'alert' : 'warn'}
              note={fu < 35 ? 'Prerenal physiology (valid on diuretics)' : fu > 50 ? 'Consistent with ATN' : 'Indeterminate'}
            />
            <Readout label="BUN/creatinine" value={(sBun / sCr2).toFixed(0)} note="> 20 prerenal or high urea production; low accuracy alone" />
          </div>
        </div>
      </Panel>
    </LabShell>
  );
}
