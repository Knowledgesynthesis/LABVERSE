export interface MapNode {
  id: string;
  label: string;
  name: string;
  group: 'water' | 'acid-base' | 'kidney' | 'minerals' | 'liver' | 'endocrine' | 'muscle';
  x: number;
  y: number;
}

export interface MapEdge {
  a: string;
  b: string;
  text: string;
  lessonId: string;
}

export const mapNodes: MapNode[] = [
  { id: 'osm', label: 'Osm', name: 'Osmolality', group: 'water', x: 120, y: 110 },
  { id: 'na', label: 'Na⁺', name: 'Sodium', group: 'water', x: 270, y: 70 },
  { id: 'avp', label: 'AVP', name: 'Vasopressin', group: 'water', x: 420, y: 80 },
  { id: 'cortisol', label: 'Cortisol', name: 'Cortisol', group: 'endocrine', x: 570, y: 70 },
  { id: 'tsh', label: 'TSH', name: 'TSH / thyroid', group: 'endocrine', x: 720, y: 90 },
  { id: 'glucose', label: 'Glu', name: 'Glucose / insulin', group: 'endocrine', x: 870, y: 140 },
  { id: 'cl', label: 'Cl⁻', name: 'Chloride', group: 'acid-base', x: 90, y: 250 },
  { id: 'k', label: 'K⁺', name: 'Potassium', group: 'water', x: 320, y: 220 },
  { id: 'aldo', label: 'Aldo', name: 'Aldosterone / renin', group: 'endocrine', x: 520, y: 200 },
  { id: 'ketones', label: 'β-OHB', name: 'Ketones / lactate', group: 'acid-base', x: 890, y: 290 },
  { id: 'pco2', label: 'PaCO₂', name: 'PaCO₂', group: 'acid-base', x: 80, y: 420 },
  { id: 'hco3', label: 'HCO₃⁻', name: 'Bicarbonate', group: 'acid-base', x: 230, y: 360 },
  { id: 'ag', label: 'AG', name: 'Anion gap', group: 'acid-base', x: 430, y: 340 },
  { id: 'bun', label: 'BUN', name: 'Urea', group: 'kidney', x: 650, y: 320 },
  { id: 'cr', label: 'Cr', name: 'Creatinine / GFR', group: 'kidney', x: 790, y: 400 },
  { id: 'ck', label: 'CK', name: 'Creatine kinase', group: 'muscle', x: 920, y: 460 },
  { id: 'pth', label: 'PTH', name: 'Parathyroid hormone', group: 'minerals', x: 110, y: 580 },
  { id: 'ca', label: 'Ca²⁺', name: 'Calcium', group: 'minerals', x: 260, y: 540 },
  { id: 'albumin', label: 'Alb', name: 'Albumin', group: 'liver', x: 420, y: 520 },
  { id: 'inr', label: 'INR', name: 'INR', group: 'liver', x: 580, y: 470 },
  { id: 'mg', label: 'Mg²⁺', name: 'Magnesium', group: 'minerals', x: 380, y: 650 },
  { id: 'phos', label: 'PO₄', name: 'Phosphate', group: 'minerals', x: 560, y: 630 },
  { id: 'alt', label: 'ALT', name: 'Aminotransferases', group: 'liver', x: 730, y: 560 },
  { id: 'bili', label: 'Bili', name: 'Bilirubin / ALP', group: 'liver', x: 880, y: 620 },
];

