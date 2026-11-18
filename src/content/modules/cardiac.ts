import type { ClinicalCase, Lesson, Question } from '../../types';
import { check, danger, evidence, formula, h, p, pearl, pitfall, table, ul } from '../dsl';

export const lessons: Lesson[] = [
  {
    id: 'troponin-np',
    moduleId: 'cardiac',
    title: 'Troponin and Natriuretic Peptides',
    summary: 'Myocardial injury vs infarction, 0 h/1 h algorithms, analytic pitfalls, and BNP/NT-proBNP cut-offs with their confounders.',
    minutes: 22,
    bloom: 'evaluate',
    objectives: [
      'Apply the Fourth Universal Definition of MI',
      'Use an assay-specific 0 h/1 h high-sensitivity troponin algorithm',
      'Recognize analytic causes of misleading troponin',
      'Interpret natriuretic peptides, including on sacubitril/valsartan',
    ],
    blocks: [
      h('Troponin'),
      ul(
        '**Myocardial injury:** cardiac troponin above the 99th-percentile upper reference limit (URL; sex-specific limits recommended).',
        '**Acute injury:** a rise and/or fall (dynamic change). Chronic injury: stable elevation (CKD, heart failure, LVH, age).',
        '**Myocardial infarction:** acute injury **plus** clinical evidence of ischemia — symptoms, new ischemic ECG changes, pathological Q waves, imaging evidence or coronary thrombus.',
        'Type 1 MI = atherothrombosis; type 2 = supply–demand mismatch (tachyarrhythmia, anemia, hypotension, hypoxemia).'
      ),
      evidence('ESC 2023 recommends the 0 h/1 h (or 0 h/2 h) high-sensitivity troponin algorithm. Thresholds are **assay-specific**. Example for hs-cTnT (Elecsys): rule-out if 0 h < 5 ng/L (chest pain > 3 h) or 0 h < 12 ng/L with Δ1h < 3 ng/L; rule-in if 0 h ≥ 52 ng/L or Δ1h ≥ 5 ng/L; everyone else is in the observe zone (repeat at 3 h, consider echo/CT).'),
      table(
        ['Analytic pitfall', 'Effect'],
        [
          ['cTnT vs cTnI', 'Not interchangeable; values and URLs differ by assay. cTnT can rise in chronic skeletal-muscle disease; cTnI is more cardiac-specific.'],
          ['Macrotroponin (cTnI–IgG complexes)', 'Persistent, stable elevation without disease; PEG precipitation or another platform helps.'],
          ['Heterophile antibodies', 'Usually falsely high; non-linear on dilution.'],
          ['Hemolysis', 'Negative interference with hs-cTnT on some platforms.'],
          ['Biotin', 'Falsely low troponin in streptavidin-based assays (FDA safety communications).'],
          ['Units', 'High-sensitivity assays report ng/L (whole numbers); conventional assays used µg/L — avoid unit confusion.'],
        ]
      ),
      check('c-q1'),
      check('c-q3'),
      h('Natriuretic peptides'),
      p('BNP and its inactive fragment NT-proBNP are released with ventricular wall stress. They are best at **ruling out** heart failure.'),
      table(
        ['Setting', 'BNP (pg/mL)', 'NT-proBNP (pg/mL)'],
        [
          ['Heart failure unlikely — non-acute', '< 35', '< 125'],
          ['Heart failure unlikely — acute presentation', '< 100', '< 300'],
          ['Acute HF likely (age-adjusted, ICON)', '—', '> 450 (< 50 y), > 900 (50–75 y), > 1,800 (> 75 y)'],
        ],
        'ESC 2021 heart failure guideline; ICON-RELOADED (2018).'
      ),
      ul(
        '**Higher than expected:** older age, atrial fibrillation, CKD, pulmonary embolism, pulmonary hypertension, sepsis.',
        '**Lower than expected:** obesity, flash pulmonary edema (very early), mitral stenosis, constrictive pericarditis.',
        '**Sacubitril/valsartan:** neprilysin inhibition raises BNP but not NT-proBNP — use NT-proBNP to monitor patients on ARNI.'
      ),
      check('c-q2'),
    ],
    takeaways: [
      'Injury = troponin > 99th URL; MI = acute injury + ischemia.',
      'Use the 0 h/1 h algorithm validated for your assay.',
      'Persistent stable troponin may be chronic injury or macrotroponin.',
      'NT-proBNP, not BNP, on sacubitril/valsartan.',
    ],
    refs: ['udmi-2018', 'esc-acs-2023', 'esc-hf-2021', 'aha-hf-2022', 'icon-2018'],
  },
  {
    id: 'lipids',
    moduleId: 'cardiac',
    title: 'Lipids and Lipoproteins',
    summary: 'Non-fasting profiles, LDL-C equations and their limits, apoB, Lp(a) and current targets.',
    minutes: 16,
    bloom: 'apply',
    objectives: [
      'Know when a fasting lipid profile is needed',
      'Choose an LDL-C estimate and know when Friedewald fails',
      'Use non-HDL-C, apoB and Lp(a) appropriately',
    ],
    blocks: [
      evidence('EAS/EFLM 2016: non-fasting samples are appropriate for most lipid testing; triglycerides rise only ~0.3 mmol/L (~26 mg/dL) after usual meals. Repeat fasting if non-fasting triglycerides exceed ~5 mmol/L (440 mg/dL).'),
      formula('Friedewald LDL-C (mg/dL) = total cholesterol − HDL-C − triglycerides ÷ 5', undefined, 'Invalid with TG > 400 mg/dL and underestimates LDL-C when LDL-C < 70 or TG 150–400. Martin–Hopkins (adjustable factor) and the Sampson/NIH equation (valid to TG ~800) are more accurate; direct LDL-C or apoB when TG are high.'),
      formula('Non-HDL-C = total cholesterol − HDL-C', undefined, 'Captures all atherogenic particles; needs no fasting.'),
      ul(
        '**ApoB** counts atherogenic particles (one apoB per particle) and is the preferred risk marker when TG are high, in diabetes, obesity or very low LDL-C.',
        '**Lp(a)** is ~90% genetically determined: measure at least once in every adult. The 2025 ESC/EAS focused update treats Lp(a) > 50 mg/dL (~105 nmol/L) as a risk-modifying factor. Prefer isoform-insensitive nmol/L assays; mg/dL and nmol/L do not convert reliably.',
        '**Severe hypertriglyceridemia** (≥ 1,000 mg/dL, ~11 mmol/L) carries a high risk of acute pancreatitis and causes lipemic interference (including pseudohyponatremia on indirect ISE).'
      ),
      table(
        ['ESC/EAS risk category', 'LDL-C goal'],
        [
          ['Very high', '< 55 mg/dL (1.4 mmol/L) and ≥ 50% reduction'],
          ['High', '< 70 mg/dL (1.8 mmol/L) and ≥ 50% reduction'],
          ['Moderate', '< 100 mg/dL (2.6 mmol/L)'],
          ['Low', '< 116 mg/dL (3.0 mmol/L)'],
        ],
        'Targets unchanged in the 2025 focused update.'
      ),
      check('c-q4'),
      check('c-q5'),
    ],
    takeaways: [
      'Non-fasting lipids are fine for most patients.',
      'Friedewald fails with high TG and very low LDL-C.',
      'Measure Lp(a) once in life; > 50 mg/dL raises risk.',
    ],
    refs: ['nordestgaard-2016', 'martin-2013', 'sampson-2020', 'esc-lipid-2019', 'esc-lipid-2025'],
  },
  {
    id: 'tissue-injury-markers',
    moduleId: 'cardiac',
    title: 'Pancreas and Muscle: Lipase, CK and Rhabdomyolysis',
    summary: 'Diagnosing pancreatitis with one test, and the chemistry cascade of muscle breakdown.',
    minutes: 14,
    bloom: 'apply',
    objectives: [
      'Apply the 2-of-3 criteria for acute pancreatitis and avoid futile enzyme monitoring',
      'Recognize non-pancreatic hyperlipasemia',
      'Predict the electrolyte pattern of rhabdomyolysis and its treatment',
    ],
    blocks: [
      h('Acute pancreatitis'),
      ul(
        'Diagnosis requires 2 of 3: typical epigastric pain, **lipase (or amylase) > 3 × ULN**, characteristic imaging (ACG 2024).',
        'Lipase is preferred (longer window, better specificity); measuring both adds little.',
        'Enzyme level does not predict severity and daily measurement does not guide management.',
        'Check triglycerides and calcium for etiology; ultrasound for gallstones.',
        'Non-pancreatic hyperlipasemia: CKD, bowel obstruction or ischemia, DKA, macrolipase.'
      ),
      check('c-q6'),
      h('Rhabdomyolysis'),
      table(
        ['Finding', 'Mechanism'],
        [
          ['CK > 5 × ULN (often > 5,000–10,000 IU/L)', 'Released from damaged myocytes; peaks at 24–72 h'],
          ['Urine dipstick positive for "blood" with few RBCs', 'Myoglobin reacts with the heme pad'],
          ['Hyperkalemia, hyperphosphatemia, hyperuricemia, high-AG acidosis', 'Intracellular contents released; organic acids'],
          ['Early hypocalcemia → late hypercalcemia', 'Calcium deposits in muscle, then is remobilized'],
          ['AKI', 'Myoglobin tubular toxicity, vasoconstriction, volume depletion'],
          ['AST > ALT, high LDH', 'Muscle origin — not liver injury'],
        ]
      ),
      danger('Start early, generous isotonic crystalloid (titrate to urine output ~200–300 mL/h in adults without heart failure); treat hyperkalemia aggressively; avoid calcium for asymptomatic hypocalcemia. Bicarbonate and mannitol have not shown benefit.'),
      check('c-q7'),
      pitfall('Statins, fibrates, colchicine, daptomycin, antipsychotics (NMS), cocaine/amphetamines and hypokalemia/hypophosphatemia all cause rhabdomyolysis — and exertional cases often follow unaccustomed eccentric exercise.'),
      pearl('Creatinine rises disproportionately to BUN in rhabdomyolysis (muscle creatine release), so a low BUN/Cr ratio here does not mean intrinsic renal disease.'),
    ],
    takeaways: [
      'Pancreatitis: lipase > 3 × ULN + pain or imaging; do not trend enzymes.',
      'Rhabdomyolysis: heme-positive dipstick without RBCs, high CK, high K⁺/PO₄, low Ca²⁺.',
      'Fluids early; calcium only for symptoms or dangerous hyperkalemia.',
    ],
    refs: ['acg-pancreatitis-2024', 'bosch-2009'],
  },
];

