---
id: kelvinConnection
title: "Kelvin connection in IC design"
description: "Kelvin connection for IC design explained"
hideInProd: false
---

##  Kelvin connection in IC design

### Table of Contents

1. [Introduction](#intro)
2. [The concept](#concept)
3. [Kelvin connection in unity gain buffer (example)](#kelvinUGBExample)
4. [Kelvin connection in LDO (theory)](#kelvinLDOTheory)
5. [Kelvin connection in LDO (example)](#kelvinLDOExample)




<br/>

<div id="intro"></div>

### 1. Introduction

**Kelvin connection** - is a very clever concept, often used for high-accuracy resistance measurements by separating 
the leads that supply current from the leads that measure voltage. Let's explore how this concept applies to the IC 
design and helps to create more accurate circuits.

<br/>

<div id="concept"></div>

### 2. The concept

The entire idea behind **Kelvin connection** is to separate the nodes that are carrying high currents from the sensing 
nodes to the feedback. Let's have a look on a very simple example - a unity gain buffer:

<br/> <img src="http://localhost:3000/images/circuits/kelvinUnityGain1.svg" alt="Unity gain buffer schematic" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Unity gain buffer schematic</p>

In this circuit, the **error amplifier** controls the gate of the PMOS transistor to maintain the voltage at the output 
equal to $V_{ref}$ by supplying enough current to the load. When this circuit is physically implemented on chip, the 
routing resistance $R_{trace}$ appears between the output of the PMOS pass device ($V_{force}$) and the actual output 
of the circuit (i.e. chip pad). This parasitic resistance makes the output voltage $V_{out}$ to be lower than output 
voltage of an LDO due to the voltage drop:

$$
V_{out} = V_{LDO} - I_{L}R_{trace}
$$

As we are sensing the feedback voltage from the output of an LDO, we don't see that voltage change caused by $R_{trace}$ 
which leads to an output error. If the output current is large, i.e. $100mA$ and even if the routing resistance is 
$\\approx 1 \\Omega$, the output voltage difference will be:
$$
V_{drop} = I_{L}R_{trace} = 100mA*1 \\Omega = 100mV
$$

<br/>

To avoid such a large voltage error, we can use a **Kelvin connection**:

<br/> <img src="http://localhost:3000/images/circuits/kelvinUnityGain2.svg" alt="Unity gain buffer schematic with Kelvin connection" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Unity gain buffer schematic using Kelvin connection</p>

In this case, the voltage is now sensed directly at the output and takes the error caused by $R_{trace}$ into 
account. Since there is **no current flowing into the input of the amplifier**, there is no longer any $IR_{drop}$ issue. 
This voltage is seen at the input of the amplifier, forcing $V_{force}$ to be slightly higher to keep 
$V_{out} = V_{fb} = V_{ref}$.

<div id="kelvinUGBExample"></div>

### 3. Kelvin connection in unity gain buffer (example)

For a unity gain buffer circuit, let's assume the following:

- $V_{ref} = 1V$
- $V_{out} = 1V$
- $I_{load} = 100mA$
- $R_{trace} = 1\\Omega$

<br/> <img src="http://localhost:3000/images/circuits/kelvinUnityGainComparison.svg" alt="Unity gain buffer example" style="display: block; margin-inline: auto; width: min(80%, 120rem)" /> 
<p style="display: block; text-align: center">Unity gain buffer example</p>

<u><b> Conventional connection: </b></u>

$$
V_{force} = V_{ref} = 1V 
$$

Due to the resistance of the trace, the output voltage is:
$$
V_{out} = V_{force} - I_{L}R_{trace} = 1V - 100mA*1\\Omega = 0.9V 
$$

Since $V_{fb} = V_{force}= V_{fb}$, the loop is locked, while the error of $0.1V$ is present at the output:

$$
\\Delta V_{out} = \\frac{V_{out}}{V_{ref}} = \\frac{0.9V}{1V} = 10\\%
$$

</br>

<u><b> Kelvin connection: </b></u>

Since now **force** and **sense** are separated and no current is flowing to the input of the amplifier, 
we can see that even though $R_{trace}$ is still present in the feedback path, there is no $IRdrop$ hence no voltage error.
This means that $V_{fb} = V_{out}$ and the voltage difference has to be adjusted by the amplifier.

When the loop is locked, we will observe the following:

$$
V_{force} = 1.1V 
$$

$$
V_{out} = V_{force} - I_{L}R_{trace} = 1.1V - 100mA*1\\Omega = 1V 
$$

There is no voltage error at the output in this case, thanks to the Kelvin connection.

<div id="kelvinLDOTheory"></div>

### 4. Kelvin connection in LDO (theory)

Now let's take a look at more complex circuit - [a low-dropout regulator (LDO)](/category/Circuits/article/circuitsLDO), 
which contains a resistive feedback:

<br/> <img src="http://localhost:3000/images/circuits/kelvinLDO1.svg" alt="Low dropout regulator (LDO) schematic" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Low dropout regulator (LDO)</p>

In this case, using a conventional feedback connection LDO regulates the voltage at the output of the pass device 
$V_{force}$. When the 
load current is flowing through the routing resistance $R_{trace}$ it causes the output voltage of the LDO to deviate 
from $V_{ref}$ by $V_{drop} = I_{L}R_{trace}$. Since the feedback is derived from $V_{force}$ and not from $V_{out}$, 
the feedback loop (and error amplifier in particular) doesn't see that deviation of the $V_{out}$ from $V_{ref}$.


The solution is to **separate the feedback voltage from the PMOS device output** by having two outputs - $V_{force}$ 
and $V_{sense}$:

<br/> <img src="http://localhost:3000/images/circuits/kelvinLDO2.svg" alt="Low dropout regulator (LDO) schematic with Kelvin connection" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Low dropout regulator (LDO) schematic using Kelvin connection</p>

Let's say, $V_{force}$ is set to be equal to the $V_{ref}$ by the loop, then:

$$
V_{out} = V_{force} - I_{L}R_{trace}
$$ 

Considering the same trace resistance in the $V_{out}$ to $V_{sense}$ path, the voltage drop will be:

$$
V_{drop2} = I_{q}R_{trace}
$$

, where $I_q$ is the quiscent current, defined by the total feedback resistance ($R_{fb1} + R_{fb2}$). As $I_q$ is 
usually very small compared to the 
load current, the voltage drop will be also very small, delivering almost entire value of the true output voltage to the 
feedback. We can now say that true output voltage value is fed back into the loop.

<br/>

<div id="kelvinLDOExample"></div>

### 5. Kelvin connection in LDO (example)

For an LDO circuit, let's assume the following:

- $V_{ref} = 0.9V$
- $V_{out} = 1.8V$
- $I_{load} = 100mA$
- $R_{trace} = 1\\Omega$
- $R_{fb1} = R_{fb2} = 50k\\Omega$





<u><b> Conventional connection: </b></u>

<br/> <img src="http://localhost:3000/images/circuits/kelvinLDOConventionalExample.svg" alt="LDO example (conventional connection)" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">LDO example (conventional connection)</p>

$$
V_{force} = V_{ref} = 1.8V 
$$

$$
V_{out} = V_{force} - I_{L}R_{trace} = 1.8V - 100mA*1\\Omega = 1.7V 
$$

The feedback voltage is:

$$
V_{fb} = V_{force} \\frac{R_{fb2}}{R_{fb1} + R_{fb2}} =  1.8V \\frac{50k\\Omega}{50k\\Omega + 50k\\Omega} = 0.9V
$$

In this case, $V_{fb} = V_{ref}$, while the output of an LDO is 1.7V instead of 1.8V, producing an error at the output:

$$
\\Delta V_{out} = \\frac{V_{out}}{2V_{ref}} = \\frac{1.7V}{1.8V} = 6\\%
$$

</br>

<u><b> Kelvin connection: </b></u>

<br/> <img src="http://localhost:3000/images/circuits/kelvinLDOKelvinExample.svg" alt="LDO settling using Kelvin connection" style="display: block; margin-inline: auto; width: min(80%, 180rem)" /> 
<p style="display: block; text-align: center">LDO settling using Kelvin connection</p>

If the **force** and **sense** paths are different:

$$
V_{force} = V_{ref} = 1.8V 
$$

$$
V_{out} = V_{force} - I_{L}R_{trace} = 1.8 - 100mA*1\\Omega = 1.7V 
$$

$$
V_{sense} = V_{out} - I_{q}R_{trace} = 1.7V - 18\\mu A*1 \\Omega = 1.699982V
$$

The feedback voltage is:

$$
V_{fb} = V_{sense} \\frac{R_{fb2}}{R_{fb1} + R_{fb2}} =  1.699982V \\frac{50k\\Omega}{50k\\Omega + 50k\\Omega} = 0.85V
$$

Since $V_{fb}$ is not equal to $V_{fb}$, the loop will drive $V_{force}$ to become $1.799982V$, 
which will make $V_{sense}$ to be equal to:

$$
V_{sense} = V_{out} - I_{q}R_{trace} = 1.799982V - 17 \\mu A*1 \\Omega = 1.799965V
$$

So that the feedback voltage becomes:

$$
V_{fb} = V_{sense} \\frac{R_{fb2}}{R_{fb1} + R_{fb2}} =  1.799965V \\frac{50k\\Omega}{50k\\Omega + 50k\\Omega} = 0.9V
$$

In that case, the output voltage error when the LDO's loop is locked will be:

$$
\\Delta V_{out} = \\frac{V_{out}}{2V_{ref}} = \\frac{1.799982V}{1.8V} = 0.001\\%
$$




    
