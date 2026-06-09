# SOP Models — PPT Architect

> Full operation model cards. Each card: Trigger / Input / Action / Output / Evidence / Failure Mode / Boundary.

---

## H1: Audience-Scenario Profiler

| Field | Content |
|-------|---------|
| **Trigger** | User provides presentation topic but hasn't specified audience type or scenario |
| **Input** | Original content/topic, any audience hints from user |
| **Action** | Classify scenario into one of: C-suite reporting / Academic defense / Product pitch / Internal weekly / External keynote. For each: derive expected slide count range, information density preference, tone register (formal/neutral/persuasive), and decision-maker presence |
| **Output** | Scenario profile: type + page range + density + tone + key audience expectations |
| **Evidence** | McKinsey communication practices; Presentation Zen (Reynolds, 2008); TED speaker guidelines |
| **Failure Mode** | Defaulting to "generic business presentation" without probing scenario specifics |
| **Boundary** | Cross-cultural audience expectations vary; default mappings are Western-business biased |

---

## H2: Narrative Structure Selector

| Field | Content |
|-------|---------|
| **Trigger** | H1 profile is established; user needs to decide how to structure the narrative |
| **Input** | Scenario profile from H1 + content type (proposal/report/keynote/update) |
| **Action** | Run Three-Question Decision Tree: Q1: Is the primary decision-maker in the room? Q2: Does the audience need to be convinced of a problem before hearing the solution? Q3: Does this presentation ask for a transformative shift in perspective? Output: SCQA (Q1=N+Q2=Y), Pyramid (Q1=Y+Q2=N), Sparkline (Q3=Y). Apply ordering variants: SCQA can be S-C-Q-A (standard), C-S-Q-A (urgency-first), Q-S-C-A (curiosity-first) |
| **Output** | Selected narrative structure + recommended ordering variant + skeleton outline |
| **Evidence** | Minto (Pyramid Principle); Duarte (Resonate, Sparkline); McKinsey SCQA framework |
| **Failure Mode** | Using SCQA for a weekly status update (over-engineered); using Pyramid for a vision keynote (under-emotional) |
| **Boundary** | Three structures cover ~90% of business/academic scenarios; highly creative or ritual presentations may need hybrid |

---

## H3: Assertion Extractor

| Field | Content |
|-------|---------|
| **Trigger** | User provides raw content (text/document/outline) to convert into slide deck |
| **Input** | Raw content blocks (paragraphs, sections, bullet lists) |
| **Action** | For each content block: Step 1: Identify the single most important claim the audience should remember. Step 2: Reformulate as a complete declarative sentence (subject + verb + claim). Step 3: The assertion becomes the slide title. Step 4: Supporting evidence becomes the slide body. Step 5: Check — if slide title is a noun phrase (e.g., "Q3 Revenue"), rephrase as claim: "Q3 Revenue Grew 15%, Driven by North America" |
| **Output** | Per-slide: assertion title + supporting evidence points |
| **Evidence** | Atkinson's "Beyond Bullet Points"; Tufte's "The Cognitive Style of PowerPoint"; Harvard Business Review on presentation structure |
| **Failure Mode** | Producing topic labels instead of assertions ("Market Analysis" vs "Our Market Share Has Shifted From Enterprise to Mid-Market") |
| **Boundary** | Requires enough source content to extract assertions; extremely short briefs may need the user to supply claims |

---

## H4: Slide Decomposer

| Field | Content |
|-------|---------|
| **Trigger** | H3 assertions have been extracted; now content needs to be distributed across slides |
| **Input** | List of assertions with supporting evidence |
| **Action** | Step 1: Each assertion maps to one slide (core). Step 2: If an assertion requires >3 supporting points, split into sub-slides. Step 3: Determine visual carrier per slide: text (single claim/quote), chart (quantitative data), diagram (process/relationship), image (emotional anchor), or mixed. Step 4: Insert breathing slides (section dividers / blank / single-image) between major sections — roughly every 5-7 content slides. Step 5: Apply 5-5-5 and 1-6-6 rules as optional density lenses |
| **Output** | Slide sequence: slide number + type (content/divider/hook/CTA) + assertion title + visual carrier + evidence count |
| **Evidence** | SlideModel best practices; Reynolds' Presentation Zen; Kawasaki 10/20/30; Cognitive Load Theory (Sweller) |
| **Failure Mode** | Over-splitting (15 slides for 5 assertions → fragmentation); under-splitting (cramming multiple assertions into one slide) |
| **Boundary** | Does not specify exact visual design of each slide; only recommends carrier type and layout pattern |

---

## H5: Density Gate Check

