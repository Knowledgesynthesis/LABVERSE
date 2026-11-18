import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { albuminCorrectedAG, anionGap } from '../lib/clinical/acidBase';
import { assessTonicity } from '../lib/clinical/electrolytes';
import { Button } from '../components/ui/Button';
import { Rich } from '../components/Rich';
import { LabShell, Panel, Presets, Readout, Slider } from './shared';

interface S {
  na: number;
  cl: number;
  hco3: number;
  glucose: number;
  bun: number;
  albumin: number;
  ethanol: number;
  measured: number;
}

const BASE: S = { na: 140, cl: 104, hco3: 24, glucose: 90, bun: 14, albumin: 4, ethanol: 0, measured: 290 };

const PRESETS: { label: string; values: S; note: string }[] = [
  { label: 'Normal', values: BASE, note: 'Healthy adult' },
  { label: 'DKA', values: { na: 131, cl: 96, hco3: 7, glucose: 520, bun: 26, albumin: 4.2, ethanol: 0, measured: 304 }, note: 'High AG, small osmolal gap' },
  { label: 'HHS', values: { na: 128, cl: 92, hco3: 21, glucose: 980, bun: 72, albumin: 3.8, ethanol: 0, measured: 342 }, note: 'Effective osmolality > 300' },
  { label: 'Methanol — early', values: { na: 140, cl: 105, hco3: 24, glucose: 95, bun: 14, albumin: 4, ethanol: 0, measured: 330 }, note: 'High osmolal gap, normal AG' },
  { label: 'Methanol — late', values: { na: 140, cl: 102, hco3: 8, glucose: 95, bun: 16, albumin: 4, ethanol: 0, measured: 302 }, note: 'High AG, gap closing' },
  { label: 'Ethanol only', values: { na: 140, cl: 104, hco3: 24, glucose: 90, bun: 14, albumin: 4, ethanol: 250, measured: 358 }, note: 'Gap explained once ethanol is entered' },
  { label: 'SIADH', values: { na: 118, cl: 86, hco3: 23, glucose: 96, bun: 9, albumin: 4, ethanol: 0, measured: 246 }, note: 'Hypotonic hyponatremia' },
  { label: 'Pseudohyponatremia', values: { na: 126, cl: 92, hco3: 24, glucose: 95, bun: 12, albumin: 4, ethanol: 0, measured: 288 }, note: 'Severe hypertriglyceridemia, indirect ISE' },
  { label: 'Low albumin hides AG', values: { na: 136, cl: 104, hco3: 20, glucose: 110, bun: 30, albumin: 1.8, ethanol: 0, measured: 290 }, note: 'Lactic acidosis in ICU' },
];

