import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'electrolytes-intro',
    moduleId: 'electrolytes',
    title: 'Introduction to Electrolyte Physiology',
    description: 'Foundation concepts of electrolyte balance, fluid compartments, and membrane transport',
    content: [
      {
        type: 'heading',
        content: 'Electrolyte Fundamentals',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Electrolytes are charged particles (ions) essential for cellular function, nerve conduction, muscle contraction, and fluid balance. The major electrolytes in clinical practice are sodium (Na⁺), potassium (K⁺), chloride (Cl⁻), and bicarbonate (HCO₃⁻).',
      },
      {
        type: 'heading',
        content: 'Fluid Compartments',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Total body water (TBW) is distributed across two main compartments: intracellular fluid (ICF, ~2/3 of TBW) and extracellular fluid (ECF, ~1/3 of TBW). The ECF is further divided into plasma and interstitial fluid.',
      },
      {
        type: 'list',
        content: [
          'Intracellular fluid: High K⁺, low Na⁺',
          'Extracellular fluid: High Na⁺, low K⁺',
          'Plasma: Contains proteins (albumin)',
          'Interstitial fluid: Similar to plasma but minimal protein',
        ],
      },
      {
        type: 'callout',
        content: 'The Na⁺-K⁺-ATPase pump is critical for maintaining electrochemical gradients across cell membranes.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Key Concepts',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Osmolarity determines water movement between compartments. Serum osmolarity is primarily determined by sodium concentration.',
      },
      {
        type: 'formula',
        content: 'Serum Osmolarity = 2 × [Na⁺] + [Glucose]/18 + [BUN]/2.8',
      },
      {
        type: 'callout',
        content: 'Normal serum osmolarity: 275-295 mOsm/kg',
        calloutType: 'info',
      },
    ],
    objectives: [
      'Describe the distribution of body fluids across compartments',
      'Explain the role of the Na⁺-K⁺-ATPase pump',
      'Calculate serum osmolarity',
      'Understand water movement in response to osmotic gradients',
    ],
    bloomLevel: 'understand',
    estimatedTime: 25,
    prerequisites: [],
    order: 1,
  },
  {
    id: 'sodium-disorders',
    moduleId: 'electrolytes',
    title: 'Sodium Disorders: Hypo- and Hypernatremia',
    description: 'Diagnosis and management approach to sodium disturbances',
    content: [
      {
        type: 'heading',
        content: 'Sodium Homeostasis',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Sodium is the primary determinant of serum osmolarity and ECF volume. Normal serum sodium: 135-145 mEq/L. Disorders represent problems with water balance more than sodium balance.',
      },
      {
        type: 'heading',
        content: 'Hyponatremia (Na⁺ < 135 mEq/L)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Hyponatremia is the most common electrolyte disorder. Classification by volume status and serum osmolarity guides diagnosis.',
      },
      {
        type: 'table',
        content: {
          headers: ['Category', 'Volume Status', 'Common Causes'],
          rows: [
            ['Hypovolemic', 'Decreased ECF', 'GI losses, diuretics, cerebral salt wasting'],
            ['Euvolemic', 'Normal ECF', 'SIADH, hypothyroidism, psychogenic polydipsia'],
            ['Hypervolemic', 'Increased ECF', 'Heart failure, cirrhosis, nephrotic syndrome'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Severe hyponatremia (Na⁺ < 120 mEq/L) with neurologic symptoms requires urgent but careful correction to prevent osmotic demyelination syndrome.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Hypernatremia (Na⁺ > 145 mEq/L)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Hypernatremia always represents a water deficit relative to sodium. It commonly occurs in patients unable to access water (elderly, hospitalized, altered mental status).',
      },
      {
        type: 'list',
        content: [
          'Insufficient water intake (most common)',
          'Excessive water loss (diabetes insipidus, osmotic diuresis)',
          'Sodium overload (hypertonic saline, sodium bicarbonate)',
        ],
      },
      {
        type: 'callout',
        content:
          'Calculate free water deficit: Water deficit (L) = TBW × [(Serum Na⁺/140) - 1], where TBW = 0.6 × weight (kg) for men, 0.5 × weight for women.',
        calloutType: 'clinical-pearl',
      },
    ],
    objectives: [
      'Classify hyponatremia by volume status',
      'Identify must-not-miss causes of sodium disorders',
      'Calculate free water deficit in hypernatremia',
      'Apply appropriate correction rates to prevent complications',
    ],
    bloomLevel: 'apply',
    estimatedTime: 35,
    prerequisites: ['electrolytes-intro'],
    order: 2,
  },
  {
    id: 'acid-base-intro',
    moduleId: 'acid-base',
    title: 'Acid-Base Balance Fundamentals',
    description: 'Core principles of pH regulation and buffer systems',
    content: [
      {
        type: 'heading',
        content: 'pH and Buffer Systems',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Normal arterial pH is tightly regulated between 7.35-7.45. This is maintained through buffer systems, respiratory compensation, and renal regulation.',
      },
      {
        type: 'heading',
        content: 'Henderson-Hasselbalch Equation',
        level: 2,
      },
      {
        type: 'formula',
        content: 'pH = 6.1 + log([HCO₃⁻] / (0.03 × PaCO₂))',
      },
      {
        type: 'text',
        content:
          'This fundamental equation shows that pH is determined by the ratio of bicarbonate (metabolic component) to PaCO₂ (respiratory component).',
      },
      {
        type: 'heading',
        content: 'Primary Acid-Base Disorders',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Disorder', 'pH', 'Primary Change', 'Compensation'],
          rows: [
            ['Metabolic Acidosis', '↓', '↓ HCO₃⁻', '↓ PaCO₂'],
            ['Metabolic Alkalosis', '↑', '↑ HCO₃⁻', '↑ PaCO₂'],
            ['Respiratory Acidosis', '↓', '↑ PaCO₂', '↑ HCO₃⁻'],
            ['Respiratory Alkalosis', '↑', '↓ PaCO₂', '↓ HCO₃⁻'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'Remember: Compensation never fully normalizes pH. If pH is normal with abnormal PaCO₂ and HCO₃⁻, consider a mixed disorder.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Anion Gap',
        level: 2,
      },
      {
        type: 'formula',
        content: 'Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻)',
      },
      {
        type: 'text',
        content:
          'Normal anion gap: 8-12 mEq/L (adjust for albumin). Elevated anion gap suggests presence of unmeasured anions in metabolic acidosis.',
      },
      {
        type: 'callout',
        content:
          'MUDPILES mnemonic for high anion gap acidosis: Methanol, Uremia, DKA, Propylene glycol, Iron/Isoniazid, Lactic acidosis, Ethylene glycol, Salicylates',
        calloutType: 'info',
      },
    ],
    objectives: [
      'Explain the Henderson-Hasselbalch equation',
      'Identify the four primary acid-base disorders',
      'Calculate and interpret anion gap',
      'Distinguish compensated from mixed acid-base disorders',
    ],
    bloomLevel: 'understand',
    estimatedTime: 30,
    prerequisites: ['electrolytes-intro'],
    order: 1,
  },
  {
    id: 'potassium-disorders',
    moduleId: 'electrolytes',
    title: 'Potassium Disorders: Hypo- and Hyperkalemia',
    description: 'Understanding potassium homeostasis and approach to dyskalemias',
    content: [
      {
        type: 'heading',
        content: 'Potassium Homeostasis',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Potassium is the major intracellular cation. Normal serum K⁺: 3.5-5.0 mEq/L. The Na⁺-K⁺-ATPase pump maintains the 98% of total body K⁺ intracellularly. Serum K⁺ represents only 2% of total body stores.',
      },
      {
        type: 'heading',
        content: 'Hypokalemia (K⁺ < 3.5 mEq/L)',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'GI losses: Diarrhea, vomiting, nasogastric suction',
          'Renal losses: Diuretics (loop, thiazide), hyperaldosteronism, RTA',
          'Transcellular shift: Insulin, β2-agonists, alkalosis',
          'Inadequate intake (rare)',
        ],
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Severe hypokalemia (K⁺ < 2.5 mEq/L) can cause life-threatening arrhythmias, muscle weakness, and paralysis. Requires urgent IV replacement.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Hyperkalemia (K⁺ > 5.0 mEq/L)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Hyperkalemia is more immediately dangerous than hypokalemia due to cardiac effects. Always verify with repeat measurement and exclude pseudohyperkalemia (hemolysis).',
      },
      {
        type: 'table',
        content: {
          headers: ['Severity', 'K⁺ Level', 'ECG Changes', 'Management'],
          rows: [
            ['Mild', '5.5-6.0', 'Tall peaked T waves', 'Dietary restriction, treat cause'],
            ['Moderate', '6.1-6.9', 'Prolonged PR, QRS widening', 'Kayexalate, loop diuretics'],
            ['Severe', '≥ 7.0', 'Loss of P wave, sine wave', 'URGENT: Calcium, insulin/glucose, dialysis'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'Common causes: AKI/CKD, ACE inhibitors/ARBs, K⁺-sparing diuretics, acidosis, cell lysis (tumor lysis, rhabdomyolysis)',
        calloutType: 'info',
      },
      {
        type: 'heading',
        content: 'Diagnostic Approach',
        level: 2,
      },
      {
        type: 'text',
        content:
          'For hypokalemia: Check urine K⁺. If > 15 mEq/day, suggests renal loss. If < 15 mEq/day, suggests GI or transcellular shift.',
      },
      {
        type: 'text',
        content:
          'For hyperkalemia: First rule out pseudohyperkalemia (hemolysis, thrombocytosis). Check renal function, medications, and acid-base status.',
      },
    ],
    objectives: [
      'Classify causes of hypo- and hyperkalemia',
      'Recognize ECG changes in hyperkalemia',
      'Apply appropriate management strategies for severe dyskalemias',
      'Use urine electrolytes to determine etiology',
    ],
    bloomLevel: 'apply',
    estimatedTime: 30,
    prerequisites: ['electrolytes-intro'],
    order: 3,
  },
  {
    id: 'metabolic-acidosis',
    moduleId: 'acid-base',
    title: 'Metabolic Acidosis: High and Normal Anion Gap',
    description: 'Systematic approach to metabolic acidosis classification and management',
    content: [
      {
        type: 'heading',
        content: 'Overview of Metabolic Acidosis',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Metabolic acidosis is characterized by low pH (< 7.35), low HCO₃⁻ (< 22 mEq/L), and compensatory hyperventilation (low PaCO₂). The key to diagnosis is calculating the anion gap.',
      },
      {
        type: 'heading',
        content: 'High Anion Gap Metabolic Acidosis (HAGMA)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Anion gap > 12 mEq/L indicates accumulation of unmeasured anions. Use MUDPILES mnemonic:',
      },
      {
        type: 'list',
        content: [
          'Methanol (formic acid)',
          'Uremia (organic acids, phosphate)',
          'Diabetic/alcoholic Ketoacidosis (β-hydroxybutyrate, acetoacetate)',
          'Propylene glycol, Paraldehyde',
          'Iron, Isoniazid, Inborn errors',
          'Lactic acidosis (L-lactate, D-lactate)',
          'Ethylene glycol (glycolic acid, oxalic acid)',
          'Salicylates (ASA)',
        ],
      },
      {
        type: 'callout',
        content:
          'The two most common causes of HAGMA are lactic acidosis and ketoacidosis. Always measure lactate and ketones in HAGMA.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Delta-Delta Calculation',
        level: 2,
      },
      {
        type: 'formula',
        content: 'Δ-Δ = (ΔAG) / (ΔHCO₃⁻) = (AG - 12) / (24 - HCO₃⁻)',
      },
      {
        type: 'text',
        content:
          'Normal Δ-Δ ratio is 1-2. Helps identify concurrent metabolic alkalosis (>2) or normal AG acidosis (<1).',
      },
      {
        type: 'heading',
        content: 'Normal Anion Gap Metabolic Acidosis (NAGMA)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Also called non-anion gap or hyperchloremic acidosis. AG ≤ 12 mEq/L. Causes include:',
      },
      {
        type: 'list',
        content: [
          'GI HCO₃⁻ loss: Diarrhea, ureterosigmoidostomy',
          'Renal tubular acidosis (Type 1, 2, 4)',
          'Rapid saline infusion',
          'Carbonic anhydrase inhibitors',
          'Early/recovering renal failure',
        ],
      },
      {
        type: 'callout',
        content:
          'Use urine anion gap to differentiate: UAG = (UNa + UK) - UCl. Negative UAG suggests GI loss; positive UAG suggests RTA.',
        calloutType: 'info',
      },
    ],
    objectives: [
      'Classify metabolic acidosis by anion gap',
      'Apply MUDPILES mnemonic to diagnose HAGMA',
      'Calculate and interpret delta-delta ratio',
      'Use urine anion gap to differentiate NAGMA causes',
    ],
    bloomLevel: 'analyze',
    estimatedTime: 35,
    prerequisites: ['acid-base-intro'],
    order: 2,
  },
  {
    id: 'gfr-assessment',
    moduleId: 'renal',
    title: 'GFR Assessment and Creatinine-Based Equations',
    description: 'Understanding GFR measurement and estimation methods',
    content: [
      {
        type: 'heading',
        content: 'What is GFR?',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Glomerular filtration rate (GFR) is the best overall measure of kidney function. It represents the volume of plasma filtered by the glomeruli per unit time. Normal GFR: 90-120 mL/min/1.73m².',
      },
      {
        type: 'heading',
        content: 'Creatinine as a Filtration Marker',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Creatinine is produced at a constant rate from muscle metabolism, freely filtered by glomeruli, and minimally secreted. Serum creatinine inversely correlates with GFR.',
      },
      {
        type: 'callout',
        content:
          'LIMITATION: Serum creatinine can be affected by muscle mass, age, sex, and diet. It rises only after 50% GFR loss. Use eGFR equations for better assessment.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'GFR Estimation Equations',
        level: 2,
      },
      {
        type: 'text',
        content:
          'CKD-EPI (2021) is the recommended equation. It incorporates serum creatinine, age, and sex (race coefficient removed):',
      },
      {
        type: 'formula',
        content: 'eGFR = 142 × min(SCr/κ, 1)^α × max(SCr/κ, 1)^-1.200 × 0.9938^Age × 1.012 [if female]',
      },
      {
        type: 'list',
        content: [
          'κ = 0.7 (females) or 0.9 (males)',
          'α = -0.241 (females) or -0.302 (males)',
          'SCr = serum creatinine in mg/dL',
        ],
      },
      {
        type: 'heading',
        content: 'CKD Staging',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Stage', 'GFR (mL/min/1.73m²)', 'Description'],
          rows: [
            ['G1', '≥ 90', 'Normal or high (with kidney damage)'],
            ['G2', '60-89', 'Mild reduction'],
            ['G3a', '45-59', 'Mild-moderate reduction'],
            ['G3b', '30-44', 'Moderate-severe reduction'],
            ['G4', '15-29', 'Severe reduction'],
            ['G5', '< 15', 'Kidney failure (dialysis)'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'CKD requires eGFR < 60 for > 3 months OR evidence of kidney damage (albuminuria, hematuria, structural abnormality) for > 3 months.',
        calloutType: 'clinical-pearl',
      },
    ],
    objectives: [
      'Explain the relationship between creatinine and GFR',
      'Understand limitations of serum creatinine',
      'Apply CKD staging based on eGFR',
      'Recognize when to use alternative markers (cystatin C)',
    ],
    bloomLevel: 'apply',
    estimatedTime: 25,
    prerequisites: ['renal-intro'],
    order: 2,
  },
];
