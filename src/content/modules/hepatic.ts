import type { ClinicalCase, Lesson, Question } from '../../types';
import { check, danger, evidence, formula, h, lab, p, pearl, pitfall, steps, table, ul } from '../dsl';

export const lessons: Lesson[] = [
  {
    id: 'hepatic-intro',
    moduleId: 'hepatic',
    title: 'Liver Tests Decoded',
    summary: 'What each "LFT" measures, true upper limits of normal, the R ratio and the isolated abnormalities you will see every week.',
    minutes: 18,
    bloom: 'understand',
    objectives: [
      'Separate injury markers from true function tests',
      'Calculate the R ratio and grade magnitude (ACG 2017)',
      'Interpret the AST/ALT ratio',
      'Work up isolated ALP and isolated unconjugated hyperbilirubinemia',
    ],
    blocks: [
      p('Most "liver function tests" measure **injury** (ALT, AST) or **cholestasis** (ALP, GGT). True function is shown by bilirubin clearance, albumin and the PT/INR.'),
      table(
        ['Test', 'Source', 'Half-life', 'Key caveat'],
        [
          ['ALT', 'Hepatocyte cytosol (most liver-specific)', '~47 h', 'Many lab ULNs (40–55 IU/L) are higher than true healthy limits'],
          ['AST', 'Liver, muscle, heart, red cells', '~17 h', 'Rises with rhabdomyolysis, MI, hemolysis; macro-AST causes isolated persistent elevation'],
          ['ALP', 'Canalicular membrane; also bone, placenta, intestine', '~7 days', 'Normal in children/adolescents (bone growth) and pregnancy up to 2–3 × ULN'],
          ['GGT', 'Biliary epithelium', '~10 days', 'Confirms hepatic ALP; induced by alcohol, phenytoin, carbamazepine'],
          ['Bilirubin', 'Heme breakdown; conjugated in liver', 'Delta-bilirubin ~2–3 weeks', 'Albumin-bound "delta" fraction keeps patients jaundiced after obstruction is relieved'],
          ['Albumin', 'Hepatocyte synthesis', '~3 weeks', 'Also low in inflammation, nephrotic syndrome, malnutrition'],
          ['PT/INR', 'Factors I, II, V, VII, X', 'Factor VII ~6 h', 'Fastest marker of synthetic failure; also prolonged by vitamin K deficiency and warfarin'],
        ]
      ),
      evidence('ACG 2017: healthy ALT upper limits are **29–33 IU/L in men and 19–25 IU/L in women**. Values above these deserve evaluation even when the lab does not flag them.'),
      formula('R ratio = (ALT ÷ ALT ULN) ÷ (ALP ÷ ALP ULN)', undefined, 'R ≥ 5 hepatocellular · R ≤ 2 cholestatic · 2–5 mixed. Uses ULN-normalized values, not raw ALT/ALP.'),
      table(
        ['ALT elevation', 'Magnitude (ACG 2017)'],
        [
          ['< 2 × ULN', 'Borderline'],
          ['2–5 × ULN', 'Mild'],
          ['5–15 × ULN', 'Moderate'],
          ['> 15 × ULN', 'Severe'],
          ['> 10,000 IU/L', 'Massive'],
        ]
      ),
      h('AST/ALT ratio'),
      ul(
        '**≥ 2:** alcohol-associated liver disease (AST rarely > 300–400 IU/L), also cirrhosis of any cause, Wilson disease.',
        '**≤ 1:** viral hepatitis, MASLD (metabolic dysfunction-associated steatotic liver disease, formerly NAFLD), most drug-induced hepatocellular injury.',
        'AST far above ALT with high CK → muscle source.'
      ),
      check('h-q1'),
      h('Isolated abnormalities'),
      steps(
        'Isolated raised ALP',
        ['Confirm liver origin', 'GGT (or 5′-nucleotidase, ALP isoenzymes). Normal GGT → bone (Paget, metastases, healing fracture, osteomalacia), placenta, intestine (blood groups O/B after a fatty meal).'],
        ['If hepatic', 'Ultrasound for duct dilation; AMA for PBC; consider drugs, infiltrative disease (granulomas, lymphoma, amyloid, metastases), PSC (MRCP).']
      ),
      steps(
        'Isolated raised bilirubin',
        ['Fractionate', 'Direct (conjugated) < 20% of total → unconjugated. Direct > 1.0 mg/dL or > 20% of total → conjugated (hepatobiliary).'],
        ['Unconjugated', 'Gilbert syndrome (UGT1A1; rises with fasting and illness, usually total < 4–5 mg/dL, normal CBC and reticulocytes), hemolysis (LDH ↑, haptoglobin ↓, reticulocytes ↑), drugs (atazanavir, rifampin), resorbing hematoma.']
      ),
      check('h-q2'),
      lab('hepatic-pattern', 'Enter any panel to get the R ratio, magnitude, AST/ALT interpretation, Hy\'s-law check, MELD 3.0 and Child–Pugh.'),
    ],
    takeaways: [
      'ALT/AST = injury; ALP/GGT = cholestasis; bilirubin, albumin, INR = function.',
      'R ratio uses ULN-normalized values: ≥ 5 hepatocellular, ≤ 2 cholestatic.',
      'True healthy ALT ULN ≈ 33 (men) / 25 (women) IU/L.',
      'Gilbert: unconjugated, fasting-sensitive, normal hemolysis markers.',
    ],
    refs: ['kwo-2017', 'rinella-2023', 'aasld-masld-2023'],
  },
  {
    id: 'cholestatic-vs-hepatocellular',
    moduleId: 'hepatic',
    title: 'Hepatocellular and Cholestatic Patterns',
    summary: 'The differential for ALT > 1,000, drug-induced liver injury, Hy\'s law and the cholestasis algorithm.',
    minutes: 22,
    bloom: 'analyze',
    objectives: [
      'Build a differential for very high aminotransferases using timing and LDH',
      'Recognize DILI patterns and Hy\'s law',
      'Separate intrahepatic from extrahepatic cholestasis',
      'Recognize acute cholangitis',
    ],
    blocks: [
      h('ALT > 1,000 IU/L: think by mechanism'),
      table(
        ['Cause', 'Pattern and clues', 'Key tests'],
        [
          ['Acetaminophen', 'Often > 3,000–5,000; AST > ALT early; may occur at "therapeutic" doses with fasting/alcohol', 'Acetaminophen level, timing'],
          ['Ischemic hepatitis', 'Rapid rise and fall within days; very high LDH (ALT/LDH < 1.5); shock or heart failure', 'Hemodynamics, echo'],
          ['Acute viral', 'Gradual decline; ALT > AST; jaundice', 'HAV IgM, HBsAg + anti-HBc IgM, HCV RNA, HEV IgM; HSV PCR if anicteric with fever'],
          ['Passage of a common-duct stone', 'Transient ALT spike (can exceed 1,000) with biliary pain, then cholestatic pattern', 'Ultrasound / MRCP'],
          ['Autoimmune hepatitis', 'Women, other autoimmunity', 'IgG, ANA, anti-smooth muscle antibody'],
          ['Wilson disease (fulminant)', 'Young patient, Coombs-negative hemolysis, ALP/bilirubin ratio < 4, AST/ALT > 2.2', 'Ceruloplasmin, urinary copper, slit-lamp'],
          ['Budd–Chiari', 'Ascites, hepatomegaly, pain', 'Doppler ultrasound'],
        ]
      ),
      pearl('Always check an acetaminophen level in unexplained acute liver injury — even if ingestion is denied. N-acetylcysteine helps even late and in non-acetaminophen acute liver failure.'),
      check('h-q3'),
      h('Drug-induced liver injury (DILI)'),
      ul(
        'Classify by R ratio at onset: hepatocellular (isoniazid, nitrofurantoin, many herbal and dietary supplements such as green-tea extract), cholestatic or mixed (amoxicillin–clavulanate — the most common DILI in the US and Europe; anabolic steroids).',
        'Immune checkpoint inhibitors cause immune-mediated hepatitis — grade by ALT/bilirubin and treat with steroids.',
        'Causality: RUCAM or expert opinion; LiverTox is a free reference for individual drugs.'
      ),
      formula("Hy's law: ALT > 3 × ULN + total bilirubin > 2 × ULN, without initial ALP > 2 × ULN or another cause", undefined, 'Drug-induced hepatocellular jaundice carries ~10% mortality or need for transplantation — stop the drug and monitor INR.'),
      check('h-q4'),
      h('Cholestasis'),
      steps(
        'Algorithm',
        ['Confirm hepatic origin', 'ALP with raised GGT.'],
        ['Ultrasound', 'Dilated ducts → extrahepatic: choledocholithiasis, pancreatic head or ampullary cancer, cholangiocarcinoma, PSC stricture → MRCP or EUS, then ERCP if therapeutic.'],
        ['Non-dilated ducts → intrahepatic', 'PBC (AMA-positive, middle-aged women), PSC (MRCP; associated with IBD), drugs, sepsis, parenteral nutrition, infiltrative disease, intrahepatic cholestasis of pregnancy (bile acids > 10 µmol/L, third trimester).']
      ),
      danger('**Acute cholangitis** (Tokyo Guidelines 2018): systemic inflammation + cholestasis + biliary dilation or cause on imaging. Charcot\'s triad (fever, RUQ pain, jaundice) misses most cases. Moderate/severe cholangitis needs urgent biliary drainage plus antibiotics.'),
      table(
        ['Hyperbilirubinemia', 'Mechanisms'],
        [
          ['Unconjugated', 'Overproduction (hemolysis, ineffective erythropoiesis, hematoma); reduced conjugation (Gilbert, Crigler–Najjar, drugs)'],
          ['Conjugated', 'Hepatocellular injury, intrahepatic cholestasis, biliary obstruction; rare: Dubin–Johnson, Rotor'],
        ]
      ),
      check('h-q5'),
    ],
    takeaways: [
      'ALT > 1,000: acetaminophen, ischemia, virus, stone, AIH, Wilson.',
      'Ischemic hepatitis: steep rise/fall, very high LDH.',
      "Hy's law = stop the drug; ~10% severe outcome.",
      'Cholestasis: ultrasound first — dilated vs non-dilated ducts.',
    ],
    refs: ['kwo-2017', 'chalasani-dili-2021', 'dart-apap-2023', 'tokyo-2018'],
  },
  {
    id: 'synthetic-function',
    moduleId: 'hepatic',
    title: 'Synthetic Function, Acute Liver Failure and Severity Scores',
    summary: 'INR in cirrhosis, acute liver failure criteria, ammonia done right, FIB-4, MELD 3.0 and Child–Pugh.',
    minutes: 22,
    bloom: 'evaluate',
    objectives: [
      'Interpret albumin and INR, including their limits in cirrhosis',
      'Define acute liver failure and apply King\'s College criteria',
      'Order and interpret ammonia correctly',
      'Calculate FIB-4, MELD 3.0 and Child–Pugh',
    ],
    blocks: [
      ul(
        '**Albumin** (half-life ~3 weeks) reflects chronic synthetic capacity but is also low with inflammation, malnutrition, nephrotic syndrome and protein-losing enteropathy.',
        '**PT/INR** depends on factors II, V, VII, X and fibrinogen. A rapid response to vitamin K (≥ 30% improvement within 24 h) points to deficiency rather than synthetic failure.',
        '**Factor V** (not vitamin K-dependent) falls in liver failure but not in vitamin K deficiency; **factor VIII** (made by endothelium) is normal or high in liver disease and low in DIC.'
      ),
      pitfall('INR does **not** measure bleeding risk in cirrhosis. Procoagulant and anticoagulant factors (protein C, protein S, antithrombin) fall together, while VWF and factor VIII rise — "rebalanced hemostasis". AASLD guidance advises against routine prophylactic FFP to correct INR before procedures; use viscoelastic testing if needed.'),
      check('h-q6'),
      h('Acute liver failure (ALF)'),
      p('ALF = **INR ≥ 1.5 plus any hepatic encephalopathy** in a patient without pre-existing cirrhosis, with illness < 26 weeks. Acetaminophen is the leading cause in the US and Europe; viral hepatitis (HBV, HAV, HEV) worldwide. Contact a transplant centre early.'),
      table(
        ["King's College criteria — acetaminophen", 'Non-acetaminophen'],
        [
          ['Arterial pH < 7.30 after resuscitation', 'INR > 6.5'],
          ['OR all three: INR > 6.5, creatinine > 3.4 mg/dL (300 µmol/L), grade III–IV encephalopathy', 'OR any 3 of 5: age < 10 or > 40; indeterminate/drug etiology; jaundice → encephalopathy > 7 days; INR > 3.5; bilirubin > 17.5 mg/dL (300 µmol/L)'],
        ],
        'Meeting criteria predicts high mortality without transplantation; not meeting them does not guarantee survival.'
      ),
      h('Ammonia'),
      ul(
        '**Pre-analytics:** free-flowing sample, no fist clenching, EDTA or heparin tube on ice, analyze within 30–60 min; hemolysis and smoking raise results.',
        'In **cirrhosis**, a high ammonia does not by itself diagnose, stage or prognosticate hepatic encephalopathy (AASLD/EASL 2014) — but a **normal ammonia makes HE unlikely** and should prompt a search for another cause (EASL 2022).',
        'In **ALF**, arterial ammonia > 150–200 µmol/L predicts cerebral edema.'
      ),
      check('h-q7'),
      h('Fibrosis and severity scores'),
      formula('FIB-4 = (age × AST) ÷ (platelets [×10⁹/L] × √ALT)', undefined, 'MASLD: < 1.3 low risk of advanced fibrosis; > 2.67 high risk (use 2.0 as the lower cut-off if age ≥ 65). Intermediate → elastography (AASLD 2023).'),
      formula('MELD 3.0 = 1.33 (female) + 4.56 ln(bili) + 0.82 (137 − Na) − 0.24 (137 − Na) ln(bili) + 9.09 ln(INR) + 11.14 ln(Cr) + 1.85 (3.5 − albumin) − 1.83 (3.5 − albumin) ln(Cr) + 6', ['Bounds: bilirubin, INR, Cr ≥ 1.0; Cr ≤ 3.0 (3.0 if dialysis); Na 125–137 mmol/L; albumin 1.5–3.5 g/dL'], 'OPTN liver allocation score since 2023; adds sex and albumin to MELD-Na and reduces the disadvantage women faced.'),
      table(
        ['Child–Pugh', '1 point', '2 points', '3 points'],
        [
          ['Bilirubin (mg/dL)', '< 2', '2–3', '> 3'],
          ['Albumin (g/dL)', '> 3.5', '2.8–3.5', '< 2.8'],
          ['INR', '< 1.7', '1.7–2.3', '> 2.3'],
          ['Ascites', 'None', 'Mild / controlled', 'Moderate–severe'],
          ['Encephalopathy', 'None', 'Grade 1–2', 'Grade 3–4'],
        ],
        'Class A 5–6, B 7–9, C 10–15. Subjective items limit precision; MELD is preferred for allocation.'
      ),
      check('h-q8'),
      lab('hepatic-pattern', 'Calculate MELD 3.0 and Child–Pugh from a decompensated-cirrhosis preset.'),
    ],
    takeaways: [
      'INR = synthetic function, not bleeding risk, in cirrhosis.',
      'ALF = INR ≥ 1.5 + encephalopathy without prior cirrhosis.',
      'Normal ammonia → look for another cause of encephalopathy.',
      'MELD 3.0 is the current allocation score.',
    ],
    refs: ['aasld-coag-2021', 'easl-alf-2017', 'vilstrup-he-2014', 'easl-he-2022', 'kim-meld3-2021', 'aasld-masld-2023'],
  },
];

