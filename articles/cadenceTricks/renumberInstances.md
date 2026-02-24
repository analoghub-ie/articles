---
id: renumberInstances
title: "How to renumber instances in Cadence Virtuoso?"
description: "How to renumber instances in Cadence Virtuoso"
hideInProd: false
---

## Renumerating instances in Cadence Virtuoso
During design, we are adding and deleting instances multiple times, so the instance names becomes wild like: ***R556*** 
or ***C132***. This makes it hard to track them during layout and extraction as well as complicates the communication 
between schematic and layout engineers:
<br/> <img src="http://localhost:3000/images/cadenceTricks/renumerating-instances-1.png" disableinvert alt="Renumbering instances (before)" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Renumbering instances (before)</p> 

Luckily, there is a standard function in Cadence Virtuoso, that alows us to renumerate instances once the design is 
complete. To do that, simply navigate to ***Edit → Renumber Instances:***

<br/> <img src="http://localhost:3000/images/cadenceTricks/renumerating-instances-2.png" disableinvert alt="Renumbering instances (after)" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Renumbering instances (after)</p> 

All instances in the schematic are renumbered, filling the gaps in naming!
