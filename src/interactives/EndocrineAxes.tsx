import { useMemo, useState } from 'react';
import { CheckCircle2, Shuffle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { shuffle } from '../lib/quiz';
import { Button } from '../components/ui/Button';
import { LabShell, Panel, Toggle } from './shared';

type Level = 'very low' | 'low' | 'normal' | 'high' | 'very high' | 'low*' | 'high*';

interface AxisNode {
  key: string;
  organ: string;
  hormone: string;
}
interface Condition {
  id: string;
  label: string;
  levels: Record<string, Level>;
  why: string;
  clue?: string;
}
interface Axis {
  id: 'thyroid' | 'adrenal' | 'raas';
  label: string;
  nodes: AxisNode[];
  conditions: Condition[];
}

const AXES: Axis[] = [
  {
    id: 'thyroid',
    label: 'Thyroid (HPT)',
    nodes: [
      { key: 'trh', organ: 'Hypothalamus', hormone: 'TRH' },
      { key: 'tsh', organ: 'Pituitary', hormone: 'TSH' },
      { key: 'ft4', organ: 'Thyroid', hormone: 'Free T4' },
    ],
    conditions: [
      { id: 'eu', label: 'Euthyroid', levels: { trh: 'normal', tsh: 'normal', ft4: 'normal' }, why: 'Feedback balanced.' },
      { id: 'p-hypo', label: 'Primary hypothyroidism', levels: { trh: 'high', tsh: 'very high', ft4: 'low' }, why: 'Gland failure removes negative feedback: TRH and TSH climb.', clue: 'TPO antibodies (Hashimoto)' },
      { id: 'sch', label: 'Subclinical hypothyroidism', levels: { trh: 'normal', tsh: 'high', ft4: 'normal' }, why: 'A small FT4 fall within the normal range produces a large TSH rise (log-linear).', clue: 'Repeat in 6–12 weeks' },
      { id: 'graves', label: 'Graves disease', levels: { trh: 'low', tsh: 'very low', ft4: 'very high' }, why: 'TSH-receptor antibodies stimulate the gland autonomously; feedback suppresses TRH and TSH.', clue: 'TRAb/TSI positive, diffuse uptake' },
      { id: 'c-hypo', label: 'Central hypothyroidism', levels: { trh: 'high', tsh: 'normal', ft4: 'low' }, why: 'The pituitary cannot respond: TSH is inappropriately normal or low (sometimes mildly high but bio-inactive).', clue: 'Check cortisol before starting levothyroxine' },
      { id: 'tshoma', label: 'TSH-secreting adenoma', levels: { trh: 'low', tsh: 'high', ft4: 'high' }, why: 'Autonomous pituitary TSH drives the gland despite high FT4 — "inappropriate TSH".', clue: 'Exclude assay interference first; α-subunit, MRI' },
      { id: 'exo', label: 'Excess levothyroxine', levels: { trh: 'low', tsh: 'very low', ft4: 'high' }, why: 'Exogenous hormone suppresses the axis and the gland itself.', clue: 'Low thyroglobulin distinguishes it from thyroiditis' },
      { id: 'nti', label: 'Non-thyroidal illness', levels: { trh: 'low', tsh: 'low', ft4: 'low' }, why: 'Cytokines, dopamine and glucocorticoids suppress TRH/TSH; T3 falls first.', clue: 'Avoid testing in acute illness' },
      { id: 'biotin', label: 'Biotin interference (artifact)', levels: { trh: 'normal', tsh: 'low*', ft4: 'high*' }, why: 'The patient is euthyroid; streptavidin assays read sandwich TSH low and competitive FT4 high.', clue: 'Ask about supplements; repeat off biotin' },
    ],
  },
  {
    id: 'adrenal',
    label: 'Adrenal (HPA)',
    nodes: [
      { key: 'crh', organ: 'Hypothalamus', hormone: 'CRH' },
      { key: 'acth', organ: 'Pituitary', hormone: 'ACTH' },
      { key: 'cortisol', organ: 'Adrenal cortex', hormone: 'Cortisol' },
      { key: 'aldo', organ: 'Zona glomerulosa', hormone: 'Aldosterone' },
    ],
    conditions: [
      { id: 'n', label: 'Normal', levels: { crh: 'normal', acth: 'normal', cortisol: 'normal', aldo: 'normal' }, why: 'Diurnal rhythm with feedback.' },
      { id: 'addison', label: 'Primary AI (Addison)', levels: { crh: 'high', acth: 'very high', cortisol: 'low', aldo: 'low' }, why: 'Adrenal destruction removes cortisol and aldosterone; ACTH rises (hyperpigmentation); renin and K⁺ rise.', clue: '21-hydroxylase antibodies' },
      { id: 'secondary', label: 'Secondary AI (pituitary)', levels: { crh: 'high', acth: 'low', cortisol: 'low', aldo: 'normal' }, why: 'No ACTH drive; aldosterone is renin-driven so it is preserved — no hyperkalemia.', clue: 'Hyponatremia mimicking SIADH' },
      { id: 'exogenous', label: 'Exogenous glucocorticoid', levels: { crh: 'low', acth: 'low', cortisol: 'low', aldo: 'normal' }, why: 'Prednisone etc. suppress CRH/ACTH; endogenous cortisol falls (prednisolone may cross-react in immunoassays).', clue: 'Risk of crisis on abrupt withdrawal' },
      { id: 'cushing-d', label: 'Cushing disease', levels: { crh: 'low', acth: 'high', cortisol: 'high', aldo: 'normal' }, why: 'Pituitary adenoma secretes ACTH, partially resistant to feedback.', clue: 'High-dose dexamethasone partially suppresses' },
      { id: 'ectopic', label: 'Ectopic ACTH', levels: { crh: 'low', acth: 'very high', cortisol: 'very high', aldo: 'normal' }, why: 'Tumor ACTH (e.g., small-cell lung cancer) ignores feedback; extreme cortisol causes hypokalemic alkalosis.', clue: 'Rapid onset, hypokalemia' },
      { id: 'adrenal-adenoma', label: 'Cortisol-secreting adrenal adenoma', levels: { crh: 'low', acth: 'very low', cortisol: 'high', aldo: 'normal' }, why: 'Autonomous adrenal cortisol suppresses CRH and ACTH; contralateral adrenal atrophies.', clue: 'ACTH < 10 pg/mL → adrenal CT' },
    ],
  },
  {
    id: 'raas',
    label: 'Renin–angiotensin–aldosterone',
    nodes: [
      { key: 'renin', organ: 'Kidney (JG cells)', hormone: 'Renin' },
      { key: 'ang', organ: 'Circulation', hormone: 'Angiotensin II' },
      { key: 'aldo', organ: 'Adrenal', hormone: 'Aldosterone' },
      { key: 'k', organ: 'Collecting duct', hormone: 'Serum K⁺' },
    ],
    conditions: [
      { id: 'n', label: 'Normal', levels: { renin: 'normal', ang: 'normal', aldo: 'normal', k: 'normal' }, why: 'Volume and K⁺ feedback balanced.' },
      { id: 'pa', label: 'Primary aldosteronism', levels: { renin: 'very low', ang: 'low', aldo: 'high', k: 'low' }, why: 'Autonomous aldosterone expands volume and suppresses renin; K⁺ often normal.', clue: 'High ARR; screen all hypertension (ES 2025)' },
      { id: 'secondary', label: 'Secondary hyperaldosteronism', levels: { renin: 'high', ang: 'high', aldo: 'high', k: 'low' }, why: 'Low effective arterial volume or renal ischemia drives renin (renovascular, diuretics, HF, cirrhosis).', clue: 'Renal artery stenosis, diuretics' },
      { id: 'type4', label: 'Hyporeninemic hypoaldosteronism', levels: { renin: 'low', ang: 'low', aldo: 'low', k: 'high' }, why: 'Diabetic nephropathy, NSAIDs, calcineurin inhibitors suppress renin → type 4 RTA.', clue: 'Hyperkalemic normal-AG acidosis' },
      { id: 'acei', label: 'ACE inhibitor', levels: { renin: 'high', ang: 'low', aldo: 'low', k: 'high' }, why: 'Loss of angiotensin II removes feedback on renin and drive to aldosterone.', clue: 'Watch K⁺ with CKD, MRAs, trimethoprim' },
      { id: 'licorice', label: 'Licorice / Liddle syndrome', levels: { renin: 'very low', ang: 'low', aldo: 'low', k: 'low' }, why: 'Mineralocorticoid-like effect without aldosterone (cortisol acting on MR, or ENaC gain-of-function) suppresses the whole axis.', clue: 'Hypertension + hypokalemia, low aldosterone' },
      { id: 'addison', label: 'Primary adrenal insufficiency', levels: { renin: 'very high', ang: 'high', aldo: 'very low', k: 'high' }, why: 'Adrenal cannot respond to angiotensin II.', clue: 'Hyponatremia + hyperkalemia' },
    ],
  },
];

const LEVEL_STYLE: Record<Level, { text: string; cls: string }> = {
  'very low': { text: '↓↓', cls: 'bg-blue-600 text-white' },
  low: { text: '↓', cls: 'bg-blue-500/80 text-white' },
  normal: { text: '↔', cls: 'bg-muted text-foreground' },
  high: { text: '↑', cls: 'bg-red-500/80 text-white' },
  'very high': { text: '↑↑', cls: 'bg-red-600 text-white' },
  'low*': { text: '↓*', cls: 'bg-blue-500/30 text-blue-700 dark:text-blue-200 border border-dashed border-blue-500' },
  'high*': { text: '↑*', cls: 'bg-red-500/30 text-red-700 dark:text-red-200 border border-dashed border-red-500' },
};

function AxisDiagram({ axis, cond }: { axis: Axis; cond: Condition }) {
  const n = axis.nodes.length;
  const h = 110 * n;
  return (
    <svg viewBox={`0 0 420 ${h}`} className="h-auto w-full max-w-md" role="img" aria-label={`${axis.label} feedback diagram: ${cond.label}`}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
        </marker>
      </defs>
      {axis.nodes.map((node, i) => {
        const y = 20 + i * 110;
        const lvl = cond.levels[node.key] ?? 'normal';
        const st = LEVEL_STYLE[lvl];
        return (
          <g key={node.key}>
            <rect x={70} y={y} width={220} height={66} rx={12} className="fill-card stroke-border" strokeWidth={1.5} />
            <text x={86} y={y + 25} className="fill-muted-foreground text-[12px]">
              {node.organ}
            </text>
            <text x={86} y={y + 49} className="fill-foreground text-[17px] font-bold">
              {node.hormone}
            </text>
            <foreignObject x={300} y={y + 14} width={110} height={40}>
              <div className={cn('flex h-9 items-center justify-center rounded-lg px-2 text-sm font-bold capitalize', st.cls)}>
                {st.text} {lvl.replace('*', '')}
              </div>
            </foreignObject>
            {i < n - 1 && <line x1={180} y1={y + 68} x2={180} y2={y + 106} className="stroke-muted-foreground" strokeWidth={2} markerEnd="url(#arrow)" />}
          </g>
        );
      })}
      {n > 1 && (
        <path
          d={`M 70 ${20 + (n - 1) * 110 + 33} C 20 ${20 + (n - 1) * 110 + 33}, 20 53, 68 53`}
          fill="none"
          className="stroke-destructive"
          strokeWidth={2}
          strokeDasharray="6 5"
          markerEnd="url(#arrow)"
        />
      )}
      {n > 1 && (
        <text x={6} y={h / 2} className="fill-destructive text-[11px]" transform={`rotate(-90 12 ${h / 2})`}>
          negative feedback
        </text>
      )}
    </svg>
  );
}

const GRIDS: Record<Axis['id'], { rowLabel: string; colLabel: string; rows: string[]; cols: string[]; cells: string[][] }> = {
  thyroid: {
    rowLabel: 'TSH',
    colLabel: 'FT4',
    rows: ['High', 'Normal', 'Low'],
    cols: ['Low', 'Normal', 'High'],
    cells: [
      ['Primary hypothyroidism', 'Subclinical hypothyroidism · recovery from NTI · macro-TSH', 'TSHoma · thyroid hormone resistance · interference'],
      ['Early central hypothyroidism · NTI', 'Euthyroid', 'Interference · heparin · amiodarone · TSHoma'],
      ['Central hypothyroidism · severe NTI', 'Subclinical hyperthyroidism · first trimester · steroids/dopamine', 'Graves · toxic nodule · thyroiditis · exogenous · biotin artifact'],
    ],
  },
  adrenal: {
    rowLabel: 'ACTH',
    colLabel: 'Cortisol',
    rows: ['High', 'Normal', 'Low'],
    cols: ['Low', 'Normal', 'High'],
    cells: [
      ['Primary adrenal insufficiency', 'Compensated primary AI · recovery', 'Cushing disease · ectopic ACTH'],
      ['Early secondary AI', 'Normal', 'Mild Cushing disease · stress'],
      ['Secondary/tertiary AI · exogenous glucocorticoid', '—', 'Adrenal Cushing (adenoma/carcinoma)'],
    ],
  },
  raas: {
    rowLabel: 'Renin',
    colLabel: 'Aldosterone',
    rows: ['High', 'Low'],
    cols: ['Low', 'High'],
    cells: [
      ['Primary AI · ACE-I/ARB', 'Secondary hyperaldosteronism (renovascular, diuretics, HF, cirrhosis)'],
      ['Hyporeninemic hypoaldosteronism · licorice · Liddle · Cushing', 'Primary aldosteronism'],
    ],
  },
};

export default function EndocrineAxes() {
  const [axisId, setAxisId] = useState<Axis['id']>('thyroid');
  const [condId, setCondId] = useState('p-hypo');
  const [tab, setTab] = useState<'explore' | 'grid' | 'quiz'>('explore');
  const axis = AXES.find((a) => a.id === axisId)!;
  const cond = axis.conditions.find((c) => c.id === condId) ?? axis.conditions[0];

  // quiz
  const [round, setRound] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const quiz = useMemo(() => {
    const pool = axis.conditions.filter((c) => c.id !== 'n' && c.id !== 'eu');
    const target = pool[(round * 7 + axisId.length) % pool.length];
    const distractors = shuffle(
      pool.filter((c) => c.id !== target.id),
      round + 3
    ).slice(0, 3);
    return { target, options: shuffle([target, ...distractors], round + 11) };
  }, [axis, axisId, round]);

  return (
    <LabShell
      id="endocrine-axes"
      lessons={['thyroid-testing', 'adrenal-testing']}
      insights={[
        'Primary disease moves the trophic hormone opposite to the gland hormone; central disease moves them together.',
        'An "inappropriately normal" trophic hormone is abnormal when the target hormone is low or high.',
        'Artifacts (dashed badges) mimic disease — the patient\'s clinical state is the tie-breaker.',
        'In RAAS disorders, renin tells you whether aldosterone is responding or driving.',
      ]}
    >
      <Panel
        title="Axis"
        right={
          <Toggle
            label="Mode"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'explore', label: 'Explore' },
              { value: 'grid', label: 'Pattern grid' },
              { value: 'quiz', label: 'Test yourself' },
            ]}
          />
        }
      >
        <Toggle
          label="Axis"
          value={axisId}
          onChange={(v) => {
            setAxisId(v);
            setCondId(AXES.find((a) => a.id === v)!.conditions[1].id);
            setPick(null);
          }}
          options={AXES.map((a) => ({ value: a.id, label: a.label }))}
        />
      </Panel>

      {tab === 'explore' && (
        <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <Panel title="Condition">
            <div className="flex flex-col gap-1.5">
              {axis.conditions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCondId(c.id)}
                  aria-pressed={c.id === cond.id}
                  className={cn('rounded-md border px-3 py-2 text-left text-sm', c.id === cond.id ? 'border-primary bg-primary/10 font-semibold' : 'hover:bg-accent')}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Panel>
          <Panel title={cond.label}>
            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_16rem]">
              <AxisDiagram axis={axis} cond={cond} />
              <div className="space-y-3 text-sm">
                <p>{cond.why}</p>
                {cond.clue && (
                  <p className="rounded-md border-l-4 border-primary bg-primary/5 p-3">
                    <span className="font-semibold">Next clue: </span>
                    {cond.clue}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">Dashed badges = measured value is an artifact, not the true hormone level.</p>
              </div>
            </div>
          </Panel>
        </div>
      )}

      {tab === 'grid' && (
        <Panel title={`${GRIDS[axisId].rowLabel} × ${GRIDS[axisId].colLabel}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-separate border-spacing-1 text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-left text-xs text-muted-foreground">
                    {GRIDS[axisId].rowLabel} ↓ / {GRIDS[axisId].colLabel} →
                  </th>
                  {GRIDS[axisId].cols.map((c) => (
                    <th key={c} className="p-2 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GRIDS[axisId].rows.map((r, i) => (
                  <tr key={r}>
                    <th className="p-2 text-left font-semibold">{r}</th>
                    {GRIDS[axisId].cells[i].map((cell, j) => (
                      <td key={j} className={cn('rounded-lg p-3 align-top leading-snug', cell === 'Euthyroid' || cell === 'Normal' ? 'bg-success/10' : 'bg-muted/50')}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      {tab === 'quiz' && (
        <Panel title="Which condition fits this pattern?" right={<span className="text-sm font-semibold tabular">{score.right}/{score.total}</span>}>
          <div className="mb-4 flex flex-wrap gap-3">
            {axis.nodes.map((node) => {
              const lvl = quiz.target.levels[node.key] ?? 'normal';
              return (
                <div key={node.key} className="rounded-lg border p-3 text-center">
                  <p className="text-xs text-muted-foreground">{node.hormone}</p>
                  <p className={cn('mt-1 rounded px-3 py-1 font-bold capitalize', LEVEL_STYLE[lvl].cls)}>
                    {LEVEL_STYLE[lvl].text} {lvl.replace('*', '')}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {quiz.options.map((o) => {
              const isAns = o.id === quiz.target.id;
              const chosen = pick === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  disabled={!!pick}
                  onClick={() => {
                    setPick(o.id);
                    setScore((s) => ({ right: s.right + (isAns ? 1 : 0), total: s.total + 1 }));
                  }}
                  className={cn(
                    'flex items-center gap-2 rounded-md border p-3 text-left text-sm',
                    !pick && 'hover:bg-accent',
                    pick && isAns && 'border-success bg-success/10',
                    pick && chosen && !isAns && 'border-destructive bg-destructive/10'
                  )}
                >
                  {pick && isAns && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {pick && chosen && !isAns && <XCircle className="h-4 w-4 text-destructive" />}
                  {o.label}
                </button>
              );
            })}
          </div>
          {pick && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="flex-1 text-sm">
                <span className="font-semibold">{quiz.target.label}:</span> {quiz.target.why}
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setRound((r) => r + 1);
                  setPick(null);
                }}
              >
                <Shuffle className="h-4 w-4" /> Next pattern
              </Button>
            </div>
          )}
        </Panel>
      )}
    </LabShell>
  );
}