export const questions: Question[] = [
  {
    kind: 'mcq',
    id: 'c-q1',
    moduleId: 'cardiac',
    difficulty: 2,
    tags: ['troponin', 'UDMI'],
    stem: 'A patient on hemodialysis has hs-cTnT 48 ng/L at 0 h and 49 ng/L at 3 h, with no chest pain and an unchanged ECG. Interpretation?',
    options: ['Type 1 MI', 'Chronic myocardial injury', 'Type 2 MI', 'Unstable angina'],
    answer: 1,
    explanation: 'Troponin above the 99th URL without a dynamic change and without ischemia = chronic injury, common in kidney failure. MI requires a rise/fall plus clinical evidence of ischemia.',
  },
  {
    kind: 'mcq',
    id: 'c-q2',
    moduleId: 'cardiac',
    difficulty: 2,
    tags: ['natriuretic peptides'],
    stem: 'A patient recently started on sacubitril/valsartan has a BNP that doubled although symptoms improved. Best marker to follow?',
    options: ['BNP', 'NT-proBNP', 'Troponin', 'Galectin-3'],
    answer: 1,
    explanation: 'Neprilysin degrades BNP, so its inhibition raises BNP. NT-proBNP is not a neprilysin substrate and still reflects wall stress.',
  },
  {
    kind: 'mcq',
    id: 'c-q3',
    moduleId: 'cardiac',
    difficulty: 3,
    tags: ['0/1h algorithm'],
    stem: 'Chest pain for 5 h; non-diagnostic ECG. hs-cTnT (Elecsys) 0 h = 4 ng/L. Per the ESC 0 h/1 h algorithm:',
    options: ['Rule-in', 'Rule-out — consider discharge if clinically appropriate', 'Observe — repeat at 3 h', 'Algorithm cannot be applied'],
    answer: 1,
    explanation: 'For this assay, a 0 h value < 5 ng/L with symptom onset > 3 h earlier is a direct rule-out. Clinical judgment (e.g., ongoing pain, high pretest probability) still overrides any algorithm.',
  },
  {
    kind: 'numeric',
    id: 'c-q4',
    moduleId: 'cardiac',
    difficulty: 1,
    tags: ['LDL'],
    stem: 'Total cholesterol 220, HDL 50, triglycerides 150 mg/dL. Friedewald LDL-C (mg/dL)?',
    value: 140,
    tolerance: 1,
    unit: 'mg/dL',
    explanation: 'LDL-C = 220 − 50 − 150/5 = 140 mg/dL. Valid here (TG < 400 and LDL-C not very low).',
  },
  {
    kind: 'mcq',
    id: 'c-q5',
    moduleId: 'cardiac',
    difficulty: 2,
    tags: ['Lp(a)'],
    stem: 'Which statement about lipoprotein(a) is correct?',
    options: [
      'Levels fall substantially with diet and exercise',
      'It should be measured at least once in adulthood; > 50 mg/dL (~105 nmol/L) increases cardiovascular risk',
      'It must be measured fasting',
      'mg/dL converts to nmol/L with a fixed factor of 2.0',
    ],
    answer: 1,
    explanation: 'Lp(a) is largely genetic and stable, so once-in-a-lifetime testing is recommended (ESC/EAS). No fasting is needed, and mass-to-molar conversion is unreliable because apo(a) isoform size varies.',
  },
  {
    kind: 'mcq',
    id: 'c-q6',
    moduleId: 'cardiac',
    difficulty: 1,
    tags: ['pancreatitis'],
    stem: 'A patient admitted with acute pancreatitis (lipase 2,400 IU/L) has lipase 650 IU/L on day 2. What does this tell you?',
    options: ['Pancreatitis is resolving — prepare for discharge', 'Nothing useful: lipase trends do not track severity or guide management', 'Pancreatic necrosis is developing', 'The diagnosis was wrong'],
    answer: 1,
    explanation: 'Enzyme levels do not correlate with severity, and serial measurement is not recommended. Assess severity with clinical features (SIRS, organ failure), BUN trend and hematocrit.',
  },
  {
    kind: 'mcq',
    id: 'c-q7',
    moduleId: 'cardiac',
    difficulty: 1,
    tags: ['rhabdomyolysis'],
    stem: 'Dark urine after a spin class: dipstick 3+ blood, microscopy 0–2 RBC/hpf, CK 38,000 IU/L. What explains the discordance?',
    options: ['Hemoglobinuria from intravascular hemolysis', 'Myoglobinuria', 'Contaminated sample', 'Bilirubinuria'],
    answer: 1,
    explanation: 'Myoglobin reacts with the dipstick heme pad. Hemoglobinuria also gives this discordance but would come with low haptoglobin and high indirect bilirubin, not CK 38,000.',
  },
];

