import type { ClinicalCase, Lesson, Question } from '../../types';
import { check, danger, evidence, formula, h, p, pearl, pitfall, steps, table, ul } from '../dsl';

export const lessons: Lesson[] = [
  {
    id: 'calcium-disorders',
    moduleId: 'minerals',
    title: 'Calcium Homeostasis and Hypercalcemia',
    summary: 'Ionized vs total calcium, the PTH-first algorithm, FHH, malignancy and acute treatment.',
    minutes: 22,
    bloom: 'analyze',
    objectives: [
      'Explain why ionized calcium is preferred over "corrected" calcium',
      'Classify hypercalcemia as PTH-dependent or PTH-independent',
      'Distinguish primary hyperparathyroidism from FHH',
      'Plan acute treatment of severe hypercalcemia',
    ],
    blocks: [
      p('About 45% of serum calcium is ionized (the active fraction), ~40% albumin-bound and ~15% complexed. **Alkalosis increases albumin binding and lowers ionized calcium** — the reason hyperventilation causes perioral tingling. PTH, 1,25-dihydroxyvitamin D and FGF23 regulate the system through bone, gut and kidney.'),
      formula('"Corrected" calcium (mg/dL) = measured Ca + 0.8 × (4.0 − albumin g/dL)', undefined, 'Payne 1973. SI: + 0.02 × (40 − albumin g/L) mmol/L.'),
      evidence('Albumin-adjusted calcium misclassifies calcium status frequently — especially in CKD, critical illness and marked hypoalbuminemia. Measure **ionized calcium** (anaerobic, heparinized sample, analyzed promptly) whenever the result changes management.'),
      h('Hypercalcemia: PTH first'),
      steps(
        'Algorithm',
        ['Confirm', 'Repeat; check ionized calcium; consider hemoconcentration and prolonged tourniquet.'],
        ['PTH high or inappropriately normal (PTH-dependent)', 'Primary hyperparathyroidism (most common in outpatients), familial hypocalciuric hypercalcemia (FHH), lithium, tertiary hyperparathyroidism (CKD, post-transplant).'],
        ['PTH suppressed (PTH-independent)', 'PTHrP (humoral hypercalcemia of malignancy — most common in inpatients), 1,25(OH)₂D (granulomatous disease, lymphoma), 25(OH)D toxicity (> 150 ng/mL), osteolytic metastases or myeloma (SPEP, serum free light chains), milk–alkali syndrome, thiazides (mild), thyrotoxicosis, vitamin A, immobilization, adrenal insufficiency.']
      ),
      formula('Calcium/creatinine clearance ratio (CCCR) = (urine Ca × serum Cr) ÷ (serum Ca × urine Cr)', undefined, '< 0.01 suggests FHH; > 0.02 favors primary hyperparathyroidism (check vitamin D first — deficiency lowers urine Ca). Genetic CaSR testing resolves the grey zone.'),
      pitfall('Operating on FHH does not cure it. Always calculate the CCCR (and ask about family history) before parathyroidectomy.'),
      check('m-q1'),
      check('m-q2'),
      table(
        ['Primary hyperparathyroidism — surgery indicated if any (5th International Workshop, 2022)'],
        [
          ['Serum Ca > 1 mg/dL (0.25 mmol/L) above the upper limit'],
          ['Osteoporosis (T-score ≤ −2.5) or vertebral fracture'],
          ['eGFR < 60, nephrolithiasis/nephrocalcinosis, or hypercalciuria'],
          ['Age < 50 years'],
        ],
        'Surgery is also appropriate for patients who choose it and have no contraindication.'
      ),
      h('Acute management'),
      table(
        ['Severity', 'Total Ca (mg/dL)', 'Typical features'],
        [
          ['Mild', '< 12', 'Often asymptomatic'],
          ['Moderate', '12–14', 'Polyuria, constipation, fatigue'],
          ['Severe', '> 14', 'Confusion, AKI, arrhythmia — treat urgently'],
        ]
      ),
      ul(
        '**Isotonic saline** to restore volume (hypercalcemia causes nephrogenic water loss).',
        '**Calcitonin** for rapid effect (hours), loses efficacy within ~48 h (tachyphylaxis).',
        '**Zoledronic acid** (dose-adjust for kidney function) or **denosumab** (usable in CKD; monitor for hypocalcemia) — onset 2–4 days.',
        '**Glucocorticoids** for 1,25(OH)₂D-mediated causes (granulomatous disease, lymphoma).',
        '**Dialysis** for refractory severe hypercalcemia with kidney failure. Loop diuretics only after volume repletion, if overloaded.'
      ),
      check('m-q3'),
    ],
    takeaways: [
      'Ionized calcium beats "corrected" calcium when it matters.',
      'PTH separates dependent from independent causes.',
      'Rule out FHH (CCCR < 0.01) before surgery.',
      'Severe: saline + calcitonin + bisphosphonate/denosumab.',
    ],
    refs: ['payne-1973', 'walker-2022', 'bilezikian-2022'],
  },
  {
    id: 'mg-phos',
    moduleId: 'minerals',
    title: 'Hypocalcemia, Magnesium and Phosphate',
    summary: 'PTH-guided work-up of hypocalcemia, magnesium as the hidden culprit, refeeding syndrome, tumor lysis and pseudohyperphosphatemia.',
    minutes: 22,
    bloom: 'apply',
    objectives: [
      'Work up hypocalcemia using PTH, magnesium and vitamin D',
      'Recognize magnesium depletion as a cause of refractory hypokalemia and hypocalcemia',
      'Diagnose and prevent refeeding syndrome',
      'Apply Cairo–Bishop criteria and handle rasburicase samples correctly',
    ],
    blocks: [
      h('Hypocalcemia'),
      steps(
        'Approach',
        ['Confirm with ionized calcium', 'Low total calcium with low albumin and normal ionized calcium needs no treatment.'],
        ['PTH low or inappropriately normal', 'Hypoparathyroidism: post-surgical (most common), autoimmune, infiltrative, genetic. **Both severe hypomagnesemia and hypermagnesemia suppress PTH.**'],
        ['PTH high', 'Vitamin D deficiency, CKD, pseudohypoparathyroidism, hungry-bone syndrome after parathyroidectomy, pancreatitis, rhabdomyolysis/tumor lysis (phosphate binds calcium), sepsis, drugs (bisphosphonates, denosumab, foscarnet, cinacalcet), citrate from massive transfusion.']
      ),
      danger('Symptomatic hypocalcemia (tetany, seizures, laryngospasm, prolonged QT): calcium gluconate 1–2 g IV over 10–20 min, then an infusion; correct magnesium at the same time.'),
      h('Magnesium'),
      ul(
        'Less than 1% of body Mg is in serum, so a normal serum Mg does not exclude depletion.',
        '**Depletion:** diarrhea, chronic PPI use, loop/thiazide diuretics, alcohol, aminoglycosides, cisplatin, amphotericin, calcineurin inhibitors.',
        '**Consequences:** refractory hypokalemia (ROMK disinhibition), hypocalcemia (PTH resistance and suppression), arrhythmias — IV magnesium sulfate 2 g for torsades de pointes.',
        '**Excess:** kidney failure with Mg-containing laxatives/antacids/enemas, or magnesium therapy for pre-eclampsia (loss of deep-tendon reflexes precedes respiratory depression).'
      ),
      check('m-q6'),
      h('Phosphate'),
      table(
        ['Hypophosphatemia', 'Hyperphosphatemia'],
        [
          ['Refeeding syndrome, DKA treatment, respiratory alkalosis (shift)', 'CKD, tumor lysis, rhabdomyolysis, hemolysis'],
          ['Hungry-bone syndrome, alcohol use, malabsorption, vitamin D deficiency', 'Hypoparathyroidism, vitamin D toxicity, phosphate enemas'],
          ['IV ferric carboxymaltose (FGF23-mediated renal phosphate wasting)', '**Pseudohyperphosphatemia:** paraproteins, hyperlipidemia, hemolysis, liposomal amphotericin B (assay interference)'],
        ]
      ),
      evidence('IV ferric carboxymaltose causes hypophosphatemia far more often than ferric derisomaltose (PHOSPHARE trials), sometimes with osteomalacia after repeated doses — check phosphate after repeated infusions.'),
      h('Refeeding syndrome (ASPEN 2020)'),
      ul(
        '**Definition:** a fall in phosphate, potassium and/or magnesium of 10–20% (mild), 20–30% (moderate) or > 30% and/or organ dysfunction (severe) within 5 days of reintroducing calories.',
        '**High risk:** BMI < 16, unintentional weight loss > 15% in 3–6 months, negligible intake > 10 days, low K⁺/PO₄/Mg before feeding.',
        '**Prevention:** start at 10–20 kcal/kg/day (or 100–150 g dextrose) in the first 24 h, advance over 3–7 days; thiamine 100 mg before feeding and for 5–7 days; monitor electrolytes every 12 h for 3 days in high-risk patients.'
      ),
      check('m-q4'),
      h('Tumor lysis syndrome'),
      table(
        ['Laboratory TLS (Cairo–Bishop): ≥ 2 within 3 days before to 7 days after therapy', 'Threshold'],
        [
          ['Uric acid', '≥ 8 mg/dL (476 µmol/L) or 25% rise'],
          ['Potassium', '≥ 6.0 mmol/L or 25% rise'],
          ['Phosphate', '≥ 4.5 mg/dL (1.45 mmol/L) in adults or 25% rise'],
          ['Calcium', '≤ 7 mg/dL (1.75 mmol/L) or 25% fall'],
        ],
        'Clinical TLS = laboratory TLS + creatinine ≥ 1.5 × ULN, arrhythmia/sudden death, or seizure.'
      ),
      pitfall('**Rasburicase keeps working in the tube**, degrading uric acid at room temperature and producing falsely low results. Collect in pre-chilled tubes, transport on ice and analyze within 4 h. Screen for G6PD deficiency before giving it (hemolysis, methemoglobinemia).'),
      check('m-q5'),
      pearl('Hypocalcemia in TLS and rhabdomyolysis is usually from calcium–phosphate precipitation. Treat only if symptomatic or with dangerous hyperkalemia — extra calcium worsens precipitation and causes rebound hypercalcemia in recovery.'),
    ],
    takeaways: [
      'Hypocalcemia: confirm ionized Ca, then PTH, Mg and vitamin D.',
      'Replace magnesium in refractory hypokalemia or hypocalcemia.',
      'Refeeding: identify risk, start low, give thiamine, monitor P/K/Mg.',
      'Rasburicase samples go on ice.',
    ],
    refs: ['aspen-refeed-2020', 'cairo-2004', 'wolf-2020', 'kdigo-mbd-2017', 'walker-2022'],
  },
];

