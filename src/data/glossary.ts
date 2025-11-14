import type { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'anion-gap',
    term: 'Anion Gap',
    abbreviation: 'AG',
    definition:
      'The difference between measured cations (Na⁺) and measured anions (Cl⁻ + HCO₃⁻). Represents unmeasured anions in the blood.',
    category: 'Acid-Base',
    relatedTerms: ['metabolic-acidosis', 'albumin'],
    clinicalRelevance:
      'Elevated anion gap indicates presence of unmeasured anions (lactate, ketones, toxins, uremic acids). Helps classify metabolic acidosis as high AG or normal AG (non-AG).',
  },
  {
    id: 'metabolic-acidosis',
    term: 'Metabolic Acidosis',
    definition:
      'Primary acid-base disorder characterized by decreased blood pH due to decreased bicarbonate concentration.',
    category: 'Acid-Base',
    relatedTerms: ['anion-gap', 'bicarbonate', 'ph'],
    clinicalRelevance:
      'Classified as high anion gap (MUDPILES) or normal anion gap (GI losses, RTA). Respiratory compensation occurs via hyperventilation.',
  },
  {
    id: 'siadh',
    term: 'Syndrome of Inappropriate Antidiuretic Hormone',
    abbreviation: 'SIADH',
    definition:
      'Disorder of euvolemic hyponatremia caused by excessive ADH secretion relative to plasma osmolality, leading to water retention.',
    category: 'Electrolytes',
    relatedTerms: ['hyponatremia', 'osmolality', 'adh'],
    clinicalRelevance:
      'Diagnosis requires: low serum osmolality, inappropriately concentrated urine (Uosm > 100), clinical euvolemia, normal thyroid/adrenal function. First-line treatment is fluid restriction.',
  },
  {
    id: 'gfr',
    term: 'Glomerular Filtration Rate',
    abbreviation: 'GFR',
    definition:
      'Volume of plasma filtered by the glomeruli per unit time. Best overall measure of kidney function.',
    category: 'Renal',
    relatedTerms: ['creatinine', 'aki', 'ckd'],
    clinicalRelevance:
      'Normal GFR: ~120 mL/min/1.73m². Estimated using equations (CKD-EPI, MDRD) based on serum creatinine, age, sex, and race. GFR < 60 for > 3 months defines chronic kidney disease.',
  },
  {
    id: 'creatinine',
    term: 'Creatinine',
    abbreviation: 'Cr',
    definition:
      'Breakdown product of creatine phosphate in muscle, filtered by glomeruli and minimally secreted. Used as marker of kidney function.',
    category: 'Renal',
    relatedTerms: ['gfr', 'bun', 'aki'],
    clinicalRelevance:
      'Normal: 0.7-1.3 mg/dL (varies by muscle mass, age, sex). Steady-state creatinine reflects GFR. Acute rise suggests AKI. BUN:Cr ratio helps differentiate pre-renal, intrinsic, and post-renal causes.',
  },
  {
    id: 'alt',
    term: 'Alanine Aminotransferase',
    abbreviation: 'ALT',
    definition:
      'Enzyme found predominantly in hepatocytes. Specific marker of hepatocellular injury.',
    category: 'Hepatic',
    relatedTerms: ['ast', 'hepatocellular-injury'],
    clinicalRelevance:
      'More specific for liver than AST. ALT > 1000 suggests acute hepatocellular injury (viral hepatitis, toxins, ischemia). ALT > AST typical in most liver diseases except alcoholic hepatitis.',
  },
  {
    id: 'ast',
    term: 'Aspartate Aminotransferase',
    abbreviation: 'AST',
    definition:
      'Enzyme found in liver, heart, muscle, and other tissues. Less specific than ALT for liver injury.',
    category: 'Hepatic',
    relatedTerms: ['alt', 'hepatocellular-injury'],
    clinicalRelevance:
      'AST:ALT ratio > 2 suggests alcoholic hepatitis. AST > ALT can also occur in cirrhosis, muscle disease, or hemolysis. AST alone is not specific for liver disease.',
  },
  {
    id: 'alp',
    term: 'Alkaline Phosphatase',
    abbreviation: 'ALP',
    definition:
      'Enzyme found in bile ducts, bone, intestine, and placenta. Marker of cholestasis when liver origin is confirmed.',
    category: 'Hepatic',
    relatedTerms: ['ggt', 'cholestasis', 'bilirubin'],
    clinicalRelevance:
      'Isolated elevated ALP requires differentiation of liver vs bone origin (use GGT or fractionation). Hepatic ALP elevation indicates cholestasis (bile duct obstruction, infiltrative disease).',
  },
  {
    id: 'bilirubin',
    term: 'Bilirubin',
    definition:
      'Breakdown product of heme metabolism. Measured as total, direct (conjugated), and indirect (unconjugated).',
    category: 'Hepatic',
    relatedTerms: ['jaundice', 'hemolysis', 'gilberts'],
    clinicalRelevance:
      'Direct (conjugated) hyperbilirubinemia suggests hepatobiliary disease. Indirect (unconjugated) hyperbilirubinemia suggests hemolysis or Gilbert syndrome. Total bilirubin > 2.5 mg/dL typically causes visible jaundice.',
  },
  {
    id: 'tsh',
    term: 'Thyroid Stimulating Hormone',
    abbreviation: 'TSH',
    definition:
      'Pituitary hormone that stimulates thyroid gland to produce T4 and T3. Most sensitive test for primary thyroid dysfunction.',
    category: 'Endocrine',
    relatedTerms: ['t4', 't3', 'hypothyroid', 'hyperthyroid'],
    clinicalRelevance:
      'Inverse log-linear relationship with free T4. TSH elevated in primary hypothyroidism, low in hyperthyroidism. Normal: 0.4-4.0 mIU/L. Order free T4 if TSH abnormal to confirm and assess severity.',
  },
  {
    id: 'hba1c',
    term: 'Hemoglobin A1c',
    abbreviation: 'HbA1c',
    definition:
      'Glycosylated hemoglobin reflecting average blood glucose over preceding 2-3 months.',
    category: 'Endocrine',
    relatedTerms: ['glucose', 'diabetes'],
    clinicalRelevance:
      'Diabetes diagnosis: HbA1c ≥ 6.5%. Pre-diabetes: 5.7-6.4%. Goal for most diabetics: < 7%. Not reliable in conditions affecting RBC lifespan (hemolysis, recent transfusion, hemoglobinopathies).',
  },
  {
    id: 'osmolality',
    term: 'Osmolality',
    abbreviation: 'Osm',
    definition:
      'Concentration of osmotically active particles per kilogram of solvent. Measured in mOsm/kg.',
    category: 'Electrolytes',
    relatedTerms: ['sodium', 'osmolar-gap'],
    clinicalRelevance:
      'Serum osmolality normally 275-295 mOsm/kg. Calculated osmolality = 2×Na + glucose/18 + BUN/2.8. Osmolar gap > 10 suggests presence of unmeasured osmoles (alcohols, mannitol).',
  },
  {
    id: 'hemolysis',
    term: 'Hemolysis',
    definition:
      'Rupture of red blood cells releasing intracellular contents into the specimen. Common pre-analytic error.',
    category: 'Lab Errors',
    relatedTerms: ['potassium', 'ldh', 'preanalytic'],
    clinicalRelevance:
      'Falsely elevates: K⁺, LDH, AST, phosphate, magnesium. Specimen appears pink-red. Common causes: traumatic venipuncture, small needle, vigorous mixing. Repeat specimen if suspected.',
  },
];
