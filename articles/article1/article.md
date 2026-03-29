---
description: "A comprehensive guide to all formatting features available in AnalogHub articles"
hideInProd: true
---

# Article Writing Guide

This article documents every formatting feature available in the AnalogHub article renderer. Use it as a reference and template when writing new articles.

---

## Article Structure Guidelines

An AnalogHub article should follow this structure:

1. **Frontmatter** — `description` (required) and optional `hideInProd: true`
2. **H1 title** — `# Article Title` — appears once at the top; excluded from the right-side TOC
3. **Short intro paragraph** — 1–3 sentences summarising what the article covers
4. **Sections** — `## Section Name` — main sections; these appear in the right-side TOC
5. **Subsections** — `### Subsection` — appear indented in the TOC
6. **Sub-subsections** — `#### Detail` — appear further indented in the TOC; use sparingly

> **Tip:** Use `<div id="anchor-name"></div>` above each major section to create stable URL anchors. This lets other articles link directly to a section with `#anchor-name`.

### Heading hierarchy example

```markdown
# Article Title

Short intro paragraph.

<div id="first-section"></div>

## 1. First Section

Section content here.

### 1.1 Subsection

Subsection content.

## 2. Second Section

More content.
```

---

## Frontmatter

```yaml
---
description: "SEO description shown in article list and meta tags"
hideInProd: true   # optional — hides article in prod if it has content, or shows "coming soon" if empty
---
```

---

## Text Formatting

**Bold text** for emphasis, *italic text* for terms, ~~strikethrough~~ for removed content, and `inline code` for technical identifiers like `V_GS` or `gm`.

```markdown
**Bold**, *italic*, ~~strikethrough~~, `inline code`
```

---

## Lists

Unordered list:
- Item 1
- Item 2
    - Nested item A
    - Nested item B
        - Deep nested item
- Item 3

Ordered list:
1. First step
2. Second step
    1. Sub-step 2a
    2. Sub-step 2b
3. Third step

---

## Blockquotes

Use blockquotes for tips, warnings, or design notes. Starting with `Note:` renders a warning triangle; everything else renders an info circle.

> This is a general note with an info circle icon.

> **Note:** This renders with a warning triangle icon because the text starts with "Note:".

```markdown
> **Note:** This renders with a warning triangle.

> This renders with an info circle.
```

---

## Links

