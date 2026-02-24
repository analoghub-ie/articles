---
id: currentMirrors
title: "Cascode current mirror - a practical guide"
description: "Kelvin connection for IC design explained"
hideInProd: true
---

##  Current mirrors

### Table of Contents

1. [Introduction](#intro)
2. [Basic current mirror](#basicCM)
   1. [Multiplying/dividing current](#basicMult)
   2. [Layout considerations](#basicLayout)
3. [Cascode current mirror](#cascode)
4. [Self-biased current mirror](#selfBiased)



<br/>

<div id="intro"></div>

### 1. Introduction

Current mirror - is one of the most important building blocks in analog design. It's widely used in a broad range of 
circuits from operational amplifiers to DACs. Its main purpose is to provide a stable current (which can be equal to the 
reference one, or a fraction/multiple of it) , irrespective of the output voltage, supply and process variation. 
In this article we will discuss 3 most-used architectures of the current mirror - a basic current mirror, cascode 
current mirror and self-biased cascode current mirror.


<br/>

<div id="basicCM"></div>

### 2. Basic current mirror

Let's start from the basic NMOS current mirror, containing just two devices - $M_1$ and $M_2$:

<br/> <img src="http://localhost:3000/images/circuits/cmSimple.svg" alt="Basic current mirror circuit" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Basic current mirror circuit</p>

The reference current $$I_0$$ is forced through the diode-connected transistor $M_1$. As we remember from the basics, 
a diode connection of the MOSFET results in $V_G  = V_D$ , hence $V_{GS}  = V_{DS}$, guaranteeing $M_1$ operation in saturation. 
In other words, $M_1$ will self-adjust its gate voltage to conduct the current, provided by $I_0$. The only limitation here 
is the width of $M_1$ - the channel should be sufficiently large to allow all current to flow.

Transistor $M_2$ is sharing the gate connection with $M_1$ - ensuring $V_{GS1} = V_{GS2}$. Taking this into account, 
we can say that the current flowing through  $M_1 = M_2$ (considering $V_{out} = V_{DS1}), if both transistors have 
the same *W/L* ratio.

The assumption $V_{out} = V_{DS1}$ is a very important thing here as the deviation of $V_{out}$ from $V_{DS1}$ value 
will result in current difference between $M_1$ and $M_2$ due to **channel length modulation** effect:

<br/> <img src="http://localhost:3000/images/circuits/cmVdsVariation.svg" alt="Output current variation due to $V_{out}$" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Output current variation due to $V_{out}$</p>

<!--Spoiler-->
<details> 
  <summary> <b>Channel length modulation effect </b> </summary>

**Channel length modulation** refers to the decrease in the effective channel length as the drain-source voltage 
$(V_{DS})$ increases in saturation. This effect causes the drain current $(I_D)$to increase slightly with $V_{DS}$, 
rather than remaining perfectly constant, resulting in a finite output resistance $R_0$.
</details>

The channel length modulation effect results in a slope of $I_d/V_{DS}$ graph, which can be reduced by increasing the 
length of $M_1$ and $M_2$:

<br/> <img src="http://localhost:3000/images/circuits/cmVdsId.svg" alt="Vds vs Id variation" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Vds vs Id variation</p>

Hereby, it's important to use long-channel devices for the basic current mirror to reduce output current variation due 
to the $V_{out}$ variation.

<br/>

<div id="basicMult"></div>

#### 2.1 Multiplying/dividing current
Current mirrors allow us to copy currents, that have a different values from the reference. For example, if we want to 
achieve $2xI_0$ at the output, we would have to double the width of the $M_2$ device. Multiplying the width of $M_2$ 
essentially means creating an extra leg, carrying the reference current and because these devices are identical 
(by geometry, $V_{GS}/V_{DS}$), they will carry the same current. This representation is very useful in terms of layout.

<br/>

<div id="basicLayout"></div>

#### 2.2 Layout considerations
Current mirror performance relies on the similar behavior of the devices and that's why it's important to match them in layout
(link to layout article)

<br/>

<div id="Cascode"></div>

### 3. Cascode current mirror
As we've seen in a previous section, the main drawback of the basic current mirror circuit is the output current 
variation due to the $V_{out}$ variation (and the current change due to the channel length modulation). In order to 
improve the stability of the output current in a wide range of $V_{out}$, the cascode current mirror circuit has been 
introduced. The main idea behind this circuit is to add two extra devices, $M_{C1}$ and $M_{C2}$ as shown:

<br/> <img src="http://localhost:3000/images/circuits/cmCascodeBias.svg" alt="Cascode current mirror circuit" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Cascode current mirror circuit</p>

If the appropriate bias voltage Vc is selected, the $M_{C2}$ will work as a "shield" for $M_2$, maintaining the drain 
voltage of MC almost constant. Let's dive deeper to understand how to select this voltage.

For a proper function of $M_{C1}$ and $M_{C2}$ we would like to keep them in saturation. Let's assume that cascode 
transistors threshold voltage has a value $V_{THC}$. So, in order to keep $M_{C1}$ in saturation, the gate voltage 
should be:

$$
V_{GSC1} = V_{TH}
$$

As the source voltage of $M_{C1}$ is equal to the drain voltage of the $M_1$ ( and to $V_{DS1}$), to keep $M_{C1}$ in 
saturation we need:

$$
V_{C} = $V_{DS1}$ + $V_{THC}
$$

<br/>

<div id="selfBiased"></div>

### 4. Self-biased current mirror
<br/> <img src="http://localhost:3000/images/circuits/cmSelfBiased.svg" alt="Self-biased current mirror circuit" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Self-biased current mirror circuit</p>

<br/> <img src="http://localhost:3000/images/circuits/cmExternalBias.svg" alt="Externally biased cascode current mirror" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Externally biased cascode current mirror</p>




    