| Field | Content |
|-------|---------|
| **Trigger** | A slide draft exists and needs density validation |
| **Input** | Slide draft: title + body text + visual elements count |
| **Action** | Run three checks: (1) Text count — body text on any slide must be ≤40 words (Chinese: ≤60 characters), excluding assertion title. (2) Font floor — no text below 18pt for projection (14pt for print). (3) Information unit count — each slide must have ≤3 distinct information units (a chart counts as 1, a bullet point counts as 1, a photo counts as 1). (4) 3-Second Test: can a viewer locate the core message within 3 seconds of the slide appearing? |
| **Output** | Per-slide: pass/warning/fail for each check + specific remediation |
| **Evidence** | Miller's Law (7±2 → simplified to 3 for projection); Mayer's Multimedia Learning principles; Kawasaki 30pt rule |
| **Failure Mode** | False negatives on slides designed as handouts (different density standards apply); too strict for academic slides |
| **Boundary** | Rules calibrated for projection; printed handouts intentionally have higher acceptable density |

---

## H6: Visual Hierarchy Builder

| Field | Content |
|-------|---------|
| **Trigger** | User needs actionable visual guidance but has no design background |
| **Input** | Slide type (title/section/content/data/CTA), content volume, brand constraints (if any) |
| **Action** | Step 1: Set 3-level typographic hierarchy: Title (24-44pt, bold) / Subtitle (18-28pt, medium) / Body (14-18pt, regular). Golden ratio (1:1.618) between adjacent levels. Step 2: Allocate 60-30-10 color proportions: 60% neutral background, 30% primary brand or dark tone for text, 10% accent for the single most important element per slide. Step 3: Content area ≤65% of slide surface; margins ≥0.75 inch. Step 4: Left-align all text as default; center only section titles. Step 5: Ensure text-background contrast ratio ≥4.5:1 |
| **Output** | Visual hierarchy spec: font sizes + color roles + alignment rules + spacing numbers |
| **Evidence** | Williams' "The Non-Designer's Design Book" (CRAP principles); Bringhurst's typographic scale; WCAG 2.1 contrast requirements |
| **Failure Mode** | Over-specifying (giving pixel-level instructions that feel like a straitjacket); alignment chaos from mixing left/center/right |
| **Boundary** | Typographic sizes calibrated for 16:9 projection at typical conference room distances; auditoriums may need larger |

---

## H7: Color Role Allocator

| Field | Content |
|-------|---------|
| **Trigger** | User has brand color constraints OR needs a color scheme recommendation |
| **Input** | Brand colors (if any), presentation context (formal/casual), projection environment |
| **Action** | Step 1: Classify each color by role — background (neutral, 60%), primary (dark for text/headings, 30%), accent (bright/warm for emphasis, ≤10% area). Step 2: If brand color is unreadable on projection (e.g., light yellow text on white), offer a "media-specific variant" — use brand color as accent with a readable dark variant for text. Step 3: Run contrast audit: text-on-background must be ≥4.5:1; chart elements must be distinguishable in grayscale |
| **Output** | Color role assignment: each color → function + usage constraint + contrast check |
| **Evidence** | Itten's color theory; WCAG 2.1; Few's "Show Me the Numbers" (chart color guidance) |
| **Failure Mode** | Creating a "circus palette" (5+ equally-weighted colors); using brand color literally without considering readability |
| **Boundary** | Brand override: corporate identity guidelines may legally restrict color modifications — flag but do not countermand |

---

## H8: Data Visualization Selector

| Field | Content |
|-------|---------|
| **Trigger** | A slide contains quantitative data that needs to be visualized |
| **Input** | Dataset characteristics (dimensions, types), the question the data answers |
| **Action** | Step 1: Classify the data question: Comparison (between categories) → bar chart. Trend (over time) → line chart. Composition (parts of a whole) → stacked bar or treemap (avoid pie for >3 segments). Distribution (spread of values) → histogram or box plot. Relationship (correlation) → scatter plot. Step 2: Apply projection-safe design: data label ≥14pt, line weight ≥2pt, remove gridlines, maximize data-ink ratio. Step 3: Replace the chart title with a conclusion sentence. Step 4: If source chart is from Excel: apply 6-step Rescue Protocol (remove gridlines → enlarge labels → recolor → remove legend if redundant → add conclusion title → check contrast) |
| **Output** | Chart recommendation: type + design spec + conclusion title + projection safety check |
| **Evidence** | Tufte's "The Visual Display of Quantitative Information"; Few's "Show Me the Numbers"; Cleveland's graphical perception research |
| **Failure Mode** | Recommending pie charts for >3 categories; default Excel styling (tiny labels, heavy gridlines) |
| **Boundary** | Chart types assume standard business/academic data; specialized scientific visualizations (heatmaps, network graphs, 3D plots) have additional constraints |

---

## H9: Time-Benchmarked Structure

