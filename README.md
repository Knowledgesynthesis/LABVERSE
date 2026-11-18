# LabVerse — Clinical Chemistry, Connected

An interactive, evidence-based course that teaches clinical chemistry as one connected system — for medical students, residents, fellows and laboratory professionals. Works offline, needs no account, and stores progress only in the browser.

## What's inside

| | |
|---|---|
| **9 modules, 28 lessons** | Water/sodium/potassium · acid–base · kidney · liver · endocrine · calcium/phosphate/magnesium · cardiac & metabolic biomarkers · integrated panels & emergencies · laboratory error & quality |
| **137 questions** | 71 board-style questions (MCQ and numeric), most embedded in lessons as retrieval checks, plus 66 case steps. Options are shuffled on every attempt. |
| **18 stepwise cases** | One decision at a time with immediate feedback, saved scores, SI/conventional unit toggle — including spurious results that must *not* be treated |
| **9 simulators** | Acid–base map · osmolality & anion gap · sodium correction planner · kidney function (CKD-EPI 2021, cystatin C, KDIGO heat map, FENa/FEUrea) · AKI creatinine kinetics · liver pattern explorer (R ratio, Hy's law, FIB-4, MELD 3.0, Child–Pugh) · endocrine axes · specimen integrity (pre-analytic artifacts, mystery mode) · QC/Westgard trainer (Sigma, RCV) |
| **Spaced review** | Leitner scheduling (missed → now; correct → 1, 3, 7, 16, 35 days), weak-spot drills, mixed 20-question exams, per-module mastery |
| **Systems map, glossary, search** | 24 analytes and 39 mechanistic links; 90-term glossary; Ctrl/⌘-K search across everything |
| **Evidence library** | 87 sources (guidelines, consensus statements, trials, CLSI/EFLM standards), each linked to the lessons and cases that use it |

## Evidence standard

Content was reviewed against current guidance in November 2026, including KDIGO 2024 CKD (race-free CKD-EPI 2021), the 2024 ADA/EASD/JBDS/AACE/DTS hyperglycemic-crises consensus, the 2025 Endocrine Society primary-aldosteronism guideline, assay-specific cortisol cut-offs, MELD 3.0 (OPTN), ESC 2023 ACS 0 h/1 h algorithms, the ESC/EAS 2025 Lp(a) update, ACG 2024 pancreatitis, ASPEN 2020 refeeding, UKKA hyperkalaemia guidance, and the 2025 meta-analysis on hyponatremia correction rates. Where guidance is in flux (e.g., the KDIGO 2026 AKI/AKD draft), lessons say so.

Every case's lab panel is machine-checked for internal consistency (Henderson–Hasselbalch, anion gap, osmolality), and every simulator is driven by the same tested calculation library.

## Development

```bash
npm ci
npm run dev        # http://localhost:5173
npm run check      # type-check + lint + tests
npm run build      # production build with service worker (dist/)
npm run preview
```

Requires Node 20+.

### Project layout

```
src/
  content/            curriculum as data
    modules/*.ts      lessons, questions and cases per module
    references.ts     evidence library
    glossary.ts, systemsMap.ts, modules.ts
    content.test.ts   integrity + physiology-consistency tests
  lib/clinical/       pure, unit-tested calculations (acid–base, sodium, eGFR,
                      creatinine kinetics, liver scores, QC rules, specimen artifacts)
  interactives/       the nine simulators (lazy-loaded)
  screens/            pages
  components/         UI, lesson block renderer, question card, layout
  store/              persisted progress + spaced repetition (zustand)
```

### Authoring content

Lessons are arrays of blocks built with helpers in `src/content/dsl.ts`:

```ts
blocks: [
  h('Section heading'),
  p('Text with **bold** and *italic*.'),
  formula('AG = Na⁺ − (Cl⁻ + HCO₃⁻)', ['where…'], 'note'),
  pearl('…'), pitfall('…'), danger('…'), evidence('…'),
  check('question-id'),          // embeds a question from the module bank
  lab('acid-base-simulator', '…'),
]
```

Every lesson needs objectives, takeaways, at least one `check` and at least one reference; `npm test` enforces this along with cross-reference resolution, answer-key validity and case-panel arithmetic.

## Deployment

Deployed on Vercel from `main` (static Vite build; `vercel.json` rewrites all routes to `index.html` for client-side routing). The service worker precaches the app for offline use and updates automatically.

---

LabVerse is a learning resource. Verify management against local protocols and your laboratory's reference intervals.
