import type { ClinicalCase, Lesson, Question } from '../../types';
import { check, danger, evidence, formula, h, lab, p, pearl, pitfall, steps, table, ul } from '../dsl';

export const lessons: Lesson[] = [
  {
    id: 'thyroid-testing',
    moduleId: 'endocrine',
    title: 'Thyroid Function Tests',
    summary: 'The TSH–FT4 grid, subclinical disease, pregnancy, non-thyroidal illness and assay interference.',
    minutes: 22,
    bloom: 'analyze',
    objectives: [
      'Interpret any TSH–FT4 combination',
      'Apply current evidence on subclinical hypothyroidism',
      'Adjust interpretation for pregnancy and acute illness',
      'Recognize biotin, heterophile and macro-TSH interference',
    ],
    blocks: [
      p('TRH → TSH → T4 (and some T3); T4 is converted to T3 peripherally, and both feed back on the pituitary. The relationship is log-linear: a small change in FT4 produces a large change in TSH, which is why **TSH is the best single screening test — when the pituitary is intact and the patient is in steady state.**'),
      table(
        ['', 'FT4 low', 'FT4 normal', 'FT4 high'],
        [
          ['**TSH high**', 'Primary hypothyroidism (Hashimoto, post-ablation, drugs: amiodarone, lithium, ICIs)', 'Subclinical hypothyroidism; recovery from NTI; macro-TSH or heterophile interference', 'TSH-secreting adenoma, thyroid hormone resistance, assay interference, poor adherence then catch-up'],
          ['**TSH normal**', 'Central hypothyroidism (early), NTI, drugs', 'Euthyroid', 'Assay interference, heparin (in vitro FFA), amiodarone, acute psychiatric illness, TSHoma'],
          ['**TSH low**', 'Central hypothyroidism, severe NTI, recent treatment of hyperthyroidism', 'Subclinical hyperthyroidism; first-trimester pregnancy; glucocorticoids/dopamine; recovery from hyperthyroidism', 'Primary hyperthyroidism (Graves, toxic nodule, thyroiditis, exogenous), hCG-mediated, biotin interference'],
        ]
      ),
      pitfall('After hyperthyroidism is treated, TSH can stay suppressed for months; monitor with FT4 (and T3). In known pituitary disease, TSH is useless for dosing — target FT4 in the upper half of normal.'),
      check('n-q1'),
      h('Subclinical hypothyroidism'),
      ul(
        'Repeat TSH with FT4 in 6–12 weeks: many elevations normalize (recovery from illness, assay variation).',
        'TSH upper limits rise with age (~7 mIU/L above 80).',
        'TPO antibodies predict progression (~4%/year if positive).'
      ),
      evidence('The TRUST trial (NEJM 2017) found no symptomatic benefit of levothyroxine in adults ≥ 65 with TSH 4.6–19.9 mIU/L; a BMJ 2019 guideline recommends against treating most adults with subclinical hypothyroidism (TSH < 20). Treat when TSH ≥ 10 is individualized; treat women who are pregnant or planning pregnancy.'),
      h('Pregnancy and acute illness'),
      ul(
        '**Pregnancy:** hCG stimulates the TSH receptor, lowering TSH in the first trimester; total T4 rises ~1.5× (TBG). Use trimester-specific ranges; if unavailable, ATA 2017 suggests a first-trimester upper limit of ~4.0 mIU/L.',
        '**Non-thyroidal illness:** low T3 first, then low T4 in critical illness; TSH may be low (dopamine, glucocorticoids) and transiently high during recovery. Do not test thyroid function in acute illness unless dysfunction is suspected.'
      ),
      h('Assay interference — think of it whenever labs disagree with the patient'),
      ul(
        '**Biotin** (≥ 5 mg/day; up to 300 mg/day in some neurologic regimens): streptavidin-based **sandwich** assays (TSH) read **falsely low**, **competitive** assays (FT4, FT3, TRAb) read **falsely high** — a perfect fake Graves picture.',
        '**Heterophile/human anti-animal antibodies:** usually falsely high sandwich results (TSH); test with blocking tubes, serial dilution or another platform.',
        '**Macro-TSH:** TSH–IgG complexes cause persistently high TSH with normal FT4 (PEG precipitation).',
        '**Heparin** activates lipase in vitro, releasing free fatty acids that displace T4 → falsely high FT4.'
      ),
      check('n-q2'),
      h('Thyrotoxicosis: which cause?'),
      table(
        ['Cause', 'Discriminators'],
        [
          ['Graves disease', 'TRAb/TSI positive, diffuse uptake, ophthalmopathy; T3/T4 ratio > 20 (ng/µg)'],
          ['Toxic adenoma / multinodular goiter', 'Focal uptake, older patients'],
          ['Thyroiditis (painless, postpartum, subacute, amiodarone type 2, ICI)', 'Low uptake; painful + high ESR in subacute'],
          ['Exogenous thyroid hormone', 'Low uptake and **low thyroglobulin**'],
          ['hCG-mediated', 'Hyperemesis gravidarum, molar pregnancy'],
        ]
      ),
      danger('Thyroid storm (Burch–Wartofsky ≥ 45): β-blocker, thionamide (PTU preferred in storm and first trimester), **iodine ≥ 1 h after the thionamide**, glucocorticoids, cooling and treatment of the precipitant. Myxedema coma: IV levothyroxine (± liothyronine) **after** stress-dose hydrocortisone.'),
      check('n-q3'),
      lab('endocrine-axes', 'Explore the thyroid axis: pick a lesion and watch TRH, TSH and FT4 respond — then test yourself on the pattern grid.'),
    ],
    takeaways: [
      'TSH first, FT4 to confirm — unless pituitary disease or non-steady state.',
      'Subclinical hypothyroidism: repeat first; little benefit treating TSH < 10 in older adults.',
      'Biotin: TSH falsely low, FT4 falsely high.',
      'Thyroglobulin distinguishes exogenous hormone from thyroiditis.',
    ],
    refs: ['jonklaas-2014', 'ross-2016', 'trust-2017', 'bekkering-2019', 'ata-preg-2017', 'li-biotin-2017'],
  },
  {
    id: 'adrenal-testing',
    moduleId: 'endocrine',
    title: 'Adrenal Testing: Insufficiency, Cushing Syndrome, Primary Aldosteronism',
    summary: 'Assay-specific cortisol cut-offs, crisis management, Cushing screening pitfalls and the 2025 shift to screening all hypertension for aldosteronism.',
    minutes: 26,
    bloom: 'evaluate',
    objectives: [
      'Diagnose adrenal insufficiency using assay-appropriate cortisol thresholds',
      'Treat adrenal crisis without delay',
      'Choose and interpret Cushing screening tests',
      'Screen for primary aldosteronism with the aldosterone–renin ratio',
    ],
    blocks: [
      p('CRH → ACTH → cortisol (peak 06:00–08:00, nadir around midnight). Roughly 90% of cortisol is bound to cortisol-binding globulin (CBG) and albumin: oral estrogen and pregnancy raise total cortisol; nephrotic syndrome, cirrhosis and critical illness lower it.'),
      table(
        ['', 'Primary (Addison)', 'Secondary / tertiary', 'Glucocorticoid-induced'],
        [
          ['ACTH', 'High', 'Low / inappropriately normal', 'Low'],
          ['Renin / aldosterone', 'High renin, low aldosterone', 'Normal', 'Normal'],
          ['Na⁺ / K⁺', 'Hyponatremia, **hyperkalemia**', 'Hyponatremia (SIADH-like), normal K⁺', 'Hyponatremia possible'],
          ['Skin', 'Hyperpigmentation', 'Pale', '—'],
          ['Causes', 'Autoimmune (21-hydroxylase Ab), TB, hemorrhage (anticoagulants, sepsis), metastases, ICIs', 'Pituitary tumors/surgery, hypophysitis (ICIs), opioids', 'Any route: oral, inhaled, topical, intra-articular'],
        ]
      ),
      danger('**Adrenal crisis:** do not wait for tests. Hydrocortisone 100 mg IV bolus, then 200 mg/24 h (infusion or 50 mg every 6 h), plus 1 L isotonic saline over the first hour and dextrose if hypoglycemic. Draw cortisol and ACTH first only if it causes no delay.'),
      h('Testing for adrenal insufficiency'),
      ul(
        'Morning (06:00–09:00) cortisol < 3–5 µg/dL (< 83–140 nmol/L) strongly suggests AI; values above ~15 µg/dL make it unlikely (assay-dependent).',
        '**Cosyntropin (ACTH 250 µg) test:** cortisol at 30 and/or 60 min. The traditional peak threshold of 18 µg/dL (500 nmol/L) was set with older polyclonal immunoassays.',
        'Prednisone and prednisolone cross-react with cortisol immunoassays; hold hydrocortisone ≥ 24 h before testing. Dexamethasone does not cross-react (but suppresses the axis).'
      ),
      evidence('With specific monoclonal immunoassays (e.g., Elecsys Cortisol II, Access) and LC-MS/MS, the equivalent 30-min cut-off is ~14–15 µg/dL (~400–420 nmol/L) (Javorsky 2021; Klose 2024). Using 18 µg/dL with these assays roughly doubles false-positive AI diagnoses — use your laboratory\'s validated cut-off.'),
      check('n-q4'),
      h('Cushing syndrome'),
      steps(
        'Sequence',
        ['Exclude exogenous glucocorticoids', 'The commonest cause of Cushing syndrome.'],
        ['Screen with two of three', '1-mg overnight dexamethasone suppression (08:00 cortisol < 1.8 µg/dL = 50 nmol/L is normal), late-night salivary cortisol × 2, 24-h urine free cortisol × 2.'],
        ['Localize only after biochemical confirmation', 'ACTH suppressed (< 10 pg/mL) → adrenal source (CT). ACTH normal/high → pituitary MRI; inferior petrosal sinus sampling or CRH/desmopressin testing to separate pituitary from ectopic ACTH.']
      ),
      pitfall('False-positive dexamethasone tests: oral estrogen (raises CBG → total cortisol), CYP3A4 inducers (carbamazepine, phenytoin, rifampin, St John\'s wort accelerate dexamethasone clearance), malabsorption, non-adherence. Measuring a dexamethasone level with the cortisol helps. Severe obesity, depression and alcohol use can cause mild hypercortisolism ("pseudo-Cushing").'),
      check('n-q6'),
      h('Primary aldosteronism (PA)'),
      evidence('The 2025 Endocrine Society guideline suggests screening **all adults with hypertension** for PA (weak recommendation, low-certainty evidence; prevalence ~5–14% in primary care). The 2024 ESC and 2025 AHA/ACC hypertension guidelines still recommend targeted screening: resistant hypertension, hypokalemia (spontaneous or diuretic-induced), adrenal incidentaloma, sleep apnea, atrial fibrillation, family history of early stroke/hypertension.'),
      ul(
        'Screen with **aldosterone and renin** (activity or concentration). Suppressed renin is the hallmark; the aldosterone–renin ratio (ARR) threshold depends on units and assay.',
        'Correct hypokalemia first (low K⁺ suppresses aldosterone). Many antihypertensives can be continued; MRAs, ENaC blockers and high-dose diuretics raise renin and can cause false negatives — interpret against the drug list.',
        'Only a minority of patients with PA are hypokalemic — normokalemia does not exclude it.',
        'Positive screen → confirmatory testing (may be skipped with spontaneous hypokalemia, undetectable renin and high aldosterone) → CT and adrenal vein sampling if surgery is an option.'
      ),
      check('n-q5'),
      lab('endocrine-axes', 'Switch to the adrenal and RAAS axes: see why ACTH separates primary from secondary AI and how renin separates primary from secondary aldosteronism.'),
    ],
    takeaways: [
      'Crisis: hydrocortisone 100 mg IV now; test later.',
      'Use assay-specific stimulated cortisol cut-offs (~14–15 µg/dL with modern assays).',
      'Cushing: exclude exogenous steroids; two abnormal screens before imaging.',
      'PA: suppressed renin is the key; screen widely, correct K⁺ first.',
    ],
    refs: ['bornstein-2016', 'javorsky-2021', 'nieman-2008', 'fleseriu-2021', 'es-pa-2025'],
  },
  {
    id: 'diabetes-markers',
    moduleId: 'endocrine',
    title: 'Glucose, HbA1c and Hyperglycemic Crises',
    summary: 'Diagnostic criteria, when HbA1c lies, glucose pre-analytics, the 2024 DKA/HHS criteria and the hypoglycemia work-up.',
    minutes: 22,
    bloom: 'apply',
    objectives: [
      'Apply ADA diagnostic criteria for diabetes and prediabetes',
      'Identify when HbA1c is unreliable and what to use instead',
      'Apply 2024 DKA and HHS criteria',
      'Interpret insulin, C-peptide and β-hydroxybutyrate during hypoglycemia',
    ],
    blocks: [
      table(
        ['Test', 'Diabetes', 'Prediabetes'],
        [
          ['Fasting plasma glucose', '≥ 126 mg/dL (7.0 mmol/L)', '100–125 mg/dL (5.6–6.9)'],
          ['2-h glucose, 75-g OGTT', '≥ 200 mg/dL (11.1 mmol/L)', '140–199 mg/dL (7.8–11.0)'],
          ['HbA1c (NGSP/DCCT-aligned)', '≥ 6.5% (48 mmol/mol)', '5.7–6.4% (39–47 mmol/mol)'],
          ['Random glucose', '≥ 200 mg/dL with classic symptoms or crisis', '—'],
        ],
        'ADA Standards of Care. Without unequivocal hyperglycemia, confirm with two abnormal results — from the same sample (e.g., FPG + HbA1c) or two separate samples.'
      ),
      h('When HbA1c misleads'),
      ul(
        '**Shortened red-cell survival → falsely low:** hemolysis, blood loss, transfusion, ESA therapy, 2nd/3rd-trimester pregnancy, advanced CKD/dialysis.',
        '**Prolonged survival → falsely high:** iron-, B12- or folate-deficiency anemia, asplenia.',
        '**Hemoglobin variants:** method-dependent interference (check the NGSP interference list for your assay).',
        'Use plasma glucose criteria in these settings and in suspected type 1 diabetes, pregnancy and acute illness. Alternatives: fructosamine/glycated albumin (2–3 weeks), CGM metrics.'
      ),
      formula('Estimated average glucose (mg/dL) = 28.7 × HbA1c − 46.7', undefined, 'HbA1c 6% ≈ 126, 7% ≈ 154, 8% ≈ 183, 9% ≈ 212 mg/dL. IFCC mmol/mol = (HbA1c% − 2.15) × 10.929.'),
      ul('CGM consensus targets: time in range 70–180 mg/dL > 70%, below 70 mg/dL < 4%, below 54 mg/dL < 1% (for most adults).'),
      pitfall('Glucose falls ~5–7% per hour in unseparated whole blood. Fluoride alone takes 1–4 h to stop glycolysis; use a citrate-buffered tube, an ice slurry with separation within 30 min, or prompt centrifugation.'),
      check('n-q7'),
      h('Hyperglycemic crises (2024 consensus)'),
      table(
        ['', 'DKA', 'HHS'],
        [
          ['Glucose', '≥ 200 mg/dL (11.1 mmol/L) or known diabetes', '≥ 600 mg/dL (33.3 mmol/L)'],
          ['Ketones', 'β-hydroxybutyrate ≥ 3.0 mmol/L (or urine ketones ≥ 2+)', 'No significant ketonemia (β-OHB < 3.0)'],
          ['Acid–base', 'pH < 7.3 and/or HCO₃⁻ < 18 mmol/L', 'pH ≥ 7.3 and HCO₃⁻ ≥ 15 mmol/L'],
          ['Osmolality', 'Variable', 'Effective osmolality > 300 mOsm/kg (or total > 320)'],
        ],
        'Mixed DKA–HHS is common. The lower DKA glucose threshold captures euglycemic DKA (SGLT2 inhibitors, pregnancy, starvation).'
      ),
      pearl('Effective osmolality = 2 × Na⁺ + glucose/18. Track the corrected Na⁺: if it rises during treatment, the patient is losing free water — adjust fluids.'),
      check('n-q9'),
      h('Hypoglycemia work-up (people without diabetes)'),
      p('Evaluate only when **Whipple\'s triad** is documented: symptoms, low plasma glucose, relief with glucose. During spontaneous or provoked (72-h fast, mixed meal) hypoglycemia < 55 mg/dL (3.0 mmol/L), draw insulin, C-peptide, proinsulin, β-hydroxybutyrate, an oral hypoglycemic screen and insulin antibodies, then give glucagon and track the glucose response.'),
      table(
        ['Cause', 'Insulin', 'C-peptide', 'Proinsulin', 'β-OHB', 'Hypoglycemic screen'],
        [
          ['Insulinoma', '↑ (≥ 3 µU/mL)', '↑ (≥ 0.6 ng/mL)', '↑ (≥ 5 pmol/L)', '↓ (≤ 2.7 mmol/L)', 'Negative'],
          ['Sulfonylurea / meglitinide', '↑', '↑', '↑', '↓', 'Positive'],
          ['Exogenous insulin', '↑↑', '↓ (suppressed)', '↓', '↓', 'Negative'],
          ['Non-islet tumor (IGF-2)', '↓', '↓', '↓', '↓', 'Negative; IGF-2:IGF-1 ratio high'],
          ['Insulin autoimmune syndrome', '↑↑', '↑', '↑', '↓', 'Insulin antibodies positive'],
          ['Non-insulin (fasting, adrenal, liver, sepsis)', '↓', '↓', '↓', '↑', 'Negative'],
        ],
        'Thresholds per Endocrine Society 2009.'
      ),
      check('n-q8'),
    ],
    takeaways: [
      'HbA1c ≥ 6.5% diagnoses diabetes — unless red-cell lifespan or variants interfere.',
      'Separate glucose samples promptly or use citrate tubes.',
      'DKA 2024: glucose ≥ 200, β-OHB ≥ 3.0, pH < 7.3/HCO₃⁻ < 18. HHS: glucose ≥ 600, eff. osm > 300.',
      'Exogenous insulin: high insulin, suppressed C-peptide.',
    ],
    refs: ['ada-soc', 'umpierrez-2024', 'nathan-2008', 'battelino-2019', 'cryer-2009'],
  },
];

