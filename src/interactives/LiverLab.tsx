import { useState } from 'react';
import { astAltComment, childPugh, hysLaw, injuryPattern, magnitude, meld3, rFactor, type Ascites, type Encephalopathy } from '../lib/clinical/hepatic';
import { cn } from '../lib/utils';
import { LabShell, Panel, Presets, Readout, Slider, Toggle } from './shared';

interface S {
  alt: number;
  ast: number;
  alp: number;
  tbili: number;
  dbili: number;
  inr: number;
  albumin: number;
  na: number;
  cr: number;
  platelets: number;
  ldh: number;
  age: number;
}

const BASE: S = { alt: 24, ast: 22, alp: 80, tbili: 0.7, dbili: 0.1, inr: 1.0, albumin: 4.2, na: 140, cr: 0.9, platelets: 250, ldh: 180, age: 45 };

const PRESETS: { label: string; values: S; extra?: { ascites: Ascites; he: Encephalopathy; cirrhosis: boolean }; note: string }[] = [
  { label: 'Normal', values: BASE, note: 'Healthy adult' },
  { label: 'Acute viral hepatitis', values: { ...BASE, alt: 1450, ast: 1280, alp: 142, tbili: 8.2, dbili: 5.8, inr: 1.2, albumin: 3.8, ldh: 420, age: 28 }, note: 'ALT/LDH > 1.5' },
  { label: 'Acetaminophen', values: { ...BASE, alt: 3800, ast: 5200, alp: 110, tbili: 2.1, dbili: 1.2, inr: 2.4, albumin: 3.9, ldh: 2600, age: 19 }, note: 'Massive AST > ALT, coagulopathy' },
  { label: 'Ischemic hepatitis', values: { ...BASE, alt: 3100, ast: 4200, alp: 95, tbili: 1.8, dbili: 0.9, inr: 1.9, ldh: 6200, cr: 2.0, age: 74 }, note: 'ALT/LDH < 1.5' },
  { label: 'Common-duct stone', values: { ...BASE, alt: 420, ast: 310, alp: 380, tbili: 4.2, dbili: 3.3, ldh: 260, age: 51 }, note: 'Mixed → cholestatic' },
  { label: 'PBC', values: { ...BASE, alt: 62, ast: 48, alp: 450, tbili: 0.9, dbili: 0.3, age: 52 }, note: 'Cholestatic, AMA+' },
  { label: 'Alcohol-associated hepatitis', values: { ...BASE, alt: 70, ast: 180, alp: 160, tbili: 9.5, dbili: 6.8, inr: 1.8, albumin: 2.9, na: 132, cr: 1.1, platelets: 120, age: 46 }, note: 'AST/ALT > 2, jaundice' },
  { label: 'Gilbert', values: { ...BASE, tbili: 2.4, dbili: 0.3, age: 22 }, note: 'Isolated unconjugated' },
  { label: 'MASLD', values: { ...BASE, alt: 64, ast: 48, alp: 90, platelets: 160, age: 56 }, note: 'Check FIB-4' },
  {
    label: 'Decompensated cirrhosis',
    values: { ...BASE, alt: 40, ast: 75, alp: 140, tbili: 3.5, dbili: 1.9, inr: 1.9, albumin: 2.6, na: 129, cr: 1.4, platelets: 72, age: 61 },
    extra: { ascites: 'moderate-severe', he: 'grade 1-2', cirrhosis: true },
    note: 'MELD 3.0 and Child–Pugh',
  },
];

