---
id: layoutMatchingPatterns
title: "Matching patterns"
description: "Dive into interdigitation and common centroid"
hideInProd: false
---

## Matching patterns in layout

### Table of Contents
1. [Introduction](#introduction)
2. [Matching principles](#matchingGoldenRules)
3. [Matching patterns](#matchingPatterns)
4. [Interdigitation](#interdigitation)
5. [Common Centroid](#commonCentroid)
6. [Matching guide](#matchingGuide)

<div id="introduction"></div>

## 1. Introduction

In the previous [article](/category/Layout/article/layoutMatching) 
we spoke about the matching theory in analog layout. In this article we will dive deeper into matching 
patterns, such as **Interdigitation** and **Common Centroid** and how to create your own matching pattern in layout. We 
will also discuss some practical aspects of matching.


<div id="matchingGoldenRules"></div>

## 2. Matching principles

While creating a layout pattern we should follow a few simple, but important rules that will ensure that our array 
provides a proper matching to every device and neutralises negative effects, ensuring the best possible performance of 
the circuit. Here are the rules:


1. **Geometry** – Every segment of the array should be unit-sized and have the same geometry; Orientation of all devices 
should be the same;

<br/> <img src="http://localhost:3000/images/layout/matchingRule1.svg" alt="Geometry" style="display: block; margin-inline: auto; width: min(80%, 60rem)" /> 

2. **Symmetry** – Array segments should be placed symmetrically for both X- and Y-axes; 

<br/> <img src="http://localhost:3000/images/layout/matchingRule2.svg" alt="Symmetry" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<!--**Coincidence** – Geometrical centres of the array should coincide; -->
3. **Compactness** – The array should be as compact as possible, ideally square-shaped;

<br/> <img src="http://localhost:3000/images/layout/matchingRule3.svg" alt="Compactness" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 

4. **Distribution** – Array segments should be distributed as evenly as possible;

<br/> <img src="http://localhost:3000/images/layout/matchingRule4.svg" alt="Distribution" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 

5. **Positioning** – Matched array should be placed as far as possible from potential aggressors (high current/frequency 
blocks etc.)

<br/> <img src="http://localhost:3000/images/layout/matchingRule5.svg" alt="Positioning" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 

6. **Edging** – Array segments should be surrounded by dummies to ensure equal edge conditions for core devices and 
protect from [layout-dependent effects](/category/Layout/article/layoutDependentEffects).

<br/> <img src="http://localhost:3000/images/layout/matchingRule6.svg" alt="Edging" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 

<div id="matchingPatterns"></div>

## 3. Matching Patterns

The main goal of matching is to achieve an equal impact of non-idealities in CMOS process for the critical structures, 
such as differential pairs and current sources. There are plenty of factors that are playing against precision of the 
device manufacturing - temperature, dopants, etc. gradients. We cannot eliminate those gradients from the manufacturing 
process, right? 

Instead, we can fight against those effects in layout by distributing the critical devices in the way that every device 
sees the same impact and will cancel it, just as differential signalling.
There are two main types of matching patterns in layout - **Interdigitation** and **Common Centroid**. Let's walk 
through them and understand each other's application. 

<br/> <img src="http://localhost:3000/images/layout/matchingPatterns.svg" alt="Matching patterns" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Matching patterns</p> 

<div id="interdigitation"></div>

## 4. Interdigitation

**Interdigitation** - is the simplest way of matching a circuit. This pattern is suitable for the simple current mirrors, 
voltage dividers (resistive or capacitive) and simple biasing circuits. Interdigitation provides good matching 
properties against 1D-gradients and is suitable for the simple circuits. **The main concept** is that you should create 
an imaginary center line and place your devices symmetrically, relative to this line. The simplest example of that is 
so called **"ABBA"** pattern:

<br/> <img src="http://localhost:3000/images/layout/interdigitation1.svg" alt="The classics of matching - the ABBA pattern" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">The classics of matching - the "ABBA" pattern</p> 

Let's compare an unmatched array and an interdigitated array by applying a simple 1D gradient to both structures:

<br/> <img src="http://localhost:3000/images/layout/interdigitationGradient.svg" alt="Applying a linear gradient to the devices" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Applying a gradient for the devices</p>

Now, let's count the impact for each device:

<b><u>Unmatched:</u></b>

$$
A = 1 + 2 = 3
$$

$$
B = 3 + 4 = 7
$$

That's a huge difference, isn't it? Imagine those devices being your input differential pair - this would cause a wild 
offset due to the asymmetry of those devices!

<b><u>ABBA pattern:</u></b>

$$
A = 1 + 4 = 5
$$

$$
B = 2 + 3 = 5
$$

... meaning that both devices are seeing the same impact!

We can apply the same principle (centerline symmetry) even if we have more devices:


<br/> <img src="http://localhost:3000/images/layout/interdigitation2.svg" alt="Interdigitation pattern for 4A and 4B devices" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Interdigitation pattern for 4A and 24 devices</p>

Even if we have more devices, the principle stays the same. Here is the example of **8A**, **4B** and **4C** devices:

<br/> <img src="http://localhost:3000/images/layout/interdigitation3.svg" alt="Interdigitation pattern for 8A-4B-4C array" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Interdigitation pattern for 8A-4B-4C array</p> 

To check that our pattern is still correct, we can apply the same procedure, as in our first **ABBA** example: 

<br/> <img src="http://localhost:3000/images/layout/interdigitation3Gradient.svg" alt="Interdigitation gradient for 8A-4B-4C array" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Interdigitation gradient for 8A-4B-4C array</p>  

Applying a linear gradient to all devices and calculating the impact for each segment, we get:

$$
A = 1 + 2 + 3 +4  +5 +6+7+8 =36 
$$

$$
B = 2 + 3 +6+7= 18
$$

$$
C = 1 + 4 +5+8=18
$$

Taking into account that $$A = 2B = 2C$$, we can see that all devices in this array are seeing the same impact from 
1D gradient applied. 

<b><u>Interdigitation matching procedure:</b></u>
1. Make sure the smallest device has at least 2 multipliers and 2 fingers (in case of MOS device);
2. Each device has the same finger width and length. Use multipliers to achieve the required total width;
3. Place the smallest device in the center of the pattern;
4. Keep adding devices on the left and on the right, starting from the smallest devices.

The following tutorial shows how to create an **interdigitation** pattern for a current mirror in Cadence Layout GXL:

<br/>

<div style="display: block; margin-inline: auto; width: min(90%, 100rem); aspect-ratio: 16/9">
    <iframe 
        src="https://www.youtube.com/embed/hy_APHz8XwQ?list=PL0oLvNvFrW9xbe26NgdX-HsknCJ4ioGT7" 
        alt="Current Mirror Layout Using Modgen (Cadence Layout GXL)" 
        style="width: 100%; height: 100%; border: none;">
    </iframe>
</div>

<!--<p style="display: block; text-align: center">Current Mirror Layout Using Modgen (Cadence Layout GXL)</p> -->


<div id="commonCentroid"></div>

## 5. Common Centroid

**Common Centroid** is more advanced matching technique, suitable for more complex analog structures, such as 
differential pairs, BJT arrays in Bandgaps, R/C DAC array etc. **The difference between interdigitation and 
common centroid** is that common centroid provides better matching for 2D gradients, which is critical for the large 
arrays and advanced (below 28nm) nodes.

The main idea behind common centroid is that we make our array symmetrical of the common centre. In other words, the array 
should be symmetrical in both **X-** and **Y-** axes. 

Let's dive in through an example - a complex current mirror that has **2A**, **4B** and **8C** devices:

<br/> <img src="http://localhost:3000/images/layout/ccCurrentMirror.svg" alt="Current mirror example" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Current mirror example</p>  

The first step would be to draw an imaginary symmetry lines for X- and Y- axes. Then, we will place the smallest device 
on the first diagonal, as shown below:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep1.svg" alt="Place the smallest device on diagonal" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Place the smallest device on diagonal</p>  

Then, take the next smallest device (B) and place two multipliers on the opposite diagonal:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep2.svg" alt="Place next device on the opposite diagonal" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Place next device on the opposite diagonal</p>  

Repeat the process, moving from the smallest to the largest device, placing 2 devices on one diagonal at a time:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep3.svg" alt="Keep placing the devices interleaving the diagonals" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Keep placing the devices interleaving the diagonals </p>  


Now we have two possible options how to place segment of the device $$C$$:
<br/> <img src="http://localhost:3000/images/layout/layoutCCStep4.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center"></p>  

Let's fill the remaining segments of $$C$$:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep5.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center"></p>  

And add dummies to complete the pattern:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep6.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center"></p>  

Now, let's verify our patterns and check if it works as a matched array. We will follow the same procedure as for 
interdigitation pattern, but apply the gradient in two directions as shown below:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep7.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Applying 2D gradient to both arrays</p>  

The total impact for each segment will be defined as a sum of gradient for $$X$$ and $$Y$$ axes. For example, for the 
first array, the impact for the first $$A$$ segment will be:

$$
A_1 = 3+2
$$

And for the second array:

$$
A_2 = 2+3
$$

<!--Spoiler-->
<details> 
  <summary> <b>Detailed impact calculation</b> </summary>
  <b><u>First array:</u></b>
  
   $$
   A = A_1 + A_2 = (3+2) +(2+3) = 10
   $$
   $$
   B = B_1 +B_2+B_3+B_4=(3+1)+(2+2)+(3+3)+(2+4) = 20
   $$
   $$
   C = C_1 +C_2+C_3+C_4+C_5+C_6+C_7+C_8 = (4+1)+(4+2)+(4+3)+(3+4)+(2+1)+(1+2)+(1+3)+(1+4) = 40
   $$
   
   <b><u>Second array:</u></b>
  
   $$
   A = A_1 + A_2 = (3+2) +(2+3) = 10
   $$
   $$
   B = B_1 +B_2+B_3+B_4=(3+1)+(2+2)+(3+3)+(2+4) = 20
   $$
   $$
   C = C_1 +C_2+C_3+C_4+C_5+C_6+C_7+C_8 = (4+1)+(4+2)+(4+3)+(4+4)+(1+1)+(1+2)+(1+3)+(1+4) = 40
   $$
</details>

> **Note:** Even though devices in both arrays are facing the same impact, the second array would be more preferable, 
because it exhibits better distribution of the $$C$$ devices within the array.


<b><u>Common Centroid matching procedure:</b></u>
1. Make sure all devices are unit-sized;
2. Make sure every device has at least 2 fingers and 2 multipliers;
3. Assign one letter to each device and count its multipliers;
4. Draw a vertical and horizontal axis; the intersection would be the center of our array;
5. Imagine two diagonal cuts, $D_1$ and $D_2$;
6. Take the smallest device and place two multipliers in the center on $D_1$; if this device has more than 2 
multipliers, place them too, but on $D_2$

The following tutorial shows how to create a **common centroid** pattern for a differential pair in Cadence Layout GXL:

<br/>

<div style="display: block; margin-inline: auto; width: min(90%, 100rem); aspect-ratio: 16/9">
    <iframe 
        src="https://www.youtube.com/embed/mca7NKcTlhU?list=PL0oLvNvFrW9xbe26NgdX-HsknCJ4ioGT7" 
        alt="Differential Pair Layout Using Modgen (Cadence Layout GXL)" 
        style="width: 100%; height: 100%; border: none;">
    </iframe>
</div>

<!--<p style="display: block; text-align: center">Differential Pair Layout Using Modgen (Cadence Layout GXL)</p> -->

<div id="matchingGuide"></div>

## 6. Matching guide

So, we've learned two main matching patterns and how to implement and check them in layout. You might ask a reasonable 
question - **How to select a suitable matching pattern for an analog structure?** The answer is quite simple - the 
**Interdigitation** is a less complex method, and it would be sufficient for structures like small current mirrors and 
biasing circuits. Using this pattern will be **more area-efficient** and allows **simple routing**.

When we are talking about structures that require **maximum precision** - such as R/C DAC arrays, differential pairs - 
we have to use the **Common Centroid** to achieve the best performance. The typical analog structures and the 
corresponding matching patterns are summarized in the table below:

|Subcircuit type|**Interdigitation**|**Common Centroid**|
|---------------|:-----:|:---------------:|
|Biasing circuit|✔|\t\t\t\t|
|Current mirror |✔\t\t\t\t|\t\t\t\t|
|Current sources array|\t\t\t|✔\t\t\t\t|
|Differential pair|\t\t\t\t|✔\t\t\t\t|
|R/C ladder\t\t|✔\t\t\t\t|\t\t\t\t|
|Resistive ADC/DAC array|\t\t|✔\t\t\t\t|
|Capacitive ADC/DAC array|\t\t|✔\t\t\t\t|
|Bandgap BJT array|\t\t\t\t|✔\t\t\t\t|

Summarizing the things we discussed above we can come up with a generic matching procedure, listed below.

#### Matching procedure:
1. **Define the purpose** and type of the structure (current mirror/diff. pair etc.)
2. Define the **type of matching** required (interdigitation/common centroid)
3. Check/select **unit element sizing**:
<p style="margin-left: 15px;"><b>3a. NMOS/PMOS transistors:</b></p>
<p style="margin-left: 15px;">- All devices have the same length</p>
<p style="margin-left: 15px;">- Minimum-sized device has at least 2 fingers and (if possible) 2 multipliers</p>
<p style="margin-left: 15px;">- Other devices have at least 2 fingers</p>

<p style="margin-left: 15px;"><b>3b. Capacitive/resistive arrays:</b></p>
<p style="margin-left: 15px;">- All devices are multiples of the unit-sized device</p>

<p style="margin-left: 15px;"><b>3c. BJT arrays:</b></p>
<p style="margin-left: 15px;">- All devices are multiples of the unit-sized device</p>

4. **Shape an array** as close as possible to the square
5. **Estimate main routing** lines and reserve space for them between array elements
6. **Apply** proper **matching** pattern to the array
7. Surround the array with **dummies** and adjust their size for area efficiency
8. **Place the guard ring** and add a PWELL/NWELL layer
9. **Combine N+/P+** areas to avoid spacing DRCs.

        
