import type { Reference } from '../types';
import { doi, pubmed } from './dsl';

const R = (id: string, kind: Reference['kind'], year: number, citation: string, url: string): Reference => ({
  id,
  kind,
  year,
  citation,
  url,
});

export const references: Reference[] = [
  // Water, sodium, potassium
  R('spasovski-2014', 'guideline', 2014, 'Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia (ESE/ESICM/ERA-EDTA). Eur J Endocrinol. 2014;170:G1–G47.', doi('10.1530/EJE-13-1020')),
  R('verbalis-2013', 'consensus', 2013, 'Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med. 2013;126(10 Suppl 1):S1–S42.', pubmed('Verbalis hyponatremia expert panel recommendations 2013 Am J Med')),
  R('sterns-2015', 'review', 2015, 'Sterns RH. Disorders of plasma sodium — causes, consequences, and correction. N Engl J Med. 2015;372:55–65.', doi('10.1056/NEJMra1404489')),
  R('adrogue-2000', 'review', 2000, 'Adrogué HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342:1581–1589.', doi('10.1056/NEJM200005253422107')),
  R('ayus-2025', 'study', 2025, 'Ayus JC, et al. Correction rates and clinical outcomes in hospitalized adults with severe hyponatremia: systematic review and meta-analysis. JAMA Intern Med. 2025;185:38–51.', 'https://pubmed.ncbi.nlm.nih.gov/39556338/'),
  R('adrogue-hyper-2000', 'review', 2000, 'Adrogué HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342:1493–1499.', doi('10.1056/NEJM200005183422006')),
  R('chauhan-2019', 'study', 2019, 'Chauhan K, et al. Rate of correction of hypernatremia and health outcomes in critically ill patients. Clin J Am Soc Nephrol. 2019;14:656–663.', pubmed('Chauhan rate of correction of hypernatremia health outcomes critically ill 2019')),
  R('hillier-1999', 'study', 1999, 'Hillier TA, Abbott RD, Barrett EJ. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106:399–403.', pubmed('Hillier hyponatremia correction factor hyperglycemia 1999')),
  R('fenske-2018', 'trial', 2018, 'Fenske W, et al. A copeptin-based approach in the diagnosis of diabetes insipidus. N Engl J Med. 2018;379:428–439.', doi('10.1056/NEJMoa1803760')),
  R('refardt-2023', 'trial', 2023, 'Refardt J, et al. Arginine or hypertonic saline–stimulated copeptin to diagnose AVP deficiency (CARGOx). N Engl J Med. 2023;389:1877–1887.', pubmed('Refardt arginine hypertonic saline stimulated copeptin AVP deficiency NEJM 2023')),
  R('arima-2022', 'consensus', 2022, 'Working Group for Renaming Diabetes Insipidus. Changing the name of diabetes insipidus: a position statement (AVP deficiency / AVP resistance). 2022.', pubmed('Changing the name of diabetes insipidus position statement 2022')),
  R('kdigo-k-2020', 'consensus', 2020, 'Clase CM, et al. Potassium homeostasis and management of dyskalemia in kidney diseases: conclusions from a KDIGO Controversies Conference. Kidney Int. 2020;97:42–61.', doi('10.1016/j.kint.2019.09.018')),
  R('ukka-k-2023', 'guideline', 2023, 'UK Kidney Association. Clinical practice guideline: treatment of acute hyperkalaemia in adults (2023; updated 2026).', 'https://www.ukkidney.org/health-professionals/guidelines'),
  R('don-1990', 'study', 1990, 'Don BR, et al. Pseudohyperkalemia caused by fist clenching during phlebotomy. N Engl J Med. 1990;322:1290–1292.', pubmed('Don pseudohyperkalemia fist clenching phlebotomy 1990')),

  // Acid–base
  R('berend-2014', 'review', 2014, 'Berend K, de Vries APJ, Gans ROB. Physiological approach to assessment of acid–base disturbances. N Engl J Med. 2014;371:1434–1445.', doi('10.1056/NEJMra1003327')),
  R('kraut-2007', 'review', 2007, 'Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2:162–174.', doi('10.2215/CJN.03020906')),
  R('figge-1998', 'study', 1998, 'Figge J, Jabor A, Kazda A, Fencl V. Anion gap and hypoalbuminemia. Crit Care Med. 1998;26:1807–1810.', pubmed('Figge anion gap hypoalbuminemia 1998')),
  R('mehta-2008', 'review', 2008, 'Mehta AN, Emmett JB, Emmett M. GOLD MARK: an anion gap mnemonic for the 21st century. Lancet. 2008;372:892.', doi('10.1016/S0140-6736(08)61398-7')),
  R('kraut-toxic-2018', 'review', 2018, 'Kraut JA, Mullins ME. Toxic alcohols. N Engl J Med. 2018;378:270–280.', doi('10.1056/NEJMra1615295')),
  R('purssell-2001', 'study', 2001, 'Purssell RA, et al. Derivation and validation of a formula to calculate the contribution of ethanol to the osmolal gap. Ann Emerg Med. 2001;38:653–659.', pubmed('Purssell ethanol osmolal gap formula 2001')),
  R('byrne-vbg-2014', 'study', 2014, 'Byrne AL, et al. Peripheral venous and arterial blood gas analysis in adults: are they comparable? A systematic review and meta-analysis. Respirology. 2014;19:168–175.', pubmed('Byrne peripheral venous arterial blood gas comparable meta-analysis Respirology 2014')),
  R('austin-2010', 'trial', 2010, 'Austin MA, et al. Effect of high flow oxygen on mortality in COPD patients in prehospital setting: randomised controlled trial. BMJ. 2010;341:c5462.', doi('10.1136/bmj.c5462')),
  R('bts-o2-2017', 'guideline', 2017, "O'Driscoll BR, et al. BTS guideline for oxygen use in adults in healthcare and emergency settings. Thorax. 2017;72(Suppl 1):ii1–ii90.", doi('10.1136/thoraxjnl-2016-209729')),
  R('ers-niv-2017', 'guideline', 2017, 'Rochwerg B, et al. Official ERS/ATS clinical practice guidelines: noninvasive ventilation for acute respiratory failure. Eur Respir J. 2017;50:1602426.', doi('10.1183/13993003.02426-2016')),
  R('do-alk-2022', 'review', 2023, 'Do C, Vasquez PC, Soleimani M. Metabolic alkalosis pathogenesis, diagnosis, and treatment: core curriculum 2022. Am J Kidney Dis. 2022;80:536–551.', pubmed('Metabolic alkalosis pathogenesis diagnosis treatment core curriculum 2022')),

  // Kidney
  R('inker-2021', 'study', 2021, 'Inker LA, et al. New creatinine- and cystatin C–based equations to estimate GFR without race. N Engl J Med. 2021;385:1737–1749.', doi('10.1056/NEJMoa2102953')),
  R('kdigo-ckd-2024', 'guideline', 2024, 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S):S117–S314.', 'https://kdigo.org/guidelines/ckd-evaluation-and-management/'),
  R('kdigo-aki-2012', 'guideline', 2012, 'KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2:1–138. (2026 AKI/AKD update in development.)', 'https://kdigo.org/guidelines/acute-kidney-injury/'),
  R('waikar-2009', 'study', 2009, 'Waikar SS, Bonventre JV. Creatinine kinetics and the definition of acute kidney injury. J Am Soc Nephrol. 2009;20:672–679.', doi('10.1681/ASN.2008070669')),
  R('carvounis-2002', 'study', 2002, 'Carvounis CP, Nisar S, Guro-Razuman S. Significance of the fractional excretion of urea in the differential diagnosis of acute renal failure. Kidney Int. 2002;62:2223–2229.', pubmed('Carvounis fractional excretion of urea acute renal failure 2002')),
  R('perazella-2015', 'review', 2015, 'Perazella MA. The urine sediment as a biomarker of kidney disease. Am J Kidney Dis. 2015;66:748–755.', pubmed('Perazella urine sediment biomarker kidney disease 2015')),

  // Liver
  R('kwo-2017', 'guideline', 2017, 'Kwo PY, Cohen SM, Lim JK. ACG clinical guideline: evaluation of abnormal liver chemistries. Am J Gastroenterol. 2017;112:18–35.', doi('10.1038/ajg.2016.517')),
  R('rinella-2023', 'consensus', 2023, 'Rinella ME, et al. A multisociety Delphi consensus statement on new fatty liver disease nomenclature (MASLD). J Hepatol. 2023;79:1542–1556.', pubmed('multisociety Delphi consensus statement new fatty liver disease nomenclature 2023')),
  R('aasld-masld-2023', 'guideline', 2023, 'Rinella ME, et al. AASLD practice guidance on the clinical assessment and management of nonalcoholic fatty liver disease (MASLD). Hepatology. 2023;77:1797–1835.', pubmed('AASLD practice guidance clinical assessment management nonalcoholic fatty liver disease 2023 Rinella')),
  R('chalasani-dili-2021', 'guideline', 2021, 'Chalasani NP, et al. ACG clinical guideline: diagnosis and management of idiosyncratic drug-induced liver injury. Am J Gastroenterol. 2021;116:878–898.', pubmed('ACG clinical guideline idiosyncratic drug-induced liver injury 2021 Chalasani')),
  R('kim-meld3-2021', 'study', 2021, 'Kim WR, et al. MELD 3.0: the Model for End-Stage Liver Disease updated for the modern era. Gastroenterology. 2021;161:1887–1895.', pubmed('Kim MELD 3.0 Model for End-Stage Liver Disease updated modern era 2021')),
  R('easl-alf-2017', 'guideline', 2017, 'EASL Clinical Practical Guidelines on the management of acute (fulminant) liver failure. J Hepatol. 2017;66:1047–1081.', pubmed('EASL clinical practical guidelines acute fulminant liver failure 2017')),
  R('vilstrup-he-2014', 'guideline', 2014, 'Vilstrup H, et al. Hepatic encephalopathy in chronic liver disease: 2014 practice guideline by AASLD and EASL. Hepatology. 2014;60:715–735.', doi('10.1002/hep.27210')),
  R('easl-he-2022', 'guideline', 2022, 'EASL Clinical Practice Guidelines on the management of hepatic encephalopathy. J Hepatol. 2022;77:807–824.', pubmed('EASL clinical practice guidelines management hepatic encephalopathy 2022')),
  R('aasld-coag-2021', 'guideline', 2021, 'Northup PG, et al. Vascular liver disorders, portal vein thrombosis, and procedural bleeding in patients with liver disease: 2020 AASLD practice guidance. Hepatology. 2021;73:366–413.', pubmed('Northup vascular liver disorders procedural bleeding AASLD practice guidance 2020')),
  R('dart-apap-2023', 'consensus', 2023, 'Dart RC, et al. Management of acetaminophen poisoning in the US and Canada: a consensus statement. JAMA Netw Open. 2023;6:e2327739.', pubmed('Dart management of acetaminophen poisoning US Canada consensus statement 2023')),
  R('tokyo-2018', 'guideline', 2018, 'Kiriyama S, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci. 2018;25:17–30.', pubmed('Tokyo Guidelines 2018 diagnostic criteria severity grading acute cholangitis')),

  // Endocrine
  R('jonklaas-2014', 'guideline', 2014, 'Jonklaas J, et al. Guidelines for the treatment of hypothyroidism (American Thyroid Association). Thyroid. 2014;24:1670–1751.', doi('10.1089/thy.2014.0028')),
  R('ross-2016', 'guideline', 2016, 'Ross DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis. Thyroid. 2016;26:1343–1421.', doi('10.1089/thy.2016.0229')),
  R('trust-2017', 'trial', 2017, 'Stott DJ, et al. Thyroid hormone therapy for older adults with subclinical hypothyroidism (TRUST). N Engl J Med. 2017;376:2534–2544.', doi('10.1056/NEJMoa1603825')),
  R('bekkering-2019', 'guideline', 2019, 'Bekkering GE, et al. Thyroid hormones treatment for subclinical hypothyroidism: a clinical practice guideline. BMJ. 2019;365:l2006.', doi('10.1136/bmj.l2006')),
  R('ata-preg-2017', 'guideline', 2017, 'Alexander EK, et al. 2017 Guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and the postpartum. Thyroid. 2017;27:315–389.', doi('10.1089/thy.2016.0457')),
  R('bornstein-2016', 'guideline', 2016, 'Bornstein SR, et al. Diagnosis and treatment of primary adrenal insufficiency: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2016;101:364–389.', doi('10.1210/jc.2015-1710')),
  R('javorsky-2021', 'study', 2021, 'Javorsky BR, et al. New cutoffs for the biochemical diagnosis of adrenal insufficiency after ACTH stimulation using specific cortisol assays. J Endocr Soc. 2021;5:bvab022.', doi('10.1210/jendso/bvab022')),
  R('nieman-2008', 'guideline', 2008, "Nieman LK, et al. The diagnosis of Cushing's syndrome: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2008;93:1526–1540.", doi('10.1210/jc.2008-0125')),
  R('fleseriu-2021', 'consensus', 2021, "Fleseriu M, et al. Consensus on diagnosis and management of Cushing's disease: a guideline update. Lancet Diabetes Endocrinol. 2021;9:847–875.", pubmed('Fleseriu consensus diagnosis management Cushing disease guideline update 2021')),
  R('es-pa-2025', 'guideline', 2025, 'Adler GK, et al. Primary aldosteronism: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2025.', 'https://www.endocrine.org/clinical-practice-guidelines/primary-aldosteronism-2'),
  R('ada-soc', 'guideline', 2026, 'American Diabetes Association Professional Practice Committee. Standards of Care in Diabetes — current edition, Section 2: Diagnosis and Classification. Diabetes Care (annual supplement).', 'https://professional.diabetes.org/standards-of-care'),
  R('umpierrez-2024', 'consensus', 2024, 'Umpierrez GE, et al. Hyperglycemic crises in adults with diabetes: a consensus report (ADA/EASD/JBDS/AACE/DTS). Diabetes Care. 2024;47:1257–1275.', pubmed('Umpierrez hyperglycemic crises in adults with diabetes consensus report 2024')),
  R('nathan-2008', 'study', 2008, 'Nathan DM, et al. Translating the A1C assay into estimated average glucose values. Diabetes Care. 2008;31:1473–1478.', doi('10.2337/dc08-0545')),
  R('battelino-2019', 'consensus', 2019, 'Battelino T, et al. Clinical targets for continuous glucose monitoring data interpretation: recommendations from the international consensus on time in range. Diabetes Care. 2019;42:1593–1603.', doi('10.2337/dci19-0028')),
  R('cryer-2009', 'guideline', 2009, 'Cryer PE, et al. Evaluation and management of adult hypoglycemic disorders: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2009;94:709–728.', doi('10.1210/jc.2008-1410')),

  // Minerals
  R('payne-1973', 'study', 1973, 'Payne RB, et al. Interpretation of serum calcium in patients with abnormal serum proteins. BMJ. 1973;4:643–646.', pubmed('Payne interpretation of serum calcium abnormal serum proteins 1973')),
  R('walker-2022', 'review', 2022, 'Walker MD, Shane E. Hypercalcemia: a review. JAMA. 2022;328:1624–1636.', pubmed('Walker Shane hypercalcemia review JAMA 2022')),
  R('bilezikian-2022', 'guideline', 2022, 'Bilezikian JP, et al. Evaluation and management of primary hyperparathyroidism: summary statement and guidelines from the Fifth International Workshop. J Bone Miner Res. 2022;37:2293–2314.', pubmed('Bilezikian primary hyperparathyroidism Fifth International Workshop 2022')),
  R('aspen-refeed-2020', 'consensus', 2020, 'da Silva JSV, et al. ASPEN consensus recommendations for refeeding syndrome. Nutr Clin Pract. 2020;35:178–195.', doi('10.1002/ncp.10474')),
  R('wolf-2020', 'trial', 2020, 'Wolf M, et al. Effects of iron isomaltoside vs ferric carboxymaltose on hypophosphatemia in iron-deficiency anemia: two randomized clinical trials (PHOSPHARE). JAMA. 2020;323:432–443.', pubmed('Wolf iron isomaltoside ferric carboxymaltose hypophosphatemia randomized JAMA 2020')),
  R('cairo-2004', 'review', 2004, 'Cairo MS, Bishop M. Tumour lysis syndrome: new therapeutic strategies and classification. Br J Haematol. 2004;127:3–11.', pubmed('Cairo Bishop tumour lysis syndrome classification 2004')),
  R('kdigo-mbd-2017', 'guideline', 2017, 'KDIGO 2017 Clinical Practice Guideline Update for the Diagnosis, Evaluation, Prevention, and Treatment of CKD–Mineral and Bone Disorder. Kidney Int Suppl. 2017;7:1–59.', 'https://kdigo.org/guidelines/ckd-mbd/'),

  // Cardiac & metabolic biomarkers
  R('udmi-2018', 'consensus', 2018, 'Thygesen K, et al. Fourth universal definition of myocardial infarction (2018). Circulation. 2018;138:e618–e651.', doi('10.1161/CIR.0000000000000617')),
  R('esc-acs-2023', 'guideline', 2023, 'Byrne RA, et al. 2023 ESC guidelines for the management of acute coronary syndromes. Eur Heart J. 2023;44:3720–3826.', doi('10.1093/eurheartj/ehad191')),
  R('esc-hf-2021', 'guideline', 2021, 'McDonagh TA, et al. 2021 ESC guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J. 2021;42:3599–3726.', doi('10.1093/eurheartj/ehab368')),
  R('aha-hf-2022', 'guideline', 2022, 'Heidenreich PA, et al. 2022 AHA/ACC/HFSA guideline for the management of heart failure. Circulation. 2022;145:e895–e1032.', doi('10.1161/CIR.0000000000001063')),
  R('icon-2018', 'study', 2018, 'Januzzi JL Jr, et al. N-terminal pro-B-type natriuretic peptide in the emergency department: the ICON-RELOADED study. J Am Coll Cardiol. 2018;71:1191–1200.', pubmed('ICON-RELOADED NT-proBNP emergency department Januzzi 2018')),
  R('esc-lipid-2019', 'guideline', 2019, 'Mach F, et al. 2019 ESC/EAS guidelines for the management of dyslipidaemias. Eur Heart J. 2020;41:111–188.', doi('10.1093/eurheartj/ehz455')),
  R('esc-lipid-2025', 'guideline', 2025, '2025 Focused Update of the 2019 ESC/EAS Guidelines for the management of dyslipidaemias. Eur Heart J. 2025.', 'https://www.escardio.org/news/news-room/congress-news/2025-focused-update-dyslipidaemias/'),
  R('nordestgaard-2016', 'consensus', 2016, 'Nordestgaard BG, et al. Fasting is not routinely required for determination of a lipid profile: EAS/EFLM joint consensus statement. Eur Heart J. 2016;37:1944–1958.', doi('10.1093/eurheartj/ehw152')),
  R('sampson-2020', 'study', 2020, 'Sampson M, et al. A new equation for calculation of low-density lipoprotein cholesterol in patients with normolipidemia and/or hypertriglyceridemia. JAMA Cardiol. 2020;5:540–548.', doi('10.1001/jamacardio.2020.0013')),
  R('martin-2013', 'study', 2013, 'Martin SS, et al. Comparison of a novel method vs the Friedewald equation for estimating LDL-C from the standard lipid profile. JAMA. 2013;310:2061–2068.', doi('10.1001/jama.2013.280532')),
  R('acg-pancreatitis-2024', 'guideline', 2024, 'Tenner S, et al. American College of Gastroenterology guidelines: management of acute pancreatitis. Am J Gastroenterol. 2024;119:419–437.', pubmed('Tenner American College of Gastroenterology guidelines management acute pancreatitis 2024')),
  R('bosch-2009', 'review', 2009, 'Bosch X, Poch E, Grau JM. Rhabdomyolysis and acute kidney injury. N Engl J Med. 2009;361:62–72.', pubmed('Bosch Poch Grau rhabdomyolysis acute kidney injury NEJM 2009')),

  // Laboratory medicine
  R('plebani-2006', 'review', 2006, 'Plebani M. Errors in clinical laboratories or errors in laboratory medicine? Clin Chem Lab Med. 2006;44:750–759.', pubmed('Plebani errors in clinical laboratories or errors in laboratory medicine 2006')),
  R('clsi-gp41', 'standard', 2017, 'CLSI GP41. Collection of Diagnostic Venous Blood Specimens, 7th ed. Clinical and Laboratory Standards Institute; 2017.', 'https://clsi.org/'),
  R('lippi-2008', 'review', 2008, 'Lippi G, et al. Haemolysis: an overview of the leading cause of unsuitable specimens in clinical laboratories. Clin Chem Lab Med. 2008;46:764–772.', pubmed('Lippi haemolysis overview leading cause unsuitable specimens 2008')),
  R('li-biotin-2017', 'study', 2017, 'Li D, et al. Association of biotin ingestion with performance of hormone and nonhormone assays in healthy adults. JAMA. 2017;318:1150–1160.', doi('10.1001/jama.2017.13705')),
  R('bolstad-2013', 'review', 2013, 'Bolstad N, Warren DJ, Nustad K. Heterophilic antibody interference in immunometric assays. Best Pract Res Clin Endocrinol Metab. 2013;27:647–661.', pubmed('Bolstad heterophilic antibody interference immunometric assays 2013')),
  R('westgard-1981', 'study', 1981, 'Westgard JO, Barry PL, Hunt MR, Groth T. A multi-rule Shewhart chart for quality control in clinical chemistry. Clin Chem. 1981;27:493–501.', pubmed('Westgard multi-rule Shewhart chart quality control clinical chemistry 1981')),
  R('clsi-c24', 'standard', 2016, 'CLSI C24. Statistical Quality Control for Quantitative Measurement Procedures, 4th ed. Clinical and Laboratory Standards Institute; 2016.', 'https://clsi.org/'),
  R('clsi-ep28', 'standard', 2010, 'CLSI EP28-A3c. Defining, Establishing, and Verifying Reference Intervals in the Clinical Laboratory. Clinical and Laboratory Standards Institute; 2010.', 'https://clsi.org/'),
  R('eflm-bv', 'standard', 2024, 'EFLM Biological Variation Database (Aarsand AK, et al.). Updated continuously.', 'https://biologicalvariation.eu/'),
  R('westgard-sigma-2018', 'review', 2018, 'Westgard JO, Westgard SA. Establishing evidence-based statistical quality control practices. Am J Clin Pathol. 2019;151:364–370.', pubmed('Westgard establishing evidence-based statistical quality control practices 2019')),
  R('cms-clia', 'standard', 2024, 'CMS. Clinical Laboratory Improvement Amendments (CLIA) — proficiency testing acceptance limits (final rule effective 2024).', 'https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments'),
];

export const referenceById = Object.fromEntries(references.map((r) => [r.id, r])) as Record<string, Reference>;
