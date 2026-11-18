import type { ClinicalCase, Lesson, Question } from '../../types';
import { check, danger, evidence, formula, h, lab, p, pearl, pitfall, table, ul } from '../dsl';

export const lessons: Lesson[] = [
  {
    id: 'renal-intro',
    moduleId: 'renal',
    title: 'Nephron Physiology and Kidney Markers',
    summary: 'What each nephron segment does, and what creatinine, BUN, cystatin C and albuminuria really measure.',
    minutes: 18,
    bloom: 'understand',
    objectives: [
      'Link each nephron segment to its transporter, drug and lab signature',
      'Explain non-GFR determinants of creatinine, BUN and cystatin C',
      'Recognize drugs that raise creatinine without changing GFR',
      'Interpret UACR categories',
    ],
    blocks: [
      table(
        ['Segment', 'Reabsorbs', 'Key transporter / hormone', 'Drug', 'Lab signature when disrupted'],
        [
          ['Proximal tubule', '~65% Na⁺, all glucose and amino acids, ~80% HCO₃⁻, phosphate', 'NHE3, SGLT2, carbonic anhydrase', 'Acetazolamide, SGLT2 inhibitors', 'Fanconi: glycosuria with normal glucose, phosphaturia, proximal RTA'],
          ['Thick ascending limb', '~25% Na⁺ (water-impermeable)', 'NKCC2; builds medullary gradient', 'Loop diuretics', 'Bartter-like hypokalemic alkalosis, hypercalciuria'],
          ['Distal convoluted tubule', '~5% Na⁺', 'NCC; Ca²⁺ reabsorption', 'Thiazides', 'Gitelman-like: hypokalemia, hypomagnesemia, hypocalciuria; hyponatremia'],
          ['Collecting duct', '2–3% Na⁺; water', 'ENaC/aldosterone, ROMK, AQP2/AVP', 'MRAs, amiloride, trimethoprim', 'Hyperkalemia, type 4 RTA; AVP resistance (lithium)'],
        ]
      ),
      h('Creatinine'),
      ul(
        'Generated from muscle creatine at a rate proportional to muscle mass (and dietary meat, creatine supplements).',
        'Freely filtered **and secreted** (10–40% of excretion, rising as GFR falls) — so creatinine clearance overestimates GFR.',
        'Because Cr ≈ 1/GFR, a large GFR loss in the normal range causes only a small creatinine rise.',
        'Assay: enzymatic methods are preferred to Jaffe, which suffers positive interference from ketones (acetoacetate) and some cephalosporins and negative interference from bilirubin. Methods should be IDMS-traceable.'
      ),
      pitfall('Trimethoprim, cimetidine, dolutegravir, bictegravir and cobicistat block tubular creatinine secretion: creatinine rises ~0.1–0.3 mg/dL without any change in GFR. Check cystatin C or BUN before labeling AKI.'),
      h('BUN (urea)'),
      ul(
        'Production rises with protein intake, upper-GI bleeding, catabolism, corticosteroids and tetracyclines; falls with liver disease and malnutrition.',
        'Reabsorbed with water in the proximal tubule, so BUN rises disproportionately in low-flow states.',
        'BUN/creatinine > 20 suggests a prerenal state or high urea production, but its diagnostic accuracy is modest — never use it alone.'
      ),
      h('Cystatin C'),
      p('Produced by all nucleated cells and freely filtered, cystatin C is much less dependent on muscle mass. It is raised by hyperthyroidism, high-dose glucocorticoids, inflammation and obesity, and lowered by hypothyroidism.'),
      check('r-q1'),
      h('Albuminuria'),
      table(
        ['Category', 'UACR (mg/g)', 'UACR (mg/mmol)', 'Description'],
        [
          ['A1', '< 30', '< 3', 'Normal to mildly increased'],
          ['A2', '30–300', '3–30', 'Moderately increased'],
          ['A3', '> 300', '> 30', 'Severely increased'],
        ],
        'Confirm with 2 of 3 samples over 3–6 months; exercise, fever, UTI and menstruation cause transient rises.'
      ),
      pitfall('Urine dipsticks detect albumin, not immunoglobulin light chains. Suspected myeloma kidney needs serum free light chains and protein electrophoresis.'),
      check('r-q2'),
    ],
    takeaways: [
      'Creatinine reflects muscle mass + filtration + secretion.',
      'Some drugs raise creatinine without lowering GFR.',
      'BUN depends on protein load and water reabsorption.',
      'UACR categories A1/A2/A3 are as prognostic as eGFR.',
    ],
    refs: ['kdigo-ckd-2024', 'inker-2021', 'perazella-2015'],
  },
  {
    id: 'gfr-assessment',
    moduleId: 'renal',
    title: 'Estimating GFR and Staging CKD',
    summary: 'CKD-EPI 2021 (race-free), when to add cystatin C, drug dosing, and the KDIGO 2024 cause–GFR–albuminuria framework.',
    minutes: 20,
    bloom: 'apply',
    objectives: [
      'Compute eGFR with CKD-EPI 2021 and know its assumptions',
      'Choose eGFRcr-cys when creatinine is unreliable',
      'Stage CKD by GFR and albuminuria and read the KDIGO heat map',
      'Know when to refer',
    ],
    blocks: [
      p('Measured GFR (iohexol or iothalamate clearance) is the reference standard; equations estimate it from a **steady-state** marker. Normal is ~90–120 mL/min/1.73 m², declining ~1 mL/min/year after 40.'),
      formula('CKD-EPI 2021: eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^−1.200 × 0.9938^age × 1.012 [if female]', ['κ = 0.7 (female) or 0.9 (male)', 'α = −0.241 (female) or −0.302 (male)', 'Scr in mg/dL (µmol/L ÷ 88.4)'], 'The 2021 refit removed the race coefficient (NKF-ASN Task Force); it is the recommended creatinine equation in the US.'),
      formula('CKD-EPI 2021 creatinine–cystatin C: 135 × min(Scr/κ,1)^α × max(Scr/κ,1)^−0.544 × min(Scys/0.8,1)^−0.323 × max(Scys/0.8,1)^−0.778 × 0.9961^age × 0.963 [if female]', ['κ as above; α = −0.219 (female), −0.144 (male)'], 'The combined equation is the most accurate estimate.'),
      evidence('KDIGO 2024 recommends eGFRcr-cys when eGFRcr is thought to be inaccurate and GFR affects decisions — extremes of muscle mass (amputation, sarcopenia, bodybuilding), cirrhosis, vegetarian diet, creatine supplements, and narrow-therapeutic-index drug dosing.'),
      pitfall('**Every equation assumes steady state.** In AKI, a creatinine of 1.2 rising daily may correspond to a true GFR of 10 mL/min. Do not stage CKD or dose drugs from eGFR while creatinine is changing.'),
      h('Drug dosing'),
      ul(
        'Many labels still cite Cockcroft–Gault creatinine clearance: (140 − age) × weight ÷ (72 × Scr) × 0.85 if female. It is not indexed to BSA and is unreliable in obesity, older age and changing creatinine.',
        'For most drugs, eGFR (mL/min/1.73 m²) is acceptable; for very large or small patients de-index it: eGFR × BSA ÷ 1.73.',
        'For narrow-therapeutic-index drugs (aminoglycosides, vancomycin, chemotherapy, DOACs near cut-offs), use eGFRcr-cys or measured GFR and drug levels.'
      ),
      h('CKD: definition and CGA staging'),
      p('CKD = abnormal kidney structure or function for **> 3 months** with health implications: eGFR < 60, or markers of damage (UACR ≥ 30 mg/g, urine sediment abnormalities, tubular disorders, histologic or imaging abnormalities, kidney transplant). Classify by **C**ause, **G**FR category and **A**lbuminuria category.'),
      table(
        ['GFR category', 'eGFR', 'A1 (< 30)', 'A2 (30–300)', 'A3 (> 300)'],
        [
          ['G1', '≥ 90', 'Low', 'Moderate', 'High'],
          ['G2', '60–89', 'Low', 'Moderate', 'High'],
          ['G3a', '45–59', 'Moderate', 'High', 'Very high'],
          ['G3b', '30–44', 'High', 'Very high', 'Very high'],
          ['G4', '15–29', 'Very high', 'Very high', 'Very high'],
          ['G5', '< 15', 'Very high', 'Very high', 'Very high'],
        ],
        'KDIGO prognosis heat map (risk of kidney failure, CV events, death). G5 = kidney failure, which does not imply dialysis.'
      ),
      ul(
        '**Refer to nephrology:** eGFR < 30, UACR ≥ 300 mg/g, 5-year kidney-failure risk (KFRE) ≥ 3–5%, rapid progression, persistent hematuria with casts, refractory hypertension or hyperkalemia, recurrent stones, hereditary disease.',
        'Report actual eGFR values above 60 — a "> 60" report hides the G1/G2 distinction that matters when albuminuria is present.'
      ),
      check('r-q3'),
      check('r-q4'),
      lab('renal-handling', 'Compare CKD-EPI creatinine, cystatin and combined equations and place the patient on the KDIGO heat map.'),
    ],
    takeaways: [
      'CKD-EPI 2021 is race-free; add cystatin C when creatinine misleads.',
      'eGFR is invalid when creatinine is not at steady state.',
      'Stage CKD by cause, G category and A category.',
      'Albuminuria multiplies risk at every GFR.',
    ],
    refs: ['inker-2021', 'kdigo-ckd-2024'],
  },
  {
    id: 'aki-vs-ckd',
    moduleId: 'renal',
    title: 'Acute Kidney Injury',
    summary: 'KDIGO criteria with their time windows, creatinine kinetics, urine indices with caveats, microscopy and dialysis indications.',
    minutes: 24,
    bloom: 'analyze',
    objectives: [
      'Diagnose and stage AKI with KDIGO criteria',
      'Explain why creatinine lags behind GFR loss',
      'Use FENa, FEUrea and urine microscopy appropriately',
      'Recognize urgent dialysis indications',
    ],
    blocks: [
      table(
        ['Stage', 'Serum creatinine', 'Urine output'],
        [
          ['1', 'Rise ≥ 0.3 mg/dL (≥ 26.5 µmol/L) within 48 h, or 1.5–1.9 × baseline within 7 days', '< 0.5 mL/kg/h for 6–12 h'],
          ['2', '2.0–2.9 × baseline', '< 0.5 mL/kg/h for ≥ 12 h'],
          ['3', '≥ 3.0 × baseline, or ≥ 4.0 mg/dL (353.6 µmol/L), or kidney replacement therapy', '< 0.3 mL/kg/h for ≥ 24 h, or anuria ≥ 12 h'],
        ],
        'KDIGO 2012. Stage by the worse of the two criteria.'
      ),
      evidence('KDIGO\'s 2026 AKI/AKD guideline draft (public review closed May 2026) adds an acute kidney disease framework and structural biomarkers. Until it is published, the 2012 criteria above remain the standard.'),
      h('Creatinine kinetics'),
      p('After an abrupt fall in GFR, creatinine climbs toward a new steady state (baseline × GFR₀/GFR₁) with a time constant of roughly V/GFR — hours when GFR is high, **days** when GFR is low. On day 1 after complete anuria creatinine may only have doubled, while true GFR is near zero.'),
      pearl('Low muscle mass, fluid overload (dilution) and sepsis-reduced creatinine production all blunt the rise — AKI is under-diagnosed in frail and critically ill patients. Track urine output.'),
      lab('creatinine-kinetics', 'Drop the GFR by any amount and watch creatinine and "eGFR" lag behind the true GFR hour by hour.'),
      check('r-q5'),
      h('Causes'),
      table(
        ['Category', 'Common causes', 'Clues'],
        [
          ['Prerenal / hemodynamic', 'Hypovolemia, heart failure (cardiorenal), cirrhosis (HRS-AKI), NSAIDs or ACE-I/ARB in low-flow states', 'Bland sediment, low FENa/FEUrea, responds to restoring perfusion'],
          ['Acute tubular necrosis', 'Ischemia, sepsis, nephrotoxins (aminoglycosides, amphotericin, vancomycin ± piperacillin–tazobactam, cisplatin), rhabdomyolysis', 'Muddy-brown granular casts, renal tubular epithelial cells'],
          ['Acute interstitial nephritis', 'PPIs, β-lactams, NSAIDs, immune checkpoint inhibitors', 'WBC casts, sterile pyuria; eosinophiluria is unreliable'],
          ['Glomerular / vascular', 'Rapidly progressive GN, thrombotic microangiopathy, atheroemboli', 'RBC casts, dysmorphic RBCs, proteinuria; schistocytes; livedo'],
          ['Postrenal', 'BPH, bilateral stones, pelvic malignancy, blocked catheter', 'Hydronephrosis on ultrasound (may be absent very early or with retroperitoneal fibrosis)'],
        ]
      ),
      formula('FENa (%) = (urine Na × serum Cr) ÷ (serum Na × urine Cr) × 100', undefined, '< 1% suggests intact tubular Na avidity (prerenal); > 2% suggests tubular injury.'),
      formula('FEUrea (%) = (urine urea × serum Cr) ÷ (serum urea × urine Cr) × 100', undefined, '< 35% suggests prerenal even on diuretics; > 50% suggests ATN.'),
      pitfall('FENa < 1% also occurs in contrast nephropathy, rhabdomyolysis, early obstruction, acute GN, sepsis and HRS. FENa is falsely high with diuretics, baseline CKD and bicarbonaturia. Indices support — never replace — history, exam and microscopy.'),
      pearl('**"Triple whammy":** ACE inhibitor/ARB + diuretic + NSAID — a classic, avoidable cause of community and post-operative AKI.'),
      check('r-q6'),
      check('r-q7'),
      h('Urgent kidney replacement therapy'),
      table(
        ['Indication', 'Typical trigger (refractory to medical therapy)'],
        [
          ['Acidosis', 'Severe metabolic acidosis (e.g., pH < 7.15)'],
          ['Electrolytes', 'Hyperkalemia with ECG changes or rising despite treatment'],
          ['Intoxication', 'Dialyzable toxins: toxic alcohols, lithium, salicylate, metformin-associated lactic acidosis'],
          ['Overload', 'Pulmonary edema unresponsive to diuretics'],
          ['Uremia', 'Pericarditis, encephalopathy, uremic bleeding'],
        ]
      ),
      danger('AKI with hyperkalemia, severe acidosis, pulmonary edema or uremic complications needs same-day nephrology involvement.'),
      check('r-q8'),
    ],
    takeaways: [
      'KDIGO: +0.3 mg/dL in 48 h, or ×1.5 in 7 days, or oliguria.',
      'Creatinine lags; eGFR is meaningless in AKI.',
      'FENa < 1% / FEUrea < 35% support prerenal — with many exceptions.',
      'Microscopy (casts) often gives the answer faster than indices.',
    ],
    refs: ['kdigo-aki-2012', 'waikar-2009', 'carvounis-2002', 'perazella-2015'],
  },
];