export const questions: Question[] = [
  {
    kind: 'mcq',
    id: 'n-q1',
    moduleId: 'endocrine',
    difficulty: 2,
    tags: ['thyroid', 'central'],
    stem: 'After pituitary surgery: TSH 1.2 mIU/L, FT4 0.5 ng/dL (low), fatigue and cold intolerance. Interpretation?',
    options: ['Euthyroid — TSH is normal', 'Central hypothyroidism', 'Primary hypothyroidism', 'Non-thyroidal illness only'],
    answer: 1,
    explanation: 'A low FT4 with an inappropriately normal (or low) TSH means the pituitary is not responding. In central hypothyroidism TSH may even be mildly raised but biologically inactive. Dose levothyroxine to FT4, and assess other pituitary axes (cortisol before thyroid replacement).',
  },
  {
    kind: 'mcq',
    id: 'n-q2',
    moduleId: 'endocrine',
    difficulty: 2,
    tags: ['biotin', 'interference'],
    stem: 'Clinically euthyroid woman with HR 70: TSH < 0.01, FT4 4.1 ng/dL, TRAb "positive". She takes 300 mg/day biotin. Most likely explanation?',
    options: ['Graves disease', 'Biotin interference in streptavidin-based immunoassays', 'TSH-secreting adenoma', 'Thyroiditis'],
    answer: 1,
    explanation: 'High-dose biotin depresses sandwich assays (TSH) and inflates competitive assays (FT4, TRAb) — mimicking Graves. Repeat after stopping biotin (several days for high doses) or on a non-biotin platform before any treatment.',
  },
  {
    kind: 'mcq',
    id: 'n-q3',
    moduleId: 'endocrine',
    difficulty: 2,
    tags: ['subclinical'],
    stem: 'A 78-year-old with mild fatigue has TSH 7.8 mIU/L and normal FT4 on two occasions 3 months apart. Best management?',
    options: ['Start levothyroxine 1.6 µg/kg', 'Observe and recheck TSH in 6–12 months; levothyroxine is unlikely to improve symptoms', 'Thyroid ultrasound', 'Radioiodine uptake scan'],
    answer: 1,
    explanation: 'TSH upper limits rise with age, and the TRUST trial showed no symptom or quality-of-life benefit from levothyroxine in older adults with subclinical hypothyroidism. Overtreatment risks atrial fibrillation and bone loss.',
  },
  {
    kind: 'mcq',
    id: 'n-q4',
    moduleId: 'endocrine',
    difficulty: 3,
    tags: ['adrenal insufficiency', 'assay'],
    stem: 'Your lab uses an LC-MS/MS cortisol method. A cosyntropin test gives a 30-min cortisol of 15.8 µg/dL (436 nmol/L). Interpretation?',
    options: ['Adrenal insufficiency — below 18 µg/dL', 'Normal response with this assay (cut-off ~14–15 µg/dL)', 'Test is invalid', 'Secondary AI'],
    answer: 1,
    explanation: 'The 18 µg/dL threshold derives from older polyclonal immunoassays that over-read cortisol. Specific assays (LC-MS/MS, Elecsys II) give lower values; validated cut-offs are ~14–15 µg/dL. Applying 18 would label this patient falsely and commit them to lifelong steroids.',
  },
  {
    kind: 'mcq',
    id: 'n-q5',
    moduleId: 'endocrine',
    difficulty: 2,
    tags: ['aldosteronism'],
    stem: 'Hypertensive patient with K⁺ 3.0 mmol/L on hydrochlorothiazide. Before measuring aldosterone and renin you should:',
    options: ['Stop all antihypertensives for 6 weeks', 'Correct the hypokalemia; interpret results knowing which drugs raise renin', 'Give a salt-restricted diet', 'Order adrenal CT first'],
    answer: 1,
    explanation: 'Hypokalemia suppresses aldosterone secretion and causes false negatives. The 2025 guideline allows screening on most drugs with informed interpretation; diuretics and MRAs raise renin, so a suppressed renin on them is especially meaningful. Imaging comes after biochemical confirmation.',
  },
  {
    kind: 'mcq',
    id: 'n-q6',
    moduleId: 'endocrine',
    difficulty: 2,
    tags: ['Cushing', 'pitfall'],
    stem: 'A woman on a combined oral contraceptive has an 08:00 cortisol of 4.2 µg/dL after 1 mg dexamethasone. Late-night salivary cortisol is normal ×2. Most likely?',
    options: ['Cushing disease', 'False-positive DST from estrogen-induced CBG', 'Adrenal adenoma', 'Ectopic ACTH'],
    answer: 1,
    explanation: 'Oral estrogen raises cortisol-binding globulin and total serum cortisol, causing false-positive DSTs. Salivary (free) cortisol is unaffected — two normal values argue strongly against Cushing syndrome. Stopping estrogen 6 weeks before retesting is an option.',
  },
  {
    kind: 'mcq',
    id: 'n-q7',
    moduleId: 'endocrine',
    difficulty: 2,
    tags: ['HbA1c'],
    stem: 'A patient on hemodialysis receiving an ESA has HbA1c 5.6% but CGM mean glucose 190 mg/dL. Explanation?',
    options: ['CGM error', 'Shortened red-cell survival and ESA-driven young red cells falsely lower HbA1c', 'Hemoglobin variant raising HbA1c', 'Lab error'],
    answer: 1,
    explanation: 'In advanced CKD, especially with ESA therapy, younger red cells have less time to glycate. Use CGM or glucose-based metrics; fructosamine/glycated albumin are alternatives (though affected by protein losses).',
  },
  {
    kind: 'mcq',
    id: 'n-q8',
    moduleId: 'endocrine',
    difficulty: 2,
    tags: ['hypoglycemia'],
    stem: 'A nurse has glucose 38 mg/dL: insulin 85 µU/mL (high), C-peptide < 0.1 ng/mL, sulfonylurea screen negative. Diagnosis?',
    options: ['Insulinoma', 'Exogenous insulin administration', 'Sulfonylurea ingestion', 'IGF-2–secreting tumor'],
    answer: 1,
    explanation: 'Commercial insulin lacks C-peptide and suppresses endogenous secretion → high insulin, suppressed C-peptide. Insulinoma and sulfonylureas raise both insulin and C-peptide; IGF-2 tumors suppress both.',
  },
  {
    kind: 'mcq',
    id: 'n-q9',
    moduleId: 'endocrine',
    difficulty: 2,
    tags: ['DKA', 'euglycemic'],
    stem: 'On empagliflozin, a patient post-surgery has glucose 182 mg/dL, β-hydroxybutyrate 4.6 mmol/L, pH 7.21, HCO₃⁻ 12. Diagnosis per 2024 criteria?',
    options: ['Not DKA — glucose < 250', 'Euglycemic DKA', 'Lactic acidosis', 'Starvation ketosis only'],
    answer: 1,
    explanation: 'The 2024 consensus requires glucose ≥ 200 mg/dL **or a history of diabetes**, ketonemia ≥ 3.0 and acidosis. SGLT2 inhibitors (especially peri-operatively or with reduced intake) cause DKA with near-normal glucose. Treat with insulin plus dextrose.',
  },
];

