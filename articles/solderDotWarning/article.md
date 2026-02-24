---
description: "How to get rid of solder warning (intersection of 4 wires) in Cadence Virtuoso?"
---

## How to get rid of solder warning (intersection of 4 wires) in Cadence Virtuoso?

You've probably seen this annoying warning multiple times while saving your design:

<br/> <img src="http://localhost:3000/images/solderDotWarning/solder-dot-issue.png" disableinvert alt="Solder dot warning" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Solder dot warning</p> 

It's very easy to fix, in Schematic Editor navigate to **Check → Rules Setup...**, then go to **Physical** tab and
set the rule **Solder On CrossOver** to **ignored**:

<br/> <img src="http://localhost:3000/images/solderDotWarning/solder-dot-fix.png" disableinvert alt="Solder dot warning fix" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Solder dot warning fix</p> 

Now this annoying warning is gone!
