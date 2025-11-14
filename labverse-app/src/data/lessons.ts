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
];