export const cases: ClinicalCase[] = [
  {
    id: 'hypothyroid-case',
    moduleId: 'endocrine',
    title: 'Fatigue, Weight Gain and a High CK',
    difficulty: 'core',
    presentation:
      'A 45-year-old woman (70 kg) has 6 months of fatigue, 7-kg weight gain, cold intolerance and constipation. Pulse 58, dry skin, delayed relaxation of ankle reflexes. No goiter. No cardiac disease.',
    panels: [
      {
        title: 'Serum',
        labs: [
          { name: 'TSH', value: 42.5, unit: 'mIU/L', low: 0.4, high: 4.0 },
          { name: 'Free T4', value: 0.3, unit: 'ng/dL', low: 0.8, high: 1.8, analyte: 'ft4' },
          { name: 'Sodium', value: 136, unit: 'mmol/L', low: 135, high: 145 },
          { name: 'Total cholesterol', value: 285, unit: 'mg/dL', low: 0, high: 200, analyte: 'cholesterol' },
          { name: 'Creatine kinase', value: 420, unit: 'IU/L', low: 30, high: 200 },
          { name: 'TPO antibodies', value: 'Positive (480 IU/mL)', unit: '', refText: '< 35' },
        ],
      },
    ],
    steps: [
      {
        kind: 'mcq',
        id: 'ht1',
        stem: 'Diagnosis?',
        options: ['Primary hypothyroidism (Hashimoto thyroiditis)', 'Central hypothyroidism', 'Subclinical hypothyroidism', 'Non-thyroidal illness'],
        answer: 0,
        explanation: 'High TSH with low FT4 = primary gland failure; positive TPO antibodies identify Hashimoto thyroiditis, the commonest cause in iodine-sufficient regions.',
      },
      {
        kind: 'mcq',
        id: 'ht2',
        stem: 'Which associated abnormalities are typical of overt hypothyroidism?',
        options: [
          'Hypercholesterolemia and raised CK; hyponatremia only when severe (myxedema)',
          'Hypokalemia and metabolic alkalosis',
          'Hypercalcemia',
          'Low CK',
        ],
        answer: 0,
        explanation: 'Reduced LDL-receptor expression raises LDL; hypothyroid myopathy raises CK. Hyponatremia is uncommon unless hypothyroidism is severe — look for another cause if Na⁺ is low in mild disease. Recheck lipids after treatment before starting a statin.',
      },
      {
        kind: 'numeric',
        id: 'ht3',
        stem: 'Estimate a full replacement levothyroxine dose at 1.6 µg/kg/day (µg/day).',
        value: 112,
        tolerance: 8,
        unit: 'µg/day',
        explanation: '1.6 × 70 = 112 µg/day (rounded to an available tablet, e.g., 112 µg). Start low (25–50 µg) in older adults or coronary disease. Recheck TSH 6–8 weeks after any dose change; take on an empty stomach, apart from iron and calcium.',
      },
    ],
    diagnosis: 'Overt primary hypothyroidism due to Hashimoto thyroiditis',
    reasoning:
      'TSH > 40 with low FT4 localizes the problem to the thyroid; positive TPO antibodies confirm autoimmunity. Hypercholesterolemia and a raised CK are expected and should be re-evaluated after euthyroidism. In a young patient without cardiac disease, a full weight-based dose is appropriate.',
    takeaways: [
      'High TSH + low FT4 = primary hypothyroidism.',
      'Re-assess lipids and CK after treatment.',
      'Levothyroxine ~1.6 µg/kg/day; recheck TSH at 6–8 weeks.',
    ],
    refs: ['jonklaas-2014'],
  },
  {
    id: 'addison-case',
    moduleId: 'endocrine',
    title: 'Vomiting, Hypotension and Dark Skin',
    difficulty: 'intermediate',
    mustNotMiss: true,
    presentation:
      'A 34-year-old woman with vitiligo has 3 months of fatigue, 6-kg weight loss and salt craving. For 2 days she has had vomiting and abdominal pain. BP 82/50, HR 120. Buccal and palmar-crease hyperpigmentation.',
    panels: [
      {
        title: 'Serum',
        labs: [
          { name: 'Sodium', value: 126, unit: 'mmol/L', low: 135, high: 145 },
          { name: 'Potassium', value: 6.0, unit: 'mmol/L', low: 3.5, high: 5.0 },
          { name: 'Bicarbonate', value: 19, unit: 'mmol/L', low: 22, high: 29 },
          { name: 'Glucose', value: 62, unit: 'mg/dL', low: 70, high: 99, analyte: 'glucose' },
          { name: 'BUN', value: 32, unit: 'mg/dL', low: 7, high: 20, analyte: 'bun' },
          { name: 'Creatinine', value: 1.3, unit: 'mg/dL', low: 0.5, high: 1.1, analyte: 'creatinine' },
          { name: 'Calcium', value: 10.6, unit: 'mg/dL', low: 8.6, high: 10.2, analyte: 'calcium' },
          { name: 'Cortisol (random, drawn before treatment)', value: 1.9, unit: 'µg/dL', low: 5, high: 23, analyte: 'cortisol' },
          { name: 'ACTH', value: 890, unit: 'pg/mL', low: 7, high: 63 },
          { name: 'Plasma renin activity', value: 18, unit: 'ng/mL/h', low: 0.6, high: 4.3 },
        ],
      },
    ],
    steps: [
      {
        kind: 'mcq',
        id: 'ad1',
        stem: 'What is the immediate priority?',
        options: [
          'Cosyntropin stimulation test before any steroid',
          'Hydrocortisone 100 mg IV, 1 L isotonic saline over 1 h, IV dextrose',
          'Fludrocortisone 0.1 mg orally',
          'Hypertonic saline for the hyponatremia',
        ],
        answer: 1,
        explanation: 'Suspected adrenal crisis is treated immediately; the cortisol already drawn is enough for diagnosis. Hydrocortisone at stress doses provides mineralocorticoid effect, so fludrocortisone is unnecessary acutely.',
      },
      {
        kind: 'mcq',
        id: 'ad2',
        stem: 'Primary or secondary adrenal insufficiency?',
        options: ['Primary — high ACTH, high renin, hyperkalemia, hyperpigmentation', 'Secondary — low cortisol with hyponatremia', 'Tertiary', 'Cannot tell without MRI'],
        answer: 0,
        explanation: 'Adrenal destruction removes both cortisol and aldosterone: ACTH and renin rise, K⁺ rises, and ACTH-related POMC peptides darken the skin. Secondary AI spares aldosterone (normal K⁺, pale skin). Vitiligo hints at autoimmune polyglandular disease; check 21-hydroxylase antibodies.',
      },
      {
        kind: 'numeric',
        id: 'ad3',
        stem: 'Convert her cortisol of 1.9 µg/dL to nmol/L (× 27.59).',
        value: 52,
        tolerance: 2,
        unit: 'nmol/L',
        explanation: '1.9 × 27.59 ≈ 52 nmol/L — far below any threshold even during stress, when cortisol should exceed ~15–18 µg/dL.',
      },
      {
        kind: 'mcq',
        id: 'ad4',
        stem: 'Long-term plan?',
        options: [
          'Hydrocortisone only',
          'Hydrocortisone 15–25 mg/day in 2–3 doses + fludrocortisone 0.05–0.2 mg/day, sick-day rules, emergency injection kit and alert ID',
          'Prednisone 40 mg/day indefinitely',
          'Dexamethasone 4 mg weekly',
        ],
        answer: 1,
        explanation: 'Primary AI needs glucocorticoid and mineralocorticoid replacement (titrate fludrocortisone to BP, K⁺ and renin). Education on doubling doses during illness and parenteral hydrocortisone for vomiting prevents future crises.',
      },
    ],
    diagnosis: 'Adrenal crisis due to primary (autoimmune) adrenal insufficiency',
    reasoning:
      'Hypotension, hyponatremia, hyperkalemia, hypoglycemia, mild hypercalcemia and pre-renal AKI with a very low cortisol, high ACTH and high renin establish primary AI. Treatment precedes confirmatory testing.',
    takeaways: [
      'Treat suspected crisis first: hydrocortisone 100 mg IV.',
      'Hyperkalemia + hyperpigmentation + high renin = primary AI.',
      'Teach sick-day rules and provide an emergency kit.',
    ],
    refs: ['bornstein-2016'],
  },
];
