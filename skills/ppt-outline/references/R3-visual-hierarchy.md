Status: pass

## Key Findings

### KF1: Three-Level Typographic Hierarchy with Golden Ratio Scaling
Every slide needs exactly three visual levels (Primary / Secondary / Tertiary) for instant comprehension. The size ratio between adjacent levels should approximate the golden ratio (1:1.618). Concrete numbers for on-screen presentation: Title 36-44pt, Subheading 24-28pt, Body 18-24pt. The absolute floor for body text is 18pt -- anything smaller fails the "back row test" and should be moved to a handout. Using a single font family with weight variation (Regular/Medium/Bold) is more foolproof for non-designers than pairing two different fonts. Maximum 2 font families per deck.

### KF2: 60-30-10 Color Function Allocation (Base / Main / Accent)
Academic research (Nonomura, Hochin & Nomiya, IEEE) and industry practice converge on a three-role color model. Base color (background) occupies 60-70% of visual area and should have high lightness with low saturation -- white, cream, or very light gray. Main color (headings, borders, structural elements) occupies 20-30% and should provide strong contrast against the background (lightness difference >= 125 from white). Accent color (~10%) is the spotlight -- used exclusively for the single most important element per slide (key metric, call-to-action, critical takeaway). The "greyscale everything + one accent color" technique is a high-leverage tactic that eliminates color clashes and guarantees the accent is unmistakable.

### KF3: 65% Content-to-Whitespace Ratio is the Sweet Spot
Content occupying roughly 60-70% of slide area yields slides that feel professional and intentional. Below 80% content density, slides feel comfortable; above 90%, they feel oppressive and cause audiences to rush or disengage. Practical guardrails: minimum 0.75-inch margins on all sides, line spacing at 1.2-1.5x font size, the 6x6 rule (max 6 bullets per slide, max 6 words per bullet), and one idea per slide. Whitespace operates at two levels -- macro (margins, space around hero elements) for structure, and micro (letter-spacing, line height, paragraph gaps) for legibility. The Proximity Rule (Gestalt) demands a 2:1 or 3:1 ratio of space-before-heading to space-after-heading -- a heading must be closer to the content it introduces than to the content above it.

