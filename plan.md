# **LABVERSE — OPTIMIZED MASTER PROMPT FOR APP GENERATION**
A precision-crafted, domain-specific master prompt for generating a **mobile-first, offline-capable, dark-mode clinical education app** that teaches *all of LabVerse* with zero conceptual drift.

---

# **MASTER PROMPT — LabVerse Educational App Generator (SPECIALIZED VERSION)**

## **Role & Mission**
You are a cross-functional product team (PM + Staff Engineer + Senior Instructional Designer + Clinical Pathology Expert + Internal Medicine Expert + UX Writer + QA).  
Your mission is to design and optionally scaffold an **interactive, responsive educational web app** that teaches:

**LabVerse: The Clinical Chemistry Systems Map**  
—An integrated framework linking lab panels (electrolytes, LFTs, renal markers, acid–base, endocrine studies, metabolic panels) to organ physiology and pathophysiology.

The app must support:
- **All learner levels:** medical school → residency → fellowship → attending/clinical pathology  
- **All contexts:** exam prep, bedside reasoning, and research/quality-improvement interpretation  
- **All components of lab science:** pre-analytic, analytic, post-analytic concepts; physiology; disorders; dynamic interpretation

Your output must be **scientifically consistent, logically coherent**, and never introduce contradictory logic between modules.

---

## **Inputs (Fill These)**
- **Primary Topic(s):**  
  Always centered on **LabVerse**:  
  - interconnected lab panels  
  - organ-based physiology  
  - biochemical pathways  
  - acid–base systems  
  - endocrine axes  
  - renal handling principles  
  - metabolic panels  
  - clinical chemistry analyzers & error sources  
- **Target Learner Levels:** {{LEVELS}}  
  - e.g., “MS2–MS4; IM residents; clinical pathology residents; endocrine fellows; pathology attendings”
- **Learner Context:** {{CONTEXT}}  
  - e.g., “Exam prep; bedside interpretation; clinical decision-making; QI/Research labs”
- **Learning Outcomes (SMART + Bloom):** {{LEARNING_OBJECTIVES}}  
  - e.g., “Interpret integrated panels; diagnose system-level derangements; trace biochemical pathways; identify pre-analytic/analytic/post-analytic error”
- **Constraints/Preferences:**  
  **Always include:**  
  - *Mobile-first; dark mode; no login; offline-ready; coherent logic across physiology + pathology*  
  (You may add more: printables, accessibility, etc.)
- **References/Standards:** {{REFERENCES}}  
  - e.g., “Tietz Clinical Chemistry; Harrison’s; UpToDate-style; CLSI standards; KDIGO; AACE”
- **Brand/Voice:** {{VOICE_TONE}}  
  - e.g., “Plain-language but rigorous; visuals-first; clinically serious but friendly”
- **Regionalization/Localization Needs:** {{LOCALE}}

---

# **Required Deliverables (Produce All)**

## **1. Executive Summary**
- Problem: learners struggle to see cross-panel relationships.  
- Explain the purpose of **LabVerse** as a systems map for lab interpretation.  
- Provide 2–3 name options + crisp value proposition.

---

## **2. Learner Personas & Use Cases**
- Medical student (needs foundations of physiology + labs)  
- Resident (needs pattern recognition + decision-making)  
- Clinical pathologist/attending (needs analyzer-level nuance, QC, error analysis)  
- Use cases: exam practice, bedside differential building, integrated panel interpretation, quality-improvement investigations.

---

## **3. Curriculum Map & Knowledge Graph**
**Everything must connect to clinical chemistry + physiology. No unrelated domains.**

Include:
- **Prerequisites:** membrane transport, nephron physiology, hepatic pathways, endocrine axes, buffer systems  
- **Modules:**  
  Electrolytes → Acid–Base → Renal → Hepatic → Endocrine → Metabolic → Integrated Systems → Lab Errors/Analyzer Science  
- For each module: micro-concepts, Bloom level, prerequisite chain.

---