export default function ElectrolyteLab() {
  const [s, setS] = useState<S>(BASE);
  const [active, setActive] = useState('Normal');
  const set = (k: keyof S) => (v: number) => {
    setActive('');
    setS((x) => ({ ...x, [k]: v }));
  };
  const ag = anionGap(s.na, s.cl, s.hco3);
  const cag = albuminCorrectedAG(ag, s.albumin);
  const t = useMemo(() => assessTonicity({ na: s.na, glucose: s.glucose, bun: s.bun, measuredOsm: s.measured, ethanol: s.ethanol }), [s]);
  const gap = t.gap ?? 0;

  const notes = [...t.notes];
  if (cag > 12 && gap > 10 && !t.pseudo) notes.unshift('High anion gap **and** high osmolal gap: toxic alcohol until proven otherwise (also ketoacidosis or lactic acidosis can raise the gap modestly). Start fomepizole on suspicion.');
  if (ag <= 12 && cag > 12) notes.unshift(`The uncorrected AG (${ag.toFixed(0)}) looks normal, but corrected for albumin it is ${cag.toFixed(0)} — a hidden high-AG acidosis.`);
  if (ag < 3) notes.push('Very low anion gap: hypoalbuminemia, IgG paraprotein, lithium or bromide toxicity, or laboratory error.');

  return (
    <LabShell
      id="electrolyte-dynamics"
      lessons={['electrolytes-intro', 'sodium-disorders', 'metabolic-acidosis']}
      insights={[
        'Raising BUN raises osmolality but not effective osmolality (tonicity) — urea crosses cell membranes.',
        'Toxic alcohols: compare the early and late methanol presets — the osmolal gap and the anion gap move in opposite directions.',
        'Enter ethanol in the "Ethanol only" preset and watch the gap close: always include measured ethanol before blaming a toxic alcohol.',
        'Low albumin lowers the anion gap ~2.5 mmol/L per g/dL — always correct it in hypoalbuminemic patients.',
      ]}
      actions={
        <Button variant="outline" onClick={() => (setS(BASE), setActive('Normal'))}>
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      }
    >
      <Panel title="Scenarios">
        <Presets presets={PRESETS} active={active} onPick={(v, l) => (setS(v), setActive(l))} />
      </Panel>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Inputs">
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider label="Na⁺" unit="mmol/L" value={s.na} min={105} max={175} step={1} normal={[135, 145]} onChange={set('na')} />
            <Slider label="Cl⁻" unit="mmol/L" value={s.cl} min={70} max={135} step={1} normal={[98, 107]} onChange={set('cl')} />
            <Slider label="HCO₃⁻" unit="mmol/L" value={s.hco3} min={2} max={45} step={1} normal={[22, 29]} onChange={set('hco3')} />
            <Slider label="Albumin" unit="g/dL" value={s.albumin} min={1} max={5.5} step={0.1} normal={[3.5, 5]} onChange={set('albumin')} />
            <Slider label="Glucose" unit="mg/dL" value={s.glucose} min={40} max={1200} step={5} normal={[70, 99]} onChange={set('glucose')} />
            <Slider label="BUN" unit="mg/dL" value={s.bun} min={2} max={150} step={1} normal={[7, 20]} onChange={set('bun')} />
            <Slider label="Ethanol" unit="mg/dL" value={s.ethanol} min={0} max={500} step={5} onChange={set('ethanol')} hint="Legal driving limit ≈ 80 mg/dL" />
            <Slider label="Measured osmolality" unit="mOsm/kg" value={s.measured} min={220} max={420} step={1} normal={[275, 295]} onChange={set('measured')} />
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Calculated">
            <div className="grid grid-cols-2 gap-3">
              <Readout label="Anion gap" value={ag.toFixed(0)} unit="mmol/L" status={ag > 12 ? 'alert' : 'ok'} note="Na − (Cl + HCO₃)" />
              <Readout label="Albumin-corrected AG" value={cag.toFixed(1)} unit="mmol/L" status={cag > 12 ? 'alert' : 'ok'} note="+2.5 × (4 − albumin)" />
              <Readout label="Calculated osmolality" value={t.calculated.toFixed(0)} unit="mOsm/kg" note="2Na + glu/18 + BUN/2.8 + EtOH/3.7" />
              <Readout label="Osmolal gap" value={gap.toFixed(0)} unit="mOsm/kg" status={gap > 10 ? 'alert' : 'ok'} note="measured − calculated" />
              <Readout label="Effective osmolality (tonicity)" value={t.effective.toFixed(0)} unit="mOsm/kg" status={t.effective < 275 ? 'warn' : t.effective > 300 ? 'alert' : 'ok'} note="2Na + glu/18" />
              <Readout label="Glucose-corrected Na⁺" value={`${t.correctedNa16.toFixed(0)}–${t.correctedNa24.toFixed(0)}`} unit="mmol/L" note="Katz 1.6 – Hillier 2.4" />
            </div>
          </Panel>
          <Panel title="Interpretation">
            {notes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No osmolality or anion-gap abnormality.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {notes.map((n) => (
                  <li key={n} className="rounded-md border-l-4 border-primary bg-primary/5 p-3">
                    <Rich text={n} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </LabShell>
  );
}
