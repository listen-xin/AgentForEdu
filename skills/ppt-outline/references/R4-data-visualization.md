Status: pass

## Key Findings

1. **Data-Ink Ratio Must Be Applied Differently for Projection Than for Print.** Tufte's principle — maximize the proportion of ink devoted to data, erase non-data-ink and redundant ink — gains urgency on projected slides because of lower effective resolution (1920x1080 or less), viewing distance, and limited audience processing time (seconds, not minutes). The checklist for slide charts: delete background fills and gradients, remove or push gridlines to 10% gray, kill 3D effects and shadows (they encode nothing and distort perception), strip redundant legends when direct labels work, and hide axes where data points are directly labeled. Claus Wilke's critical refinement applies: optimize, don't blindly maximize. Some non-data-ink (axis titles, units, brief annotation) is essential context — without it the visual becomes cryptic.

2. **Chart Type Selection Reduces to Five Core Questions.** The universal framework maps communication intent to visual form: (a) Comparison → Bar/Column/Dot Plot, (b) Trend → Line/Area/Column, (c) Composition (parts of a whole) → Pie/Stacked Bar/Treemap, (d) Distribution (spread of data) → Histogram/Boxplot/Violin, (e) Relationship (correlation) → Scatter/Bubble/Heatmap. Rules of thumb: pie charts only for 2-4 categories with clear proportional differences; lines for many time periods, columns for few; scatter for correlation, bubble adds a third dimension. The most common mistake is using the wrong chart type for the message — always start with the question "what do I want the audience to conclude?"

3. **Conclusion-First Titles Are the Single Highest-Leverage Slide Design Change.** Replace topic labels like "Q3 Sales Results" with full-sentence findings like "Q3 Revenue Rose 18% Driven by Customer Retention Gains." The title communicates the takeaway; the chart provides visual proof. This gives the audience a cognitive framework (cueing) before they process the data, and ensures that even if the audience remembers nothing else, they retain the message. Conclusion slides should summarize main points and suggest next steps — not generic "Thank You" or "Questions?" text.

4. **Projection-Safe Typography Has Hard Lower Bounds.** Sans-serif fonts only (Arial, Calibri, Helvetica, Roboto). Titles: 30-44pt, body: 24-28pt, footnotes: 18-20pt, never below 14pt. Drop at least 20% in size between hierarchy levels so the eye distinguishes structure instantly. Never use all caps for body text — it conceals word shapes and removes the ability to use case for emphasis. The 6x6 rule (6 words per line, 6 lines per slide) is a guideline, not a law, but violating it usually means the slide has become a document, not a visual aid.

5. **Excel Default Charts Pasted Into PowerPoint Are the #1 Source of Projection Failure.** Excel's defaults are optimized for screen editing, not projection: dark gridlines, small axis labels (often 8-10pt), colored chart backgrounds, 3D effects, legends far from data. These must be systematically stripped and rebuilt for projection: make the chart background match the slide background (so it looks native), rotate Y-axis labels to horizontal, label lines/bars directly to eliminate legends, use bold saturated colors for data series, render any retained gridlines in faint gray, and use color/arrows/callout boxes to draw the eye to the one number or trend that matters.

## Dilemma Decision Cases (≥2 required)

### Case 1: Multi-Dimensional Data Complexity vs. Projection Resolution Limit

- 困境 (Dilemma): A quarterly business review requires showing revenue by region (4 regions), by product line (6 products), and by quarter (8 quarters) — three dimensions with 192 data points. Projection resolution is 1920x1080, viewing distance is 15 meters in a large conference room. A single chart that shows all dimensions is a cluttered mess; but splitting across multiple slides loses the comparative insight (e.g., "Region A's Product 3 is declining while Region B's Product 3 is growing — both hidden if separated").

- 约束 (Constraints): (a) Projected resolution means any element smaller than ~20pt is illegible at the back of the room, (b) audience attention span for a single slide is under 10 seconds, (c) the presenter needs the audience to make cross-region, cross-product comparisons in real time, (d) the slide must be self-documenting for the distributed PDF handout later.

