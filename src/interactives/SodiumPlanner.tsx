import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AlertTriangle, OctagonAlert } from 'lucide-react';
import { deltaNaPerLitre, freeWaterDeficit, INFUSATES, totalBodyWater, type InfusateId, type Sex } from '../lib/clinical/electrolytes';
import { LabShell, Panel, Readout, Slider, Toggle } from './shared';
import { cn } from '../lib/utils';

const RISKS = [
  { id: 'na105', label: 'Na⁺ ≤ 105 mmol/L' },
  { id: 'hypok', label: 'Hypokalemia' },
  { id: 'alcohol', label: 'Alcohol use disorder' },
  { id: 'malnut', label: 'Malnutrition' },
  { id: 'liver', label: 'Advanced liver disease' },
] as const;

/** Hour-by-hour mass balance of an infusion into total body water (no urine losses). */
function project(na0: number, tbw: number, rateMlH: number, infusateCations: number) {
  const pts: { h: number; na: number }[] = [];
  let n = na0;
  let water = tbw;
  for (let h = 0; h <= 24; h++) {
    pts.push({ h, na: Math.round(n * 10) / 10 });
    const v = rateMlH / 1000;
    n = (n * water + v * infusateCations) / (water + v);
    water += v;
  }
  return pts;
}

export default function SodiumPlanner() {
  const [mode, setMode] = useState<'hypo' | 'hyper'>('hypo');
  const [sex, setSex] = useState<Sex>('female');
  const [older, setOlder] = useState(false);
  const [weight, setWeight] = useState(65);
  const [na, setNa] = useState(118);
  const [chronicity, setChronicity] = useState<'acute' | 'chronic'>('chronic');
  const [symptoms, setSymptoms] = useState<'severe' | 'moderate' | 'mild'>('moderate');
  const [risks, setRisks] = useState<Record<string, boolean>>({});
  const [reversible, setReversible] = useState(false);
  const [infusate, setInfusate] = useState<InfusateId>('hypertonic-3');
  const [addK, setAddK] = useState(0);
  const [rate, setRate] = useState(30);
  const [losses, setLosses] = useState(1000);

  const tbw = totalBodyWater(weight, sex, older);
  const highRisk = Object.values(risks).some(Boolean) || na <= 105;
  const hypoLimit = chronicity === 'acute' ? 10 : highRisk ? 8 : 10;

  const isHypo = mode === 'hypo';
  const infNa = isHypo ? INFUSATES[infusate].na : 0;
  const infK = isHypo ? addK : 0;
  const perL = deltaNaPerLitre(infNa, infK, na, tbw);
  const bolus = (0.15 * (513 - na)) / (tbw + 0.15);

  const projection = project(na, tbw, rate, infNa + infK);
  const end = projection[projection.length - 1].na;
  const change = end - na;

  // Hypernatremia
  const deficit = freeWaterDeficit(na, tbw);
  const hyperTarget = chronicity === 'acute' ? Math.min(na - 140, 24) : Math.min(10, na - 140);
  const d5wPerL = Math.abs(deltaNaPerLitre(0, 0, na, tbw));
  const litresForTarget = hyperTarget > 0 ? hyperTarget / d5wPerL : 0;
  const hyperRate = ((litresForTarget * 1000 + losses) / 24).toFixed(0);

  const exceeds = isHypo ? change > hypoLimit : -change > (chronicity === 'acute' ? 24 : 12);
  const wrongDirection = isHypo ? change < 0 : change > 0;

  return (
    <LabShell
      id="sodium-correction"
      lessons={['sodium-disorders', 'hypernatremia-avp']}
      insights={[
        'One 150-mL bolus of 3% NaCl raises Na⁺ only ~1.5–2.5 mmol/L in most adults — that is why guidelines allow repeating it.',
        'Choose 0.9% saline for a patient with Na⁺ 118: the formula predicts a tiny rise — and in SIADH with concentrated urine it can fall instead.',
        'The projection assumes no urine output. Aquaresis (dilute urine once the AVP stimulus resolves) can add several mmol/L within hours.',
        'Hypernatremia: total deficit is large, but the 24-hour plan is bounded by the safe rate of fall plus ongoing losses.',
      ]}
    >
      <Panel title="Patient">
        <div className="mb-4 flex flex-wrap gap-3">
          <Toggle
            label="Disorder"
            value={mode}
            onChange={(v) => {
              setMode(v);
              setNa(v === 'hypo' ? 118 : 158);
              setRate(v === 'hypo' ? 30 : 150);
            }}
            options={[
              { value: 'hypo', label: 'Hyponatremia' },
              { value: 'hyper', label: 'Hypernatremia' },
            ]}
          />
          <Toggle label="Sex" value={sex} onChange={setSex} options={[{ value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }]} />
          <Toggle label="Age" value={older ? 'older' : 'adult'} onChange={(v) => setOlder(v === 'older')} options={[{ value: 'adult', label: '< 65 y' }, { value: 'older', label: '≥ 65 y' }]} />
          <Toggle label="Chronicity" value={chronicity} onChange={setChronicity} options={[{ value: 'acute', label: 'Acute < 48 h' }, { value: 'chronic', label: 'Chronic / unknown' }]} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Slider label="Weight" unit="kg" value={weight} min={35} max={150} step={1} onChange={setWeight} />
          <Slider label="Serum Na⁺" unit="mmol/L" value={na} min={isHypo ? 100 : 146} max={isHypo ? 134 : 185} step={1} normal={[135, 145]} onChange={setNa} />
          <Readout label="Total body water" value={tbw.toFixed(1)} unit="L" note={`${(tbw / weight).toFixed(2)} × weight`} />
        </div>
      </Panel>

      {isHypo ? (
        <>
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel title="Symptoms and risk">
              <div className="space-y-4">
                <Toggle
                  label="Symptoms"
                  value={symptoms}
                  onChange={setSymptoms}
                  options={[
                    { value: 'severe', label: 'Severe (vomiting, seizure, coma)' },
                    { value: 'moderate', label: 'Moderate (nausea, confusion)' },
                    { value: 'mild', label: 'Mild / none' },
                  ]}
                />
                <fieldset className="space-y-1.5">
                  <legend className="mb-1 text-sm font-medium">Osmotic demyelination risk factors</legend>
                  {RISKS.map((r) => (
                    <label key={r.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={!!risks[r.id]} onChange={(e) => setRisks((x) => ({ ...x, [r.id]: e.target.checked }))} />
                      {r.label}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 pt-2 text-sm">
                    <input type="checkbox" checked={reversible} onChange={(e) => setReversible(e.target.checked)} />
                    Cause is rapidly reversible (hypovolemia, thiazide, cortisol deficiency, desmopressin, nausea/pain)
                  </label>
                </fieldset>
              </div>
            </Panel>
            <Panel title="Plan">
              <div className="grid grid-cols-2 gap-3">
                <Readout label="24-h ceiling" value={`+${hypoLimit}`} unit="mmol/L" status={highRisk ? 'warn' : 'neutral'} note={chronicity === 'acute' ? 'Acute: brain edema is the main risk' : highRisk ? 'High ODS risk' : 'Standard chronic limit'} />
                <Readout label="One 150-mL 3% bolus" value={`+${bolus.toFixed(1)}`} unit="mmol/L" note="Mass balance, no urine loss" />
              </div>
              <div
                className={cn(
                  'mt-4 rounded-lg border-l-4 p-3 text-sm',
                  symptoms === 'severe' ? 'border-destructive bg-destructive/5' : symptoms === 'moderate' || chronicity === 'acute' ? 'border-warning bg-warning/5' : 'border-primary bg-primary/5'
                )}
              >
                {symptoms === 'severe'
                  ? `3% NaCl 150 mL over 20 min now; recheck Na⁺; repeat up to 2–3 times until symptoms improve or Na⁺ is up ~5 (≈ ${Math.ceil(5 / bolus)} boluses by formula). Then stop hypertonic saline and find the cause.`
                  : symptoms === 'moderate' || chronicity === 'acute'
                    ? 'Single 150 mL 3% NaCl bolus, then cause-directed treatment; check Na⁺ every 4 h.'
                    : 'No hypertonic saline needed: treat the cause (fluid restriction for SIADH, isotonic fluid for hypovolemia, diuretic + restriction for hypervolemia).'}
                {reversible && (
                  <p className="mt-2 font-medium text-warning">
                    <AlertTriangle className="mr-1 inline h-4 w-4" />
                    Aquaresis risk: once the AVP stimulus resolves Na⁺ can rise &gt; 1 mmol/L/h. Monitor Na⁺ every 2 h and urine output; have D5W ± desmopressin 2 µg IV ready.
                  </p>
                )}
              </div>
            </Panel>
          </div>
          <Panel title="Infusion projection (Adrogué–Madias, 24 h)">
            <div className="mb-4 grid gap-4 md:grid-cols-3">
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Infusate</span>
                <select value={infusate} onChange={(e) => setInfusate(e.target.value as InfusateId)} className="block w-full rounded-md border bg-card px-2 py-2">
                  {Object.entries(INFUSATES)
                    .filter(([id]) => id !== 'd5w')
                    .map(([id, v]) => (
                      <option key={id} value={id}>
                        {v.label} (Na⁺ {v.na})
                      </option>
                    ))}
                </select>
              </label>
              <Slider label="Added K⁺" unit="mmol/L" value={addK} min={0} max={40} step={10} onChange={setAddK} hint="K⁺ is as osmotically active as Na⁺" />
              <Slider label="Rate" unit="mL/h" value={rate} min={5} max={250} step={5} onChange={setRate} />
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projection} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="h" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} label={{ value: 'hours', position: 'insideBottomRight', offset: -2, fontSize: 11 }} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 4']} tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} width={40} />
                    <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', fontSize: 12 }} formatter={(v) => [`${v} mmol/L`, 'Na⁺']} labelFormatter={(h) => `${h} h`} />
                    <ReferenceLine y={na + hypoLimit} stroke="var(--color-destructive)" strokeDasharray="5 4" label={{ value: `limit +${hypoLimit}`, fontSize: 11, fill: 'var(--color-destructive)', position: 'insideTopLeft' }} />
                    <Line type="monotone" dataKey="na" stroke="var(--color-primary)" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <Readout label="Per litre of this infusate" value={`${perL >= 0 ? '+' : ''}${perL.toFixed(1)}`} unit="mmol/L" />
                <Readout label="Projected change in 24 h" value={`${change >= 0 ? '+' : ''}${change.toFixed(1)}`} unit="mmol/L" status={exceeds || wrongDirection ? 'alert' : 'ok'} note={`${((rate * 24) / 1000).toFixed(1)} L infused`} />
                {exceeds && (
                  <p className="flex gap-2 text-sm font-medium text-destructive">
                    <OctagonAlert className="h-4 w-4 shrink-0" /> Exceeds the 24-h limit before any aquaresis — reduce the rate.
                  </p>
                )}
              </div>
            </div>
          </Panel>
        </>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel title="Deficit and plan">
            <div className="grid grid-cols-2 gap-3">
              <Readout label="Free-water deficit" value={deficit.toFixed(1)} unit="L" note="TBW × (Na/140 − 1)" />
              <Readout label="Target fall in 24 h" value={`−${hyperTarget.toFixed(0)}`} unit="mmol/L" note={chronicity === 'acute' ? '~1 mmol/L/h acceptable' : '≈ 10 mmol/L/24 h (chronic)'} />
              <Readout label="D5W for that target" value={litresForTarget.toFixed(1)} unit="L" note={`−${d5wPerL.toFixed(1)} per litre`} />
              <Readout label="Suggested D5W rate" value={hyperRate} unit="mL/h" note="target volume + ongoing losses" />
            </div>
            <div className="mt-4">
              <Slider label="Ongoing free-water losses" unit="mL/day" value={losses} min={0} max={5000} step={100} onChange={setLosses} hint="Insensible ≈ 800–1,000 mL/day + urinary free water" />
            </div>
          </Panel>
          <Panel title="D5W projection (no further losses)">
            <Slider label="D5W rate" unit="mL/h" value={rate} min={25} max={400} step={25} onChange={setRate} />
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projection} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="h" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} />
                  <YAxis domain={['dataMin - 4', 'dataMax + 2']} tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} width={40} />
                  <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', fontSize: 12 }} formatter={(v) => [`${v} mmol/L`, 'Na⁺']} labelFormatter={(h) => `${h} h`} />
                  <ReferenceLine y={na - (chronicity === 'acute' ? 24 : 12)} stroke="var(--color-destructive)" strokeDasharray="5 4" />
                  <Line type="monotone" dataKey="na" stroke="var(--color-primary)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              Projected change {change.toFixed(1)} mmol/L in 24 h. Ongoing losses make the real fall smaller — recheck Na⁺ every 4–6 h.
            </p>
          </Panel>
        </div>
      )}
    </LabShell>
  );
}
