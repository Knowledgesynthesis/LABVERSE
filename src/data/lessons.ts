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
  {
    id: 'respiratory-disorders',
    moduleId: 'acid-base',
    title: 'Respiratory Acid-Base Disorders',
    description: 'Understanding respiratory acidosis and alkalosis, compensation mechanisms, and clinical approach',
    content: [
      {
        type: 'heading',
        content: 'Respiratory Acidosis',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Respiratory acidosis occurs when PaCO₂ rises (> 45 mmHg) due to hypoventilation, leading to decreased pH. The body compensates through renal HCO₃⁻ retention.',
      },
      {
        type: 'heading',
        content: 'Causes of Respiratory Acidosis',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Category', 'Examples'],
          rows: [
            ['CNS Depression', 'Opioids, sedatives, brainstem lesion, obesity hypoventilation'],
            ['Neuromuscular', 'Guillain-Barré, myasthenia gravis, ALS, phrenic nerve injury'],
            ['Chest Wall', 'Kyphoscoliosis, flail chest, morbid obesity'],
            ['Airway/Lung', 'COPD, severe asthma, pneumonia, pulmonary edema'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Acute respiratory acidosis with pH < 7.20 requires immediate ventilatory support. Chronic respiratory acidosis shows better compensation.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Respiratory Alkalosis',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Respiratory alkalosis occurs when PaCO₂ falls (< 35 mmHg) due to hyperventilation, leading to increased pH. The body compensates through renal HCO₃⁻ excretion.',
      },
      {
        type: 'list',
        content: [
          'Hypoxemia (pneumonia, PE, high altitude)',
          'Pulmonary disease (interstitial lung disease)',
          'CNS stimulation (anxiety, pain, fever, pregnancy)',
          'Mechanical ventilation (iatrogenic)',
          'Salicylate toxicity (early)',
        ],
      },
      {
        type: 'heading',
        content: 'Acute vs Chronic Compensation',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Acute respiratory disorders: Minimal metabolic compensation (takes days). Chronic: Significant renal compensation develops over 3-5 days.',
      },
      {
        type: 'formula',
        content: 'Acute respiratory acidosis: Expected HCO₃⁻ increase = ΔPaCO₂ × 0.1',
      },
      {
        type: 'formula',
        content: 'Chronic respiratory acidosis: Expected HCO₃⁻ increase = ΔPaCO₂ × 0.35',
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: In COPD patients with chronic CO₂ retention, avoid high-flow O₂ which may worsen hypercapnia by removing hypoxic ventilatory drive.',
        calloutType: 'clinical-pearl',
      },
    ],
    objectives: [
      'Identify causes of respiratory acidosis and alkalosis',
      'Distinguish acute from chronic respiratory disorders',
      'Calculate expected compensation for respiratory disorders',
      'Recognize life-threatening respiratory acid-base emergencies',
    ],
    bloomLevel: 'analyze',
    estimatedTime: 30,
    prerequisites: ['acid-base-intro'],
    order: 3,
  },
  {
    id: 'renal-intro',
    moduleId: 'renal',
    title: 'Introduction to Renal Function Testing',
    description: 'Overview of kidney physiology and approach to renal function assessment',
    content: [
      {
        type: 'heading',
        content: 'The Kidneys: Structure and Function',
        level: 1,
      },
      {
        type: 'text',
        content:
          'The kidneys perform critical homeostatic functions: filtration and excretion of waste products, regulation of fluid and electrolyte balance, acid-base balance, blood pressure control, and hormone production (EPO, renin, vitamin D activation).',
      },
      {
        type: 'heading',
        content: 'The Nephron: Functional Unit',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Glomerulus: Filters plasma to create ultrafiltrate',
          'Proximal tubule: Reabsorbs 65% of filtered Na⁺, water, glucose, amino acids',
          'Loop of Henle: Creates medullary osmotic gradient',
          'Distal tubule: Fine-tunes Na⁺ and K⁺ balance',
          'Collecting duct: ADH-regulated water reabsorption',
        ],
      },
      {
        type: 'heading',
        content: 'Key Laboratory Tests',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Test', 'What It Measures', 'Normal Range'],
          rows: [
            ['Serum Creatinine', 'Filtration marker', '0.6-1.2 mg/dL'],
            ['BUN', 'Urea nitrogen (affected by hydration)', '7-20 mg/dL'],
            ['eGFR', 'Estimated kidney function', '> 90 mL/min/1.73m²'],
            ['Urinalysis', 'Proteinuria, hematuria, casts', 'Normal: no protein/blood'],
            ['Urine Albumin/Cr', 'Early kidney damage marker', '< 30 mg/g'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'BUN/Creatinine ratio > 20:1 suggests prerenal azotemia (hypovolemia). Ratio < 10:1 suggests intrinsic renal disease or overhydration.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Approach to Abnormal Renal Function',
        level: 2,
      },
      {
        type: 'text',
        content:
          'When evaluating abnormal kidney function: (1) Determine if acute or chronic, (2) Classify as prerenal, intrinsic, or postrenal, (3) Check for complications (hyperkalemia, metabolic acidosis, volume overload).',
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: AKI with oliguria, hyperkalemia, or severe acidosis requires urgent nephrology consultation. May need dialysis.',
        calloutType: 'warning',
      },
    ],
    objectives: [
      'Describe the major functions of the kidney',
      'Understand the role of each nephron segment',
      'Interpret basic renal function tests (Cr, BUN, eGFR)',
      'Use BUN/Cr ratio to guide differential diagnosis',
    ],
    bloomLevel: 'understand',
    estimatedTime: 25,
    prerequisites: ['electrolytes-intro'],
    order: 1,
  },
  {
    id: 'aki-vs-ckd',
    moduleId: 'renal',
    title: 'Acute Kidney Injury vs Chronic Kidney Disease',
    description: 'Differentiating AKI from CKD and understanding classification systems',
    content: [
      {
        type: 'heading',
        content: 'Acute Kidney Injury (AKI)',
        level: 1,
      },
      {
        type: 'text',
        content:
          'AKI is an abrupt decline in kidney function occurring over hours to days. Diagnosis uses the KDIGO criteria based on serum creatinine rise and/or urine output.',
      },
      {
        type: 'heading',
        content: 'KDIGO AKI Staging',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Stage', 'Serum Creatinine', 'Urine Output'],
          rows: [
            ['1', '1.5-1.9× baseline OR ≥0.3 mg/dL increase', '< 0.5 mL/kg/hr × 6-12 hr'],
            ['2', '2.0-2.9× baseline', '< 0.5 mL/kg/hr × ≥12 hr'],
            ['3', '3.0× baseline OR ≥4.0 mg/dL OR RRT', '< 0.3 mL/kg/hr × ≥24 hr OR anuria ≥12 hr'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'AKI Classification: Prerenal, Intrinsic, Postrenal',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Prerenal (60%): Hypoperfusion - hypovolemia, heart failure, sepsis, NSAIDs, ACE-I',
          'Intrinsic (35%): ATN (ischemic, nephrotoxic), AIN, GN, vascular (HUS, TTP)',
          'Postrenal (5%): Obstruction - BPH, stones, malignancy, retroperitoneal fibrosis',
        ],
      },
      {
        type: 'callout',
        content:
          'Urine sodium < 20 mEq/L and FENa < 1% suggest prerenal AKI. Urine sodium > 40 mEq/L and FENa > 2% suggest intrinsic (ATN).',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Chronic Kidney Disease (CKD)',
        level: 1,
      },
      {
        type: 'text',
        content:
          'CKD is defined as eGFR < 60 mL/min/1.73m² OR markers of kidney damage (albuminuria, hematuria, structural abnormality) for > 3 months.',
      },
      {
        type: 'heading',
        content: 'Distinguishing AKI from CKD',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Feature', 'AKI', 'CKD'],
          rows: [
            ['Onset', 'Hours to days', 'Months to years'],
            ['Kidney size', 'Normal or enlarged', 'Small, scarred (except PCKD, DM)'],
            ['Anemia', 'Absent or mild', 'Present (EPO deficiency)'],
            ['Bone disease', 'Absent', 'Present (2° hyperparathyroidism)'],
            ['Prior Cr', 'Normal baseline', 'Elevated baseline'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: AKI superimposed on CKD ("acute-on-chronic") is common. Always compare to baseline creatinine.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'CKD Complications',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Anemia (EPO deficiency)',
          'Mineral bone disorder (↑PTH, ↑PO₄, ↓Ca²⁺)',
          'Metabolic acidosis',
          'Hyperkalemia',
          'Volume overload and hypertension',
          'Uremia (at stage 5)',
        ],
      },
    ],
    objectives: [
      'Apply KDIGO criteria to stage AKI',
      'Classify AKI as prerenal, intrinsic, or postrenal',
      'Distinguish AKI from CKD using clinical and lab features',
      'Recognize complications of CKD',
    ],
    bloomLevel: 'apply',
    estimatedTime: 35,
    prerequisites: ['renal-intro', 'gfr-assessment'],
    order: 3,
  },
  {
    id: 'hepatic-intro',
    moduleId: 'hepatic',
    title: 'Introduction to Hepatic Function Tests',
    description: 'Overview of liver physiology and approach to liver function test interpretation',
    content: [
      {
        type: 'heading',
        content: 'The Liver: Functions and Physiology',
        level: 1,
      },
      {
        type: 'text',
        content:
          'The liver performs over 500 functions including: metabolism (carbohydrates, proteins, lipids), detoxification, bile production, synthesis of clotting factors and albumin, and drug metabolism.',
      },
      {
        type: 'heading',
        content: 'Key Laboratory Tests',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Test', 'What It Measures', 'Normal Range'],
          rows: [
            ['ALT (alanine aminotransferase)', 'Hepatocellular injury', '7-55 U/L'],
            ['AST (aspartate aminotransferase)', 'Hepatocellular injury (less specific)', '8-48 U/L'],
            ['ALP (alkaline phosphatase)', 'Cholestasis', '40-150 U/L'],
            ['GGT (gamma-glutamyl transferase)', 'Biliary epithelial injury', '9-48 U/L'],
            ['Bilirubin (total/direct)', 'Bile excretion', 'Total: 0.3-1.2 mg/dL'],
            ['Albumin', 'Synthetic function', '3.5-5.5 g/dL'],
            ['PT/INR', 'Synthetic function (clotting factors)', 'INR: 0.8-1.2'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'Hepatocellular vs Cholestatic Pattern',
        level: 2,
      },
      {
        type: 'text',
        content:
          'The pattern of liver enzyme elevation guides differential diagnosis:',
      },
      {
        type: 'list',
        content: [
          'Hepatocellular: ALT/AST >> ALP (ALT/ALP ratio > 5)',
          'Cholestatic: ALP >> ALT/AST (ALT/ALP ratio < 2)',
          'Mixed: Both elevated proportionally (ratio 2-5)',
        ],
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: AST/ALT ratio > 2 suggests alcoholic liver disease. AST/ALT ratio < 1 is typical of viral hepatitis or NAFLD.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Synthetic Function',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Albumin and PT/INR reflect the liver\'s synthetic capacity. These decrease in chronic liver disease and acute liver failure. Unlike aminotransferases, synthetic function cannot be elevated, only decreased.',
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Acute hepatitis with elevated INR and altered mental status suggests acute liver failure. Requires urgent hepatology consultation.',
        calloutType: 'warning',
      },
    ],
    objectives: [
      'Describe major liver functions assessed by laboratory tests',
      'Differentiate hepatocellular from cholestatic patterns',
      'Interpret AST/ALT ratio for etiology clues',
      'Recognize markers of synthetic dysfunction',
    ],
    bloomLevel: 'understand',
    estimatedTime: 25,
    prerequisites: [],
    order: 1,
  },
  {
    id: 'cholestatic-vs-hepatocellular',
    moduleId: 'hepatic',
    title: 'Cholestatic vs Hepatocellular Injury Patterns',
    description: 'Differentiating cholestatic from hepatocellular liver disease using lab patterns',
    content: [
      {
        type: 'heading',
        content: 'Hepatocellular Injury Pattern',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Characterized by marked elevation of aminotransferases (ALT, AST) with minimal ALP elevation. Indicates direct hepatocyte damage.',
      },
      {
        type: 'heading',
        content: 'Causes of Hepatocellular Injury',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Category', 'Examples', 'Clues'],
          rows: [
            ['Viral', 'Hepatitis A, B, C, E, EBV, CMV', 'Serologies, risk factors'],
            ['Toxins/Drugs', 'Acetaminophen, isoniazid, statins', 'History, very high ALT (>1000)'],
            ['Ischemic', 'Shock liver, Budd-Chiari', 'Hypotension, very high ALT (>1000)'],
            ['Autoimmune', 'Autoimmune hepatitis', 'ANA, ASMA, IgG elevation'],
            ['Metabolic', 'Wilson disease, hemochromatosis, NASH', 'Ceruloplasmin, ferritin, imaging'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'ALT > 1000 U/L: Think viral hepatitis, ischemic hepatitis (shock liver), or drug-induced liver injury (especially acetaminophen).',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Cholestatic Injury Pattern',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Characterized by marked elevation of ALP and GGT with minimal aminotransferase elevation. Indicates bile duct obstruction or impaired bile flow.',
      },
      {
        type: 'heading',
        content: 'Intrahepatic vs Extrahepatic Cholestasis',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Extrahepatic (obstruction): Choledocholithiasis, pancreatic cancer, cholangiocarcinoma, PSC',
          'Intrahepatic: PBC, drug-induced cholestasis, sepsis, TPN, pregnancy (ICP)',
        ],
      },
      {
        type: 'text',
        content:
          'Ultrasound or CT showing dilated bile ducts suggests extrahepatic obstruction. Non-dilated ducts suggest intrahepatic cholestasis.',
      },
      {
        type: 'heading',
        content: 'Role of GGT and Fractionated Bilirubin',
        level: 2,
      },
      {
        type: 'text',
        content:
          'GGT confirms hepatobiliary origin of elevated ALP (ALP can also be elevated from bone disease). Direct (conjugated) bilirubin elevation confirms cholestasis.',
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Acute cholangitis (Charcot triad: fever, RUQ pain, jaundice) requires urgent ERCP for decompression.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Bilirubin Metabolism',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Unconjugated (indirect) hyperbilirubinemia: Hemolysis, Gilbert syndrome, Crigler-Najjar',
          'Conjugated (direct) hyperbilirubinemia: Cholestasis, Dubin-Johnson, Rotor syndrome',
        ],
      },
    ],
    objectives: [
      'Classify liver injury as hepatocellular vs cholestatic using lab ratios',
      'Apply differential diagnosis based on injury pattern',
      'Distinguish intrahepatic from extrahepatic cholestasis',
      'Interpret GGT and fractionated bilirubin',
    ],
    bloomLevel: 'analyze',
    estimatedTime: 30,
    prerequisites: ['hepatic-intro'],
    order: 2,
  },
  {
    id: 'synthetic-function',
    moduleId: 'hepatic',
    title: 'Hepatic Synthetic Function and Prognostic Scores',
    description: 'Assessing liver synthetic capacity and using prognostic models',
    content: [
      {
        type: 'heading',
        content: 'Markers of Synthetic Function',
        level: 1,
      },
      {
        type: 'text',
        content:
          'The liver synthesizes albumin, clotting factors (II, V, VII, IX, X), and other proteins. Impaired synthesis indicates significant hepatic dysfunction.',
      },
      {
        type: 'heading',
        content: 'Albumin',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Normal: 3.5-5.5 g/dL. Half-life ~20 days, so slow to change. Low albumin in liver disease indicates chronic dysfunction. Also decreased by malnutrition, nephrotic syndrome, and inflammation.',
      },
      {
        type: 'heading',
        content: 'Prothrombin Time (PT/INR)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Measures factors II, V, VII, X. More sensitive than albumin (shorter half-life, especially factor VII ~6 hours). Elevated PT/INR indicates poor synthetic function.',
      },
      {
        type: 'callout',
        content:
          'PT/INR elevation in liver disease does NOT correct with vitamin K (unlike malabsorption or warfarin). This helps differentiate causes.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Child-Pugh Score',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Used to assess severity of cirrhosis. Grades A (5-6 points), B (7-9 points), C (10-15 points). Parameters: bilirubin, albumin, INR, ascites, encephalopathy.',
      },
      {
        type: 'table',
        content: {
          headers: ['Parameter', '1 point', '2 points', '3 points'],
          rows: [
            ['Bilirubin (mg/dL)', '< 2', '2-3', '> 3'],
            ['Albumin (g/dL)', '> 3.5', '2.8-3.5', '< 2.8'],
            ['INR', '< 1.7', '1.7-2.3', '> 2.3'],
            ['Ascites', 'None', 'Mild (controlled)', 'Moderate-severe'],
            ['Encephalopathy', 'None', 'Grade 1-2', 'Grade 3-4'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'MELD Score',
        level: 2,
      },
      {
        type: 'formula',
        content: 'MELD = 3.78×ln(bilirubin) + 11.2×ln(INR) + 9.57×ln(creatinine) + 6.43',
      },
      {
        type: 'text',
        content:
          'Used for liver transplant prioritization. Range 6-40. MELD ≥ 15 indicates significant disease. MELD ≥ 40 has very high 3-month mortality.',
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Acute liver failure with encephalopathy and INR > 1.5 requires urgent hepatology/transplant consultation.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Ammonia',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Elevated in hepatic encephalopathy but not specific. Used to support diagnosis, not for screening. Normal ammonia does not exclude encephalopathy.',
      },
    ],
    objectives: [
      'Interpret albumin and PT/INR in context of liver disease',
      'Calculate Child-Pugh score and understand its prognostic value',
      'Calculate MELD score for transplant assessment',
      'Recognize acute liver failure requiring urgent intervention',
    ],
    bloomLevel: 'apply',
    estimatedTime: 25,
    prerequisites: ['hepatic-intro', 'cholestatic-vs-hepatocellular'],
    order: 3,
  },
  {
    id: 'thyroid-testing',
    moduleId: 'endocrine',
    title: 'Thyroid Function Testing and Interpretation',
    description: 'Understanding TSH, T4, T3, and approach to thyroid disorders',
    content: [
      {
        type: 'heading',
        content: 'Thyroid Physiology and Feedback Loop',
        level: 1,
      },
      {
        type: 'text',
        content:
          'The hypothalamic-pituitary-thyroid (HPT) axis: TRH (hypothalamus) → TSH (pituitary) → T4 and T3 (thyroid). T4 and T3 exert negative feedback on TSH.',
      },
      {
        type: 'heading',
        content: 'Key Thyroid Tests',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Test', 'Normal Range', 'Interpretation'],
          rows: [
            ['TSH', '0.4-4.0 mIU/L', 'Most sensitive screening test'],
            ['Free T4', '0.8-1.8 ng/dL', 'Active thyroid hormone'],
            ['Free T3', '2.3-4.2 pg/mL', 'More active but less stable'],
            ['Total T4', '5-12 μg/dL', 'Affected by binding proteins'],
            ['TPO antibodies', 'Negative', 'Marker of autoimmune thyroid disease'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'Hypothyroidism',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Primary hypothyroidism: High TSH, low free T4. Most common causes: Hashimoto thyroiditis, radioiodine therapy, thyroidectomy, iodine deficiency (worldwide).',
      },
      {
        type: 'text',
        content:
          'Subclinical hypothyroidism: High TSH (4-10 mIU/L), normal free T4. May progress to overt disease. Treatment controversial.',
      },
      {
        type: 'callout',
        content:
          'Central hypothyroidism: Low/normal TSH with low free T4. Indicates pituitary or hypothalamic disease. Requires MRI and evaluation for other pituitary hormone deficiencies.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Hyperthyroidism',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Primary hyperthyroidism: Low/undetectable TSH, high free T4. Causes: Graves disease, toxic multinodular goiter, toxic adenoma, thyroiditis (early phase).',
      },
      {
        type: 'list',
        content: [
          'Graves: Diffuse goiter, TSI/TRAB antibodies, ophthalmopathy',
          'Toxic nodular: Nodular goiter, older patients, no eye findings',
          'Thyroiditis: Painful (subacute) or painless, low radioiodine uptake',
        ],
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Thyroid storm (severe hyperthyroidism with fever, tachycardia, altered mental status) is life-threatening. Requires ICU care with beta-blockers, PTU/methimazole, steroids, and iodine.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Diagnostic Approach',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Step 1: Check TSH. Step 2: If abnormal TSH, check free T4. Step 3: If TSH/T4 discordant, consider assay interference, medications, or central disease.',
      },
    ],
    objectives: [
      'Explain the HPT axis and negative feedback',
      'Interpret TSH and free T4 to diagnose thyroid disorders',
      'Distinguish primary from central thyroid disease',
      'Differentiate causes of hyperthyroidism',
    ],
    bloomLevel: 'analyze',
    estimatedTime: 30,
    prerequisites: [],
    order: 1,
  },
  {
    id: 'adrenal-testing',
    moduleId: 'endocrine',
    title: 'Adrenal Function Testing',
    description: 'Cortisol, aldosterone, and approach to adrenal insufficiency and excess',
    content: [
      {
        type: 'heading',
        content: 'Adrenal Cortex Hormones',
        level: 1,
      },
      {
        type: 'text',
        content:
          'The adrenal cortex produces three classes of steroid hormones: glucocorticoids (cortisol), mineralocorticoids (aldosterone), and androgens (DHEA, androstenedione).',
      },
      {
        type: 'heading',
        content: 'Cortisol and the HPA Axis',
        level: 2,
      },
      {
        type: 'text',
        content:
          'CRH (hypothalamus) → ACTH (pituitary) → Cortisol (adrenal). Cortisol has diurnal variation (highest 6-8 AM, lowest midnight). Stress increases cortisol.',
      },
      {
        type: 'heading',
        content: 'Adrenal Insufficiency',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Type', 'Cortisol', 'ACTH', 'Aldosterone', 'Causes'],
          rows: [
            ['Primary (Addison)', 'Low', 'High', 'Low', 'Autoimmune, TB, hemorrhage, metastases'],
            ['Secondary', 'Low', 'Low', 'Normal', 'Pituitary disease, exogenous steroids'],
            ['Tertiary', 'Low', 'Low', 'Normal', 'Hypothalamic disease, chronic steroid withdrawal'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Adrenal crisis (hypotension, shock, altered mental status, fever) requires immediate IV hydrocortisone 100 mg, fluids, and electrolyte correction. Do not wait for test results.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'ACTH Stimulation Test',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Gold standard for diagnosing primary adrenal insufficiency. Give 250 μg cosyntropin (synthetic ACTH) IV. Measure cortisol at 0, 30, 60 min. Peak cortisol > 18-20 μg/dL is normal.',
      },
      {
        type: 'heading',
        content: 'Cushing Syndrome (Cortisol Excess)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Screening tests: 24-hour urine free cortisol, late-night salivary cortisol, overnight dexamethasone suppression test (1 mg at 11 PM, cortisol at 8 AM should be < 1.8 μg/dL).',
      },
      {
        type: 'list',
        content: [
          'ACTH-dependent: Pituitary adenoma (Cushing disease), ectopic ACTH (lung cancer)',
          'ACTH-independent: Adrenal adenoma/carcinoma, exogenous steroids',
        ],
      },
      {
        type: 'heading',
        content: 'Aldosterone and Renin',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Primary hyperaldosteronism: High aldosterone, low renin. Causes hypertension and hypokalemia. Screen with aldosterone-to-renin ratio (ARR) > 20-30.',
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: Hyperkalemia with hypoaldosteronism suggests type 4 RTA or medications (ACE-I, ARBs, spironolactone, NSAIDs).',
        calloutType: 'clinical-pearl',
      },
    ],
    objectives: [
      'Explain the HPA axis and cortisol regulation',
      'Distinguish primary from secondary adrenal insufficiency',
      'Interpret ACTH stimulation test',
      'Screen for Cushing syndrome and primary hyperaldosteronism',
    ],
    bloomLevel: 'analyze',
    estimatedTime: 35,
    prerequisites: [],
    order: 2,
  },
  {
    id: 'diabetes-markers',
    moduleId: 'endocrine',
    title: 'Diabetes and Glucose Metabolism Markers',
    description: 'Glucose, HbA1c, insulin, and diagnostic criteria for diabetes',
    content: [
      {
        type: 'heading',
        content: 'Glucose Homeostasis',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Insulin (from pancreatic β-cells) lowers blood glucose by promoting cellular uptake and glycogen synthesis. Glucagon (from α-cells) raises glucose via glycogenolysis and gluconeogenesis.',
      },
      {
        type: 'heading',
        content: 'Diagnostic Criteria for Diabetes',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Diabetes is diagnosed if ANY of the following (confirmed on two occasions):',
      },
      {
        type: 'table',
        content: {
          headers: ['Test', 'Diabetes', 'Prediabetes', 'Normal'],
          rows: [
            ['Fasting glucose', '≥ 126 mg/dL', '100-125 mg/dL', '< 100 mg/dL'],
            ['2-hr OGTT', '≥ 200 mg/dL', '140-199 mg/dL', '< 140 mg/dL'],
            ['HbA1c', '≥ 6.5%', '5.7-6.4%', '< 5.7%'],
            ['Random glucose', '≥ 200 mg/dL + symptoms', '-', '-'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'Hemoglobin A1c (HbA1c)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'HbA1c reflects average glucose over the past 2-3 months (RBC lifespan ~120 days). Does not require fasting. Goal for most diabetics: < 7%.',
      },
      {
        type: 'callout',
        content:
          'LIMITATION: HbA1c is unreliable with hemoglobinopathies, hemolysis, recent transfusion, iron deficiency anemia, or CKD. Use fructosamine or glucose monitoring instead.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Type 1 vs Type 2 Diabetes',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Type 1: Autoimmune β-cell destruction. C-peptide low/absent. GAD, IA-2 antibodies positive. Insulin-dependent.',
          'Type 2: Insulin resistance + β-cell dysfunction. C-peptide normal/high. Obesity, metabolic syndrome.',
        ],
      },
      {
        type: 'heading',
        content: 'Hypoglycemia Workup',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Whipple triad: (1) Symptoms of hypoglycemia, (2) Low plasma glucose (< 55 mg/dL), (3) Relief with glucose. Measure glucose, insulin, C-peptide, proinsulin during symptomatic episode.',
      },
      {
        type: 'table',
        content: {
          headers: ['Cause', 'Glucose', 'Insulin', 'C-peptide'],
          rows: [
            ['Insulinoma', 'Low', 'High', 'High'],
            ['Exogenous insulin', 'Low', 'High', 'Low'],
            ['Sulfonylurea', 'Low', 'High', 'High'],
            ['Non-islet tumor', 'Low', 'Low', 'Low'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: Estimated average glucose (eAG) from HbA1c: eAG (mg/dL) = 28.7 × HbA1c - 46.7. Example: HbA1c 7% ≈ eAG 154 mg/dL.',
        calloutType: 'clinical-pearl',
      },
    ],
    objectives: [
      'Apply diagnostic criteria for diabetes and prediabetes',
      'Interpret HbA1c and understand its limitations',
      'Distinguish type 1 from type 2 diabetes',
      'Evaluate hypoglycemia using Whipple triad and laboratory tests',
    ],
    bloomLevel: 'apply',
    estimatedTime: 30,
    prerequisites: [],
    order: 3,
  },
  {
    id: 'metabolic-intro',
    moduleId: 'metabolic',
    title: 'Introduction to Metabolic Panels',
    description: 'Understanding BMP, CMP, and integrated approach to metabolic derangements',
    content: [
      {
        type: 'heading',
        content: 'Basic Metabolic Panel (BMP)',
        level: 1,
      },
      {
        type: 'text',
        content:
          'The BMP (or Chem-7) includes 7-8 tests: sodium, potassium, chloride, bicarbonate (CO₂), BUN, creatinine, and glucose. Some labs include calcium.',
      },
      {
        type: 'heading',
        content: 'Comprehensive Metabolic Panel (CMP)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'The CMP (or Chem-14) includes all BMP tests PLUS: albumin, total protein, ALP, ALT, AST, and total bilirubin. Provides kidney, liver, and metabolic overview.',
      },
      {
        type: 'table',
        content: {
          headers: ['Category', 'Tests', 'What They Assess'],
          rows: [
            ['Electrolytes', 'Na⁺, K⁺, Cl⁻, HCO₃⁻', 'Fluid/electrolyte balance, acid-base'],
            ['Renal', 'BUN, Creatinine, (eGFR)', 'Kidney function'],
            ['Glucose', 'Glucose', 'Glycemic control'],
            ['Hepatic', 'ALT, AST, ALP, Bilirubin', 'Liver injury and function'],
            ['Protein', 'Albumin, Total Protein', 'Nutrition, synthetic function'],
            ['Minerals', 'Calcium', 'Bone, parathyroid'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'Integrated Interpretation',
        level: 2,
      },
      {
        type: 'text',
        content:
          'The power of metabolic panels is pattern recognition. Don\'t interpret each value in isolation. Look for:',
      },
      {
        type: 'list',
        content: [
          'Anion gap in context of HCO₃⁻ and Cl⁻',
          'BUN/Cr ratio for prerenal vs intrinsic AKI',
          'K⁺ with HCO₃⁻ for acid-base and renal tubular disorders',
          'Albumin with total protein for clues about chronic disease',
        ],
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: A completely normal CMP in a symptomatic patient is reassuring but does not exclude all disease. Consider CBC, urinalysis, and organ-specific tests.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Common Patterns in Critical Illness',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Sepsis: High anion gap acidosis, AKI, hyperglycemia (stress response). DKA: Hyperglycemia, high anion gap acidosis, hyperkalemia (total body K⁺ depleted). Chronic kidney disease: Elevated Cr/BUN, low HCO₃⁻, hyperkalemia, low calcium, elevated phosphate.',
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Severe hyperglycemia (> 600 mg/dL) with hyperosmolarity and AKI suggests HHS (hyperosmolar hyperglycemic state). Mortality 10-20%.',
        calloutType: 'warning',
      },
    ],
    objectives: [
      'List components of BMP and CMP',
      'Use integrated approach to interpret metabolic panels',
      'Recognize common patterns in critical illness',
      'Apply pattern recognition to formulate differential diagnosis',
    ],
    bloomLevel: 'apply',
    estimatedTime: 25,
    prerequisites: ['electrolytes-intro', 'renal-intro'],
    order: 1,
  },
  {
    id: 'cmp-interpretation',
    moduleId: 'metabolic',
    title: 'CMP Interpretation in Clinical Context',
    description: 'Case-based approach to comprehensive metabolic panel interpretation',
    content: [
      {
        type: 'heading',
        content: 'Systematic Approach to CMP',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Step-by-step approach: (1) Electrolytes and anion gap, (2) Renal function (Cr, BUN, BUN/Cr), (3) Glucose, (4) Liver tests (transaminases, ALP, bilirubin), (5) Proteins (albumin, total protein), (6) Calcium.',
      },
      {
        type: 'heading',
        content: 'Case Example 1: High Anion Gap Acidosis',
        level: 2,
      },
      {
        type: 'text',
        content:
          'CMP shows: Na 138, K 5.8, Cl 98, HCO₃ 12, BUN 42, Cr 1.8, Glucose 420, Anion Gap 28. Pattern: Hyperglycemia, high AG acidosis, AKI, hyperkalemia. Diagnosis: Diabetic ketoacidosis (DKA).',
      },
      {
        type: 'heading',
        content: 'Case Example 2: Cholestatic Liver Injury',
        level: 2,
      },
      {
        type: 'text',
        content:
          'CMP shows: ALT 85, AST 72, ALP 520, Total Bili 6.2, Albumin 3.8. Pattern: ALP >> ALT/AST, hyperbilirubinemia, normal albumin. Diagnosis: Cholestatic injury (consider obstruction, PBC, PSC, drug-induced).',
      },
      {
        type: 'heading',
        content: 'Case Example 3: Chronic Liver Disease',
        level: 2,
      },
      {
        type: 'text',
        content:
          'CMP shows: ALT 48, AST 62, ALP 95, Total Bili 1.8, Albumin 2.4, Total Protein 6.0. Pattern: Mild transaminase elevation, LOW albumin. Diagnosis: Impaired synthetic function suggests cirrhosis. Check PT/INR.',
      },
      {
        type: 'heading',
        content: 'Case Example 4: Prerenal AKI',
        level: 2,
      },
      {
        type: 'text',
        content:
          'CMP shows: Na 148, K 4.2, Cl 110, HCO₃ 26, BUN 48, Cr 1.6 (baseline 0.9), BUN/Cr ratio 30. Pattern: Elevated BUN/Cr > 20, hypernatremia. Diagnosis: Prerenal azotemia (dehydration, hypovolemia).',
      },
      {
        type: 'heading',
        content: 'Delta-Delta in Mixed Disorders',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Patient with AG 22, HCO₃ 18: ΔAG = 22-12 = 10. ΔHCO₃ = 24-18 = 6. Δ-Δ = 10/6 = 1.67 (normal). Pure high AG acidosis with appropriate HCO₃ drop.',
      },
      {
        type: 'text',
        content:
          'Patient with AG 30, HCO₃ 22: ΔAG = 18. ΔHCO₃ = 2. Δ-Δ = 9 (>> 2). Concurrent metabolic alkalosis (e.g., vomiting + lactic acidosis).',
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: Always calculate the anion gap yourself. Lab-reported values may not account for albumin correction: For every 1 g/dL drop in albumin below 4, add 2.5 to the calculated AG.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Hypercalcemia on CMP',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Correct calcium for albumin: Corrected Ca = measured Ca + 0.8 × (4 - albumin). Most common causes: Primary hyperparathyroidism, malignancy. Check PTH, vitamin D, PTHrP.',
      },
    ],
    objectives: [
      'Apply systematic approach to CMP interpretation',
      'Recognize common clinical patterns (DKA, cholestasis, prerenal AKI)',
      'Use delta-delta to identify mixed acid-base disorders',
      'Correct calcium for albumin and interpret hypercalcemia',
    ],
    bloomLevel: 'evaluate',
    estimatedTime: 35,
    prerequisites: ['metabolic-intro', 'acid-base-intro', 'hepatic-intro'],
    order: 2,
  },
  {
    id: 'error-types',
    moduleId: 'lab-errors',
    title: 'Types of Laboratory Errors',
    description: 'Pre-analytic, analytic, and post-analytic errors in clinical laboratory testing',
    content: [
      {
        type: 'heading',
        content: 'The Three Phases of Testing',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Laboratory testing involves three phases: (1) Pre-analytic (test ordering, collection, transport), (2) Analytic (actual measurement), (3) Post-analytic (result reporting, interpretation).',
      },
      {
        type: 'heading',
        content: 'Pre-Analytic Errors (60-70% of all errors)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Pre-analytic errors are the most common. They occur before the sample reaches the analyzer.',
      },
      {
        type: 'table',
        content: {
          headers: ['Error Type', 'Examples', 'Impact'],
          rows: [
            ['Patient identification', 'Wrong patient labeled', 'Critical: wrong diagnosis/treatment'],
            ['Hemolysis', 'Difficult draw, small needle', 'Falsely elevated K⁺, LD, AST'],
            ['Timing', 'Non-fasting glucose, wrong time for cortisol', 'Misinterpretation'],
            ['Order of draw', 'K⁺ contamination from EDTA tube', 'Pseudohyperkalemia'],
            ['Transport/storage', 'Delayed processing, wrong temperature', 'Analyte degradation'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: Always suspect hemolysis if K⁺ is elevated with normal or low other electrolytes. Check for pink/red serum. Recollect sample.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Analytic Errors (10-20% of errors)',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Calibration drift or reagent issues',
          'Instrument malfunction',
          'Interference (lipemia, icterus, hemolysis)',
          'QC failures not caught',
        ],
      },
      {
        type: 'text',
        content:
          'Modern analyzers have built-in QC, making analytic errors less common than pre-analytic errors.',
      },
      {
        type: 'heading',
        content: 'Post-Analytic Errors (20-30% of errors)',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Transcription errors',
          'Delayed or failed result reporting',
          'Misinterpretation by clinician',
          'Critical values not called to provider',
          'Wrong reference range applied',
        ],
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: Delta check flags large changes from previous results (e.g., K⁺ 3.5 → 6.2 in 1 day). Suggests error or acute change. Always verify unexpected large changes.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Error Prevention Strategies',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'Two patient identifiers at collection',
          'Standardized phlebotomy protocols',
          'Proper order of draw',
          'Regular QC and proficiency testing',
          'Critical value callback policies',
          'Electronic interfaces to reduce transcription',
        ],
      },
    ],
    objectives: [
      'Classify laboratory errors by phase (pre-, analytic, post-)',
      'Identify common pre-analytic errors and their impact',
      'Recognize when to suspect laboratory error vs true abnormality',
      'Apply error prevention strategies',
    ],
    bloomLevel: 'analyze',
    estimatedTime: 25,
    prerequisites: [],
    order: 1,
  },
  {
    id: 'hemolysis-interference',
    moduleId: 'lab-errors',
    title: 'Hemolysis and Analytical Interference',
    description: 'Understanding specimen hemolysis, lipemia, icterus, and other interferences',
    content: [
      {
        type: 'heading',
        content: 'Hemolysis: The Most Common Interference',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Hemolysis is RBC lysis releasing intracellular contents into serum/plasma. Visually appears pink to red. Causes in vitro (most common) or in vivo hemolysis.',
      },
      {
        type: 'heading',
        content: 'Causes of Hemolysis',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Type', 'Causes'],
          rows: [
            ['In vitro (pre-analytic)', 'Difficult venipuncture, small needle, excessive vacuum, vigorous mixing, temperature extremes'],
            ['In vivo (true hemolysis)', 'Autoimmune hemolytic anemia, G6PD deficiency, mechanical (prosthetic valve), TTP, DIC'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'Analytes Affected by Hemolysis',
        level: 2,
      },
      {
        type: 'list',
        content: [
          'FALSELY ELEVATED: K⁺ (most important!), LD, AST, phosphate, magnesium',
          'FALSELY DECREASED: Haptoglobin (binds free Hgb)',
          'Unreliable: Total bilirubin (interference with assay)',
        ],
      },
      {
        type: 'callout',
        content:
          'CRITICAL: Pseudohyperkalemia from hemolysis is the most common cause of falsely elevated K⁺. Always inspect specimen and recollect if hemolyzed with elevated K⁺.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Lipemia (High Triglycerides)',
        level: 1,
      },
      {
        type: 'text',
        content:
          'Lipemia occurs when serum/plasma appears cloudy/milky due to elevated triglycerides (usually > 400 mg/dL). Common after non-fasting specimen or with hypertriglyceridemia.',
      },
      {
        type: 'list',
        content: [
          'Interferes with: Photometric assays (electrolytes, proteins, enzymes)',
          'Can cause falsely low results due to sample dilution effect',
          'Treatment: Ultracentrifugation to clear lipids or request fasting sample',
        ],
      },
      {
        type: 'heading',
        content: 'Icterus (Hyperbilirubinemia)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Icterus is yellow discoloration from elevated bilirubin (> 3 mg/dL). Interferes with spectrophotometric assays that measure in the yellow wavelength range.',
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: The "HIL index" (Hemolysis, Icterus, Lipemia) is reported by many labs to quantify interference. Guides interpretation and resampling decisions.',
        calloutType: 'clinical-pearl',
      },
      {
        type: 'heading',
        content: 'Other Interferences',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Interference', 'Source', 'Affected Tests'],
          rows: [
            ['Heterophile antibodies', 'Prior exposure to animal proteins', 'Immunoassays (TSH, troponin, hCG)'],
            ['Biotin', 'High-dose supplements', 'Many immunoassays (falsely high or low)'],
            ['Paraproteins', 'Myeloma, MGUS', 'Electrolytes (pseudohyponatremia)'],
            ['IV fluids', 'Drawing above IV site', 'Dilution of all analytes'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'Always communicate with the lab when results don\'t fit the clinical picture. The lab can investigate interference, recalculate with different methods, or suggest alternative tests.',
        calloutType: 'info',
      },
    ],
    objectives: [
      'Recognize hemolysis and understand its impact on results',
      'Distinguish in vitro from in vivo hemolysis',
      'Identify lipemia and icterus interference',
      'Recognize heterophile antibody and biotin interference',
    ],
    bloomLevel: 'apply',
    estimatedTime: 25,
    prerequisites: ['error-types'],
    order: 2,
  },
  {
    id: 'qc-basics',
    moduleId: 'lab-errors',
    title: 'Quality Control and Quality Assurance Basics',
    description: 'Understanding laboratory QC, proficiency testing, and ensuring result reliability',
    content: [
      {
        type: 'heading',
        content: 'Quality Control (QC)',
        level: 1,
      },
      {
        type: 'text',
        content:
          'QC monitors analyzer performance using control materials (samples with known values) run alongside patient samples. Ensures accuracy and precision.',
      },
      {
        type: 'heading',
        content: 'Internal QC',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Labs run control materials (low, normal, high) at regular intervals (e.g., every shift, every 24 hours). Results are plotted on Levey-Jennings charts.',
      },
      {
        type: 'list',
        content: [
          'Accuracy: How close to the true value (measured by bias)',
          'Precision: Reproducibility (measured by coefficient of variation, CV)',
          'Westgard rules: Criteria for accepting or rejecting runs (e.g., 1-2s, 1-3s, 2-2s rules)',
        ],
      },
      {
        type: 'callout',
        content:
          'Westgard rule 1-2s: Single QC value exceeds ±2 SD (warning). 1-3s: Single QC exceeds ±3 SD (reject run). 2-2s: Two consecutive QC values exceed ±2 SD (reject).',
        calloutType: 'info',
      },
      {
        type: 'heading',
        content: 'External QC (Proficiency Testing)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'External agencies (CAP, CLIA) send blinded samples to labs for testing. Results compared across labs nationally. Ensures inter-laboratory consistency.',
      },
      {
        type: 'heading',
        content: 'Quality Assurance (QA)',
        level: 1,
      },
      {
        type: 'text',
        content:
          'QA is broader than QC. Encompasses the entire testing process: appropriate test utilization, turnaround time, critical value reporting, continuing education, error tracking.',
      },
      {
        type: 'heading',
        content: 'Delta Checks',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Automated comparison of current result to previous result. Flags unexpectedly large changes (e.g., K⁺ 4.0 → 7.5 in 1 day). Helps detect specimen errors or critical clinical changes.',
      },
      {
        type: 'table',
        content: {
          headers: ['QC Tool', 'Purpose', 'Example'],
          rows: [
            ['Levey-Jennings chart', 'Monitor trends in QC over time', 'Detect reagent lot changes, drift'],
            ['Westgard rules', 'Accept/reject analytical runs', 'Prevent reporting erroneous results'],
            ['Delta checks', 'Flag unexpected changes', 'K⁺ 4.2 → 6.8 in 12 hours'],
            ['Proficiency testing', 'Compare to peer labs', 'CAP surveys 3× per year'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'Critical Values (Panic Values)',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Life-threatening results requiring immediate callback to provider. Examples: K⁺ < 2.5 or > 6.5, glucose < 40 or > 500, pH < 7.2 or > 7.6.',
      },
      {
        type: 'callout',
        content:
          'MUST NOT MISS: When you receive a critical value callback, document: (1) Result, (2) Time notified, (3) Name of caller, (4) Action taken. Critical for patient safety and medico-legal documentation.',
        calloutType: 'warning',
      },
      {
        type: 'heading',
        content: 'Reference Intervals',
        level: 2,
      },
      {
        type: 'text',
        content:
          'Reference intervals (normal ranges) represent the central 95% of values in a healthy population. MUST be specific to the lab, method, and population (age, sex). Not a diagnostic threshold.',
      },
      {
        type: 'callout',
        content:
          'Clinical Pearl: 5% of healthy people will have "abnormal" results by definition. Always interpret in clinical context, not by reference range alone.',
        calloutType: 'clinical-pearl',
      },
    ],
    objectives: [
      'Explain the difference between QC and QA',
      'Understand Levey-Jennings charts and Westgard rules',
      'Describe the purpose of proficiency testing',
      'Recognize the importance of critical value policies and delta checks',
    ],
    bloomLevel: 'understand',
    estimatedTime: 25,
    prerequisites: ['error-types'],
    order: 3,
  },
];