export const questions: Question[] = [
  {
    kind: 'mcq',
    id: 'r-q1',
    moduleId: 'renal',
    difficulty: 2,
    tags: ['creatinine'],
    stem: 'Creatinine rises from 1.0 to 1.25 mg/dL one week after starting trimethoprim–sulfamethoxazole. BUN and cystatin C are unchanged; urine output is normal. Most likely explanation?',
    options: ['Acute interstitial nephritis', 'Inhibition of tubular creatinine secretion', 'Prerenal AKI', 'Rhabdomyolysis'],
    answer: 1,
    explanation: 'Trimethoprim blocks creatinine secretion (OCT2/MATE), raising serum creatinine without changing GFR — confirmed by unchanged cystatin C and BUN. It reverses on stopping the drug.',
  },
  {
    kind: 'mcq',
    id: 'r-q2',
    moduleId: 'renal',
    difficulty: 2,
    tags: ['BUN'],
    stem: 'BUN 64 mg/dL, creatinine 1.1 mg/dL, hemoglobin falling from 12 to 8.6 g/dL, melena. Best explanation for the BUN/creatinine ratio of ~58?',
    options: ['Intrinsic AKI', 'Upper GI bleeding (digested blood protein) plus hypovolemia', 'Liver failure', 'Rhabdomyolysis'],
    answer: 1,
    explanation: 'Blood in the upper GI tract is a large protein load absorbed as urea; volume depletion adds proximal urea reabsorption. Liver failure lowers BUN; rhabdomyolysis raises creatinine disproportionately.',
  },
  {
    kind: 'mcq',
    id: 'r-q3',
    moduleId: 'renal',
    difficulty: 2,
    tags: ['eGFR', 'cystatin'],
    stem: 'A 70-year-old woman with bilateral above-knee amputations has creatinine 0.6 mg/dL (eGFRcr 95). You must dose a narrow-therapeutic-index drug. Best approach?',
    options: ['Use eGFRcr 95', 'Use Cockcroft–Gault', 'Measure cystatin C and use eGFRcr-cys (or measured GFR)', 'Use BUN'],
    answer: 2,
    explanation: 'Very low muscle mass makes creatinine falsely low and eGFRcr falsely high. KDIGO 2024 recommends eGFRcr-cys (or measured GFR) when creatinine is unreliable and decisions depend on GFR.',
  },
  {
    kind: 'mcq',
    id: 'r-q4',
    moduleId: 'renal',
    difficulty: 1,
    tags: ['CKD staging'],
    stem: 'eGFR 52 mL/min/1.73 m² for 6 months with UACR 180 mg/g. KDIGO category and risk?',
    options: ['G3a A2 — high risk', 'G3b A2 — very high risk', 'G2 A3 — high risk', 'G3a A1 — moderate risk'],
    answer: 0,
    explanation: 'eGFR 45–59 = G3a; UACR 30–300 = A2. On the heat map, G3a/A2 is "high" (orange). Albuminuria-lowering therapy (RAAS blockade, SGLT2 inhibitor) is indicated.',
  },
  {
    kind: 'mcq',
    id: 'r-q5',
    moduleId: 'renal',
    difficulty: 2,
    tags: ['AKI', 'kinetics'],
    stem: 'Hours after cardiac arrest, a patient becomes anuric. Creatinine is 1.1 mg/dL (baseline 0.9) at 12 h. Which statement is correct?',
    options: [
      'GFR is about 80 mL/min because creatinine is near normal',
      'True GFR is near zero; creatinine has not had time to rise — urine output already meets KDIGO criteria',
      'This is not AKI until creatinine doubles',
      'eGFR can be used to dose drugs',
    ],
    answer: 1,
    explanation: 'Creatinine rises slowly toward a new steady state. Anuria ≥ 12 h is already KDIGO stage 3. eGFR assumes steady state and grossly overestimates GFR here.',
  },
  {
    kind: 'numeric',
    id: 'r-q6',
    moduleId: 'renal',
    difficulty: 1,
    tags: ['FENa'],
    stem: 'Serum Na 138 mmol/L, serum Cr 3.2 mg/dL, urine Na 12 mmol/L, urine Cr 120 mg/dL. FENa (%)?',
    value: 0.23,
    tolerance: 0.03,
    unit: '%',
    explanation: 'FENa = (12 × 3.2) ÷ (138 × 120) × 100 = 0.23% — avid Na⁺ retention, supporting a prerenal state if the clinical context fits.',
  },
  {
    kind: 'mcq',
    id: 'r-q7',
    moduleId: 'renal',
    difficulty: 2,
    tags: ['FEUrea'],
    stem: 'A patient on IV furosemide has AKI. FENa 2.8%, FEUrea 24%. Interpretation?',
    options: ['ATN — FENa > 2%', 'Prerenal physiology — FEUrea < 35% is less affected by loop diuretics', 'Obstruction', 'Indices are uninterpretable; no conclusion possible'],
    answer: 1,
    explanation: 'Loop diuretics raise FENa. Urea is reabsorbed mostly in the proximal tubule, so FEUrea < 35% still signals prerenal physiology on diuretics (Carvounis 2002).',
  },
  {
    kind: 'mcq',
    id: 'r-q8',
    moduleId: 'renal',
    difficulty: 1,
    tags: ['microscopy'],
    stem: 'Which urine sediment finding most strongly suggests rapidly progressive glomerulonephritis?',
    options: ['Hyaline casts', 'Muddy-brown granular casts', 'Red blood cell casts and dysmorphic RBCs', 'Calcium oxalate crystals'],
    answer: 2,
    explanation: 'RBC casts form when glomerular bleeding meets Tamm–Horsfall protein in the tubule. Hyaline casts are non-specific (prerenal); granular casts suggest ATN; oxalate crystals suggest ethylene glycol.',
  },
];