export const questions: Question[] = [
  {
    kind: 'numeric',
    id: 'h-q1',
    moduleId: 'hepatic',
    difficulty: 1,
    tags: ['R ratio'],
    stem: 'ALT 400 IU/L (ULN 40), ALP 240 IU/L (ULN 120). Calculate the R ratio.',
    value: 5,
    tolerance: 0.1,
    explanation: 'R = (400/40) ÷ (240/120) = 10 ÷ 2 = 5 → hepatocellular (R ≥ 5). Using raw ALT/ALP (400/240 = 1.7) would wrongly suggest cholestasis.',
  },
  {
    kind: 'mcq',
    id: 'h-q2',
    moduleId: 'hepatic',
    difficulty: 1,
    tags: ['bilirubin'],
    stem: 'A healthy 22-year-old has total bilirubin 2.8 mg/dL (direct 0.2) after a 2-day fast with a viral illness. CBC, reticulocytes, LDH, haptoglobin and liver enzymes are normal. Next step?',
    options: ['MRCP', 'Liver biopsy', 'Reassurance — Gilbert syndrome', 'Start ursodeoxycholic acid'],
    answer: 2,
    explanation: 'Isolated unconjugated hyperbilirubinemia, provoked by fasting/illness, with normal hemolysis markers and enzymes is Gilbert syndrome. No further testing is required.',
  },
  {
    kind: 'mcq',
    id: 'h-q3',
    moduleId: 'hepatic',
    difficulty: 2,
    tags: ['ischemic hepatitis'],
    stem: 'After a septic-shock episode: day 1 ALT 3,400, AST 4,100, LDH 6,200 IU/L; day 3 ALT 900. INR peaked at 2.0 and is improving. Most likely diagnosis?',
    options: ['Acute hepatitis B', 'Ischemic hepatitis', 'Autoimmune hepatitis', 'Choledocholithiasis'],
    answer: 1,
    explanation: 'A massive, early peak with a very high LDH (ALT/LDH < 1.5) and rapid fall within 72 h after hypotension is typical of ischemic ("shock liver") injury. Viral hepatitis declines slowly and has ALT/LDH > 1.5.',
  },
  {
    kind: 'mcq',
    id: 'h-q4',
    moduleId: 'hepatic',
    difficulty: 2,
    tags: ['DILI', "Hy's law"],
    stem: 'Six weeks into isoniazid: ALT 640 IU/L (ULN 40), ALP 110 (ULN 120), total bilirubin 3.1 mg/dL (ULN 1.2), INR 1.3. Best action?',
    options: ['Continue isoniazid and recheck in 4 weeks', 'Stop isoniazid now; monitor INR and bilirubin closely — Hy\'s law case', 'Add N-acetylcysteine and continue', 'Switch to rifampin monotherapy without monitoring'],
    answer: 1,
    explanation: "ALT 16 × ULN with bilirubin 2.6 × ULN and normal ALP meets Hy's law, which predicts ~10% risk of death or transplant. Stop the drug; watch for INR ≥ 1.5 or encephalopathy (ALF).",
  },
  {
    kind: 'mcq',
    id: 'h-q5',
    moduleId: 'hepatic',
    difficulty: 1,
    tags: ['cholestasis'],
    stem: 'A 52-year-old woman with pruritus: ALP 410 IU/L, GGT 380 IU/L, ALT 58 IU/L, normal bilirubin; ultrasound shows no duct dilation. Most useful next test?',
    options: ['ERCP', 'Antimitochondrial antibody (AMA)', 'Hepatitis A IgM', 'Ceruloplasmin'],
    answer: 1,
    explanation: 'Cholestatic pattern with non-dilated ducts in a middle-aged woman → primary biliary cholangitis; AMA is positive in ~95%. ERCP is for extrahepatic obstruction.',
  },
  {
    kind: 'mcq',
    id: 'h-q6',
    moduleId: 'hepatic',
    difficulty: 2,
    tags: ['INR', 'cirrhosis'],
    stem: 'A patient with cirrhosis (INR 1.9, platelets 85) needs a paracentesis. What should you do about the INR?',
    options: ['Give FFP to INR < 1.5 first', 'Give vitamin K and wait 24 h', 'Proceed without correcting INR', 'Cancel the procedure'],
    answer: 2,
    explanation: 'Paracentesis is low risk and INR does not predict bleeding in cirrhosis (rebalanced hemostasis). FFP adds volume and portal pressure without proven benefit (AASLD 2020 guidance).',
  },
  {
    kind: 'mcq',
    id: 'h-q7',
    moduleId: 'hepatic',
    difficulty: 2,
    tags: ['ammonia'],
    stem: 'A patient with cirrhosis is confused. Ammonia, properly collected on ice, is normal. Interpretation?',
    options: ['Hepatic encephalopathy confirmed — treat with lactulose only', 'HE is less likely; actively search for another cause (sepsis, hypoglycemia, intracranial bleed, drugs, hyponatremia)', 'Repeat ammonia daily to titrate lactulose', 'Ammonia has no role'],
    answer: 1,
    explanation: 'A normal ammonia has high negative predictive value for HE (EASL 2022). High ammonia alone does not establish HE, and serial levels should not guide therapy.',
  },
  {
    kind: 'numeric',
    id: 'h-q8',
    moduleId: 'hepatic',
    difficulty: 2,
    tags: ['FIB-4'],
    stem: 'MASLD, age 56, AST 48 IU/L, ALT 64 IU/L, platelets 160 × 10⁹/L. Calculate FIB-4.',
    value: 2.1,
    tolerance: 0.1,
    explanation: 'FIB-4 = (56 × 48) ÷ (160 × √64) = 2,688 ÷ 1,280 = 2.1 — indeterminate (1.3–2.67): next step is elastography (VCTE) or ELF.',
  },
];