export const questions: Question[] = [
  {
    kind: 'numeric',
    id: 'm-q1',
    moduleId: 'minerals',
    difficulty: 1,
    tags: ['calcium'],
    stem: 'Total calcium 8.0 mg/dL, albumin 2.0 g/dL. What is the albumin-"corrected" calcium (mg/dL)?',
    value: 9.6,
    tolerance: 0.05,
    unit: 'mg/dL',
    explanation: '8.0 + 0.8 × (4.0 − 2.0) = 9.6 mg/dL. Because the correction is often wrong at low albumin, confirm with ionized calcium before acting.',
  },
  {
    kind: 'mcq',
    id: 'm-q2',
    moduleId: 'minerals',
    difficulty: 2,
    tags: ['hypercalcemia'],
    stem: 'Ca 11.2 mg/dL, PTH 78 pg/mL (high), 25(OH)D 34 ng/mL, 24-h urine Ca 60 mg, CCCR 0.006. Mother had "high calcium" with a failed neck exploration. Diagnosis?',
    options: ['Primary hyperparathyroidism — refer for surgery', 'Familial hypocalciuric hypercalcemia', 'Humoral hypercalcemia of malignancy', 'Vitamin D toxicity'],
    answer: 1,
    explanation: 'PTH-dependent hypercalcemia with low urinary calcium (CCCR < 0.01) despite vitamin D repletion, plus a family history of failed surgery, is FHH (inactivating CaSR variants). It is benign and surgery does not help.',
  },
  {
    kind: 'mcq',
    id: 'm-q3',
    moduleId: 'minerals',
    difficulty: 2,
    tags: ['hypercalcemia', 'treatment'],
    stem: 'Confused patient with Ca 15.1 mg/dL, PTH suppressed, creatinine 2.2 mg/dL (baseline 1.0). Best initial regimen?',
    options: ['Furosemide 80 mg IV alone', 'Isotonic saline + calcitonin, then zoledronic acid (renally dose-adjusted) or denosumab', 'Oral phosphate', 'Cinacalcet'],
    answer: 1,
    explanation: 'Restore volume and give calcitonin for speed, then an antiresorptive for durable control. Denosumab is an option with impaired kidney function. Furosemide without volume repletion worsens AKI; cinacalcet treats PTH-driven disease.',
  },
  {
    kind: 'mcq',
    id: 'm-q4',
    moduleId: 'minerals',
    difficulty: 2,
    tags: ['refeeding'],
    stem: 'Which patient is at highest risk of refeeding syndrome?',
    options: [
      'BMI 24 after 3 days of poor intake',
      'BMI 15 with 20% weight loss over 4 months and minimal intake for 2 weeks',
      'BMI 30 with diabetes',
      'BMI 22 after elective surgery',
    ],
    answer: 1,
    explanation: 'ASPEN 2020 high-risk features include BMI < 16, > 15% weight loss in 3–6 months and > 10 days of negligible intake. Start feeding at 10–20 kcal/kg/day with thiamine and close electrolyte monitoring.',
  },
  {
    kind: 'mcq',
    id: 'm-q5',
    moduleId: 'minerals',
    difficulty: 2,
    tags: ['TLS', 'pre-analytic'],
    stem: 'After rasburicase, uric acid is reported as < 0.5 mg/dL on a sample that sat at room temperature for 3 h. Interpretation?',
    options: ['Overtreatment — stop rasburicase', 'Possibly falsely low from ex vivo uric acid degradation; recollect in a pre-chilled tube on ice', 'Lab analyzer failure', 'Expected and accurate'],
    answer: 1,
    explanation: 'Rasburicase remains active in the specimen and continues to degrade uric acid. Pre-chilled tubes, ice transport and prompt analysis are required for accurate monitoring.',
  },
  {
    kind: 'mcq',
    id: 'm-q6',
    moduleId: 'minerals',
    difficulty: 2,
    tags: ['magnesium'],
    stem: 'On long-term omeprazole: K⁺ 2.9 mmol/L despite 120 mmol/day KCl, ionized Ca low, PTH inappropriately normal. Next step?',
    options: ['Increase KCl', 'Measure and replace magnesium', 'Start calcitriol', 'Stop all supplements'],
    answer: 1,
    explanation: 'PPI-induced hypomagnesemia causes renal K⁺ wasting and suppresses/impairs PTH. Neither K⁺ nor Ca²⁺ corrects until magnesium is replaced.',
  },
];

