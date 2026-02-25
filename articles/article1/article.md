---
description: "A comprehensive guide to all formatting features available in AnalogHub articles"
hideInProd: true
---

# Formatting Guide

This article demonstrates every formatting feature available in the AnalogHub article renderer. Use it as a reference when writing your own articles.

## Text Formatting

**Bold text** for emphasis, *italic text* for terms, ~~strikethrough~~ for removed content, and `inline code` for technical identifiers like `V_GS` or `gm`.

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

## Blockquotes

> **Tip:** Use blockquotes for important notes, warnings, or design tips.

> Nested blockquotes:
>> This is a nested blockquote for secondary information.

## Links

External link: [AnalogHub](https://analoghub.ie/)

## Images

<!--
  IMAGE STYLING GUIDE:
  ─────────────────────────────────────────────────────
  display: block; margin-inline: auto   → centers the image horizontally
  width: min(80%, 40rem)                → responsive width: 80% of container, max 40rem
  height: 20rem                         → fixed height (use when aspect ratio varies)

  SVG INVERSION (automatic for .svg files):
  - By default, SVGs get "dark:invert" → colors invert in dark mode
  - Add "disableinvert" attribute       → no inversion in any mode
  - Add "lightinvert" attribute         → invert only in light mode
-->

Centered SVG image (auto-inverts in dark mode by default):

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Opamp_symbol.svg" alt="Op-amp schematic symbol" style="display: block; margin-inline: auto; width: min(60%, 20rem)" />
<p style="text-align: center">Op-amp schematic symbol (Wikipedia)</p>

<br/>

Image with disabled inversion (add `disableinvert` attribute):

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_transistors.jpg/640px-Colored_transistors.jpg" alt="Colored transistors" disableinvert style="display: block; margin-inline: auto; width: min(80%, 30rem)" />
<p style="text-align: center">Photo: no inversion applied</p>

## Embedded Video

<!--
  RESPONSIVE VIDEO EMBED:
  ─────────────────────────────────────────────────────
  Wrap the iframe in a container div with:
  - width: min(90%, 50rem)    → responsive width with max limit
  - aspect-ratio: 16/9        → maintains correct proportions
  Then set the iframe to width: 100%; height: 100% so it fills the wrapper.
  This way the video scales proportionally when the window resizes,
  instead of getting cropped.
-->

<div style="display: block; margin-inline: auto; width: min(90%, 50rem); aspect-ratio: 16/9">
    <iframe
        src="https://www.youtube.com/embed/F4EArOqNNSU"
        title="3D GDS viewer from University of Twente"
        style="width: 100%; height: 100%; border: none;"
        allowfullscreen>
    </iframe>
</div>
<p style="text-align: center">3D GDS viewer — IC Design Group, University of Twente</p>

## Tables

| Parameter | Symbol | Typical | Units |
|-----------|--------|---------|-------|
| Supply voltage | $V_{DD}$ | 1.8 | V |
| Threshold voltage | $V_{TH}$ | 0.4 | V |
| Transconductance | $g_m$ | 1.2 | mS |
| Output resistance | $r_o$ | 50 | k$\Omega$ |

## Code Blocks

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

```bash
#!/bin/bash
# Find all Verilog-A files in the current project
find . -name "*.vams" -o -name "*.va" | sort
```

## Math (LaTeX)

Inline math: the drain current is $I_D = \frac{1}{2} \mu_n C_{ox} \frac{W}{L} (V_{GS} - V_{TH})^2$.

Block equation — voltage gain of a common-source amplifier:

$$
A_v = -g_m (r_o \| R_L) = -g_m \frac{r_o \cdot R_L}{r_o + R_L}
$$

Multi-line equation — loop gain of an LDO:

$$
T(s) = A_{EA}(s) \cdot g_{mp} \cdot R_{out} \cdot \frac{R_{fb2}}{R_{fb1} + R_{fb2}}
$$

## Inline SVG

<svg style="display: block; margin-inline: auto; width: min(80%, 20rem)" version="1.1" viewBox="0 0 28.631 6.9125" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-14.185 -9.2361)"><text x="24.333338" y="11.740719" fill="currentColor" font-family="Bahnschrift" font-weight="bold" letter-spacing="0px" stroke-width=".26458" word-spacing="0px" style="line-height:1.25" xml:space="preserve"><tspan x="24.333338" y="11.740719" font-size="3.5278px">AnalogHub</tspan><tspan x="24.333338" y="16.150444" font-size="2.1167px"/></text><text x="32.878212" y="15.405365" fill="currentColor" font-family="sans-serif" font-size="2.1167px" stroke-linecap="round" stroke-linejoin="round" stroke-width=".19844" text-align="center" text-anchor="middle" style="line-height:1.5;paint-order:markers stroke fill" xml:space="preserve"><tspan x="32.878212" y="15.405365" fill="currentColor" stroke-width=".19844">more bandwidth</tspan></text><path d="m15 10 5.3333 3.0005" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m20.333 13.001-5.3333 2.9995v-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m20.333 13.001h0.66667" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m15 11.333h-0.66667" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m15 14.667h-0.66667" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/></g></svg>

## Spoiler / Collapsible Section

<details>
  <summary>Click to reveal hidden content</summary>

This content is hidden by default. Use `<details>` and `<summary>` HTML tags for collapsible sections — great for long derivations or optional content.

$$
g_m = \sqrt{2 \mu_n C_{ox} \frac{W}{L} I_D}
$$

</details>
