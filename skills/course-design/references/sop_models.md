# SOP Models — Course Designer

> Full operation model cards for the course-designer skill. Each card follows the 8-field format: trigger, input, action, output, evidence, failure mode, boundary, confidence.

---

## H1: Three-Gate Alignment Audit

| Field | Content |
|-------|---------|
| **Trigger** | User provides or generates course objectives + assessment plan + activity plan |
| **Input** | Set of ILOs, assessment tasks, teaching/learning activities for a course/module |
| **Action** | Gate 1: ILO verb level vs Assessment verb level — flag if mismatch. Gate 2: Assessment verb level vs TLA verb level — flag if gap. Gate 3: Assessment criteria/rubric descriptors operationalize same cognitive level as ILO — flag criteria drift. Each gate output: green (aligned) / amber (partial) / red (misaligned) with remediation suggestion |
| **Output** | Traffic-light audit table + remediation suggestions per gate |
| **Evidence** | Biggs & Tang (2011). Teaching for Quality Learning; Quality Matters (2020), Specific Review Standards 2.1-2.5, 3.1-3.5 |

---

## H2: Verb Unpacking & Refinement

| Field | Content |
|-------|---------|
| **Trigger** | ILO uses non-observable verb: "understand", "know", "learn", "appreciate", "be aware of", "be familiar with" |
| **Input** | Raw ILO text containing non-observable verb |
| **Action** | Step 1: Prompt user "What would a student DO to prove they have achieved this?" Step 2: Map response to Bloom's Revised Taxonomy (cognitive process + knowledge dimension). Step 3: Suggest specific observable verb pair. Step 4: Propagate refined verb to assessment and activity design |
| **Output** | Refined ILO with observable verb + Bloom's classification + evidence type |
| **Evidence** | Anderson & Krathwohl (2001). A Taxonomy for Learning; Biggs & Tang (2011). Teaching for Quality Learning |
| **Failure Mode** | User describes activity, not evidence ("They will discuss in groups" — this is TLA, not evidence of ILO achievement) |
| **Boundary** | Knowledge dimension harder to operationalize than cognitive process; use visual reference table |

---

## H3: Activity Selection Matrix

