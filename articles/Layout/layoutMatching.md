---
id: layoutMatching
title: "Matching in layout"
description: "Matching techniques in layout and main principles"
---

## Matching in layout 

### Table of Contents
1. [Introduction](#introduction)
2. [Matching techniques](#matchingTechniques)
3. [Placement](#placement)
4. [Dummies](#dummies)


<div id="introduction"></div>

## 1. Introduction

**Matching** - is a very important technique in Analog IC layout. It helps to compensate a lot of undesirable 
[layout-dependent effects](/category/Layout/article/layoutDependentEffects). In IC design there are 
multiple sources of nonidealities that affecting IC performance. We can split them into two categories: 
**manufacturing-related** and **environmental**. **Manufacturing-related sources** includes dopant gradients, oxide 
thickness gradients, and mechanical stress, which are very hard to predict and simulate. **Environmental factors** 
includes temperature gradients which is also hard to predict. 


<br/> <img src="http://localhost:3000/images/layout/gradient-types.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient types</p>  

There are two main types of mismatch: **systematic** and **random** mismatch. 

<br/> <img src="http://localhost:3000/images/layout/mismatch-types.svg" alt="Mismatch types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Mismatch types</p>  


<br/> <img src="http://localhost:3000/images/layout/mismatch-compensation.svg" alt="Mismatch compensation techniques" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Mismatch compensation techniques</p>  


<div id="matchingTechniques"></div>

## 2. Matching Techniques

**Matching** - is a very useful technique in IC layout targeting similar performance from every device in analog design. 
Let's take a look on a very simple example - a current mirror (1:2). Reference current $I_{ref}$ is copied from device A
(2 fingers, 2 multipliers) to the device B (2 fingers, 4 multipliers) producing an output current $I_{out}=2I_{ref}$. For a current 
mirror to exhibit a good performance it is required that both devices *A&B* have the same performance. First, let's have 
a look on the placement without matching and apply a linear gradient to it:

<br/> <img src="http://localhost:3000/images/layout/gradient-no-matching.svg" alt="Gradient impact on unmatched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient impact on unmatched devices</p>    

Now we can summarize the total impact on each device:  
$$A = 1 + 2 = 3$$


$$B = 3 + 4 + 5 + 6 = 18$$

Keeping in mind that the device B is 2 times larger than device A:

$$[A = 3] < [B = 9] $$

We can clearly see, that the impact of the linear gradient on the device B is 3 times larger than on the device A. 
It means that if we have any gradient on this current mirror (i.e. dopants gradient), device B will have, for 
example, a different $V_{th}$, and this will negatively affect the accuracy of the current mirror circuit.

Let's now apply an **interdigitation** pattern to our devices. In order to have a symmetry in our placement, we should 
implement a $$BBAABB$$ pattern:

<br/> <img src="http://localhost:3000/images/layout/gradient-with-matching.svg" alt="Gradient impact on the matched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient impact on the matched devices</p> 

In this case, the total impact on each device:  
$$A = 3 + 4  = 7 $$


$$B = 1 + 2 + 5 + 6 = 14$$

Keeping in mind that the device B is 2 times larger than device A:

$$[A = 7] = [B = 7] $$  

We can clearly see, that the impact of the linear gradient on both devices is equal and will not affect the accuracy of 
the circuit. Now, let's take a 2-dimensional example and see, how dummies together with matching help us to achieve the 
best performance. 

Let's say we have the same circuit - a simple current mirror (1:2) that is using a **common centroid** technique and 
surrounded by dummies. If we apply a linear gradient to this structure, devices will stay matched, as in the previous 
example (red gradient):  

<br/> <img src="http://localhost:3000/images/layout/dummy-gradients.svg" alt="Gradient impact on the matched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient impact on the matched devices</p>   

Another effect, that we want to take into account here is the [WPE effect](/category/Layout/article/layoutDependentEffects#WPE). 
This effect impacts devices, placed close to the well edge (blue gradient):

<br/> <img src="http://localhost:3000/images/layout/dummy-wpe.svg" alt="Gradient impact on the matched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient impact on the matched devices</p>  

By surrounding our core devices with dummy devices around, we are achieving two main things:
 - Allowing sufficient distance for the core devices from the well edge to prevent WPE impact;
 - Creating equal edge conditions for core devices to reduce [mask effects](/category/Layout/article/layoutBasics#maskEffects).

<br/> <img src="http://localhost:3000/images/layout/dummy-wpe-gradients.svg" alt="Gradient and WPE impact on the matched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient and WPE impact on the matched devices</p>  




<div id="placement"></div>


## 3. Placement

Correct placement of the devices is playing a vital role in layout. Placing devices aas evenly as possible will reduce 
a lot of unwanted effects. Let's have a look on the placement examples and discuss their impact on the design.

<br/> <img src="http://localhost:3000/images/layout/wrong-placement-example-1.svg" alt="Examples of the wrong placement" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Examples of the wrong placement</p>    

For the first example on the image above, we can see that two devices has a different orientation. This will lead to 
a variation in device parameters due to gradients that are going along the different axis of symmetry.
It worth mentioning that it is always recommended to keep gate orientation same for all the devices in the design, and for
more advanced technologies (28nm and below) it is mandatory. The second example shows two devices with different widths. 
In this case, the main problem is the different size of the masks that will lead to different edge-effects for each device.
The third example shows two devices with a different lengths. Those devices will also have a different size masks, 
affecting the performance in the same way as in a previous example.   

We should also be aware of not only the shape and orientation of the matched devices themselves, but also about the 
surroundings. ASIC are usually contain sensitive analog blocks, such as amplifiers, bandgaps and comparators together with a noisy 
or high-current blocks, such as LDOs, drivers and digital logic. Those blocks may create a lot of substrate noise and 
temperature gradients, that may impact the performance of the sensitive devices.

<br/> <img src="http://localhost:3000/images/layout/wrong-placement-example-2.svg" alt="Examples of the wrong placement in respect of the agressor" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Examples of the wrong placement in respect of the agressor</p>  

As shown in the example above, in the first case, the location of the matched devices with respect to the aggressor 
is incorrect, because the gradient, caused by the aggressor is affecting both devices unequally. In the second case, both 
devices are located symmetrically to the aggressor, hereby reducing and equalising the stress on the sensitive devices.


<div id="dummies"></div>


## 4. Dummies

As we discussed previously, dummy devices are very useful in preventing layout-dependent effects and protecting the 
core devices. However, we have to be careful while placing the dummies, because they may cause unwanted parasitics. 
Basically, in layout we can place matched devices with spacing or abut them. 
[Abutting](/category/Layout/article/layoutBasics#fingersMultipliers) the matched devices has a lot of benefits, such as 
reduction in parasitic capacitance and resistance. Let's have a look on the matched structure with spacing:

<br/> <img src="http://localhost:3000/images/layout/dummy-spaced-parasitics.svg" alt="Spaced dummy placement" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Spaced dummy placement</p> 

In this case, all our devices are equally spaced and all terminals of the dummy devices are shorted and connected to the 
substrate potential (ground for NMOS and power for PMOS devices). As soon as all terminals of the dummy device are 
shorted, we don't have any extra parasitics.

<br/> <img src="http://localhost:3000/images/layout/dummy-abutted-parasitics.svg" alt="Abutted dummy placement" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Abutted dummy placement</p>  

If we want to abut our core devices together, we have to abut them with dummy devices to achieve equal edge effects 
for core devices. In this example, devices A & B are sharing source terminals connected to the ground while abutting. 
SO, after abutting of the core devices, the only possible connection for the dummies is $I_{out}$ terminal. In this 
case, drain, source and gate of the dummy will be connected to the $I_{out}$ whereas the bulk terminal will remain 
connected to the ground. This will create a MOS capacitor structure, where one terminal is connected to the ground 
and the other is connected to $I_{out}$, utilizing the $C_{SB}$ of the dummy device. This parasitic capacitance is 
connected to the drain terminal of the device B, which will cause extra loading and reduction in speed. Such connection 
of the dummy devices will be even more critical for the structures like differential pair, where parasitic capacitance 
will not ony cause the loading and bandwidth reduction, but can even unbalance the circuit and lead to an increased 
offset.

> Dummy key points:
> - Dummy placement style follows the core device placement (spaced or abutted);
> - Spaced placement doesn't add parasitics but lacks the benefit of the parasitics reduction;
> - Abutted placement reduces core devices resistance and capacitance, but suffers from the dummy $C_{SB}$ parasitics;

<br/> <img src="http://localhost:3000/images/layout/matching-summary.svg" alt="Matching summary" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Matching summary</p>  

<br/> <img src="http://localhost:3000/images/layout/matching-methodology.svg" alt="Matching methodology" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Matching methodology</p>  


        