export default function LiverLab() {
  const [s, setS] = useState<S>(BASE);
  const [female, setFemale] = useState(true);
  const [ascites, setAscites] = useState<Ascites>('none');
  const [he, setHe] = useState<Encephalopathy>('none');
  const [cirrhosis, setCirrhosis] = useState(false);
  const [active, setActive] = useState('Normal');
  const set = (k: keyof S) => (v: number) => {
    setActive('');
    setS((x) => ({ ...x, [k]: Math.min(k === 'dbili' ? x.tbili : Infinity, v) }));
  };

  const altUln = female ? 25 : 33;
  const astUln = female ? 31 : 35;
  const alpUln = 120;
  const biliUln = 1.2;
  const r = rFactor(s.alt, altUln, s.alp, alpUln);
  const pattern = injuryPattern(s.alt, altUln, s.alp, alpUln);
  const directFrac = s.tbili > 0 ? s.dbili / s.tbili : 0;
  const hy = hysLaw(s.alt, altUln, s.tbili, biliUln, s.alp, alpUln);
  const altLdh = s.alt / s.ldh;
  const meld = meld3({ bilirubin: s.tbili, inr: s.inr, creatinine: s.cr, sodium: s.na, albumin: s.albumin, female });
  const cp = childPugh(s.tbili, s.albumin, s.inr, ascites, he);
  const fib4 = (s.age * s.ast) / (s.platelets * Math.sqrt(s.alt));
  const alf = !cirrhosis && s.inr >= 1.5 && he !== 'none';

  const bilirubinNote =
    s.tbili <= biliUln
      ? 'Bilirubin normal.'
      : directFrac < 0.2
        ? `Unconjugated predominance (direct ${(directFrac * 100).toFixed(0)}%): Gilbert, hemolysis, drugs.`
        : `Conjugated hyperbilirubinemia (direct ${(directFrac * 100).toFixed(0)}%): hepatocellular or biliary disease.`;

  return (
    <LabShell
      id="hepatic-pattern"
      lessons={['hepatic-intro', 'cholestatic-vs-hepatocellular', 'synthetic-function']}
      insights={[
        'R uses ULN-normalized values: ALT 400 with ALP 240 is hepatocellular (R = 5 with typical ULNs), not "mixed".',
        'Compare viral vs ischemic presets: similar aminotransferases, but ALT/LDH separates them.',
        'Aminotransferase height does not measure prognosis — INR, bilirubin and encephalopathy do.',
        'Sex changes the ALT ULN (ACG: ~25 women, ~33 men) and contributes 1.33 points to MELD 3.0.',
      ]}
    >
      <Panel title="Scenarios" right={<Toggle label="Sex" value={female ? 'f' : 'm'} onChange={(v) => setFemale(v === 'f')} options={[{ value: 'f', label: 'Female' }, { value: 'm', label: 'Male' }]} />}>
        <Presets
          presets={PRESETS}
          active={active}
          onPick={(v, l) => {
            setS(v);
            setActive(l);
            const p = PRESETS.find((x) => x.label === l);
            setAscites(p?.extra?.ascites ?? 'none');
            setHe(p?.extra?.he ?? 'none');
            setCirrhosis(p?.extra?.cirrhosis ?? false);
          }}
        />
      </Panel>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Inputs">
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider label="ALT" unit="IU/L" value={s.alt} min={5} max={8000} step={5} normal={[7, altUln]} onChange={set('alt')} />
            <Slider label="AST" unit="IU/L" value={s.ast} min={5} max={8000} step={5} normal={[8, astUln]} onChange={set('ast')} />
            <Slider label="ALP" unit="IU/L" value={s.alp} min={20} max={1500} step={5} normal={[40, alpUln]} onChange={set('alp')} />
            <Slider label="LDH" unit="IU/L" value={s.ldh} min={100} max={8000} step={10} normal={[125, 220]} onChange={set('ldh')} />
            <Slider label="Total bilirubin" unit="mg/dL" value={s.tbili} min={0.2} max={30} step={0.1} normal={[0.2, biliUln]} onChange={set('tbili')} />
            <Slider label="Direct bilirubin" unit="mg/dL" value={s.dbili} min={0} max={25} step={0.1} normal={[0, 0.3]} onChange={set('dbili')} />
            <Slider label="INR" value={s.inr} min={0.8} max={8} step={0.1} normal={[0.8, 1.1]} onChange={set('inr')} />
            <Slider label="Albumin" unit="g/dL" value={s.albumin} min={1.5} max={5.5} step={0.1} normal={[3.5, 5]} onChange={set('albumin')} />
            <Slider label="Sodium" unit="mmol/L" value={s.na} min={115} max={150} step={1} normal={[135, 145]} onChange={set('na')} />
            <Slider label="Creatinine" unit="mg/dL" value={s.cr} min={0.3} max={6} step={0.1} normal={[0.5, 1.2]} onChange={set('cr')} />
            <Slider label="Platelets" unit="×10⁹/L" value={s.platelets} min={20} max={600} step={5} normal={[150, 400]} onChange={set('platelets')} />
            <Slider label="Age" unit="years" value={s.age} min={18} max={90} step={1} onChange={set('age')} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-medium">Ascites</span>
            <Toggle label="Ascites" value={ascites} onChange={setAscites} options={[{ value: 'none', label: 'None' }, { value: 'mild', label: 'Mild' }, { value: 'moderate-severe', label: 'Mod–severe' }]} />
            <span className="font-medium">Encephalopathy</span>
            <Toggle label="Encephalopathy" value={he} onChange={setHe} options={[{ value: 'none', label: 'None' }, { value: 'grade 1-2', label: 'Gr 1–2' }, { value: 'grade 3-4', label: 'Gr 3–4' }]} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={cirrhosis} onChange={(e) => setCirrhosis(e.target.checked)} /> Known cirrhosis
            </label>
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Pattern">
            <div className="grid grid-cols-2 gap-3">
              <Readout label="R ratio" value={pattern === 'normal enzymes' ? '—' : r.toFixed(1)} status={pattern === 'normal enzymes' ? 'ok' : 'warn'} note={pattern} big />
              <Readout label="ALT magnitude" value={`${(s.alt / altUln).toFixed(1)}×`} unit="ULN" note={magnitude(s.alt, altUln)} />
              <Readout label="ALT/LDH" value={altLdh.toFixed(2)} status={s.alt > 500 ? (altLdh < 1.5 ? 'warn' : 'ok') : 'neutral'} note={s.alt > 500 ? (altLdh < 1.5 ? 'Favors ischemic or toxic injury' : 'Favors viral hepatitis') : 'Most useful when ALT > ~500'} />
              <Readout label="FIB-4" value={fib4.toFixed(2)} status={fib4 < (s.age >= 65 ? 2 : 1.3) ? 'ok' : fib4 > 2.67 ? 'alert' : 'warn'} note={fib4 < (s.age >= 65 ? 2 : 1.3) ? 'Low risk of advanced fibrosis' : fib4 > 2.67 ? 'High risk — refer/elastography' : 'Indeterminate → elastography'} />
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="rounded-md bg-muted/40 p-2.5">{astAltComment(s.ast, s.alt)}</li>
              <li className="rounded-md bg-muted/40 p-2.5">{bilirubinNote}</li>
              {hy && <li className="rounded-md border-l-4 border-destructive bg-destructive/5 p-2.5 font-medium">Hy&apos;s law pattern (ALT &gt; 3× ULN, bilirubin &gt; 2× ULN, ALP &lt; 2× ULN): if drug-induced, ~10% risk of death or transplant — stop the drug.</li>}
              {alf && <li className="rounded-md border-l-4 border-destructive bg-destructive/5 p-2.5 font-medium">INR ≥ 1.5 with encephalopathy and no known cirrhosis = acute liver failure → transplant-centre referral; NAC if acetaminophen possible.</li>}
            </ul>
          </Panel>
          <Panel title="Severity scores">
            <div className="grid grid-cols-2 gap-3">
              <Readout label="MELD 3.0" value={String(meld)} status={meld >= 20 ? 'alert' : meld >= 15 ? 'warn' : 'neutral'} note="Bounded inputs per OPTN" big />
              <Readout label="Child–Pugh" value={`${cp.points} · ${cp.cls}`} status={cp.cls === 'C' ? 'alert' : cp.cls === 'B' ? 'warn' : 'neutral'} note="A 5–6 · B 7–9 · C 10–15" big />
            </div>
            <p className={cn('mt-3 text-xs text-muted-foreground')}>Scores apply to chronic liver disease (cirrhosis); they are not validated for acute hepatitis.</p>
          </Panel>
        </div>
      </div>
    </LabShell>
  );
}