- 决策步骤 (Decision Steps):
  1. Audit the core message: is the primary story about region comparison, product comparison, or trend over time? In this case it is "which regions and products are driving growth vs. decline" — this is fundamentally a comparison, not a trend.
  2. Apply small-multiples principle (Tufte): instead of one massive chart, create a 2x2 grid of four small bar charts, one per region, each showing the 6 products with bars comparing Q1 to Q8 (only two time points: start vs. end). This reduces cognitive load because the same visual encoding is reused.
  3. Simplify the time dimension: collapse 8 quarters into "Q1 baseline" and "Q8 current" — the trend detail is sacrificed but the comparison story is preserved. The nuance of quarter-by-quarter fluctuation is moved to an appendix slide.
  4. Use consistent color across all four small multiples: each product gets one color that is identical in all four charts, eliminating the need for the audience to re-learn the encoding.
  5. Add a conclusion-first title that summarizes the cross-region insight: "Products 3 and 5 are growing in every region; Product 2 is declining in three of four."
  6. Verify: stand 3 meters from a 24-inch monitor displaying the slide at 50% zoom (simulating 15-meter projection). All text readable? Yes, at 22pt labels.

- 结果 (Outcome): Four clean bar charts replace one unreadable mega-chart. The presenter can walk through each region in 15 seconds, then point to the consistent pattern across all four. The audience sees the comparison story because the visual encoding (color, scale, layout) is identical across charts. The PDF handout preserves this readability. Trade-off: quarterly nuance is lost from the main slide; the presenter verbally references it and offers the appendix for detail.

- 可提取的操作 (Extractable Operation): **Small-Multiples Over Super-Charts.** When data complexity exceeds projection legibility, decompose one overloaded chart into a grid of identically-encoded small charts, each showing one slice of a dimension. Collapse the weakest dimension (usually the one with the least narrative weight) to two anchor points. This preserves cross-comparison while respecting the projection medium's limits.

### Case 2: Excel Default Chart to Projection-Ready Visual

- 困境 (Dilemma): An analyst pastes an Excel-generated stacked bar chart showing quarterly revenue composition across 5 business units. The chart, as pasted, uses Excel defaults: 10pt Calibri axis labels, dark gray gridlines, a colored plot area background, a legend at the bottom, 3D bar effects, and 5 colors that are nearly indistinguishable at projection distance (light blue, slightly lighter blue, gray-blue, etc.). The presenter projects this on a 3-meter screen in a room seating 50 people. From row 5 onward, the audience sees only colored blobs and cannot connect the legend to the bars.

- 约束 (Constraints): (a) Time: the presenter has 3 minutes before going on stage and cannot rebuild the chart from scratch, (b) the data must stay accurate and linked to the Excel source (no manual redrawing), (c) the presentation template requires a dark background with white text, but the Excel chart has a white background, (d) the audience includes senior executives who will judge credibility based on visual polish.

- 决策步骤 (Decision Steps):
  1. **Background unification (10 seconds):** Set the chart area fill to "No Fill" and plot area fill to "No Fill" so the slide's dark background shows through. The chart instantly looks native rather than pasted.
  2. **Font remediation (30 seconds):** Select all chart text elements. Increase all font sizes to minimum 18pt (axis labels, data labels) and 22pt (title). Switch to the presentation's font (e.g., Arial or the template font) so it matches the rest of the deck. Rotate vertical Y-axis labels to horizontal if possible; if too long, abbreviate or use the category name as a direct label on the largest segment.
  3. **Gridline and border removal (5 seconds):** Delete all gridlines. Delete chart border. If gridlines are genuinely needed for value lookup, set them to 15% white (on the dark background) with 0.25pt weight.
  4. **3D and effect stripping (5 seconds):** Set all series to flat (no 3D rotation, no shadow, no bevel). Set gap width between bars to 80-100% for readability.
  5. **Color palette rebuild (60 seconds):** Excel's default palette is designed for differentiation on screen, not projection contrast. Replace with a 5-color palette that: (a) has sufficient luminance contrast against the dark background, (b) is distinguishable at distance (avoid adjacent hues of similar brightness), (c) is colorblind-safe (use a ColorBrewer-derived qualitative palette such as Set1 or Dark2). Apply one color per business unit.
  6. **Legend elimination (30 seconds):** Add data labels directly to each stacked segment showing the percentage or value. Size data labels at 16-18pt. Delete the legend entirely — direct labeling eliminates the eye-travel problem between legend and bars.
  7. **Title rewrite (30 seconds):** Replace "Quarterly Revenue by Business Unit" with a conclusion-first title like "BU Alpha and Beta contribute 68% of revenue; BU Epsilon fell 12% QoQ" — the chart is the proof, the title is the message.
  8. **Verification (20 seconds):** Step back 3 meters from the laptop screen. Can you read every number? Can you distinguish all 5 colors? Can you understand the message from title alone? If not, iterate.