export const mapEdges: MapEdge[] = [
  { a: 'osm', b: 'na', text: 'Na⁺ salts supply ~90% of effective osmolality (2 × Na⁺).', lessonId: 'electrolytes-intro' },
  { a: 'osm', b: 'glucose', text: 'Glucose is an effective osmole without insulin: each 100 mg/dL above 100 lowers Na⁺ by 1.6–2.4 mmol/L.', lessonId: 'sodium-disorders' },
  { a: 'osm', b: 'bun', text: 'Urea raises measured osmolality but not tonicity.', lessonId: 'electrolytes-intro' },
  { a: 'osm', b: 'ag', text: 'Toxic alcohols: osmolal gap first, anion gap later as acids form.', lessonId: 'metabolic-acidosis' },
  { a: 'avp', b: 'na', text: 'AVP controls water: non-osmotic release → hyponatremia; deficiency/resistance → hypernatremia.', lessonId: 'sodium-disorders' },
  { a: 'cortisol', b: 'avp', text: 'Cortisol deficiency removes AVP restraint → SIADH-like hyponatremia (secondary AI).', lessonId: 'adrenal-testing' },
  { a: 'tsh', b: 'na', text: 'Only severe hypothyroidism impairs free-water excretion enough to cause hyponatremia.', lessonId: 'thyroid-testing' },
  { a: 'aldo', b: 'k', text: 'Aldosterone drives K⁺ secretion: excess → hypokalemia; deficiency or blockade → hyperkalemia.', lessonId: 'potassium-disorders' },
  { a: 'aldo', b: 'hco3', text: 'Mineralocorticoid excess generates and maintains metabolic alkalosis.', lessonId: 'metabolic-alkalosis' },
  { a: 'aldo', b: 'na', text: 'Primary adrenal insufficiency (low aldosterone) causes hyponatremia with hyperkalemia.', lessonId: 'adrenal-testing' },
  { a: 'hco3', b: 'k', text: 'Mineral (normal-AG) acidosis shifts K⁺ out of cells; alkalosis shifts it in.', lessonId: 'potassium-disorders' },
  { a: 'glucose', b: 'k', text: 'Insulin drives K⁺ into cells; insulin deficiency raises serum K⁺ despite a total-body deficit.', lessonId: 'diabetes-markers' },
  { a: 'glucose', b: 'ketones', text: 'Insulin deficiency → ketogenesis; SGLT2 inhibitors cause euglycemic DKA.', lessonId: 'diabetes-markers' },
  { a: 'glucose', b: 'cortisol', text: 'Cortisol deficiency → hypoglycemia; excess → hyperglycemia.', lessonId: 'adrenal-testing' },
  { a: 'mg', b: 'k', text: 'Magnesium depletion causes renal K⁺ wasting (refractory hypokalemia).', lessonId: 'mg-phos' },
  { a: 'mg', b: 'ca', text: 'Severe hypo- or hypermagnesemia suppresses PTH → hypocalcemia.', lessonId: 'mg-phos' },
  { a: 'pth', b: 'ca', text: 'PTH raises Ca²⁺ via bone resorption, renal reabsorption and 1,25-D synthesis.', lessonId: 'calcium-disorders' },
  { a: 'pth', b: 'phos', text: 'PTH and PTHrP are phosphaturic → low phosphate.', lessonId: 'calcium-disorders' },
  { a: 'albumin', b: 'ca', text: 'Albumin binds ~40% of calcium: low albumin lowers total, not ionized, Ca²⁺.', lessonId: 'calcium-disorders' },
  { a: 'albumin', b: 'ag', text: 'Each 1 g/dL fall in albumin lowers the anion gap by ~2.5 mmol/L.', lessonId: 'metabolic-acidosis' },
  { a: 'ag', b: 'hco3', text: 'Unmeasured acid anions consume HCO₃⁻; compare the two with Δ/Δ.', lessonId: 'metabolic-acidosis' },
  { a: 'ag', b: 'ketones', text: 'Ketoacids and lactate are the commonest high-AG anions.', lessonId: 'metabolic-acidosis' },
  { a: 'ag', b: 'cr', text: 'Advanced kidney failure retains sulfate, phosphate and urate → high AG.', lessonId: 'metabolic-acidosis' },
  { a: 'cl', b: 'hco3', text: 'Cl⁻ and HCO₃⁻ move reciprocally: hyperchloremic acidosis, hypochloremic alkalosis.', lessonId: 'metabolic-alkalosis' },
  { a: 'cl', b: 'na', text: 'Large-volume 0.9% saline (Na⁺ = Cl⁻ = 154) causes hyperchloremic acidosis.', lessonId: 'metabolic-acidosis' },
  { a: 'pco2', b: 'hco3', text: 'Henderson–Hasselbalch links them: compensation moves the other variable the same direction.', lessonId: 'acid-base-intro' },
  { a: 'pco2', b: 'ca', text: 'Alkalosis increases albumin binding of Ca²⁺ → low ionized calcium (tetany with hyperventilation).', lessonId: 'calcium-disorders' },
  { a: 'bun', b: 'cr', text: 'BUN/Cr ratio: high in prerenal states, GI bleeding, catabolism; low in liver disease and rhabdomyolysis.', lessonId: 'renal-intro' },
  { a: 'bun', b: 'inr', text: 'Liver failure lowers urea synthesis (low BUN) while INR rises.', lessonId: 'synthetic-function' },
  { a: 'cr', b: 'k', text: 'Falling GFR limits K⁺ excretion, especially with RAAS blockade.', lessonId: 'aki-vs-ckd' },
  { a: 'cr', b: 'phos', text: 'CKD retains phosphate → secondary hyperparathyroidism (CKD-MBD).', lessonId: 'mg-phos' },
  { a: 'ck', b: 'cr', text: 'Rhabdomyolysis: myoglobin causes AKI and creatine release raises creatinine.', lessonId: 'tissue-injury-markers' },
  { a: 'ck', b: 'k', text: 'Muscle breakdown releases K⁺, phosphate and urate.', lessonId: 'tissue-injury-markers' },
  { a: 'ck', b: 'alt', text: 'AST (and some ALT) leak from muscle — AST ≫ ALT with high CK is not liver injury.', lessonId: 'tissue-injury-markers' },
  { a: 'tsh', b: 'ck', text: 'Hypothyroid myopathy raises CK.', lessonId: 'thyroid-testing' },
  { a: 'phos', b: 'ca', text: 'High phosphate precipitates calcium (tumor lysis, rhabdomyolysis) → hypocalcemia.', lessonId: 'mg-phos' },
  { a: 'alt', b: 'inr', text: 'ALT measures injury; INR measures function — ALF = INR ≥ 1.5 + encephalopathy.', lessonId: 'synthetic-function' },
  { a: 'alt', b: 'bili', text: 'R ratio (ALT vs ALP) and bilirubin fraction classify liver injury.', lessonId: 'hepatic-intro' },
  { a: 'albumin', b: 'inr', text: 'Synthetic pair: albumin changes over weeks, INR within hours.', lessonId: 'synthetic-function' },
];