| Field | Content |
|-------|---------|
| **Trigger** | User needs to select teaching/learning activities for given objectives |
| **Input** | Objective type (Bloom's L1-L6 / affective / skill), learner prior knowledge (novice/mid/expert), time constraint (minutes available), class size |
| **Action** | Match objective level to recommended activity formats: L1-L2 → lecture/demo with structured notes; L3 → case study, guided problem-solving; L4-L5 → discussion, project-based, peer critique; L6 → open-ended project, design task. Adjust for learner level: novices need more structure. Adjust for class size: >40 → think-pair-share, clicker questions; <40 → full discussion, role-play |
| **Output** | Recommended activity format + time estimate + scalability indicator |
| **Evidence** | Freeman et al. (2014). Active learning increases student performance. PNAS; Krathwohl (2002). Revision of Bloom's taxonomy; Merrill (2002). First principles of instruction |
| **Failure Mode** | Recommending discussion for L1-L2 content (over-engineered) or lecture for L5-L6 (under-challenging) |
| **Boundary** | Cultural context: discussion methods assume comfort with public critique; some cultures require additional scaffolding |

---

## H4: Objective Decomposition (Core + Choice)

| Field | Content |
|-------|---------|
| **Trigger** | Course has diverse learner readiness levels or fixed assessment requirements + differentiation need |
| **Input** | Full set of course objectives, assessment constraints, learner diversity profile |
| **Action** | Step 1: Split objectives into core set (all must master, 70% weight) and extension set (some may, 30% weight). Step 2: Align core set to mandatory assessment. Step 3: Design extension as optional pathways. Step 4: Design weekly convergence checkpoint for core set verification |
| **Output** | Core/Extension matrix + assessment mapping + convergence checkpoint schedule |
| **Evidence** | Tomlinson (2014). The Differentiated Classroom; Tomlinson & Moon (2013). Assessment and Student Success |
| **Failure Mode** | Core set too large (leaves no room for differentiation) or too small (undermines standards) |
| **Boundary** | Requires pre-assessment or proxy data for initial tier placement |

---

## H5: Three-Layer Feedback System

| Field | Content |
|-------|---------|
| **Trigger** | User has classes of 30+ students and needs to provide regular feedback without unsustainable workload |
| **Input** | Class size, available weekly grading time, assignment type, student grade level |
| **Action** | Layer 1 (coverage): Design rubric with 3 criteria dimensions. Students self-assess first, teacher calibrates. Layer 2 (scaling): Peer assessment with rubric — 2 peer reviewers per submission, teacher spot-checks 20%. Layer 3 (depth): Rotating deep feedback — teacher gives detailed comments to 1/4 of class each week, rotating. All layers: reserve class time for feedback reading + immediate revision |
| **Output** | Feedback system design: rubric template + peer review protocol + rotation schedule + revision time allocation |
| **Evidence** | Hattie (2012). Visible Learning for Teachers; Black & Wiliam (1998). Assessment and Classroom Learning; Nicol & Macfarlane-Dick (2006). Formative assessment and self-regulated learning |
| **Failure Mode** | Rubric too complex (>5 dimensions) → peer review unreliable; or rotation cycle too long (>5 weeks) → some students feel neglected |
| **Boundary** | Works for 15-60 student classes; >60 requires additional sampling strategies |

---

## H6: Breadth-vs-Depth Decision Rule

| Field | Content |
|-------|---------|
| **Trigger** | Course content exceeds available contact hours; user must decide what to keep vs cut |
| **Input** | Full content list with Bloom's level classification, total contact hours, student prior knowledge level |
| **Action** | Step 1: Classify each content item by Bloom's level. Step 2: Assign L1-L2 content to pre-class self-study (videos/readings). Step 3: Select bridging cases that cover multiple L3-L5 concepts. Step 4: Reduce number of cases, increase depth per case. Step 5: Replace lecture hours with structured active learning for high-leverage objectives |
| **Output** | Compressed content map: what moves to pre-class, what stays in-class, what gets cut |
| **Evidence** | Freeman et al. (2014); Biggs & Tang (2011) — both support active compression for higher-order outcomes |
| **Failure Mode** | Offloading too much to pre-class without compliance mechanism (see H7) |
| **Boundary** | Novice learners need more in-class structure; offloading works best when students have domain familiarity |

---

## H7: Flipped Classroom Compliance-First Rule

| Field | Content |
|-------|---------|
| **Trigger** | Course design includes pre-class work (videos, readings) that is required for in-class activities |
| **Input** | Pre-class material type, estimated student time commitment, learner profile, grade level |
| **Action** | Ensure three conditions: (1) Low volume — under 10 min read/watch. (2) Scaffolded — viewing guide with 3-5 structured questions. (3) Graded consequence — entry ticket quiz (5% of grade). Diagnose non-compliance type: survey students — motivation issue (don't see value) → add "need to know" framing; skill issue (can't extract key info) → improve viewing guide; time issue → reduce volume by 50%. Implement JiTT (just-in-time teaching): pre-class questions due 2h before class |
| **Output** | Pre-class design spec: material + guide + assessment + JiTT mechanism |
| **Evidence** | Novak (2011). Just-in-time teaching; Deslauriers et al. (2019) — shows compliance directly correlates with active learning outcomes |
| **Boundary** | Not for <20% of students with accessibility/disability accommodations; provide alternative synchronous prep |

---

## H8: Low-Resource UDL Implementation

| Field | Content |
|-------|---------|
| **Trigger** | User has limited/no digital devices, no budget for diverse materials, large class (40+) |
| **Input** | Available classroom resources (projector, blackboard, printed materials), class size, subject |
| **Action** | Step 1: Replace digital UDL with behavioral alternatives. Step 2: Representation — cover each concept via listen-see-do three-channel switch (teacher talk → board drawing → student gesture/drama). Step 3: Action & Expression — students demonstrate understanding via drawing, oral retelling, or role-play (any one). Step 4: Engagement — use choice board: single A4 page listing 4 practice modes; students complete 2 of 4. Step 5: During class, differentiate questioning: Bloom-tiered questions for emerging/developing/proficient students |
| **Output** | Zero-cost UDL plan: multi-modal lesson structure + choice board + tiered questioning protocol |
| **Evidence** | CAST (2018). UDL Guidelines v2.2; Tomlinson (2014). The Differentiated Classroom. All strategies adapted from evidence-based frameworks to zero-cost implementations |
| **Failure Mode** | Trying to implement all UDL checkpoints at once → teacher overwhelmed. Start with 1-2 per lesson |
| **Boundary** | No digital UDL coverage — students who need screen reader or text-to-speech will not be served by behavioral alternatives |

---

## H9: MVP-Prerequisite Decomposition

| Field | Content |
|-------|---------|
| **Trigger** | A prerequisite concept A is necessary for target concept B, but A is dry/abstract and learner disengagement is likely |
| **Input** | Prerequisite concept A, target concept B, available time, learner motivation level |
| **Action** | Step 1: Decompose A into the minimum viable subset (MVP) — the 20% of A that enables 80% of B. Step 2: Front-load a compelling "B outcome hook" — show students the end result before teaching A. Step 3: Teach only the MVP of A, using analogical encoding from the learner's lived experience. Step 4: Add low-stakes formative checks to surface confusion early. Step 5: Transition to B as soon as MVP is demonstrated, deferring deeper aspects of A to spiral revisits within B contexts. |
| **Output** | MVP prerequisite design: what to teach first, what to defer, outcome hook to front-load |
| **Evidence** | Sweller (1988). Cognitive Load Theory; Renkl (2014). Toward an instructionally oriented theory of example-based learning |
| **Failure Mode** | MVP underestimated (leads to failure on B); outcome hook feels disconnected from A |
| **Boundary** | Requires instructor domain expertise to identify the true 20%; novice instructors may misestimate |

---

## H10: Threshold-Crossing Parallel Track

| Field | Content |
|-------|---------|
| **Trigger** | A known threshold concept is predicted to cause >20% stuck rate (liminality), and coverage pressure exists |
| **Input** | Threshold concept identification, predicted stuck rate, available remediation time |
| **Action** | Step 1: Pre-design a short diagnostic (2-3 concept inventory items) to be deployed at the end of the first threshold lesson. Step 2: Design a parallel track for the next 1-2 sessions: (a) students who crossed the threshold engage in an enriched application task; (b) liminal students receive a targeted intervention using a different representation (visual/analogical/spatial instead of formal/symbolic). Step 3: Re-converge via peer instruction (think-pair-share) where passed students explain to liminal students — this consolidates both. Step 4: Compress non-threshold content in the parallel track via pre-reading or flipped materials. |
| **Output** | Parallel track design: diagnostic + two intervention paths + convergence activity + compressed coverage plan |
| **Evidence** | Meyer & Land (2003). Threshold concepts and troublesome knowledge; Hattie (2012). Visible Learning |
| **Failure Mode** | Diagnostic items unreliable → misidentified liminal students; alternative representation still opaque |
| **Boundary** | Validated concept inventories unavailable for many domains; ad-hoc diagnostics risk false positives/negatives |

---

## H11: Core+Extension Layered Task

| Field | Content |
|-------|---------|
| **Trigger** | Course has unavoidable mixed prior knowledge (e.g., CS majors + non-majors, or social science + natural science students in the same class) |
| **Input** | Learning activity, expected prior knowledge distribution, class size |
| **Action** | Step 1: Design every major activity as a "core + extension" pair. Core = mandatory, scaffolded (worked examples, step-by-step instructions, clear success criteria). Extension = optional, open-ended (design your own problem, critique an approach, explore edge cases). Step 2: Provide parallel resource tracks for the same task: "quick-start guide" for advanced learners (skips exposition) vs "detailed walkthrough" for novices (embedded worked examples). Step 3: Deploy a confidence entry ticket at the start of each module: "Rate your confidence on prerequisites 1-5" → directs learners to different entry points without singling anyone out publicly. Step 4: Strategically mix ability groups for consolidation tasks (peer teaching benefits both) but separate for initial instruction. |
| **Output** | Layered task design: core + extension pairs + parallel resource tracks + self-assessment entry ticket protocol |
| **Evidence** | Kalyuga (2007). Expertise reversal effect; Bruner (1960). The Process of Education |
| **Failure Mode** | Dunning-Kruger effect → novices skip scaffolded core and choose extension prematurely |
| **Boundary** | Requires optional constraints to prevent premature extension access; core completion gating is a mitigation |

---

## H12: Worked-Example Fading Sequence

| Field | Content |
|-------|---------|
| **Trigger** | Teaching procedural skills to novices in a domain with high element interactivity |
| **Input** | Procedural skill, target learner level (novice), available practice time |
| **Action** | Step 1: Present a complete worked example — fully solved problem with all steps annotated. Step 2: Present a partially completed example (completion problem) — students fill in the final steps. Step 3: Present a faded example — only sub-goals are provided, students determine the method. Step 4: Present a conventional problem — students solve independently. Step 5: Optional: fade back to full problem if performance on Step 4 is poor. |
| **Output** | Faded worked-example sequence: 4-step progression with time allocation per step |
| **Evidence** | Sweller (1988). Cognitive load during problem solving; Renkl (2014). Example-based learning; Alfieri et al. (2011). Does discovery-based instruction enhance learning? |
| **Failure Mode** | Fading too fast → cognitive overload; fading too slow → boredom (expertise reversal) |
| **Boundary** | Optimal for procedural skills; less validated for conceptual understanding or attitudinal change; STEM-dominated evidence base |

---

## H13: Just-in-Time Diagnostic Branching

| Field | Content |
|-------|---------|
| **Trigger** | Cumulative knowledge is essential for the next topic, and the instructor cannot rely on self-reported understanding |
| **Input** | Current topic, next topic's prerequisites, available class time |
| **Action** | Step 1: Identify natural breakpoints in the sequence where cumulative knowledge is tested before new material is introduced. Step 2: Insert a 2-3 item concept diagnostic at each breakpoint. Step 3: Based on aggregate results, branch the next activity: if >80% correct → accelerate to application; if 50-80% → provide targeted worked examples on the gaps; if <50% → reteach with an alternative representation. Step 4: Record diagnostic results per student to inform future differentiation decisions. |
| **Output** | Diagnostic-branching plan: breakpoint locations + diagnostic items + three branch paths with decision criteria |
| **Evidence** | Hattie (2012). Visible Learning for Teachers; Black & Wiliam (1998). Assessment and Classroom Learning |
| **Failure Mode** | Diagnostic items poorly designed → misguide branching; students game the diagnostic |
| **Boundary** | Requires time investment to design good diagnostic items; most effective when diagnostic results feed into H10/H11 |