External link: [AnalogHub](https://analoghub.ie/)

Internal link (same site): [LDO article](/category/Circuits/article/circuitsLDO)

Internal link to a specific section: [LDO article — feedback section](/category/Circuits/article/circuitsLDO#feedback)

```markdown
[LDO article](/category/Circuits/article/circuitsLDO)
[Link to section](/category/Circuits/article/circuitsLDO#feedback)
```

---

## Images

<!--
  IMAGE STYLING GUIDE:
  ─────────────────────────────────────────────────────
  display: block; margin-inline: auto   → centers the image horizontally
  width: min(80%, 40rem)                → responsive width: 80% of container, max 40rem
  height: 20rem                         → fixed height (use when aspect ratio varies)

  All images go in content/articles/{slug}/images/ and use localhost URLs in source:
  src="http://localhost:3000/images/{slug}/filename.svg"
  At build time, localhost is replaced with the live host URL.

  SVG INVERSION (automatic for .svg files):
  - By default, SVGs get "dark:invert" → colors invert in dark mode
  - Add "disableinvert" attribute       → no inversion in any mode
  - Add "lightinvert" attribute         → invert only in light mode
-->

SVG image (auto-inverts in dark mode):

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Opamp_symbol.svg" alt="Op-amp schematic symbol" style="display: block; margin-inline: auto; width: min(60%, 20rem)" />
<p style="text-align: center">Op-amp schematic symbol</p>

Photo (with `disableinvert` to prevent inversion):

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_transistors.jpg/640px-Colored_transistors.jpg" alt="Colored transistors" disableinvert style="display: block; margin-inline: auto; width: min(80%, 30rem)" />
<p style="text-align: center">Colored transistors (photo)</p>

```markdown
<!-- SVG with dark-mode inversion (default) -->
<img src="http://localhost:3000/images/{slug}/schematic.svg"
     alt="Circuit schematic"
     style="display: block; margin-inline: auto; width: min(80%, 30rem)" />
<p style="text-align: center">Caption here</p>

<!-- Photo — disable inversion -->
<img src="http://localhost:3000/images/{slug}/photo.jpg"
     alt="Photo description"
     disableinvert
     style="display: block; margin-inline: auto; width: min(80%, 30rem)" />
```

---

## Embedded Video

<div style="display: block; margin-inline: auto; width: min(90%, 50rem); aspect-ratio: 16/9">
    <iframe
        src="https://www.youtube.com/embed/F4EArOqNNSU"
        title="3D GDS viewer"
        style="width: 100%; height: 100%; border: none;"
        allowfullscreen>
    </iframe>
</div>
<p style="text-align: center">3D GDS viewer — University of Twente</p>

```markdown
<div style="display: block; margin-inline: auto; width: min(90%, 50rem); aspect-ratio: 16/9">
    <iframe
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Video title"
        style="width: 100%; height: 100%; border: none;"
        allowfullscreen>
    </iframe>
</div>
<p style="text-align: center">Caption</p>
```

---

## Tables

| Parameter | Symbol | Typical | Units |
|-----------|--------|---------|-------|
| Supply voltage | $V_{DD}$ | 1.8 | V |
| Threshold voltage | $V_{TH}$ | 0.4 | V |
| Transconductance | $g_m$ | 1.2 | mS |
| Output resistance | $r_o$ | 50 | k$\Omega$ |

```markdown
| Parameter | Symbol | Typical | Units |
|-----------|--------|---------|-------|
| Supply voltage | $V_{DD}$ | 1.8 | V |
```

---

## Code Blocks

### Fenced code blocks (markdown syntax)

Use triple backticks with a language identifier:

```python
# Python: calculate MOSFET drain current
def drain_current(mu_n, cox, w, l, vgs, vth):
    """Saturation region drain current."""
    return 0.5 * mu_n * cox * (w / l) * (vgs - vth) ** 2
```

```verilog
// Verilog-A: ideal resistor model
`include "discipline.h"

module resistor(p, n);
  inout p, n;
  electrical p, n;
  parameter real r = 1k;
  analog V(p, n) <+ r * I(p, n);
endmodule
```

```lisp
; SKILL: print all cellviews in a library
procedure(listCells(libName)
  let((lib)
    lib = ddGetObj(libName)
    foreach(cell lib~>cells
      printf("%s\n" cell~>name)
    )
  )
)
```

```matlab
% MATLAB: compute pole frequency
function fp = pole_freq(r, c)
    fp = 1 / (2 * pi * r * c);
end
```

### GitHub-linked code (auto-synced at build time)

Place a GitHub link immediately before a code block. At build time, the code is fetched from GitHub and embedded automatically — no manual copy-paste needed.

[Download from Github](https://github.com/analoghub-ie/software/blob/main/MATLAB/resLadderCalc.m)

<pre><code class="language-matlab">% This block is replaced at build time with the live content from GitHub above.
% Paste the full code here as fallback during local development.
</code></pre>

```markdown
[Download from Github](https://github.com/analoghub-ie/software/blob/main/path/to/file.m)

<pre><code class="language-matlab">% fallback content (replaced at build time)
</code></pre>
```

> **Note:** The link must be a `github.com/.../blob/...` URL and must immediately precede the code block (no blank lines between them).

---

## Math (KaTeX / LaTeX)

Inline math: the drain current is $I_D = \frac{1}{2} \mu_n C_{ox} \frac{W}{L} (V_{GS} - V_{TH})^2$.

Block equation:

$$
A_v = -g_m (r_o \| R_L) = -g_m \frac{r_o \cdot R_L}{r_o + R_L}
$$

Multi-line (use `\begin{aligned}`):

$$
\begin{aligned}
V_{out} &= V_{force} - I_L R_{trace} \\
        &= 1.1\,\text{V} - 100\,\text{mA} \times 1\,\Omega \\
        &= 1.0\,\text{V}
\end{aligned}
$$

```markdown
Inline: $I_D = \frac{W}{L}$

Block:
$$
A_v = -g_m R_L
$$

Multi-line:
$$
\begin{aligned}
V_{out} &= V_{force} - I_L R_{trace} \\
        &= 1.0\,\text{V}
\end{aligned}
$$
```

---

## Section Anchors

Use `<div id="..."></div>` above a section heading to create a stable URL anchor. This survives heading text edits.

```markdown
<div id="feedback-network"></div>

## 3. Feedback Network

Link to this section from another article:
[Feedback network](/category/Circuits/article/circuitsLDO#feedback-network)
```

---

## Spoiler / Collapsible Section

<details>
  <summary>Click to reveal hidden content</summary>

Use `<details>` and `<summary>` for collapsible sections — great for long derivations, worked examples, or optional content.

$$
g_m = \sqrt{2 \mu_n C_{ox} \frac{W}{L} I_D}
$$

</details>

```markdown
<details>
  <summary>Derivation — click to expand</summary>

Content here, including math, images, etc.

</details>
```

---

## Inline SVG

SVGs can be embedded directly in the markdown. Use `fill="currentColor"` and `stroke="currentColor"` so the SVG adapts to light/dark mode automatically.

<svg style="display: block; margin-inline: auto; width: min(80%, 20rem)" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="10" width="90" height="30" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="50" y="30" fill="currentColor" font-family="monospace" font-size="14" text-anchor="middle">Inline SVG</text>
</svg>

---

## Calculator Widgets

Built-in calculators can be embedded with custom HTML tags:

```markdown
<ldo-calculator></ldo-calculator>

<series-parallel-calculator></series-parallel-calculator>

<resistor-ladder-calculator></resistor-ladder-calculator>

<pcb-calculator></pcb-calculator>
```

Community-contributed widgets (defined in `content/widgets/`) use:

```markdown
<widget data-id="widget-slug"></widget>
```

---

## Frontmatter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `description` | Yes | SEO description shown in article list and `<meta>` tags |
| `hideInProd` | No | `true` → article hidden in prod if it has content; empty stub shows "coming soon" |
