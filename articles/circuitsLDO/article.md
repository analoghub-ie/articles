---
description: "LDO topologies and design explained"
---

##  Low-dropout regulator (LDO)

### Table of Contents
1. [Introduction](#intro)
2. [Principle of operation](#operationPrinciple)
3. [LDO topologies](#topologies)
4. [Feedback resistance calculation](#feedbackCalculation)
5. [Output voltage error](#outputError)
6. [LDO stability](#stability)
7. [LDO parasitics](#parasitics)
<br/>

<div id="intro"></div>

### 1. Introduction

**Low-dropout regulator (LDO)** - is a critical building block that generates a stable voltage (which can be used as 
a voltage reference or a supply) irrespective of the external conditions (supply voltage variation, noise etc.). An LDO 
helps in achieving better performance of the internal circuits and usually used together with the bandgap reference to 
ensure a constant output voltage.

<br/>

<div id="operationPrinciple"></div>

### 2. Principle of operation

**The principle of operation** of an LDO can be explained as a voltage-controlled voltage source (VCVS). This VCVS is 
controlled by two voltages - **reference voltage** $(V_{ref})$ and **feedback voltage** $(V_{fb})$ targeting to 
maintain a constant voltage $(V_{out})$ equal to $V_{ref}$ by supplying sufficient current to the feedback resistance 
$R_1$ and load resistance $R_L$.  The feedback resistance $R_1$ defines a minimum current at **no-load condition**  
which is called **quiescent current** $(I_q)$.
Elaborating further the control stage of an LDO, we can represent it as a subtraction block, producing the error voltage 
$V_E$ followed by the gain stage, generating the control voltage $V_c$ :

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoBehaviouralModel.svg" alt="Behavioural model of an LDO" style="display: block; margin-inline: auto; width: min(80%, 45rem)" /> 
<p style="display: block; text-align: center">Behavioural model of an LDO</p>

Subtraction and gain can be implemented using operational amplifier and usually called an **error amplifier**. The 
voltage controlled current source is represented by the MOS transistor and usually called a **pass device**:

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoSimpleDiagram.svg" alt="Basic LDO structure" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Basic LDO structure</p>

The difference between the feedback voltage $V_{fb}$ and the reference voltage $V_{ref}$ produces the control voltage 
$V_c$ which determines current through the pass device, hereby ensuring that enough current is supplied to the load 
resistance $R_L$ and $V_{out} = V_{ref}$ is maintained. The load capacitance $C_L$ is playing a vital role during load 
transients (by supplying extra current) and stability, which wil be discussed later.

<br/>

#### 2.1 LDO operation at no-load condition

Let's have a look on a practical example of an LDO to understand its operation better. The picture below represents a 
simple LDO with an NMOS pass device and no load. 

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoBasicOperation1.svg" alt="Basic LDO operation" style="display: block; margin-inline: auto; width: min(80%, 80rem)" /> 
<p style="display: block; text-align: center">Basic LDO operation</p>

Let's assume the following inputs:
- $V_{DD} = 1.8V$
- $V_{ref} = 1.2V$
- $R_1 = 100k\\Omega$
- $R_L = 1k\\Omega$
- $A_{EA} = 40dB = 10'000$

At the start-up, the output is $V_{out} = V_{fb} = 0V$. The reference voltage is set to $1.2V$, so the output voltage 
of the amplifier is:

$$
V_c = A_{EA} (V_{+} - V_{-}) = 10'000(1.2-0) = 120V \\Rightarrow 1.8V
$$ 
> **Note:** The output voltage of the amplifier is clamped at $V_{dd}$ and equals to 1.8V

The $V_{gs}$ of the pass device now equals $1.8V$ and it starts supplying current to the $R_1$. When $V_{out}$ reaches 
$1.2V$, both inputs of the error amplifier are at the same voltage and the loop is now locked, supplying 
$I_q = V_{out}/R_1 = 12\\mu A$. 
This current is called a **quiescent current**, which helps to achieve stability at no-load condition. Quiescent current 
and operational amplifier defines the idle power consumption of the LDO.

<br/>

#### 2.2 LDO operation under load 

Let's add a load resistor $R_L = 1k\\Omega$ to the output and see the response of the LDO:

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoBasicOperation2.svg" alt="Basic LDO operation" style="display: block; margin-inline: auto; width: min(80%, 80rem)" /> 
<p style="display: block; text-align: center">Basic LDO operation 2</p>

When we added a load resistance, the effective output resistance becomes $(R_1||R_L) \\approx 0.99 k\\Omega$. Initially, 
the LDO was supplying only $12\\mu A$ of current which leads to a sudden drop of the output voltage:
$$
V_{out} = I_{out}(R_1||R_L) = 0.109V
$$
This changes is seen at the feedback voltage and produces a voltage difference at the input of the error amplifier:
$$
\\Delta V = V_{ref} - V_{fb} = 1.2 - 0.109 = 1.091V
$$
The control voltage ramps-up, increasing the $V_{gs}$ of the pass device and the output current increases. As the output 
current increases, the output voltage increases too and settles when $V_{out}=V_{fb}$. At the steady state, 
$V_{out} = 1.2V$, $I_{out} = I_q + I_L = 12.012 mA$.

<br/>
<div id="topologies"></div>

### 3. LDO topologies

In the previous chapters we had LDO operation and stability covered, and now we can cover different LDO topologies.
LDOs have a variety of topologies and oriented for use with analog or digital circuits. There are two main LDO 
topologies: **NMOS-** and **PMOS-** based.

**By architecture:**
- With an off-chip load capacitor
- Capacitor-less 

**By Pass device type:**
- NMOS-based
- PMOS-based

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoTopologies.svg" alt="LDO topologies" style="display: block; margin-inline: auto; width: min(80%, 80rem)" /> 
<p style="display: block; text-align: center">LDO topologies</p>

A bandgap voltage reference provides a stable reference signal for the regulator. An error amplifier (EA), typically 
implemented as an OTA (Operational Transconductance Amplifier), detects differences between the feedback voltage 
and the reference voltage, adjusting the pass-element resistance accordingly. A feedback resistor network divides 
the output voltage for comparison with the reference voltage ($V_{ref}$). The pass device (usually a MOSFET) regulates 
resistance between the input and output voltages to maintain stability. In practical applications, the pass device 
is commonly a PMOS transistor. Next, we’ll compare the use of PMOS vs. NMOS topologies:

<br/>

|                |PMOS\t |NMOS\t |
|:----------------:|:-------:|:-------:|
|Maximum output voltage\t\t| $$V_{dsat} (\\approx 50-100mV)$$    |$$V_{dd}-V_{th}(\\approx 0.4-0.6V)$$\t |
|PSRR\t \t\t\t\t\t|Low  |High\t |
|Output impedance\t\t\t|Lower  |Higher\t | 
|Area\t \t\t\t\t\t|Bigger  |Smaller\t | 
|Speed\t \t\t\t\t\t|Slower  |Faster\t | 
|Dominant pole location\t \t|Output node  |Gate of pass device\t | 

<br/>

PMOS LDOs is the most commonly used topology due to their low dropout voltage, while NMOS pass transistors are 
practical when the supply voltage is significantly higher than the regulated output. In an NMOS configuration, the pass 
transistor acts as a common drain (source follower) with positive gain, whereas the PMOS operates as a common source 
with negative feedback. This difference requires the op-amp polarity to be adapted accordingly.

The primary advantage of PMOS LDOs is their lower dropout voltage. The error amplifier output ($EA_{out}$) in a PMOS 
design can swing between **GND** and $V_{in}-V_{th}$, with dropout voltage primarily dependent on $V_{ds}$(around 50mV for saturated 
devices). In contrast, NMOS LDOs require the output of the error amplifier to be at least $V_{th}$ above the output 
voltage to turn on the pass transistor. This means the output voltage is inherently limited to at least Vth below the 
input voltage, with additional margin for loop regulation. Furthermore, NMOS pass devices are typically high-power or 
high-voltage transistors designed to handle significant current and voltage, and their threshold voltage is often 
higher than the standard 1V of regular transistors.


|  Parameter      \t|External\t |Capless\t |
|:----------------:|:-------:|:-------:|
|Stability\t\t| Easy    |\tHard |
|Max out current\t\t| High    |\tLow-Med |
|Parasitics\t\t| High   |\tLow |


|Amplifier Topology|Regulation| Stability| PSRR| Noise|Power consumption| 
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|Telescopic|Medium\t|High\t  |Medium\t|Low\t  |Low\t\t|
|Folded cascode|Medium|High|Medium|Medium|Medium|
|Two-stage|High|Low|High|Low|Medium|
|Gain-boosted|High|Medium|High|Medium|High|

<br/>

<div id="feedbackCalculation"></div>

### 4. Feedback resistance calculation

The reference voltage is usually provided by the bandgap reference and usually outputs a fixed voltage, that might be 
different from what we want to see at the output of LDO. Solution to this is to use a voltage divider in the feedback 
of the LDO:

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoresistiveFeedback.svg" alt="Resistive feedback in LDO" style="display: block; margin-inline: auto; width: min(80%, 45rem)" /> 
<p style="display: block; text-align: center">Resistive feedback in LDO</p>

Using a voltage divider equation, we get:
$$
V_{fb} = V_{out}\\frac{R_2}{R_1 + R_2}
$$
Knowing that $V_{fb} = V_{ref}$ , we can rewrite:
$$
V_{ref}  = V_{out}\\frac{R_1}{R_1 + R_2}
$$
Combining for $R_1$, we get:
$$
R_1 = \\frac{R_2(V_{out}-V_{ref})}{V_{ref}}
$$

$$
\\frac{R_1}{R_2} = \\frac{ V_{out} - V_{ref} } { V_{ref} } 
$$
Denoting $k = R_1/R_2$ :

$$
k = \\frac{ V_{out}  } { V_{ref} } - 1
$$

Using that equation, we can easily calculate the feedback resistor values, knowing the output voltage of an LDO and a 
reference voltage. The quiescent current $I_q$ is defined as:
$$
I_q = \\frac{V_{out}}{(R_1 + R_2)}
$$
Then,
$$
R_1 + R_2 = \\frac{V_{out}}{I_q}
$$
And we are getting a system of equations:
$$
\\begin{cases}  
R_1/R_2 = \\frac{ V_{out}  } { V_{ref} } - 1 \\\\
\\\\
R_1 +R_2 = \\frac{V_{out}}{I_q} \\\\
\\end{cases}
$$

So the full equation will look like:
$$
\\begin{cases} 
k = \\frac{ V_{out}  } { V_{ref} } - 1 \\\\
R_2 = \\frac{ V_{out} } { I_q (1 + k) } \\\\
R_1 = k R_2 \\\\
\\end{cases}
$$

For $V_{out} \\geq V_{ref}$

Just knowing $V_{out}$, $V_{ref}$ and $I_q$ will give us the exact values of $R_1$ and $R_2$
<!---You can use the calculator below or a [Matlab Script]() !LINK -->

<ldo-calculator></ldo-calculator>

<br/>

<div id="outputError"></div>

### 5. Output voltage error
<br/>
There are <u><b>3 main sources</b></u> of the output error in LDO:

1. Voltage divider mismatch ($R_1$ and $R_2$)
2. Gain error of error amplifier
3. Reference voltage error

#### 5.1 Voltage divider mismatch 
The resistor value variation in CMOS process in generally big and can be up to 15-30%, depending on the 
[resistor type](https://localhost:3000/category/Layout/article/layoutBasics#resistors). Since only the ratio between 
$R_1$ and $R_2$ matters (and not their absolute values), we can neglect the error, introduced by the divider if we 
[match](https://localhost:3000/category/Layout/article/layoutMatching) them in layout. 


#### 5.2 Gain error of error amplifier
Due to the finite gain of the amplifier, we get some error in control voltage $(V_c)$ which leads to the error in output 
current and hence, an output voltage. The output voltage of the error amplifier is given by:
$$
V_{out} = A_{EA}(V_{+}-V_{-})
$$  
Taking into account that $V_{-}=V_{fb}$ and $V_{+}=V_{ref}$:
$$
V_{out} = A_{EA}(V_{ref}-V_{fb})
$$  
$$
V_{out} = A_{EA}(V_{ref}-V_{out} \\beta)
$$  
, where $\\beta = \\frac{R_2}{R_1 + R_2}$.


Grouping for $V_{ref}$ and $V_{out}$:
$$
(1+A_{EA}\\beta)V_{out}=A_{EA}V_{ref}
$$  
**Hence, $V_{out}/V_{ref}$ becomes:**
$$
A_{EA}^{real} = \\frac{V_{out}}{V_{ref}} = \\frac{A_{EA}}{1+A_{EA}\\beta}
$$  
 The gain error is simply the difference between ideal gain and real gain. Taking into account, that ideal gain 
 is $1/\\beta$:
$$
\\delta A_{EA} = \\frac{A_{EA}^{ideal} - A_{EA}^{real} }{A_{EA}^{ideal}}
$$

$$
\\delta A_{EA} = \\frac{ 1/\\beta - \\frac{ A_{EA} }{ 1+A_{EA}\\beta }} { 1/\\beta } 
$$

$$
\\delta A_{EA} = \\frac{ 1 } {1 + A_{EA}\\beta}
$$

To calculate the required gain for a given gain error:
$$
A_{EA} = \\frac{ 1 - \\delta A_{EA} } { \\delta A_{EA} \\beta }
$$

#### 4.3 Reference voltage error
Another source of the output voltage error is the reference voltage. The reference voltage is usually provided by the 
Bandgap, which will typically have a variation about $\\pm 0.5\\%$ across PVT:

$$
\\delta V_{ref} = \\pm 0.5\\% \\Rightarrow 1\\%
$$

<b><u>Total output voltage error:</b></u>
**The total output voltage error** is basically the sum of the gain error and reference voltage error:

$$
\\delta V_{out} = \\delta A_{EA} + \\delta V_{ref}
$$

<!--Spoiler-->
<details> 
  <summary> <b>Calculation example:</b> </summary>
<ul>
  <li> <i>V<sub>ref</sub> = 0.6V</i> </li>
  <li><i> V<sub>out</sub> = 1.2V </i></li>
  <li><i>I<sub>q</sub> = 1μA</i></li>
  <li><i>δV<sub>ref</sub> = 1%</i></li>
  <li><i>A<sub>EA</sub> = 60 dB</i></li>   
</ul>

<!--
- $V_{ref} = 0.6V$
- $V_{out} = 1.2V$
- $I_q = 1\\mu A$
- $\\delta V_{ref} = 1\\%$
- $A_{EA} = 60 dB$
-->



1. Calculate $R_1$, $R_2$:
$$
k = \\frac{V_{out}}{V_{ref}}-1 = \\frac{1.2}{0.6} - 1 = 1
$$

$$
R_2 = \\frac{V_{out}}{I_q(1+k)} = \\frac{1.2}{1e^-6(1+1)} = 600k\\Omega
$$

$$
R_1 = kR_2 = 600k\\Omega
$$
<b><u>Check:</u></b>
$$
I_q =  \\frac{V_{out}}{R_1 + R_2} = \\frac{1.2}{1200k\\Omega} = 1\\mu A
$$

2. Calculate $\\delta V_{out}$:
$$
\\beta = \\frac{R_2}{R_1+R_2} = \\frac{600k\\Omega}{1200k\\Omega} = 0.5
$$

$$
\\delta A_{EA} = \\frac{1}{1+A_{EA}\\beta} = \\frac{1}{1+1000*0.5} \\approx 0.002
$$

$$
\\delta V_{out} = \\delta A_{EA} + \\delta V_{ref} = 0.002 + 0.01 = 0.012 = 1.2\\%
$$
 </details>
 
> **Feedback resistor highlights:**  
> - Use **low-mismatch resistors**, such as polysilicon resistors;  
> - **Make resistors** as **wide** as possible to reduce mismatch;  
> - Use **unit-sized segments**; connect resistors in parallel or in series, if needed;  
> - **[Match](http://localhost:3000/category/Layout/article/layoutMatchingPatterns)** feedback resistors in layout; 
> - Total **resistance defines quiescent current ($$I_q$$)** - a trade-off between stability and power consumption;  
  
<br/>

<div id="stability"></div>

### 6. LDO stability & transfer function
#### 6.1 Poles and zeros

As any feedback system, the LDO is a subject to stability analysis. Let's dive into a typical LDO structure and 
understand the location and role of the poles and zeros. In a typical LDO there are two main poles. 

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoPolesZeros.svg" alt="LDO poles location" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">LDO poles location</p>

**The first pole** is produced by the combination of the **load capacitance and output resistance**:

$$
\\omega_{p1} = \\frac{1}{R_{out}C_L} 
$$

$$
R_{out} = r_{ds}||(R_1+R_2)||R_{L}
$$

**The second pole** is produced by the combination of the **output resitance of the error amplifier** and 
**gate capacitance** of the pass device:
$$
\\omega_{p2} = \\frac{1}{r_{EA}C_{gs}} 
$$

Load current variation causes the variation in pole location:
$$
\\omega_{p1} = \\frac{1}{R_{out}C_L} \\approx \\frac{1}{r_{ds}C_L} = \\frac{I_{L}}{(V_{out}-V_{dd})C_L}
$$

$$
R_{out} = r_{ds}||(R_1+R_2)||R_{L}
$$

$$
\\beta = \\frac{R_2}{R_1 + R_2}
$$

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoLoadVariation.svg" alt="Load variation impact on LDO poles location" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Load variation impact on LDO poles location</p>

#### 6.2 Transfer function of the LDO

<br/>

Using the poles equations from Chapter 6.1, the transfer function of an LDO (feedback loop-gain) can be written as:

$$
T(s) = A_{EA} g_{mp} R_{out} \\beta \\frac{1}{ \\left(1 + \\frac{s}{\\omega_{p1}} \\right) \\left(1 + \\frac{s}{\\omega_{p2}} \\right)}
$$

,or, in standard form:

$$
T(s) =  \\frac{ A_{EA} g_{mp} R_{out} \\beta }{ \\left( \\frac{1}{ \\omega_{p1} \\omega_{p2}} \\right) s^2  + \\left( \\frac{1}{ \\omega_{p1}} + \\frac{1}{ \\omega_{p2}} \\right) s + 1}
$$

#### 6.3 Compensation

In the previous chapter we saw that the load pole $\\omega _{p2}$ moves, when the load is changing. This effect lead to 
change in phase margin, which can lead to unstable condition (oscillations). There are two main ways to compensate 
this effect:
- Zero insertion 
- $C_{gs}$ shielding through buffer

<br/>

##### 6.3.1 Using a ESR zero

One of the ways to compensate our LDO with external capacitor is to utilize the capacitor's equivalent series resistance 
(ESR). Every capacitor model contains the series resistance that represents the losses in the capacitor. 

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoCompensation1.svg" alt="Inserting ESR zero" style="display: block; margin-inline: auto; width: min(80%, 70rem)" /> 
<p style="display: block; text-align: center">Inserting ESR zero</p>

Apart from the standard poles $\\omega_{p1}$ and $\\omega_{p2}$, we get an extra zero from the ESR:

$$
\\omega_{p1} = \\frac{1}{R_{out} C_L}
$$

$$
\\omega_{p2} = \\frac{1}{r_{EA} C_{gs}}
$$

$$
\\omega_{z} = \\frac{1}{R_{ESR} C_{L}}
$$

This zero is usually located at a relatively high frequency and helps in phase margin improvement. Phase margin is 
given by:

$$
PM \\approx \\arctan \\left(\\frac{\\omega_{UGF}}{\\omega_z} \\right)
$$

> **Note:** 
> The ESR depends on frequency so it's better to use an s-parameter model for your sims to get precise results.

<br/>

##### 6.3.2 Using a buffer

Another way to compensate an LDO is to add a buffer between the output of the amplifier and the pass device. Effectively, 
adding a buffer will shield the output of the error amplifier from the large $C_{gs}$ of the pass device.

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoCompensation2.svg" alt="Using a buffer" style="display: block; margin-inline: auto; width: min(80%, 80rem)" /> 
<p style="display: block; text-align: center">Using a buffer</p>

Previously, we had a low-frequency pole $\\omega_{p1}$ and a high-frequency pole $\\omega_{p2}$. Adding a buffer splits 
the high-frequency pole $\\omega_{p2}$ into two **higher-frequency** poles:

$$
\\omega_{p2} = \\frac{1}{C_{gs} R_{o,EA}}
$$

Two high-frequency poles:
$$
\\omega_{p2,A} = \\frac{1}{C_{B} R_{o,EA}}
$$

$$
\\omega_{p2,B} = \\frac{1}{C_{gs} R_{o,EA}}
$$

The target here is to push $\\omega_{p2,A}$ and $\\omega_{p2,B}$ above $\\omega_{UGB}$ so it is no longer affects the 
phase margin.

<br/>

<div id="parasitics"></div>

### 7. LDO Parasitics 

In the design of LDO with an off-chip capacitor, it's very important to take into account parasitics, associated 
with the output node. The main contributors are I/O pads, bondwires, packaging and PCB trace:

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoParasiticsDie.svg" alt="Abstract view of LDO parasitics" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Abstract view of LDO parasitics</p>

Let's now have a detailed look into these contributors. The I/O pad is a large piece of metal so its contribution is 
mostly capacitive. The typical capacitance for the analog I/O pad is around *1-2pF* and usually mentioned in the process 
documentation.

The next piece is the bondwire - metal interconnect between the chip and package. Bondwires are typically made of gold 
to achieve low resistance ($\\approx 50m\\Omega /mm$). However,  due to relatively big length, the bondwire brings a 
significant inductance to the picture ($\\approx 1nH /mm$) and it has to be taken into account.

<br/> <img src="http://localhost:3000/images/circuitsLDO/ldoParasiticsFull.svg" alt="LDO parasitics" style="display: block; margin-inline: auto; width: min(80%, 80rem)" /> 
<p style="display: block; text-align: center">LDO parasitics</p>

The package itself also introduces parasitic capacitance, inductance and resistance, which is usually specified in 
the package manufacturer's documentation. Since inductance and resistance are primarily coming from the leads of the 
package, choosing a lead-free package (such as QFN) will be very beneficial.

The last, but not the least contributor is the PCB trace that connects the package and the output load. This trace can be 
represented as a distributed RLC-network. Since every extra inch of the trace contributes to increased parastics, it's 
essential to keep the output capacitor as close as possible to the chip.

Typical values for the parasitics are given in the table below:

|Parasitics|R| L| C|
|:-------:|:-------:|:-------:|:-------:|
|Bondwire* | $\\approx 50m\\Omega /mm$| $\\approx 1nH /mm$  | -\t|
|Package** |$50m\\Omega$\t|$1.119 nH$\t  |$352 fF$\t|
|PCB trace***|$4.93\\Omega$\t|$2.1 nH$\t  |\t$1.47pF$|

> **Notes:**
> - *For a typical golden bondwire, (*1mil* diameter). Typical bondwire length is *3-5mm*.
> - **Values are provided for the [QFN-20 package ](https://www.ti.com/lit/an/scba017d/scba017d.pdf?ts=1755636160382)
> - ***For a typical PCB trace (*W = 1mm, L = 10mm, thickness = 35um*). To calculate different geometries, use this 
[calculator](https://localhost:3000/category/matlabScripts/article/pcbTraceCalculator).

<!--
Low-dropout oscillator (LDO) is a very important circuit that helps in achieving better performance of the internal 
circuits irrespectably of external conditions (supply voltage variation, noise etc.). It is usually used together 
with bandgap reference to ensure constant output voltage. LDOs have a variety of topologies and oriented for use with 
analog or digital circuits. There are two main LDO topologies: NMOS and PMOS-based.

A bandgap voltage reference provides a stable reference signal for the regulator. An error amplifier (EA), typically 
implemented as an OTA (Operational Transconductance Amplifier), detects differences between the feedback voltage and 
the reference voltage, adjusting the pass-element resistance accordingly. A feedback resistor network divides the output 
voltage for comparison with the reference voltage (Vref). The pass device (usually a MOSFET) regulates resistance 
between the input and output voltages to maintain stability. In practical applications, the pass device is commonly a 
PMOS transistor. Next, we’ll compare the use of PMOS vs. NMOS topologies:
-->



<!--
Low-dropout oscillator (LDO) is a very important circuit that helps in achieving better performance of the internal 
circuits irrespective of external conditions (supply voltage variation, noise etc.). It is usually used together with 
bandgap reference to ensure constant output voltage.

![enter image description here](dev.analoghub.ie/images/LDO_topologies.svg)

LDOs have a variety of topologies and oriented for use with analog or digital circuits.
There are two main LDO topologies: NMOS and PMOS-based.
-->



<!--
---
**New material here:**


**Feedback resistance calculation example here:**





-- > **Feedback resistor highlights:**  
> - Use **low-mismatch resistors**, such as polysilicon resistors;  
> - **Make resistors** as **wide** as possible to reduce mismatch;  
> - Use **unit-sized segments**; connect resistors in parallel or in series, if needed;  
> - **[Match](http://localhost:3000/category/Layout/article/layoutMatchingPatterns)** feedback resistors in layout; 
> - Total **resistance defines quiescent current ($$I_q$$)** - a trade-off between stability and power consumption;  

-->
  
<!--
**Principle of operation:**
Let's have a look on a simplified NMOS-based LDO to understand its operation. The LDO consists of **three main parts**:
- Error amplifier
- Pass transistor
- Feedback resistance

Let's assume that $V_{dd} = 1.8V$, $V_{ref} = 1.2V$, gain of the error amplifier is $A_{EA} = 40dB$.
In the beginning, the output voltage $V_{out} = 0V$. Then $V_{fb} = 0V$, so then the negative input of the error 
amplifier $(V_{-})$ is also $0V$. Then, the output voltage of the amplifier $V_c$ becomes:
$$
V_c = A_{EA}(V_{+} - V_{-}) = 10'000(1.2-0) = 120V \\Rightarrow 1.8V
$$ 
> **Note:** The output voltage of the amplifier is clamped at $V_{dd}$ and equals to 1.8V

Then, the $V_{gs}$ of the pass device becomes $1.8V$ and the transistor is fully open, conducting current. $V_{out}$ 
and hence $V_{fb}$ are now rising, the difference between error amplifier inputs reduces and leads to the 
reduced $V_{c}$. When the system settles:
$$
V_{out} = V_{fb} =V_{ref} = 1.2V
$$






> **Gain error sources:**
> - Gain error of the amplifier
> - Reference voltage variation
>  - Feedback resistance mismatch



> **Summary**
> - **PSRR** - dominated by the gain of amplifier, weakened by Cgs of the pass device
> - **Regulation** - defined by the gain of the amplifier
> - **Power consumption** - opamp + Iq
> - **Noise** - opamp
> - **BW** - Cload, Cgs of the pass device, opamp BW
> - **Stability** - 

> **LDO Design hints:**
> - **PSRR** - increase amplifier gain
> - **Regulation** - Increase amplifier gain
> - **Transient response** - Increase $$C_{out}$$ to adress fast-switching loads
> - **Power consumption** - Reduce amplifier's power consumption, reduce $$I_Q$$
> - **Noise** - Reduce amplifier's noise
> - **Bandwidth** - Cload, Cgs of the pass device, increase amplifier's BW
> - **Stability** - use single-stage amplifier, increase $$I_{Q}$$


$$
\\begin{cases}  
3x + 5y + z = 3 \\\\  
7x - 2y + 4z = 4 \\\\  
-6x + 3y + 2z = 2  
\\end{cases}
$$
-->

<!--   #### LDO equations summary:
1. **Feedback resistor ration through Vref, Vout and Iq:**
$$
\\begin{cases}  
k =  \\frac{V_{ref}/V_{out}}{1 - V_{ref}/V_{out}} \\\\
\\\\
R_1 = \\frac{V_{out}}{I_Q(1+k)} \\\\
\\\\
R_2 = kR_1 \\\\
\\end{cases}
$$  

2. **Regulation error due to gain and Vref errors:**
$$
\\Delta V_{out}  = V_{ref} - \\left(\\frac{A_{EA}}{1+A_{EA}} \\right) (1-\\Delta V_{ref})V_{ref}
$$

bla
-->




    