export const cases: ClinicalCase[] = [
  {
    id: 'hepatitis-case',
    moduleId: 'hepatic',
    title: 'Jaundice in a Young Traveler',
    difficulty: 'core',
    presentation:
      'A 28-year-old woman has 1 week of fatigue, nausea, dark urine and jaundice, starting 5 weeks after a trip abroad. She denies alcohol and acetaminophen use. Scleral icterus and tender hepatomegaly; alert and oriented.',
    panels: [
      {
        title: 'Serum',
        labs: [
          { name: 'ALT', value: 1450, unit: 'IU/L', low: 7, high: 56 },
          { name: 'AST', value: 1280, unit: 'IU/L', low: 10, high: 40 },
          { name: 'ALP', value: 142, unit: 'IU/L', low: 44, high: 147 },
          { name: 'Total bilirubin', value: 8.2, unit: 'mg/dL', low: 0.1, high: 1.2, analyte: 'bilirubin' },
          { name: 'Direct bilirubin', value: 5.8, unit: 'mg/dL', low: 0, high: 0.3, analyte: 'bilirubin' },
          { name: 'Albumin', value: 3.8, unit: 'g/dL', low: 3.5, high: 5.0, analyte: 'albumin' },
          { name: 'INR', value: 1.2, unit: '', low: 0.8, high: 1.1 },
        ],
      },
    ],
    steps: [
      {
        kind: 'numeric',
        id: 'hp1',
        stem: 'Calculate the R ratio (ULNs as shown).',
        value: 26.8,
        tolerance: 0.5,
        explanation: 'R = (1450/56) ÷ (142/147) = 25.9 ÷ 0.97 = 26.8 → hepatocellular.',
      },
      {
        kind: 'mcq',
        id: 'hp2',
        stem: 'Which value best tells you hepatic synthetic function is preserved?',
        options: ['Albumin 3.8 g/dL', 'INR 1.2', 'Total bilirubin 8.2 mg/dL', 'ALT 1,450 IU/L'],
        answer: 1,
        explanation: 'PT/INR reflects factors II, V, VII and X; factor VII has a ~6 h half-life, so INR changes within a day of synthetic failure. Albumin (half-life ~3 weeks) stays normal in acute injury. Aminotransferases measure injury, not function.',
      },
      {
        kind: 'mcq',
        id: 'hp3',
        stem: 'Best initial etiologic work-up?',
        options: [
          'Liver biopsy',
          'HAV IgM, HBsAg, anti-HBc IgM, HCV RNA, HEV IgM, acetaminophen level, ANA/ASMA/IgG, ultrasound with Doppler',
          'ERCP',
          'Anti-HCV antibody only',
        ],
        answer: 1,
        explanation: 'Cover viral (HCV antibody can be negative in acute infection — test RNA; HEV is common in travelers), toxic (acetaminophen even if denied), autoimmune and vascular causes. Biopsy is rarely needed initially.',
      },
      {
        kind: 'mcq',
        id: 'hp4',
        stem: 'HAV IgM returns positive. What determines whether she needs a transplant-centre referral?',
        options: ['Peak ALT', 'Development of INR ≥ 1.5 with any encephalopathy (acute liver failure)', 'Bilirubin > 5 mg/dL', 'Age < 40'],
        answer: 1,
        explanation: 'Aminotransferase height does not predict outcome. Monitor INR and mental status: INR ≥ 1.5 with encephalopathy defines ALF and warrants transfer.',
      },
    ],
    diagnosis: 'Acute hepatitis A with hepatocellular injury and preserved synthetic function',
    reasoning:
      'The R ratio of ~27 confirms hepatocellular injury; ALT > AST and > 1,000 IU/L in a traveler fits acute viral hepatitis, confirmed by HAV IgM. Conjugated hyperbilirubinemia causes jaundice and dark urine. INR 1.2 shows preserved synthesis. Management is supportive with INR and mental-status monitoring; household contacts should receive post-exposure prophylaxis.',
    takeaways: [
      'R ratio uses ULN-normalized values.',
      'INR is the earliest marker of synthetic failure; albumin lags.',
      'Always check acetaminophen; test HCV RNA in acute hepatitis.',
      'ALF = INR ≥ 1.5 + encephalopathy.',
    ],
    refs: ['kwo-2017', 'easl-alf-2017'],
  },
  {
    id: 'apap-case',
    moduleId: 'hepatic',
    title: 'Vomiting the Morning After an Overdose',
    difficulty: 'advanced',
    mustNotMiss: true,
    presentation:
      'A 19-year-old woman presents 16 hours after an intentional ingestion of an unknown number of acetaminophen tablets taken at one time. She has vomiting and RUQ pain; she is alert.',
    panels: [
      {
        title: 'Serum',
        labs: [
          { name: 'Acetaminophen (16 h)', value: 48, unit: 'µg/mL', refText: 'treatment line at 16 h ≈ 19' },
          { name: 'ALT', value: 3800, unit: 'IU/L', low: 7, high: 35 },
          { name: 'AST', value: 5200, unit: 'IU/L', low: 10, high: 35 },
          { name: 'Total bilirubin', value: 2.1, unit: 'mg/dL', low: 0.1, high: 1.2, analyte: 'bilirubin' },
          { name: 'INR', value: 2.4, unit: '', low: 0.8, high: 1.1 },
          { name: 'Creatinine', value: 1.1, unit: 'mg/dL', low: 0.5, high: 1.1, analyte: 'creatinine' },
          { name: 'Glucose', value: 72, unit: 'mg/dL', low: 70, high: 99, analyte: 'glucose' },
          { name: 'Lactate', value: 2.4, unit: 'mmol/L', low: 0.5, high: 2.0 },
          { name: 'Venous pH', value: 7.36, unit: '', low: 7.31, high: 7.41 },
        ],
      },
    ],
    steps: [
      {
        kind: 'numeric',
        id: 'ap1',
        stem: 'The Rumack–Matthew treatment line (US) is 150 µg/mL at 4 h with a 4-h half-life. What is the line value at 16 h (µg/mL)?',
        value: 18.75,
        tolerance: 1,
        unit: 'µg/mL',
        explanation: '150 → 75 (8 h) → 37.5 (12 h) → 18.75 (16 h). Her level of 48 is well above the line. The nomogram applies only to a single acute ingestion with a known time.',
      },
      {
        kind: 'mcq',
        id: 'ap2',
        stem: 'Best immediate treatment?',
        options: ['Activated charcoal only', 'IV N-acetylcysteine now', 'Wait for repeat level in 4 h', 'Hemodialysis'],
        answer: 1,
        explanation: 'NAC replenishes glutathione and is beneficial even when started late and after liver injury has begun. Do not delay for repeat levels. Charcoal is useful only within ~1–2 h of ingestion.',
      },
      {
        kind: 'mcq',
        id: 'ap3',
        stem: 'Does she currently meet King\'s College criteria for transplant listing?',
        options: [
          'Yes — INR > 2',
          'No — pH ≥ 7.30, INR < 6.5, creatinine < 3.4 and no grade III–IV encephalopathy; but discuss early with a liver transplant centre given INR 2.4 and rising',
          'Yes — ALT > 3,000',
          'Criteria do not apply to acetaminophen',
        ],
        answer: 1,
        explanation: 'KCC (acetaminophen): pH < 7.30 after resuscitation, or INR > 6.5 + creatinine > 3.4 mg/dL + grade III–IV HE. She meets none yet, but INR ≥ 1.5 is a threshold for early transplant-centre contact; monitor glucose (hypoglycemia), lactate and mental status.',
      },
    ],
    diagnosis: 'Acetaminophen hepatotoxicity with acute liver injury (coagulopathy, no encephalopathy yet)',
    reasoning:
      'AST > ALT with aminotransferases > 3,000 IU/L, a level far above the nomogram line and INR 2.4 indicate severe hepatotoxicity. NAC is indicated immediately. Serial INR, pH, lactate, creatinine, glucose and mental status determine whether she progresses to ALF and meets KCC criteria.',
    takeaways: [
      'Nomogram halves every 4 h from 150 µg/mL at 4 h (single acute ingestion only).',
      'Start NAC without delay — benefit persists late.',
      'Contact the transplant centre early; KCC predicts poor prognosis.',
    ],
    refs: ['dart-apap-2023', 'easl-alf-2017'],
  },
];