export const cases: ClinicalCase[] = [
  {
    id: 'aki-case',
    moduleId: 'renal',
    title: 'Falling Urine Output After Hip Replacement',
    difficulty: 'intermediate',
    presentation:
      'A 72-year-old man (80 kg) with hypertension on lisinopril and hydrochlorothiazide underwent elective hip replacement 3 days ago. He has received ibuprofen 800 mg three times daily. Urine output is 20 mL/h for the last 8 h. BP 95/60 mmHg, HR 110, dry mucous membranes. Baseline creatinine 1.1 mg/dL. Urinalysis: bland with occasional hyaline casts.',
    panels: [
      {
        title: 'Serum',
        labs: [
          { name: 'Creatinine', value: 3.2, unit: 'mg/dL', low: 0.7, high: 1.3, analyte: 'creatinine', note: 'Baseline 1.1' },
          { name: 'BUN', value: 68, unit: 'mg/dL', low: 7, high: 20, analyte: 'bun' },
          { name: 'Sodium', value: 138, unit: 'mmol/L', low: 135, high: 145 },
          { name: 'Potassium', value: 5.6, unit: 'mmol/L', low: 3.5, high: 5.0 },
          { name: 'Chloride', value: 104, unit: 'mmol/L', low: 98, high: 107 },
          { name: 'Bicarbonate', value: 20, unit: 'mmol/L', low: 22, high: 29 },
        ],
      },
      {
        title: 'Urine (spot)',
        labs: [
          { name: 'Sodium', value: 12, unit: 'mmol/L', refText: 'varies' },
          { name: 'Creatinine', value: 120, unit: 'mg/dL', refText: 'varies' },
          { name: 'Osmolality', value: 610, unit: 'mOsm/kg', refText: '50–1,200' },
        ],
      },
    ],
    steps: [
      {
        kind: 'mcq',
        id: 'ak1',
        stem: 'KDIGO stage?',
        options: ['Stage 1', 'Stage 2', 'Stage 3', 'Not AKI'],
        answer: 1,
        explanation: '3.2 ÷ 1.1 = 2.9 × baseline → stage 2. Urine output 20 mL/h ≈ 0.25 mL/kg/h for 8 h meets at least stage 2 by urine criteria too (< 0.5 for ≥ 12 h would confirm).',
      },
      {
        kind: 'numeric',
        id: 'ak2',
        stem: 'Calculate the FENa (%).',
        value: 0.23,
        tolerance: 0.03,
        unit: '%',
        explanation: '(12 × 3.2) ÷ (138 × 120) × 100 = 0.23%. Note he takes a thiazide; a low FENa despite a diuretic strengthens the prerenal interpretation.',
      },
      {
        kind: 'mcq',
        id: 'ak3',
        stem: 'Best interpretation?',
        options: [
          'ATN from intraoperative hypotension',
          'Hemodynamic (prerenal) AKI from volume depletion plus the "triple whammy" of NSAID, ACE inhibitor and diuretic',
          'Acute interstitial nephritis from ibuprofen',
          'Postrenal obstruction',
        ],
        answer: 1,
        explanation: 'Hypotension, tachycardia, concentrated urine (610 mOsm/kg), low FENa and a bland sediment point to a hemodynamic cause. NSAIDs constrict the afferent arteriole, ACE inhibitors dilate the efferent, and the diuretic reduces volume — GFR collapses. A bladder scan is still worthwhile post-operatively.',
      },
      {
        kind: 'mcq',
        id: 'ak4',
        stem: 'Most appropriate management?',
        options: [
          'Start furosemide to increase urine output',
          'Stop ibuprofen, lisinopril and hydrochlorothiazide; give isotonic crystalloid boluses with reassessment; monitor K⁺, urine output and creatinine',
          'Urgent hemodialysis',
          'Start IV albumin and terlipressin',
        ],
        answer: 1,
        explanation: 'Remove the hemodynamic insults and restore perfusion. Diuretics do not improve AKI outcomes and worsen hypovolemia. K⁺ 5.6 needs monitoring, not dialysis. Terlipressin is for HRS-AKI in cirrhosis.',
      },
    ],
    diagnosis: 'KDIGO stage 2 hemodynamic (prerenal) AKI — volume depletion with NSAID + ACE inhibitor + thiazide',
    reasoning:
      'Creatinine rose 2.9-fold from baseline. The physiological profile — hypotension, concentrated urine, FENa 0.23% despite a thiazide, bland sediment — indicates preserved tubular function with reduced glomerular perfusion. Each drug removes one of the kidney\'s autoregulatory defences. If creatinine does not improve within 24–72 h of restored perfusion, reconsider ATN and repeat microscopy.',
    takeaways: [
      'Stage AKI by ratio to baseline and urine output.',
      'Low FENa on a diuretic still points to prerenal physiology.',
      'Avoid the NSAID + ACE-I/ARB + diuretic "triple whammy" peri-operatively.',
    ],
    refs: ['kdigo-aki-2012', 'carvounis-2002'],
  },
];