| Field | Content |
|-------|---------|
| **Trigger** | User has a slide sequence and a total time constraint |
| **Input** | Slide count + total target duration + presentation type |
| **Action** | Step 1: Run 10/20/30 Gate (Kawasaki): flag if >10 slides for a 20-min pitch or if min font <30pt. Step 2: Assign slide timing brackets: Hook/opening slide: 8-12% of total time, Core content slides: vary by type (key argument: 2-3 min, supporting: 1-1.5 min, transition: 15-30s), CTA/close: 8-12% of total. Step 3: Sum and check against total. Step 4: If over budget, apply Onion Trim: outer layer (nice-to-have examples) → middle layer (secondary evidence) → inner layer (core argument — never cut). Step 5: Build in Two-Ending Safety Net: a full ending at 85% of allotted time, a compressed ending at 100% |
| **Output** | Slide-by-slide time allocation + total budget check + trim priority list + dual-ending markers |
| **Evidence** | Kawasaki 10/20/30; Duarte's Resonate (rhythm); TED 18-minute constraint research |
| **Failure Mode** | Assigning equal time to all slides; planning to speed up rather than cut content |
| **Boundary** | Time brackets are guidelines not formulas; actual rhythm depends on audience interaction, Q&A, and live dynamics |

---

## H10: Rhythm Pattern Selector

| Field | Content |
|-------|---------|
| **Trigger** | Slide sequence is defined; need to prevent audience attention fatigue |
| **Input** | Total duration, slide sequence, audience type |
| **Action** | Step 1: Identify "attention anchors" — a format switch every ~10 minutes. Options: data slide → story/anecdote, lecture slide → audience question/poll, text-heavy slide → full-bleed image, abstract concept → concrete demo. Step 2: If using Duarte Sparkline pattern, map the "what is" (current state) and "what could be" (future vision) oscillation points across the timeline. Step 3: Ensure at least one "surprise" element (counterintuitive data point, unexpected analogy, honest admission) in the first 3 minutes |
| **Output** | Rhythm map: slide numbers + format switch indicators + Sparkline oscillation points |
| **Evidence** | Duarte's Resonate (Sparkline); Medina's "Brain Rules" (10-minute attention span); AhaSlides 2024 survey (88% report attention decline) |
| **Failure Mode** | Format switches that feel random rather than motivated by content; "interaction for interaction's sake" |
| **Boundary** | 10-minute rule is a heuristic; highly engaging speakers can sustain attention longer; dense technical content may require more frequent anchors |

---

## H11: Anti-Pattern Scanner

| Field | Content |
|-------|---------|
| **Trigger** | Complete slide deck exists (draft or final); user wants quality check |
| **Input** | All slides (titles + body text + visual descriptions + intended projection environment) |
| **Action** | Run full 20-item anti-pattern checklist. Each pattern is classified as FATAL (audience cannot understand) or WARNING (degraded experience): FATAL: bullet overload (>5 per slide), reading slides aloud, text-as-document (>60 words), font <18pt, low contrast (<3:1), distorted Y-axis. WARNING: excessive animation, inconsistent design, no signalling cues, no interaction plan, chart junk, "Thank You" close in persuasive presentation, clip art, citation formatting, animation inconsistency, no summary, ignoring accessibility, too many slides (>1/min), gratuitous decoration. For each hit: mark slide number + pattern name + severity level + concrete fix |
| **Output** | Anti-pattern report: summary count + fatal list (must fix) + warning list (should fix) + per-slide remediation |
| **Evidence** | NASA Columbia report (PowerPoint's role in information burial); Mayer's Multimedia Learning; UK medical lecture study 2025 (84.4% CTML violations) |
| **Failure Mode** | Flagging academic slides as "too dense" when high density is intentional and appropriate for that genre |
| **Boundary** | Anti-pattern thresholds are genre-sensitive (academic defense slides legitimately contain more detail than TED-style slides) |

---

## H12: Close-Strategy Selector

| Field | Content |
|-------|---------|
| **Trigger** | Deck is near complete; need to determine final slide(s) strategy |
| **Input** | Presentation type (persuasive/informative/ceremonial), audience decision authority, presentation context |
| **Action** | Run 3D Decision Tree: Dimension 1 (Type): Persuasive → CTA required / Informative → Summary or Next Steps / Ceremonial → Thank You is acceptable. Dimension 2 (Authority): If decision-maker is in the room → explicit CTA with specific request. If not → softer "next step" framing. Dimension 3 (State): If audience is ready to decide → action-oriented CTA. If still evaluating → information-access CTA. For CTA slides: single ask, visible next action, no more than 2 sentences |
| **Output** | Final slide strategy: type (CTA/Summary/Thanks/Next Steps) + specific content + rationale |
| **Evidence** | A/B testing data on CTA vs "Thank You" (~27% conversion improvement); Carnegie's public speaking principles; Harvard Business Review on persuasive closings |
| **Failure Mode** | Defaulting to "Thank You" for all presentations; CTA that is too vague ("Let's work together" without specifying how) |
| **Boundary** | CTA may be inappropriate for purely educational or scientific presentations where the goal is understanding, not action |