### KF4: Contrast Ratios Are Non-Negotiable for Projection
The Web Content Accessibility Guidelines (WCAG) minimum of 4.5:1 contrast ratio between text and background applies with even greater force to projected slides, because projector brightness and ambient light degrade perceived contrast significantly. Pure black (#000000) text should be replaced with very dark gray (e.g., #1A1A1A or #222222) -- it is easier on the eyes while maintaining sufficient contrast. Light gray text on white backgrounds is a common failure mode: what looks elegant on a laptop screen becomes invisible on a projector. The "test on actual equipment" rule is mandatory, not optional. Avoid italics entirely on slides (hard to read at distance), avoid all-caps for body text (slows scanning), and never use red+green or blue+purple adjacent color combinations (colorblind-unfriendly).

### KF5: Signal-to-Noise Ratio as the Master Principle
Whitespace is not empty space -- it is an active design element that reduces cognitive load by isolating the signal (core message) from noise (decorative elements, redundant logos, excessive text). Every element on a slide that does not directly serve comprehension is noise and should be removed. The squint test is the best self-diagnostic: blur your eyes or step back; if you cannot count the distinct focal points and heading levels, you need more whitespace and fewer elements. The Rule of Thirds (divide slide into 3x3 grid, place key elements at intersections) naturally creates asymmetrical whitespace that guides the eye more dynamically than center-alignment. A spacing scale using consistent increments (8px, 16px, 24px, 32px) makes spacing feel intentional rather than random.

## Dilemma Decision Cases (≥2 required)

### Case 1: Beautiful Template vs. Information Density -- The Aesthetic-Completeness Tradeoff
- 困境 (Dilemma): A stakeholder selects a visually stunning template with a large hero image, generous whitespace, and sparse text zones. The content owner, however, has 8 dense bullet points with sub-explanations, a data table, and a footnote that "must all go on one slide" because the deck is already at the maximum slide count imposed by the meeting format (e.g., a 10-slide pitch deck limit). The template can accommodate at most 3 short bullet points before the text starts overlapping the hero image or shrinking below 18pt. The presenter is caught between: (A) using the beautiful template and cutting 70% of the content, or (B) abandoning the template and fitting everything in. Both paths have real costs.

- 约束 (Constraints):
  1. Hard slide count limit (10 slides total)
  2. Content owner insists all 8 points are critical
  3. Stakeholder (e.g., VP of Marketing) insists on the premium template
  4. Presentation is in a large room -- body text below 18pt will be illegible
  5. Deadline is in 4 hours -- no time to redesign the template

- 决策步骤 (Decision Steps):
  1. **Apply the "One Idea Per Slide" filter first**: Ask the content owner: "If the audience remembers only ONE thing from this slide, what is it?" This forces prioritization. Mark that one point as the primary message.
  2. **Sort remaining points by dependency**: Which points are evidence/support for the primary message? Which are standalone? The standalone points become candidates for other slides or an appendix.
  3. **Split the slide into 2-3 slides** within the existing deck: Even within a 10-slide limit, adjacent slides can often be merged or less-critical slides can be moved to backup. Negotiate: "We can cover all 8 points if we give this topic 2 slides instead of 1, and we combine slides 7 and 8 since they are both about timeline."
  4. **Use the handout escape hatch**: Move detailed data tables and footnotes to a printed handout or a digital appendix slide (numbered A1, A2, etc.) that lives after the "Thank You" slide. The live slide shows only the headline finding from that data.
  5. **Apply the 6x6 compression**: For the points that remain, compress each bullet to <= 6 words. Move sub-explanations to speaker notes.
  6. **Fallback -- progressive disclosure animation**: If all else fails, use build animations (appear on click) to reveal points one at a time, keeping the initial view clean and matching the template aesthetic.
  7. **Escalation tiebreaker**: If stakeholder and content owner deadlock, run a 5-minute "projector test" with both versions. The illegible version loses by default -- readability trumps aesthetics because an unreadable slide has zero communication value.

- 结果 (Outcome): The slide is split across 2 slides using the template. Bullet points are compressed to 6-word summaries. The data table moves to an appendix slide. One less-critical slide from later in the deck is condensed to free up the slot. The primary message on each slide is visually prominent; supporting detail lives in speaker notes and the handout.

- 可提取的操作 (Extractable Operation): **"Content triage protocol"** -- When content exceeds template capacity, apply this sequence: (1) Identify the single primary message, (2) Sort remaining content into "supporting" vs "standalone," (3) Negotiate slide count before negotiating font size, (4) Use handouts/appendix for reference material, (5) Never drop below 18pt body text -- if you must, the content belongs elsewhere.

### Case 2: Mandatory Brand Blue Is Unreadable on Projectors -- The Compliance-Usability Conflict
- 困境 (Dilemma): A company's brand guidelines mandate a specific blue (#003D7C, a deep navy) for all heading text across all corporate communications, including presentations. The presenter discovers during the AV check that on the venue's older projector (a common conference room scenario), this navy blue renders as near-black with almost no perceptible contrast against the dark gray slide background (#2D2D2D) that the brand template also mandates. The text is functionally illegible beyond the front three rows. The brand team refuses exceptions: "This is our global standard. All presentations must use the approved template." The presenter must choose between: (A) using the brand colors and having 80% of the audience unable to read the headings, or (B) modifying the colors and risking brand compliance violation (and potential professional consequences).

- 约束 (Constraints):
  1. Brand guidelines are mandatory, enforced by a central brand team
  2. The venue projector cannot be replaced or upgraded
  3. The presentation is in 30 minutes -- no time for lengthy negotiation
  4. Senior leadership (including the CMO who approved the brand guidelines) will be in the audience
  5. The slide background color is also brand-mandated and cannot be changed independently

- 决策步骤 (Decision Steps):
  1. **Measure, don't guess**: If you have 5 minutes, use a contrast checker tool (e.g., WebAIM contrast checker on your phone) to get an objective contrast ratio number. "The contrast ratio is 1.8:1, which is below the WCAG minimum of 4.5:1 -- this is an accessibility violation, not a preference." This reframes the conversation from "I don't like the color" to "This is objectively unreadable."
  2. **Propose a projection-safe palette variant, not a replacement**: Do not propose "let's use a different blue." Instead, propose: "For projected presentations specifically, the brand navy lightens from #003D7C to #1A5FAA (maintaining the same hue, only adjusting lightness). For print and digital, the original #003D7C remains unchanged." Frame this as a media-specific adaptation, not a violation.
  3. **Invoke precedent**: Most major brands have projection-safe variants. Mention: "Coca-Cola has a presentation-specific red. IBM has a presentation palette. This is standard practice for accessibility."
  4. **Create a quick A/B slide**: Put one slide with brand navy and one with the proposed lighter blue side by side on the projector. Let the brand stakeholder (or the senior leader) see the difference with their own eyes. Visual evidence is more persuasive than argument.
  5. **The 30-minute emergency protocol**: If there is no time for approval, make the change unilaterally and proactively inform the brand team afterward with the contrast measurement as justification. The risk of an unreadable presentation to senior leadership is higher than the risk of a post-hoc brand compliance note.
  6. **Long-term fix**: After the presentation, work with the brand team to codify a "Presentation Mode" variant in the official brand guidelines, with pre-approved projection-safe hex codes for all brand colors.

- 结果 (Outcome): The presenter lightens the heading blue to #1A5FAA (same hue, higher lightness) for the live presentation. The slide background is kept as-is. The CMO notices the slide deck looks "crisper than usual" -- the improved readability is registered positively, not as a violation. The presenter follows up with the brand team with contrast measurements, and the company adds a "Presentation Palette" section to the brand guidelines within two months.

- 可提取的操作 (Extractable Operation): **"Accessibility-first brand override protocol"** -- When brand colors fail accessibility thresholds on target output media: (1) Measure the objective contrast ratio (use WebAIM or similar), (2) Frame the issue as an accessibility/readability problem, not an aesthetic preference, (3) Propose a media-specific variant (same hue, adjusted lightness) that preserves brand identity, (4) Create visual A/B proof on the actual output device, (5) In time-critical situations, prioritize audience comprehension over compliance and follow up afterward with data to drive a permanent guideline update.

### Case 3: Whitespace vs. Stakeholder "Fill the Space" Demand
- 困境 (Dilemma): A senior stakeholder reviews a slide with 40% whitespace and says: "There's too much empty space. Fill it -- add another chart, add more text, add our partner logos." The slide currently has a clean headline, one key chart, and a one-sentence takeaway. It tests beautifully -- the audience can absorb it in under 5 seconds. Adding anything would degrade comprehension, but the stakeholder has authority and is insistent. "It looks unfinished. It looks like you didn't do enough work."

- 约束 (Constraints):
  1. Stakeholder has approval authority
  2. Stakeholder equates "full slides" with "thorough work"
  3. Adding logos would introduce 4 new colors that clash with the palette
  4. Adding a second chart would split attention and violate the "one idea per slide" principle
  5. The presentation is tomorrow morning

- 决策步骤 (Decision Steps):
  1. **Don't argue aesthetics -- argue cognitive science**: "Research shows that slides with 60-70% content density have the highest audience retention. When we add elements, comprehension drops because the audience doesn't know where to look. This slide's job is to deliver one number. The whitespace is the frame around that number."
  2. **Offer a "density gradient" compromise**: "Let me show you two versions -- this one, and one with the partner logos added in a subtle footer bar. We'll test both." The stakeholder often just wants to feel their input was incorporated. A footer bar with small logos adds negligible cognitive load while satisfying the "fill the space" impulse.
  3. **Use the "Apple keynote" social proof**: "This is the same approach Apple uses in their keynotes -- one message per slide, lots of breathing room. It's widely considered the gold standard in presentation design." Stakeholders are often persuaded by aspirational benchmarks.
  4. **Redirect the impulse productively**: "You're right that we could use the space differently. Instead of adding content, what if we increased the chart size by 20% and made the headline bolder? That would make the existing message even more impactful." This satisfies "do more with the space" without adding noise.
  5. **If overruled, document the concern**: "I'll make the change, and I'll note in the speaker notes that this slide originally had a cleaner layout -- if we get feedback that it's hard to follow, we have a quick fallback." This preserves the option while respecting authority.

- 结果 (Outcome): A compromise is reached: partner logos are added in a subtle, small footer bar (10% opacity, grayscale). The chart is enlarged slightly. Whitespace drops from 40% to ~30%, which is still within the comfortable range. The stakeholder feels heard; the slide remains effective.

- 可提取的操作 (Extractable Operation): **"Whitespace defense framework"** -- When stakeholders demand filling whitespace: (1) Reframe from aesthetics to cognitive science ("comprehension drops when we add elements"), (2) Offer a low-cognitive-load compromise (footer logos, subtle branding element), (3) Use aspirational social proof (Apple keynotes, TED talks), (4) Redirect the impulse toward amplifying existing elements rather than adding new ones, (5) Always preserve a fallback version.

## Evidence Sources

1. Nonomura, Hochin & Nomiya, "Colors Suitable to Presentation Slides," IEEE -- formal academic research establishing the base/main/accent three-color functional model and the >= 125 lightness difference requirement from white background.

2. CIWA Brand Toolkit 2025 (ciwaprogram.org) -- documented the 30/18/9 typographic scale for document hierarchy, adapted upward for projected slides.

3. MiniMax-AI Design Principles (github.com/minimax-ai/skills) -- established the 60-70% content coverage sweet spot, 80%+ density threshold for discomfort, and 90%+ threshold for audience disengagement.

4. Ink Narrates, "How to Use Whitespace in Presentations" -- documented the 2/3 Rule (two-thirds whitespace, one-third content), macro vs. micro whitespace distinction, and the 6x6 rule.

5. Prezi Blog, "Designer Tips: Common Color Mistakes and the 60-30-10 Rule" -- practical application of the 60-30-10 interior design rule to presentation color allocation.

6. Urban Institute Data Visualization Style Guide -- contrast ratio guidelines, font pairing recommendations, and testing-on-actual-equipment mandate.

7. K-Dense-AI, "Scientific Slides Design Principles" (github.com/K-Dense-AI/claude-scientific-writer) -- comprehensive font size hierarchy tables and golden ratio scaling principles for academic presentations.

8. A&M-SA Research Guides, "Research Poster Presentation Guide: Fonts" -- minimum font size thresholds validated for large-room academic presentations.

9. Articulate E-Learning Blog, "Make Everything Greyscale & Use One Accent Color" -- the greyscale-plus-one-accent technique for guaranteed visual hierarchy.

10. OpenStax, "Finalizing a Slide Collection" -- the 60-30-10 rule applied to presentation theme customization.

## Supported Candidate Operations

### SCO1: EstablishVisualHierarchy(slide)
Input: a slide with raw content (headline, sub-points, body text, data element).
Operation: Assign each content element to one of three levels (Primary, Secondary, Tertiary). Apply font sizes using the golden ratio scaling (e.g., 40pt / 24pt / 15pt). Verify that only ONE element occupies the Primary level. If more than one element competes for Primary, split the slide or demote less-critical elements.
Output: A slide with unambiguous visual hierarchy where the audience's eye is drawn to exactly one starting point.

### SCO2: AllocateColorRoles(deck, palette)
Input: a slide deck and a color palette (may be brand-mandated or freely chosen).
Operation: Classify every color in the palette into one of three functional roles: Base (background, 60-70% area), Main (headings, borders, structural, 20-30%), Accent (single emphasis element, ~10%). If the palette has more than 5 colors, reduce to 3-4. If no color in the palette can serve as Accent (i.e., nothing bold/warm/complementary enough), flag for addition. If the Base color has insufficient contrast against the Main color (ratio < 4.5:1), flag for adjustment.
Output: A role-annotated palette where every color has a defined job, and a list of flagged issues (low contrast, missing accent, too many colors).

### SCO3: AuditWhitespace(slide)
Input: a single slide.
Operation: Calculate approximate content coverage percentage (content area / total slide area). Apply three checks: (1) Content coverage > 80% ? Flag as "overcrowded" -- recommend splitting or reducing. (2) Margins < 0.75 inches on any side ? Flag as "insufficient breathing room." (3) Squint test: can distinct visual zones be counted? If < 2 distinct zones, flag as "undifferentiated wall." Apply the Proximity check: is space-before-heading / space-after-heading >= 2 ? If not, flag as "heading disconnected from content." Recommend specific fixes.
Output: A whitespace audit report with flags and concrete spacing adjustments (in points or inches).

### SCO4: ResolveContentOverflow(slide, template_constraints, slide_count_limit)
Input: a slide whose content exceeds template capacity (text too long, too many elements), the template's maximum content zone dimensions, and the total slide count budget.
Operation: Execute the Content Triage Protocol: (1) Identify primary message -- the ONE thing the audience must remember. (2) Classify remaining content as "supporting" or "standalone." (3) Propose slide-split if slide count budget allows, or negotiate merging less-critical adjacent slides. (4) Move reference material (tables, footnotes, detailed data) to appendix/handout. (5) Apply 6x6 compression to remaining bullets. (6) If overflow persists, recommend progressive disclosure (build animations). Never recommend shrinking body text below 18pt.
Output: A redistribution plan: which content stays, which moves to another slide, which moves to handout/appendix, and which is dropped.

### SCO5: GenerateProjectionSafeVariant(palette, environment)
Input: a color palette and the projection environment characteristics (projector age/type, room brightness, screen size).
Operation: For each color in the palette, measure contrast ratio against the background color. If any color falls below 4.5:1, generate a variant with the same hue but adjusted lightness to reach 4.5:1. Preserve the brand's hue identity while ensuring readability. Flag any colors that cannot achieve 4.5:1 without hue shift (extreme cases). Output a side-by-side comparison: original palette vs. projection-safe palette, with contrast ratio annotations.
Output: A projection-safe palette variant and a contrast compliance report.

## Rejected or Weak Candidate Operations

### RWO1: "Always use the brand template as-is"
This was considered as a "safe default" rule, but rejected because brand templates frequently fail in specific environments (dark rooms, old projectors, large venues). Blind compliance produces unreadable slides. The correct rule is "start from the brand template, then adapt for the output medium." The operation must include an environment audit step.

### RWO2: "Fill all available slide space -- empty space looks lazy"
This was considered as a crude heuristic for "thorough-looking" slides, but rejected because it directly contradicts all evidence on cognitive load, audience retention, and professional presentation design standards. The research consistently shows that 60-70% content density is optimal. This rejected rule is documented here as a common anti-pattern to explicitly warn against in the final skill.

## Boundaries and Uncertainties

1. **Font size minimums assume standard projection distances**: The 18pt body text minimum assumes a standard conference room (screen-to-last-row distance of ~15-25 meters). For very large venues (auditoriums, keynote halls), minimum sizes may need to scale up to 24-28pt. Conversely, for small meeting rooms (<10 people, screen < 2 meters away), 16pt may be acceptable. The skill should prompt for venue size and adjust thresholds accordingly.

2. **The 60-30-10 color rule is a heuristic, not a law**: While widely cited, the exact percentages are less important than the functional role separation (exactly one accent color, one dominant background, one structural color). A 50-40-10 or 70-20-10 split can also work if the roles are clear. The boundary condition is: if the audience cannot identify the accent element within 1 second of the slide appearing, the color allocation has failed regardless of the percentages.

3. **Brand color override authority is context-dependent**: In highly regulated industries (pharma, finance, government), unauthorized color modification may carry real compliance risk. The "projection-safe variant" approach should ideally be pre-approved. In startups and less regulated contexts, the presenter has more latitude. The skill should include a "compliance risk level" prompt before recommending overrides.

4. **The "one idea per slide" rule has diminishing returns**: For a 60-minute presentation, 60 slides (one per minute) with one idea each can feel rushed and disjointed. Some slides need to serve as "anchor slides" that summarize or transition. The skill should distinguish between "content slides" (one idea each) and "structural slides" (agenda, section dividers, summaries), which have different density rules.

5. **Cultural variation in whitespace preference is under-researched**: The 60-70% content density sweet spot is derived primarily from Western design literature. Some East Asian presentation cultures favor higher information density and may perceive generous whitespace as wasteful or low-effort. The skill should be adaptable to cultural context, but the cognitive science baseline (lower density = better retention) should remain the default recommendation.

6. **Accessibility compliance (WCAG) was designed for web, not projection**: The 4.5:1 contrast ratio minimum comes from web accessibility standards and is a useful proxy, but projection introduces variables (ambient light, projector lumens, screen gain, viewing angle) that make exact ratio requirements imprecise. The skill should treat WCAG ratios as "necessary but not sufficient" -- always supplement with a real-device test when possible.

## Recommendations for Later Skill Compilation

1. **Integrate R3's visual hierarchy rules with R1's (semantic structure) and R2's (narrative/scenario) outputs**: The three-level typographic hierarchy should map directly onto R1's semantic structure (e.g., the "key finding" element always maps to Primary visual level). This cross-reference should be explicit in the unified skill.

2. **Build a "projection environment profile" parameter into the skill's configuration**: Before generating visual recommendations, the skill should ask (or infer) the presentation venue type (small room / conference room / auditorium / virtual-only / hybrid). This parameter gates font size thresholds, contrast requirements, and whitespace recommendations.

3. **Create a "brand palette health check" subroutine**: Given a brand color palette, the subroutine automatically measures contrast ratios, identifies missing functional roles (e.g., no usable accent color), and suggests a projection-safe variant. This could be a standalone utility within the skill or a prompt the skill asks the user to run.

4. **Distill the Content Triage Protocol (SCO4) into a decision tree**: The branching logic (split/compress/delegate-to-handout/drop) is complex enough to warrant a structured decision tree that the skill can walk users through step by step, rather than a flat checklist.

5. **Add a "visual anti-patterns" section to the final skill**: Document the rejected candidate operations (RWO1, RWO2) and other common failure modes (light-gray-text-on-white, all-caps-body-text, italic-on-slides, red-green pairings) as an explicit "what NOT to do" reference. Users learn as much from anti-patterns as from best practices.

6. **Coordinate with R4 (tooling)**: R4 should know that the visual hierarchy framework assumes the output tool supports: font size control, color palette definition, margin/padding control, and ideally build animations. Tool limitations (e.g., Google Slides' restricted font set) may force adaptations to R3's rules.