export const cases: ClinicalCase[] = [
  {
    id: 'hypercalcemia-case',
    moduleId: 'minerals',
    title: 'Confusion and Constipation in a Smoker',
    difficulty: 'intermediate',
    mustNotMiss: true,
    presentation:
      'A 66-year-old man with a 50-pack-year history has 2 weeks of polyuria, constipation and new confusion. He is dry on examination. Chest CT shows a 4-cm central lung mass (later squamous cell carcinoma).',
    panels: [
      {
        title: 'Serum',
        labs: [
          { name: 'Calcium (total)', value: 14.2, unit: 'mg/dL', low: 8.6, high: 10.2, analyte: 'calcium' },
          { name: 'Ionized calcium', value: 1.86, unit: 'mmol/L', low: 1.15, high: 1.33 },
          { name: 'Albumin', value: 3.4, unit: 'g/dL', low: 3.5, high: 5.0, analyte: 'albumin' },
          { name: 'Phosphate', value: 2.3, unit: 'mg/dL', low: 2.5, high: 4.5, analyte: 'phosphate' },
          { name: 'Creatinine', value: 1.8, unit: 'mg/dL', low: 0.7, high: 1.3, analyte: 'creatinine', note: 'Baseline 1.0' },
          { name: 'PTH', value: 8, unit: 'pg/mL', low: 15, high: 65 },
          { name: 'PTHrP', value: 9.8, unit: 'pmol/L', low: 0, high: 4.2 },
          { name: '25-hydroxyvitamin D', value: 28, unit: 'ng/mL', low: 20, high: 50 },
        ],
      },
    ],
    steps: [
      {
        kind: 'numeric',
        id: 'hc1',
        stem: 'Calculate the albumin-corrected calcium (mg/dL).',
        value: 14.7,
        tolerance: 0.1,
        unit: 'mg/dL',
        explanation: '14.2 + 0.8 × (4.0 − 3.4) = 14.68. The ionized calcium (1.86 mmol/L) directly confirms severe hypercalcemia.',
      },
      {
        kind: 'mcq',
        id: 'hc2',
        stem: 'PTH-dependent or independent?',
        options: ['PTH-dependent', 'PTH-independent (PTH appropriately suppressed)', 'Indeterminate', 'FHH'],
        answer: 1,
        explanation: 'PTH below the reference range during hypercalcemia means the parathyroids are appropriately suppressed — look for PTHrP, vitamin D metabolites, myeloma or bone destruction.',
      },
      {
        kind: 'mcq',
        id: 'hc3',
        stem: 'Most likely mechanism?',
        options: ['Osteolytic metastases', 'Humoral hypercalcemia of malignancy (PTHrP)', 'Calcitriol-mediated (lymphoma)', 'Milk–alkali syndrome'],
        answer: 1,
        explanation: 'High PTHrP with suppressed PTH and low phosphate (PTHrP is phosphaturic) in squamous cell lung cancer is classic humoral hypercalcemia of malignancy — the commonest mechanism of malignancy-associated hypercalcemia.',
      },
      {
        kind: 'mcq',
        id: 'hc4',
        stem: 'Best initial treatment?',
        options: [
          'Furosemide and fluid restriction',
          'IV isotonic saline + calcitonin, then denosumab or renally dose-adjusted zoledronic acid',
          'Prednisone 60 mg',
          'Parathyroidectomy',
        ],
        answer: 1,
        explanation: 'Volume repletion and calcitonin give rapid improvement; an antiresorptive provides durable control. Glucocorticoids help 1,25(OH)₂D-mediated disease, not PTHrP.',
      },
    ],
    diagnosis: 'Severe PTHrP-mediated hypercalcemia of malignancy with AKI',
    reasoning:
      'Ionized calcium confirms severe hypercalcemia. Suppressed PTH excludes parathyroid causes; elevated PTHrP and hypophosphatemia identify the humoral mechanism. Hypercalcemia-induced nephrogenic water loss and vasoconstriction caused pre-renal AKI.',
    takeaways: [
      'Check PTH first; suppressed PTH → PTHrP, vitamin D, myeloma, metastases.',
      'Saline + calcitonin + antiresorptive for severe hypercalcemia.',
      'Malignancy-associated hypercalcemia carries a poor prognosis — address goals of care.',
    ],
    refs: ['walker-2022'],
  },
  {
    id: 'refeeding-case',
    moduleId: 'minerals',
    title: 'Day 3 of Nutritional Rehabilitation',
    difficulty: 'intermediate',
    mustNotMiss: true,
    presentation:
      'A 23-year-old woman with anorexia nervosa (BMI 14.8; minimal intake for 3 weeks) was admitted and started on enteral feeding at 1,800 kcal/day without thiamine. On day 3 she has weakness, dyspnea, ankle edema and new confusion.',
    panels: [
      {
        title: 'Serum (admission → day 3)',
        labs: [
          { name: 'Phosphate (admission)', value: 3.1, unit: 'mg/dL', low: 2.5, high: 4.5, analyte: 'phosphate' },
          { name: 'Phosphate (day 3)', value: 0.9, unit: 'mg/dL', low: 2.5, high: 4.5, analyte: 'phosphate' },
          { name: 'Potassium (day 3)', value: 2.8, unit: 'mmol/L', low: 3.5, high: 5.0 },
          { name: 'Magnesium (day 3)', value: 1.2, unit: 'mg/dL', low: 1.7, high: 2.3, analyte: 'magnesium' },
          { name: 'Glucose (day 3)', value: 160, unit: 'mg/dL', low: 70, high: 140, analyte: 'glucose' },
        ],
      },
    ],
    steps: [
      {
        kind: 'numeric',
        id: 'rf1',
        stem: 'By what percentage has phosphate fallen?',
        value: 71,
        tolerance: 2,
        unit: '%',
        explanation: '(3.1 − 0.9) ÷ 3.1 = 71% → severe refeeding syndrome (> 30% fall and organ dysfunction) by ASPEN 2020 criteria.',
      },
      {
        kind: 'mcq',
        id: 'rf2',
        stem: 'Best management?',
        options: [
          'Continue feeding and add oral phosphate only',
          'Reduce calories by ~50%; give IV phosphate, potassium and magnesium; thiamine 100 mg IV now; cardiac monitoring; then advance slowly',
          'Stop all nutrition for 1 week',
          'Give IV dextrose bolus for weakness',
        ],
        answer: 1,
        explanation: 'Insulin surge drives phosphate, K⁺ and Mg into cells and consumes thiamine. Slow the feed, replace electrolytes IV, give thiamine (Wernicke risk), monitor for heart failure and arrhythmia. Extra dextrose worsens the shift.',
      },
      {
        kind: 'mcq',
        id: 'rf3',
        stem: 'What would have prevented this?',
        options: [
          'Higher initial calories to reverse catabolism',
          'Starting at 10–20 kcal/kg/day, thiamine before feeding, correcting electrolytes and checking them every 12 h for the first 3 days',
          'Parenteral instead of enteral nutrition',
          'Fluid restriction',
        ],
        answer: 1,
        explanation: 'ASPEN 2020 recommends cautious initiation in high-risk patients, thiamine 100 mg before feeding and for 5–7 days, and frequent electrolyte checks. Route does not change the risk.',
      },
    ],
    diagnosis: 'Severe refeeding syndrome (hypophosphatemia, hypokalemia, hypomagnesemia) with cardiac and neurologic involvement',
    reasoning:
      'A high-risk patient received full-calorie feeding without thiamine. Insulin-driven intracellular shift of phosphate, K⁺ and Mg, with thiamine depletion, produced weakness (ATP depletion), fluid retention and confusion within 72 h.',
    takeaways: [
      'Identify risk before feeding: BMI < 16, weight loss > 15%, intake ≈ 0 for > 10 days.',
      'Start low, give thiamine, monitor P/K/Mg twice daily.',
      '> 30% fall in phosphate = severe refeeding syndrome.',
    ],
    refs: ['aspen-refeed-2020'],
  },
];
