---
description: "Description of article 1"
hideInProd: true
---

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

<br/>

<pre><code class="language-js">
var name = "World";
console.warn("Hello, " + name + "!")
</code></pre>

<pre><code class="language-lisp">
procedure(helloWorld()
  let((name)
    name = "World"
    printf("Hello, %s!\\\\n" name)
  )
)
</code></pre>

<pre><code class="language-verilog">
\`include "discipline.h"

module helloWorld;
  electrical in, out;

  analog begin
    @(initial_step) $display("Hello, World!");
  end
endmodule
</code></pre>

<pre><code class="language-bash">#!/bin/bash
name="World"
echo "Hello, $name!"
</code></pre>

<br/>

<div style="display: block; margin-inline: auto; width: min(90%, 100rem); aspect-ratio: 16/9">
    <iframe 
        src="https://www.youtube.com/embed/F4EArOqNNSU" 
        alt="3D GDS viewer from the IC Design Group, University of Twente" 
        style="width: 100%; height: 100%; border: none;">
    </iframe>
</div>

<br/>

<h6 style="text-align: center;">Центрированный h6</h6>

<br/>

<img src="PASTEURLHERE/images/layout/latchup.svg" alt="Latchup1" style="display: block; margin-inline: auto; height: 20rem" />
<p style="display: block; text-align: center">Source: [Latch-up in CMOS Technology](https://www.researchgate.net/publication/2240000_Latch-up_in_CMOS_Technology)</p>

<br/>

I think I'll use it to format all of my documents from now on. It's a lot easier to read than HTML.

<br/>

**Bold**  
*Italic*  
~~Strikethrough~~  

<br/>

Ordere list:
- Item 1
- Item 2
    1. Item 1
    2. Item 2
        1. Item 3
- Item 3

<br/>

Unordered list:
1. Item 1
2. Item 2
    - 1
    - 2
    - 3
3. Item 3  

<br/>

> Sidetext
>> Sidetext
> Sidetext

<br/>

Link [Analoghub](http://analoghub.ie/)

<br/>

TABLE:
| |Title 1|Title 2|Title 3|Title 4|Title 5|Title 6|Title 7|Title 8|
|-|-------|-------|-------|-------|-------|-------|-------|-------|
|A|xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |
|B|xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |
|C|xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |

<br/>

LaTeX (FORMULAS):
$$
\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.
$$

<br/>

Image 1: ![AnalogHub](PASTEURLHERE/images/activity.svg)  

<br/>

Image 2:
<img src="PASTEURLHERE/images/activity.svg" alt="AnalogHub" style="display: block; margin-inline: auto; width: min(80%, 20rem)" />

<br/>

<svg style="display: block; margin-inline: auto; width: min(80%, 20rem)" version="1.1" viewBox="0 0 28.631 6.9125" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-14.185 -9.2361)"><text x="24.333338" y="11.740719" fill="currentColor" font-family="Bahnschrift" font-weight="bold" letter-spacing="0px" stroke-width=".26458" word-spacing="0px" style="line-height:1.25" xml:space="preserve"><tspan x="24.333338" y="11.740719" font-size="3.5278px">AnalogHub</tspan><tspan x="24.333338" y="16.150444" font-size="2.1167px"/></text><text x="32.878212" y="15.405365" fill="currentColor" font-family="sans-serif" font-size="2.1167px" stroke-linecap="round" stroke-linejoin="round" stroke-width=".19844" text-align="center" text-anchor="middle" style="line-height:1.5;paint-order:markers stroke fill" xml:space="preserve"><tspan x="32.878212" y="15.405365" fill="currentColor" stroke-width=".19844">more bandwidth</tspan></text><path d="m15 10 5.3333 3.0005" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m20.333 13.001-5.3333 2.9995v-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m20.333 13.001h0.66667" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m15 11.333h-0.66667" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m15 14.667h-0.66667" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/><path d="m15.436 11.355h0.88195" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".19824" style="paint-order:markers stroke fill"/><path d="m15.48 14.667h0.88195" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".19824" style="paint-order:markers stroke fill"/><path d="m15.877 10.914v0.88195" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".19824" style="paint-order:markers stroke fill"/><path d="m21 13.001 0.33333-1 0.5359 2 0.80385-3 0.5359 2h19.458" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".29736" style="paint-order:markers stroke fill"/></g></svg>

<!--Spoiler-->
<details> 
  <summary> Spoiler test </summary>
   HIDDEN TEXT UNDER SPOILER
</details>
