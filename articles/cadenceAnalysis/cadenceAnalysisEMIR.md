---
id: cadenceAnalysisEMIR
title: "EM/IR analysis"
description: "Description of article 1"
---

# EM/IR analysis
This page describes how to perform Electromigration (EM) analysis in Cadence Virtuoso (Voltus). 
EM analysis become important for example during the design of high-current circuits, such as LDO. IR analysis is important whne designing power rails, ESD protection etc.
Metal routing in IC design have a limited current capacity before it will fail. 
You can read more about electromigration [here](/category/Layout/article/layLayoutDependentEffects#EM).

### EM analysis setup
Workflow:
1. [Extract your design](#extractingDesign) using Calibre PEX  to *.dspf*;
2. [Configure simulator](#analysisSetting) for performing EM/IR analysis;
3. Use files [.emDataFile](/category/cadenceAnalysis/article/cadenceAnalysisEMIR#emDataFile) 
and [.map](/category/cadenceAnalysis/article/cadenceAnalysisEMIR#mapFile) for setting visual representation.

<div id="extractingDesign"></div>

### Extracting the design

>- Use usual rules files from TSMC;
>- Make sure that extraction type is set to *R+C+CC*;
>- Make sure that the output format of the file is *.dspf*.


<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-extraction.png" alt="PEX settings for EMIR analysis" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">PEX settings for EMIR analysis</p> 

Extract the whole design, or only specific nets you need: 

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-net-selection.png" alt="Net selection for EMIR analysis" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Net selection for EMIR analysis</p> 

- Go to the PEX options tab;
- Provide ground name;
- Check that checkboxes are activated as shown.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-PEX-options.png" alt="PEX options for EMIR analysis" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">PEX options for EMIR analysis</p> 

- Go to the Reduction and CC tab;
- Check that the reduction is disabled.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-PEX-reduction.png" alt="PEX reduction for EMIR analysis" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">PEX reduction for EMIR analysis</p> 

<div id="analysisSetting"></div>
### Setting the analysis

- Go to the ADE L;
- Provide extracted *.dspf* file using *Simulation files* menu.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-simulation-files.png" alt="Providing dspf for EMIR analysis" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Providing dspf for EMIR analysis</p> 

- Set type to Dynamic;
- Select instances/nets for the analysis;
- Set the EM/IR analysis options;
- Click Add/Modify;
- Add EM file [(tsmc65.emDataFile)](/category/cadenceAnalysis/article/cadenceAnalysisEMIR#emDataFile).

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-ADEL.png" alt="EMIR analysis settings1" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">EMIR analysis settings</p> 


<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-setup-1.png" alt="EMIR analysis settings2" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">EMIR analysis settings</p> 


- Set solver method to direct;
- Select full transient or time window for EM estimation;
- Click *Add/Modify*.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-setup-2.png" alt="EMIR analysis settings2" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">EMIR analysis settings</p> 

- Add the *.dspf* file;
- Click *Run*;
- After run is finished, click *Apply*.


<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-setup-3.png" alt="EMIR analysis settings3" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">EMIR analysis settings</p> 

- Check the temperature and process corner;
- Check that simulator is set to *aps emir*;
- Run the simulation.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-setup-4.png" alt="EMIR analysis settings4" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">EMIR analysis settings</p> 

### Display the results

- After simulation is finished, go to:  
*Results  → EM/IR data → Layout analysis*;
- Select the layout view.


<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-display-1.png" alt="EMIR analysis display settings" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">EMIR analysis display settings</p> 

- You will see a heatmap of the violations on your layout.
> N.B. If the average density is more than 1, that means that the layout is not satisfying EM rules.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/EMIR-display-3.png" alt="EMIR analysis results example" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">EMIR analysis results example</p> 

<div id="emDataFile"></div>

### .EMDataFile example 

[Download from Github](https://github.com/analoghub-ie/software/blob/main/EMIR%20files/EM_example.emDataFile)

<pre><code class="language-lisp">
(
cadGrid = 0.001
r = 0.25
EMGRD = 0.95
deltaT = 5
currentDensityMPV=true
routingLayers = ("PO" "M1" "M2" "M3" "M4" "M5" "M6" "M7" "M8" "M9" "M10")
viaLayers = ("CO" "VIA1" "VIA2" "VIA3" "VIA4" "VIA5" "VIA6" "VIA7" "VIA8" "VIA9")

viaWidthList = (
("CO" 0.09)
("VIA1" 0.1)
("VIA2" 0.1)
("VIA3" 0.1)
("VIA4" 0.1)
("VIA5" 0.1)
("VIA6" 0.1)
("VIA7" 0.36)
("VIA8" 0.72)
("VIA9" 3)
)

viaLengthList = (
("CO" 0.09)
("VIA1" 0.1)
("VIA2" 0.1)
("VIA3" 0.1)
("VIA4" 0.1)
("VIA5" 0.1)
("VIA6" 0.1)
("VIA7" 0.36)
("VIA8" 0.72)
("VIA9" 3)
)

xrefLayers = (
( "tpdiff" ("diff" "OD"))
( "tndiff" ("diff" "OD"))
( "odCont" ("CO_od" "CO"))
( "polyCont" ("CO_po" "CO"))
( "poly" ("poly" "PO"))
( "metal1" ("M1" "M1"))
( "metal2" ("Mx1" "M2"))
( "metal3" ("Mx2" "M3"))
( "metal4" ("Mx3" "M4"))
( "metal5" ("Mx4" "M5"))
( "metal6" ("Mx5" "M6"))
( "metal7" ("Mx6" "M7"))
( "metal8" ("Mz1" "M8"))
( "metal9" ("Mu1" "M9"))
( "metal10" ("AP" "M10"))
( "VIA1" ("VX" "VIA1"))
( "VIA2" ("VX" "VIA2"))
( "VIA3" ("VX" "VIA3"))
( "VIA4" ("VX" "VIA4"))
( "VIA5" ("VX" "VIA5"))
( "VIA6" ("VX" "VIA6"))
( "VIA7" ("VZ" "VIA7"))
( "VIA8" ("VU" "VIA8"))
( "VIA9" ("RV" "VIA9"))
)

avgCurrentDensSpecList = (
(nil layer "poly"\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((0.5 * (w*EMGRD)/w) * 1.03 , 105)((0.5 * (w*EMGRD)/w) * 1.0 , 110)((0.5 * (w*EMGRD)/w) * 0.927 , 125)))

(nil layer "M1"\t\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.5090*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.5090*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.5090*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx1"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx2"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx3"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx4"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx5"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx6"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mz1"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 8.0960*(w-0.020)/w) * 1.434*EMGRD , 105)((4.0000 * 8.0960*(w-0.020)/w) * 1.000*EMGRD , 110)((4.0000 * 8.0960*(w-0.020)/w) * 0.358*EMGRD , 125)))
(nil layer "Mu1"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 30.176*(w-0.020)/w) * 1.434*EMGRD , 105)((4.0000 * 30.176*(w-0.020)/w) * 1.000*EMGRD , 110)((4.0000 * 30.176*(w-0.020)/w) * 0.358*EMGRD , 125)))

(nil layer "M1"\t\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.5090*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.5090*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.5090*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx1"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx2"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx3"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx4"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx5"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx6"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mz1"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 8.0960*(w-0.020)/w) * 1.434*EMGRD , 105)(((20/L) * 8.0960*(w-0.020)/w) * 1.000*EMGRD , 110)(((20/L) * 8.0960*(w-0.020)/w) * 0.358*EMGRD , 125)))
(nil layer "Mu1"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 30.176*(w-0.020)/w) * 1.434*EMGRD , 105)(((20/L) * 30.176*(w-0.020)/w) * 1.000*EMGRD , 110)(((20/L) * 30.176*(w-0.020)/w) * 0.358*EMGRD , 125)))

(nil layer "M1"\t\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.5090*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.5090*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.5090*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx1"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx2"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx3"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx4"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx5"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx6"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mz1"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 8.0960*(w-0.020)/w) * 1.434*EMGRD , 105)((1.0000 * 8.0960*(w-0.020)/w) * 1.000*EMGRD , 110)((1.0000 * 8.0960*(w-0.020)/w) * 0.358*EMGRD , 125)))
(nil layer "Mu1"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 30.176*(w-0.020)/w) * 1.434*EMGRD , 105)((1.0000 * 30.176*(w-0.020)/w) * 1.000*EMGRD , 110)((1.0000 * 30.176*(w-0.020)/w) * 0.358*EMGRD , 125)))

(nil layer "AP"\t\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 currentDensity ((2.7 * 0.9 * 1.434*EMGRD , 105)(2.7 * 0.9 * 1.000*EMGRD , 110)(2.7 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "CO_od"\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 res 29.9954 currentDensity ((0.296 * 0.9 * 1.434 , 105)(0.296 * 0.9 * 1.000*EMGRD , 110)(0.296 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "CO_po"\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 res 21.9936 currentDensity ((0.296 * 0.9 * 1.434 , 105)(0.296 * 0.9 * 1.000*EMGRD , 110)(0.296 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "VX"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 0.00 maxLb 5.00 minWu 0.0 maxWu -1.0 minLu 0.00 maxLu 5.00 res 2.5061700 currentDensity ((4.0000*0.158 * 0.9 * 1.434*EMGRD , 105)(4.0000*0.158 * 0.9 * 1.000*EMGRD , 110)(4.0000*0.158 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VX"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 5.00 maxLb 20.0 minWu 0.0 maxWu -1.0 minLu 5.00 maxLu 20.0 res 2.5061700 currentDensity (((20/L)*0.158 * 0.9 * 1.434*EMGRD , 105)((20/L)*0.158 * 0.9 * 1.000*EMGRD , 110)((20/L)*0.158 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VX"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 20.0 maxLb -1.0 minWu 0.0 maxWu -1.0 minLu 20.0 maxLu -1.0 res 2.5061700 currentDensity ((1.0000*0.158 * 0.9 * 1.434*EMGRD , 105)(1.0000*0.158 * 0.9 * 1.000*EMGRD , 110)(1.0000*0.158 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 0.00 maxLb 5.00 minWu 0.0 maxWu -1.0 minLu 0.00 maxLu 5.00 res 0.2400550 currentDensity ((4.0000*3.077 * 0.9 * 1.434*EMGRD , 105)(4.0000*3.077 * 0.9 * 1.000*EMGRD , 110)(4.0000*3.077 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 5.00 maxLb 20.0 minWu 0.0 maxWu -1.0 minLu 5.00 maxLu 20.0 res 0.2400550 currentDensity (((20/L)*3.077 * 0.9 * 1.434*EMGRD , 105)((20/L)*3.077 * 0.9 * 1.000*EMGRD , 110)((20/L)*3.077 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 20.0 maxLb -1.0 minWu 0.0 maxWu -1.0 minLu 20.0 maxLu -1.0 res 0.2400550 currentDensity ((1.0000*3.077 * 0.9 * 1.434*EMGRD , 105)(1.0000*3.077 * 0.9 * 1.000*EMGRD , 110)(1.0000*3.077 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 0.00 maxLb 5.00 minWu 0.0 maxWu -1.0 minLu 0.00 maxLu 5.00 res 0.3905650 currentDensity ((4.0000*3.077 * 0.9 * 1.434*EMGRD , 105)(4.0000*3.077 * 0.9 * 1.000*EMGRD , 110)(4.0000*3.077 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 5.00 maxLb 20.0 minWu 0.0 maxWu -1.0 minLu 5.00 maxLu 20.0 res 0.3905650 currentDensity (((20/L)*3.077 * 0.9 * 1.434*EMGRD , 105)((20/L)*3.077 * 0.9 * 1.000*EMGRD , 110)((20/L)*3.077 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 20.0 maxLb -1.0 minWu 0.0 maxWu -1.0 minLu 20.0 maxLu -1.0 res 0.3905650 currentDensity ((1.0000*3.077 * 0.9 * 1.434*EMGRD , 105)(1.0000*3.077 * 0.9 * 1.000*EMGRD , 110)(1.0000*3.077 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "RV"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 0.00 maxLb -1.0 minWu 0.0 maxWu -1.0 minLu 0.00 maxLu -1.0 res 0.0410014 currentDensity ((1.0000*7.000 * 0.9 * 1.434*EMGRD , 105)(1.0000*7.000 * 0.9 * 1.000*EMGRD , 110)(1.0000*7.000 * 0.9 * 0.358*EMGRD , 125)))

)

avgAbsCurrentDensSpecList = (
(nil layer "poly"\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((0.5 * (w*EMGRD)/w) * 1.03 , 105)((0.5 * (w*EMGRD)/w) * 1.0 , 110)((0.5 * (w*EMGRD)/w) * 0.927 , 125)))

(nil layer "M1"\t\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.5090*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.5090*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.5090*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx1"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx2"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx3"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx4"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx5"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx6"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((4.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((4.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mz1"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 8.0960*(w-0.020)/w) * 1.434*EMGRD , 105)((4.0000 * 8.0960*(w-0.020)/w) * 1.000*EMGRD , 110)((4.0000 * 8.0960*(w-0.020)/w) * 0.358*EMGRD , 125)))
(nil layer "Mu1"\tminW 0.0 maxW -1.0 minL 0.00 maxL 5.00 currentDensity (((4.0000 * 30.176*(w-0.020)/w) * 1.434*EMGRD , 105)((4.0000 * 30.176*(w-0.020)/w) * 1.000*EMGRD , 110)((4.0000 * 30.176*(w-0.020)/w) * 0.358*EMGRD , 125)))

(nil layer "M1"\t\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.5090*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.5090*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.5090*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx1"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx2"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx3"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx4"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx5"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx6"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)(((20/L) * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)(((20/L) * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mz1"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 8.0960*(w-0.020)/w) * 1.434*EMGRD , 105)(((20/L) * 8.0960*(w-0.020)/w) * 1.000*EMGRD , 110)(((20/L) * 8.0960*(w-0.020)/w) * 0.358*EMGRD , 125)))
(nil layer "Mu1"\tminW 0.0 maxW -1.0 minL 5.00 maxL 20.0 currentDensity ((((20/L) * 30.176*(w-0.020)/w) * 1.434*EMGRD , 105)(((20/L) * 30.176*(w-0.020)/w) * 1.000*EMGRD , 110)(((20/L) * 30.176*(w-0.020)/w) * 0.358*EMGRD , 125)))

(nil layer "M1"\t\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.5090*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.5090*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.5090*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx1"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx2"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx3"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx4"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx5"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mx6"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 1.8770*(w-0.016)/w) * 1.434*EMGRD , 105)((1.0000 * 1.8770*(w-0.016)/w) * 1.000*EMGRD , 110)((1.0000 * 1.8770*(w-0.016)/w) * 0.358*EMGRD , 125)))
(nil layer "Mz1"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 8.0960*(w-0.020)/w) * 1.434*EMGRD , 105)((1.0000 * 8.0960*(w-0.020)/w) * 1.000*EMGRD , 110)((1.0000 * 8.0960*(w-0.020)/w) * 0.358*EMGRD , 125)))
(nil layer "Mu1"\tminW 0.0 maxW -1.0 minL 20.0 maxL -1.0 currentDensity (((1.0000 * 30.176*(w-0.020)/w) * 1.434*EMGRD , 105)((1.0000 * 30.176*(w-0.020)/w) * 1.000*EMGRD , 110)((1.0000 * 30.176*(w-0.020)/w) * 0.358*EMGRD , 125)))

(nil layer "AP"\t\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 currentDensity ((2.7 * 0.9 * 1.434*EMGRD , 105)(2.7 * 0.9 * 1.000*EMGRD , 110)(2.7 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "CO_od"\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 res 29.9954 currentDensity ((0.296 * 0.9 * 1.434 , 105)(0.296 * 0.9 * 1.000*EMGRD , 110)(0.296 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "CO_po"\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 res 21.9936 currentDensity ((0.296 * 0.9 * 1.434 , 105)(0.296 * 0.9 * 1.000*EMGRD , 110)(0.296 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "VX"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 0.00 maxLb 5.00 minWu 0.0 maxWu -1.0 minLu 0.00 maxLu 5.00 res 2.5061700 currentDensity ((4.0000*0.158 * 0.9 * 1.434*EMGRD , 105)(4.0000*0.158 * 0.9 * 1.000*EMGRD , 110)(4.0000*0.158 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VX"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 5.00 maxLb 20.0 minWu 0.0 maxWu -1.0 minLu 5.00 maxLu 20.0 res 2.5061700 currentDensity (((20/L)*0.158 * 0.9 * 1.434*EMGRD , 105)((20/L)*0.158 * 0.9 * 1.000*EMGRD , 110)((20/L)*0.158 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VX"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 20.0 maxLb -1.0 minWu 0.0 maxWu -1.0 minLu 20.0 maxLu -1.0 res 2.5061700 currentDensity ((1.0000*0.158 * 0.9 * 1.434*EMGRD , 105)(1.0000*0.158 * 0.9 * 1.000*EMGRD , 110)(1.0000*0.158 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 0.00 maxLb 5.00 minWu 0.0 maxWu -1.0 minLu 0.00 maxLu 5.00 res 0.2400550 currentDensity ((4.0000*3.077 * 0.9 * 1.434*EMGRD , 105)(4.0000*3.077 * 0.9 * 1.000*EMGRD , 110)(4.0000*3.077 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 5.00 maxLb 20.0 minWu 0.0 maxWu -1.0 minLu 5.00 maxLu 20.0 res 0.2400550 currentDensity (((20/L)*3.077 * 0.9 * 1.434*EMGRD , 105)((20/L)*3.077 * 0.9 * 1.000*EMGRD , 110)((20/L)*3.077 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 20.0 maxLb -1.0 minWu 0.0 maxWu -1.0 minLu 20.0 maxLu -1.0 res 0.2400550 currentDensity ((1.0000*3.077 * 0.9 * 1.434*EMGRD , 105)(1.0000*3.077 * 0.9 * 1.000*EMGRD , 110)(1.0000*3.077 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 0.00 maxLb 5.00 minWu 0.0 maxWu -1.0 minLu 0.00 maxLu 5.00 res 0.3905650 currentDensity ((4.0000*3.077 * 0.9 * 1.434*EMGRD , 105)(4.0000*3.077 * 0.9 * 1.000*EMGRD , 110)(4.0000*3.077 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 5.00 maxLb 20.0 minWu 0.0 maxWu -1.0 minLu 5.00 maxLu 20.0 res 0.3905650 currentDensity (((20/L)*3.077 * 0.9 * 1.434*EMGRD , 105)((20/L)*3.077 * 0.9 * 1.000*EMGRD , 110)((20/L)*3.077 * 0.9 * 0.358*EMGRD , 125)))
(nil layer "VZ"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 20.0 maxLb -1.0 minWu 0.0 maxWu -1.0 minLu 20.0 maxLu -1.0 res 0.3905650 currentDensity ((1.0000*3.077 * 0.9 * 1.434*EMGRD , 105)(1.0000*3.077 * 0.9 * 1.000*EMGRD , 110)(1.0000*3.077 * 0.9 * 0.358*EMGRD , 125)))

(nil layer "RV"\t\tminW 0.0 maxW -1.0 minL 0.0 maxL -1.0 minWb 0.0 maxWb -1.0 minLb 0.00 maxLb -1.0 minWu 0.0 maxWu -1.0 minLu 0.00 maxLu -1.0 res 0.0410014 currentDensity ((1.0000*7.000 * 0.9 * 1.434*EMGRD , 105)(1.0000*7.000 * 0.9 * 1.000*EMGRD , 110)(1.0000*7.000 * 0.9 * 0.358*EMGRD , 125)))

)

rmsCurrentDensSpecList = (
(nil layer "poly"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(0.003709 * deltaT * w * EMGRD * (w * EMGRD + 1.02))/w, temperature)))

(nil layer "M1"\t\tminW 0.00 maxW -1.0 currentDensity ((sqrt(18.33 * deltaT * (w * EMGRD - 0.016)*(w * EMGRD - 0.016) * (w * EMGRD - 0.016 + 0.352)/(w * EMGRD - 0.016 + 0.0443))/w, temperature)))
(nil layer "Mx1"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(6.310 * deltaT * (w * EMGRD - 0.016)*(w * EMGRD - 0.016) * (w * EMGRD - 0.016 + 0.417)/(w * EMGRD - 0.016 + 0.0443))/w, temperature)))
(nil layer "Mx2"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(3.500 * deltaT * (w * EMGRD - 0.016)*(w * EMGRD - 0.016) * (w * EMGRD - 0.016 + 0.751)/(w * EMGRD - 0.016 + 0.0443))/w, temperature)))
(nil layer "Mx3"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(2.420 * deltaT * (w * EMGRD - 0.016)*(w * EMGRD - 0.016) * (w * EMGRD - 0.016 + 1.085)/(w * EMGRD - 0.016 + 0.0443))/w, temperature)))
(nil layer "Mx4"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(1.850 * deltaT * (w * EMGRD - 0.016)*(w * EMGRD - 0.016) * (w * EMGRD - 0.016 + 1.420)/(w * EMGRD - 0.016 + 0.0443))/w, temperature)))
(nil layer "Mx5"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(1.850 * deltaT * (w * EMGRD - 0.016)*(w * EMGRD - 0.016) * (w * EMGRD - 0.016 + 1.420)/(w * EMGRD - 0.016 + 0.0443))/w, temperature)))
(nil layer "Mx6"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(1.850 * deltaT * (w * EMGRD - 0.016)*(w * EMGRD - 0.016) * (w * EMGRD - 0.016 + 1.420)/(w * EMGRD - 0.016 + 0.0443))/w, temperature)))
(nil layer "Mz1"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(4.370 * deltaT * (w * EMGRD - 0.020)*(w * EMGRD - 0.020) * (w * EMGRD - 0.020 + 2.458)/(w * EMGRD - 0.020 + 0.0443))/w, temperature)))
(nil layer "Mu1"\tminW 0.00 maxW -1.0 currentDensity ((sqrt(13.60 * deltaT * (w * EMGRD - 0.020)*(w * EMGRD - 0.020) * (w * EMGRD - 0.020 + 2.898)/(w * EMGRD - 0.020 + 0.0443))/w, temperature)))

(nil layer "AP"\t\tminW 0.00 maxW -1.0 currentDensity ((sqrt(2.620 * deltaT * (w * EMGRD) * (w * EMGRD + 3.397))/w, temperature)))

)

peakCurrentDensSpecList = (
(nil layer "poly"\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((1.875*(w * EMGRD)/w) * 1.03 , 105)((1.875*(w * EMGRD)/w) * 1.0 , 110)((1.875*(w * EMGRD)/w) * 0.927 , 125)))

(nil layer "M1"\t\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((36.0 * (w*EMGRD-0.016)/w) * 1.434 , 105)((75.04 * (w*EMGRD-0.016)/w) * 1.000 , 110)((75.04 * (w*EMGRD-0.016)/w) * 0.358 , 125)))
(nil layer "Mx1"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * (w*EMGRD-0.016)/w) * 1.434 , 105)((34.66 * (w*EMGRD-0.016)/w) * 1.000 , 110)((34.66 * (w*EMGRD-0.016)/w) * 0.358 , 125)))
(nil layer "Mx2"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * (w*EMGRD-0.016)/w) * 1.434 , 105)((34.66 * (w*EMGRD-0.016)/w) * 1.000 , 110)((34.66 * (w*EMGRD-0.016)/w) * 0.358 , 125)))
(nil layer "Mx3"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * (w*EMGRD-0.016)/w) * 1.434 , 105)((34.66 * (w*EMGRD-0.016)/w) * 1.000 , 110)((34.66 * (w*EMGRD-0.016)/w) * 0.358 , 125)))
(nil layer "Mx4"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * (w*EMGRD-0.016)/w) * 1.434 , 105)((34.66 * (w*EMGRD-0.016)/w) * 1.000 , 110)((34.66 * (w*EMGRD-0.016)/w) * 0.358 , 125)))
(nil layer "Mx5"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * (w*EMGRD-0.016)/w) * 1.434 , 105)((34.66 * (w*EMGRD-0.016)/w) * 1.000 , 110)((34.66 * (w*EMGRD-0.016)/w) * 0.358 , 125)))
(nil layer "Mx6"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * (w*EMGRD-0.016)/w) * 1.434 , 105)((34.66 * (w*EMGRD-0.016)/w) * 1.000 , 110)((34.66 * (w*EMGRD-0.016)/w) * 0.358 , 125)))
(nil layer "Mz1"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((63.0 * (w*EMGRD-0.020)/w) * 1.434 , 105)((34.66 * (w*EMGRD-0.020)/w) * 1.000 , 110)((34.66 * (w*EMGRD-0.020)/w) * 0.358 , 125)))
(nil layer "Mu1"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((99.0 * (w*EMGRD-0.020)/w) * 1.434 , 105)((34.66 * (w*EMGRD-0.020)/w) * 1.000 , 110)((34.66 * (w*EMGRD-0.020)/w) * 0.358 , 125)))

)

ACpeakCurrentDensSpecList = (
(nil layer "poly"\tminW 0.0 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((1.875*(w * EMGRD)/w) * 1.03 , 105)((1.875*(w * EMGRD)/w) * 1.0 , 110)((1.875*(w * EMGRD)/w) * 0.927 , 125)))

(nil layer "M1"\t\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((36.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.434 , 105)((36.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.000 , 110)((36.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 0.358 , 125)))
(nil layer "Mx1"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.434 , 105)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.000 , 110)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 0.358 , 125)))
(nil layer "Mx2"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.434 , 105)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.000 , 110)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 0.358 , 125)))
(nil layer "Mx3"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.434 , 105)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.000 , 110)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 0.358 , 125)))
(nil layer "Mx4"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.434 , 105)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.000 , 110)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 0.358 , 125)))
(nil layer "Mx5"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.434 , 105)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.000 , 110)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 0.358 , 125)))
(nil layer "Mx6"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.434 , 105)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 1.000 , 110)((22.0 * ((w*EMGRD-0.016)/w)/sqrt(r)) * 0.358 , 125)))
(nil layer "Mz1"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((63.0 * ((w*EMGRD-0.020)/w)/sqrt(r)) * 1.434 , 105)((63.0 * ((w*EMGRD-0.020)/w)/sqrt(r)) * 1.000 , 110)((63.0 * ((w*EMGRD-0.020)/w)/sqrt(r)) * 0.358 , 125)))
(nil layer "Mu1"\tminW 0.00 maxW -1.0 minL 0.00 maxL -1.0 currentDensity (((99.0 * ((w*EMGRD-0.020)/w)/sqrt(r)) * 1.434 , 105)((99.0 * ((w*EMGRD-0.020)/w)/sqrt(r)) * 1.000 , 110)((99.0 * ((w*EMGRD-0.020)/w)/sqrt(r)) * 0.358 , 125)))

)

)
</code></pre>


<div id="mapFile"></div>

### .map file example 

[Download from Github](https://github.com/analoghub-ie/software/blob/main/EMIR%20files/dfii.map)

<pre><code class="language-bash">
# &lt;type&gt; &lt;extraction_layer_name&gt; &lt;dfII_layer_name&gt;
poly poly PO
via odCont CO
via polyCont CO
via VIA1 VIA1
via VIA2 VIA2
via VIA3 VIA3
via VIA4 VIA4
via VIA5 VIA5
via VIA6 VIA6
via VIA7 VIA7
via VIA8 VIA8

metal metal1 M1
metal metal2 M2
metal metal3 M3
metal metal4 M4
metal metal5 M5
metal metal6 M6
metal metal7 M7
metal metal8 M8
metal metal9 M9
metal metal10 M10

</code></pre>

    