- 结果 (Outcome): In under 4 minutes, the chart transforms from a pasted-afterthought to a projection-native visual that communicates the insight at a glance. The dark-background match makes it look professionally designed. Direct labels on bars mean no one squints at a legend. The conclusion-first title means even back-row viewers who can see the title but not the fine detail still get the message. The Excel data link is preserved so the chart updates automatically when source data changes.

- 可提取的操作 (Extractable Operation): **The 3-Minute Excel-to-Projection Chart Rescue Protocol.** A sequenced, time-constrained checklist: (1) unify background → no fill, (2) bump all fonts to ≥18pt and match presentation font, (3) strip gridlines/borders/3D, (4) replace color palette with high-contrast, colorblind-safe qualitative palette, (5) eliminate legend via direct data labels, (6) rewrite title as a full-sentence conclusion. This protocol is designed for the presenter who discovers the problem minutes before going on stage — it is ordered by impact-to-time ratio.

## Evidence Sources

- Tufte, Edward. *The Visual Display of Quantitative Information.* Graphics Press, 1983/2001. Data-ink ratio, chartjunk, sparklines, and small-multiples principles.
- Wilke, Claus. *Fundamentals of Data Visualization.* O'Reilly Media, 2019. Refinement of Tufte: optimize data-ink ratio rather than blindly maximize; balance data and context.
- Zoho Analytics. "How to Choose the Right Chart Type for Data Visualization." (https://www.zoho.com/analytics/insightshq/choosing-the-right-data-visualization-type.html). Five-category chart selection framework: comparison, trend, composition, distribution, relationship.
- Office for National Statistics (UK). "Choosing a Chart Type." Data Visualisation Service Manual. (https://service-manual.ons.gov.uk/data-visualisation/chart-types/choosing-a-chart-type). Government data visualization standards for chart selection.
- NHSBSA Digital, Data and Technology Playbook. "Chart Types." (https://nhsbsa.github.io/nhsbsa-digital-playbook/data/data-visualisation/charts/chart-types/). Detailed chart-type-by-purpose reference with comparison/trend/composition/distribution/relationship taxonomy.
- High Point University Office of Academic Research Support. "Best Practices for Creating PowerPoint Slides." (https://www.highpoint.edu/oars/best-practices-for-creating-powerpoint-slides/). Projection-safe font sizes, sans-serif requirement, and slide design rules.
- Engineering Conferences International. "Tips for a Better Computer Generated Slide Presentation." (https://engconf.us/information/presenter-and-author-guidelines/tips-for-a-better-computer-generated-slide-presentation/). Technical projection guidelines including font sizes, color contrast, and chart simplification.
- MapleTech. "PowerPoint Tips for Better Presentations." (https://mapletech.co.uk/blog/powerpoint-tips-for-better-presentations/). Conclusion-first titles, chart redesign rules, and one-chart-per-slide discipline.
- Juniata College. "Graphical Redesign." (https://jcsites.juniata.edu/faculty/rhodes/avail/visualization/graphicalredes.html). Tufte's five-step graphical redesign process applied to practical examples.
- simplexCT. "The Data-ink Ratio." (https://www.simplexct.com/data-ink-ratio). Practical walkthrough of data-ink ratio application to bar charts with before-and-after examples.

## Supported Candidate Operations

1. **Data-Ink Ratio Audit (Checklist).** A structured checklist for evaluating every chart element on a slide: Is this element (gridline, border, background, legend, 3D effect, redundant label) encoding data or providing essential context? If neither, remove it. Apply a "weak auxiliary ink" rule — any retained non-data element (gridlines, axes) must be rendered in ≤15% opacity to recede visually while remaining available for reference. The audit also checks for the opposite failure mode: over-minimization that strips context to the point of incomprehensibility.

2. **Chart Type Selection Decision Tree (5-Question Framework).** A branching logic tool: Question 1 — What is the primary communication goal? (compare / trend / composition / distribution / relationship). Each answer maps to 2-3 chart type options with "prefer when / avoid when" rules. The decision tree includes a second-stage filter: "Is this being projected or printed?" — because the same data story may warrant different chart types for each medium (e.g., a detailed heatmap for a printed report vs. a simplified bar chart for a slide).

3. **Conclusion-First Title Writing Rule.** Every data slide title must be a complete sentence stating the insight the chart supports. The formula: [Direction of change] + [Magnitude] + [Driver or context]. Example: "Revenue grew 18% in Q3, driven entirely by the APAC region; EMEA was flat." Topic labels ("Q3 Revenue") are banned. This rule forces the slide creator to know what they want the audience to conclude before they design the visual.

4. **The 3-Minute Excel-to-Projection Chart Rescue Protocol.** A time-sequenced, impact-prioritized checklist for transforming an Excel-default chart into a projection-ready visual. The six steps (unify background, bump fonts, strip noise, recolor, eliminate legend via direct labels, rewrite title as conclusion) are ordered by diminishing impact-to-time ratio. Designed for the presenter who discovers the problem minutes before presenting — no chart rebuild required.

5. **Projection-Safe Visual Specification.** A table of hard constraints for every chart on a projected slide: minimum font size = 18pt (14pt absolute floor for references), maximum data series = 4 (beyond this, use small multiples), minimum color contrast ratio = 4.5:1 against background (WCAG AA for large text, applied to projection), no gradient or 3D encoding ever, and one chart per slide. Includes a "stand 3 meters from your monitor at 50% zoom" verification step mimicking a 15-meter projection distance.

## Rejected or Weak Candidate Operations

1. **"Always use pie charts for composition."** Rejected. Pie charts are the most misused chart type in presentations. Human perception of angles is significantly less accurate than perception of length (bar charts). Pie charts are defensible only for 2-4 categories with clearly distinguishable proportions and when the primary message is "this slice dominates the whole." For any composition scenario requiring precise comparison, a horizontal bar chart is always superior. The rule "pie charts only under strict conditions" is stronger than "always use pie charts."

2. **"Maximum data-ink ratio at all costs."** Rejected as too blunt. The search results and Wilke's refinement confirm that blindly maximizing data-ink ratio produces cryptic, context-free charts that fail in presentation settings. Some non-data-ink is essential scaffolding: axis titles tell the audience what they're looking at, a brief annotation or reference line provides the benchmark for judgment, and a chart title that merely labels the topic (rather than stating the conclusion) is sometimes necessary when the slide serves double duty as a printed handout. The operation should be "optimize data-ink ratio with a context adequacy check" rather than "maximize at all costs."

## Boundaries and Uncertainties

1. **Colorblind-safe palette vs. brand colors.** Many organizations mandate brand color palettes for presentations. These brand palettes are rarely designed for data visualization and often fail colorblind-safety checks (especially red-green pairs). The tension between brand compliance and visual accessibility is not resolved in the current research — the two requirements conflict, and no universal reconciliation rule exists. This is a boundary case needing project-specific judgment.

2. **Double-duty slides (projection + printed handout).** A slide that must function both as a projected visual and a standalone printed document faces competing constraints. Projection demands large fonts, minimal text, and conclusion-first titles. Print demands smaller fonts (to fit more detail), explanatory text, and often descriptive titles. The "conclusion-first title with small explanatory subtitle" hybrid is a partial solution but not universally tested. The appendix/backup-slide pattern (project the simplified version, distribute the detailed version) is the most robust workaround.

3. **Audience data literacy variance.** A chart that is trivially readable to a data-savvy analyst audience (e.g., a boxplot or violin plot) may be incomprehensible to a general business audience. The chart type selection decision tree assumes a "general business audience" as default but does not yet include a formal audience-literacy parameter that would gate advanced chart types (boxplot, heatmap, bubble) behind an audience-readiness check.

4. **Dynamic/animated data reveals.** The "one chart per slide" rule may be too strict when animation is used to progressively reveal data (e.g., showing a baseline bar chart, then animating in a second series for comparison). Research on the cognitive effect of animated vs. static data reveals in presentations is thin — the current recommendation is conservative (static, one chart) until stronger evidence supports animated reveals.

## Recommendations for Later Skill Compilation

1. This file should be cross-referenced with R2-narrative-structure (if it exists) for the integration of data storytelling with overall presentation narrative arc — specifically, how data slides function as "evidence beats" within a larger persuasive structure.

2. A companion visual-example appendix would be valuable: 4-6 before/after image pairs showing real Excel-default charts transformed by the Rescue Protocol, with annotations calling out each step. This is a visual skill and benefits from showing, not just telling.

3. The chart-type decision tree (Candidate Operation #2) should be implemented as an interactive flowchart or checklist tool, not just a text description — the branching logic is complex enough that a flat text version will be difficult to use during rapid slide production.

4. Consider a dedicated sub-module on "color for projection" that covers: the physics of projector color reproduction (projectors lose saturation and contrast compared to LCD screens), the difference between RGB on-screen and what a projector actually outputs, and a pre-tested palette of 8-12 colors known to be distinguishable at 15-meter projection distance under typical conference-room ambient light.

5. The boundaries around "double-duty slides" (projection + handout) deserve deeper investigation — this is one of the most common practical dilemmas cited by practitioners, and the current answers are workarounds, not principled solutions.