export const cases: ClinicalCase[] = [
  {
    id: 'troponin-case',
    moduleId: 'cardiac',
    title: 'Chest Pain with a Small Troponin Rise',
    difficulty: 'intermediate',
    mustNotMiss: true,
    presentation:
      'A 58-year-old man with hypertension and smoking history has had intermittent pressure-like chest pain for 4 hours. ECG shows no ST elevation or new changes. Creatinine 1.0 mg/dL. The lab uses Elecsys hs-cTnT.',
    panels: [
      {
        title: 'hs-cTnT',
        labs: [
          { name: 'hs-cTnT 0 h', value: 14, unit: 'ng/L', low: 0, high: 14, note: '99th URL ≈ 14 ng/L (assay-specific)' },
          { name: 'hs-cTnT 1 h', value: 23, unit: 'ng/L', low: 0, high: 14 },
        ],
      },
    ],
    steps: [
      {
        kind: 'numeric',
        id: 'tr1',
        stem: 'What is the absolute 1-h change (ng/L)?',
        value: 9,
        tolerance: 0,
        unit: 'ng/L',
        explanation: '23 − 14 = 9 ng/L. Absolute deltas outperform percentage changes at low concentrations.',
      },
      {
        kind: 'mcq',
        id: 'tr2',
        stem: 'Algorithm result (Elecsys: rule-in if 0 h ≥ 52 or Δ1h ≥ 5)?',
        options: ['Rule-out', 'Observe', 'Rule-in', 'Not applicable'],
        answer: 2,
        explanation: 'Δ1h of 9 ≥ 5 ng/L → rule-in. With ischemic symptoms this is an acute MI (NSTEMI) by the Fourth Universal Definition; proceed to the NSTE-ACS pathway.',
      },
      {
        kind: 'mcq',
        id: 'tr3',
        stem: 'If the 1-h value had been 15 ng/L, what would the algorithm say?',
        options: ['Rule-out', 'Observe zone — repeat at 3 h and consider imaging', 'Rule-in', 'Discharge'],
        answer: 1,
        explanation: '0 h = 14 (not < 12) and Δ1h = 1 (< 5), 0 h < 52 → neither rule-out nor rule-in: observe. This zone has intermediate risk and needs a further sample.',
      },
    ],
    diagnosis: 'Non-ST-elevation myocardial infarction (rule-in by 1-h delta)',
    reasoning:
      'A dynamic troponin rise of 9 ng/L in 1 h on a high-sensitivity assay, with ischemic-sounding pain, meets both the ESC rule-in criterion and the universal definition of acute MI. Absolute changes are used because analytical imprecision dominates percentage changes at low values.',
    takeaways: [
      'Use assay-specific 0 h/1 h cut-offs.',
      'Absolute delta, not percentage, at low concentrations.',
      'MI = dynamic troponin + ischemia.',
    ],
    refs: ['esc-acs-2023', 'udmi-2018'],
  },
  {
    id: 'rhabdo-case',
    moduleId: 'cardiac',
    title: 'Cola-Colored Urine After Training',
    difficulty: 'core',
    mustNotMiss: true,
    presentation:
      'A 28-year-old man did a high-intensity session of squats and eccentric exercises 2 days ago after months of inactivity. He now has severe thigh pain and dark urine. He takes atorvastatin for familial hypercholesterolemia.',
    panels: [
      {
        title: 'Serum',
        labs: [
          { name: 'Creatine kinase', value: 48000, unit: 'IU/L', low: 40, high: 200 },
          { name: 'Creatinine', value: 2.1, unit: 'mg/dL', low: 0.7, high: 1.3, analyte: 'creatinine', note: 'Baseline 0.9' },
          { name: 'BUN', value: 22, unit: 'mg/dL', low: 7, high: 20, analyte: 'bun' },
          { name: 'Potassium', value: 6.0, unit: 'mmol/L', low: 3.5, high: 5.0 },
          { name: 'Phosphate', value: 6.8, unit: 'mg/dL', low: 2.5, high: 4.5, analyte: 'phosphate' },
          { name: 'Calcium', value: 7.6, unit: 'mg/dL', low: 8.6, high: 10.2, analyte: 'calcium' },
          { name: 'Uric acid', value: 9.2, unit: 'mg/dL', low: 3.5, high: 7.2, analyte: 'urate' },
          { name: 'AST', value: 980, unit: 'IU/L', low: 10, high: 40 },
          { name: 'ALT', value: 240, unit: 'IU/L', low: 7, high: 56 },
        ],
      },
      {
        title: 'Urine',
        labs: [
          { name: 'Dipstick blood', value: '3+', unit: '', refText: 'negative' },
          { name: 'RBC', value: '0–2', unit: '/hpf', refText: '0–3' },
        ],
      },
    ],
    steps: [
      {
        kind: 'numeric',
        id: 'rh1',
        stem: 'How many times the ULN is the CK?',
        value: 240,
        tolerance: 1,
        unit: '× ULN',
        explanation: '48,000 ÷ 200 = 240 × ULN. Rhabdomyolysis is usually defined as CK > 5 × ULN; AKI risk rises with values > 5,000–15,000 IU/L and with dehydration.',
      },
      {
        kind: 'mcq',
        id: 'rh2',
        stem: 'Initial management?',
        options: [
          'IV calcium for the low calcium',
          'Generous isotonic crystalloid titrated to urine output ~200–300 mL/h, treat hyperkalemia, stop the statin, monitor K⁺/Ca²⁺/Cr',
          'Furosemide to force diuresis',
          'Mannitol and bicarbonate as standard',
        ],
        answer: 1,
        explanation: 'Early volume expansion is the only intervention with consistent benefit. Calcium is reserved for symptoms or dangerous hyperkalemia because it deposits in muscle and rebounds later. Mannitol/bicarbonate lack outcome benefit.',
      },
      {
        kind: 'mcq',
        id: 'rh3',
        stem: 'Why is AST much higher than ALT here?',
        options: ['Alcohol-associated hepatitis', 'AST is abundant in skeletal muscle', 'Ischemic hepatitis', 'Statin hepatotoxicity'],
        answer: 1,
        explanation: 'AST (and LDH) leak from muscle; the AST/ALT ratio > 2 reflects muscle, not liver, injury. ALT also rises modestly from muscle.',
      },
    ],
    diagnosis: 'Exertional rhabdomyolysis (statin as a contributor) with AKI, hyperkalemia and hyperphosphatemia',
    reasoning:
      'CK 240 × ULN with heme-positive, RBC-poor urine confirms myoglobinuria. The electrolyte cascade — high K⁺, PO₄ and urate, low Ca²⁺ — and AKI follow from myocyte contents and tubular injury.',
    takeaways: [
      'Dipstick blood without RBCs → myoglobin or hemoglobin.',
      'Fluids early; avoid calcium unless symptomatic.',
      'AST/ALT > 2 can be muscle, not liver.',
    ],
    refs: ['bosch-2009'],
  },
];
