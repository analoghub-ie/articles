---
id: analysisPAC
title: "PAC/PSS analysis"
description: "Description of article 1"
---

## PAC/PSS analysis

### 1. Input signal
Input signal  is  set  to  be  DC.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/PAC-input-signal.png" disableinvert alt="Input signal for PAC analysis" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Input signal for PAC analysis</p> 

### 2. Clock signal (fundamental frequency)
Ideal clock generator should be only one. If we need more tan one clock signal, they should be derived from the main source:

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/PAC-clock-generator.png" disableinvert alt="Clock generator for PAC analysis" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Clock generator for PAC analysis</p> 

### 3. PSS analysis setup
*Fundamental Tones* should have only one frequency. *Beat Frequency* should equal to the sampling frequency. *Additional Time for Stabilization* – time required for the circuit to achieve normal region of operation.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/PSS-setup.png"  alt="PSS analysis setup" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center">PSS analysis setup</p> 

### 4. PAC analysis setup
Fill in frequency range and the required frequency step. *Sidebands* should be 0.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/PAC-setup.png"  alt="PAC analysis setup" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center">PAC analysis setup</p> 

### 5. Printing out the results
Select *Results → Direct Plot → Main Form*. Then select *PAC* tab and select required parameters.

<br/> <img src="http://localhost:3000/images/cadenceAnalysis/PAC-result.png" disableinvert alt="PAC analysis result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">PAC analysis result</p> 

6 Click on a desired node to plot

P.S. We will see some artefacts near the sampling frequency, which is normal and makes complete sense


> **Author**: [Ivan Smirnov]()
        