## **4. Interactives (LabVerse-Specific)**  
All interactives must be **physiology-based**, not statistical.

Examples:
- **Electrolyte Dynamics Playground**  
  - Adjust Na, K, Cl, HCO₃, albumin; observe effects on anion gap, osmolarity, ECF volume.
- **Acid–Base Simulator**  
  - Respiratory vs metabolic processes; compensation formulas; Stewart model optional mode.
- **Renal Handling Model**  
  - Sliders: GFR, RPF, aldosterone, ADH; see serum/urine effects.
- **Hepatic Pattern Explorer**  
  - ALT/AST ratio changes; cholestatic vs hepatocellular patterns.
- **Endocrine Axes Animation**  
  - HPA/HPT/HPO axis regulation; effect of negative feedback.
- **Analyzer & Error Explorer**  
  - Pre-analytic (hemolysis, dilution), analytic (interference), post-analytic (reporting).

For **each interactive**, specify:
- purpose  
- inputs  
- outputs  
- visual metaphors  
- “aha” moments  
- preset cases  
- safety guardrails (no physiologic impossibilities)

---

## **5. Assessment & Mastery**
Item types:
- Lab-based MCQs  
- Pattern recognition cases  
- Drag-and-drop pathway mapping  
- Interpretation from full panel sets  
- Free-text reasoning

Create **10–20 items** with rationales.

---

## **6. Clinical Reasoning Framework**
Explain:
- How to move from labs → organ system hypotheses → mechanism → differential → management implications.  
- Include “must-not-miss” conditions (acute liver failure, DKA, HHS, adrenal crisis).  
- Include common pitfalls (spurious hyperK, dilutional hyponatremia, factitious hypoCa).

---

## **7. Accessibility & Safety**
- WCAG 2.2 AA  
- De-identified data only  
- Disclaimers against clinical decision-making  
- Checks for physiologic plausibility (avoid contradicting acid–base/renal rules)

---

## **8. Tech Architecture (Mobile-First, Offline)**
- React/TypeScript  
- Tailwind + shadcn/ui  
- Service Worker + IndexedDB for offline  
- State management: Zustand/Redux  
- Data models for modules, panels, pathways, cases  
- Error boundaries and logic-consistency tests

---

## **9. Data Schemas (JSON)**
For:
- lessons  
- interactives  
- case libraries  
- lab values with units and reference ranges  
- error types  
- glossary

---

## **10. Screen Specs & Wireframes**
Screens:
- Home  
- Module Overview  
- Lesson  
- Interactive Simulator  
- Case Engine  
- Assessment  
- Progress Dashboard  
- Glossary  
- Settings (theme, accessibility)

Provide text-based wireframes.

---

## **11. Copy & Content Kit**
- Microcopy: tooltips, hints, guidance  
- Glossary: physiology terms, analytes, pathways  
- Two lessons + one case fully written out end-to-end

---

## **12. Analytics & A/B Plan**
- Only include **UI-level** A/B tests (e.g., slider vs tap controls)  
- **Never include** statistical hypothesis-testing concepts unrelated to clinical chemistry.

---

## **13. QA Checklist**
- Physiology consistency checks  
- Reference range sanity checks  
- Unit coherence  
- Cross-panel logic alignment  
- No conflicting interpretations across modules

---

## **14. Roadmap**
- Prototype → Pilot → Content Expansion → Personalization  
- Milestones, risks, acceptance criteria

---

# **Style & Rigor Requirements**
- Prioritize **accuracy, logical consistency, and physiology-first reasoning**.  
- Avoid all unrelated topics (statistics, non-clinical domains, irrelevant diseases).  
- Use reference ranges + units explicitly.  
- Always state assumptions.

---

# **Acceptance Criteria**
- Learner can interpret integrated lab panels correctly.  
- App logic reflects real physiology without contradiction.  
- All module outputs reinforce the **LabVerse systems map**.

---

# **Now Generate**
Using the inputs above, generate the complete deliverables in the required order.  
If any input is missing, make medically sound assumptions and label them as defaults.
