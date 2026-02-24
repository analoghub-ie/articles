---
description: "Simulation Hacks for Cadence Virtuoso"
---

    
## Simulation Hacks 

### Table of Contents
1. [Differential Signals Testbench](#differentialSignals)

<div id="differentialSignals"></div>


### 1. Differential signals testbench
Sometimes we need to create a differential signal testbench (i.e. for a differential amplifier). The following structure
generates differential signal with a given amplitude and frequency:
<br/> 
<img src="http://localhost:3000/images/simulationHacks/differential-signal-tb.png" disableinvert alt="Differential signal generator" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Differential signal generator</p> 

***V0*** source defines the offset of the signal (common-mode), and ***V1*** denotes the signal shape, amplitude and 
frequency. Voltage-controlled current sources ***E0*** and ***E1*** with the gains of -1 and 1 define the positive and 
the negative outputs, respectively. The results of the simulation of the following structure are shown below:

<br/> 
<img src="http://localhost:3000/images/simulationHacks/differential-signal-sim.png" disableinvert alt="Differential signal generator simulation" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Differential signal generator simulation</p> 


    
        
        
