---
description: "This article covers IC manufacturing steps, basic components such as MOSFETs, resistors and capacitors and their types"
---

## IC Layout Basics 

### Table of Contents
1. [CMOS process](#CMOSprocess)
2. [CMOS Inverter cross-section](#inverterCrossSection)
3. [Mask-related effects, distortion of light](#maskEffects)
4. [CMOS transistors. Fingers and Multipliers](#fingersMultipliers)
5. [Capacitors](#capacitors)
6. [Resistors](#resistors)



<div id="CMOSprocess"></div>

### 1.CMOS process
Fabrication of the CMOS integrated circuit is a multistep process, that takes a lot of efforts to achieve good 
performance and yield. Manufacturing of the IC is very similar to cooking a very tall and fancy burger - it starts from 
the $Si-$substrate (bottom bun), adding different layers to create structures (cheese, lettuce, patty) and covering 
everything with a top metal and protection oxide (top bun). You can see the simplified manufacturing process and the 
typical IC cross-section on the image below.

<!--<br/> <img src="http://localhost:3000/images/layoutBasics/cross-section.svg" alt="IC Cross-section" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> -->
<!--<p style="display: block; text-align: center">IC Cross-section</p> -->

<!--<br/> <img src="http://localhost:3000/images/layoutBasics/manufacturing.svg" alt="IC manufacturing steps" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> -->
<!--<p style="display: block; text-align: center">IC manufacturing steps</p> -->

<br/> <img src="http://localhost:3000/images/layoutBasics/cross-section-manufacturing.svg" alt="IC Cross-section and manufacturing steps" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">IC Cross-section and manufacturing steps</p> 

<div id="inverterCrossSection"></div>

### 2. CMOS Inverter cross-section

Let's have a look on a very basic circuit - CMOS inverter in layout. CMOS inverter contains just 2 devices - PMOS and 
NMOS transistors. Both devices are manufactured in the substrate of a p-type. In a standard CMOS process, PMOS device 
is manufactured in NWELL (n-type pocket) and NMOS is manufactured in p-substrate (or PWELL). P-substrate is connected 
to ground and NWELL is connected to the supply voltage (VDD). This measure is used to ensure correct device performance 
and prevent [latch-up](/category/Layout/article/layoutDependentEffects).

<br/> <img src="http://localhost:3000/images/layoutBasics/inverter-cross-section.svg" alt="CMOS inverter cross-section" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">CMOS inverter cross-section</p>
 
Because PMOS device is formed in its own well, the body of the PMOS (NWELL) can be connected to any potential, required 
by design, not necessarily to VDD. On the other hand, the body of the NMOS device has to be connected to the ground 
**only**, because it is formed in a substrate, which should always be connected to the ground.

> **Standard process summary**:
> - PMOS body can be connected to any potential;
> - NMOS body can be connected only to ground (shorted to the substrate);


<br/> <img src="http://localhost:3000/images/layoutBasics/standard-process-substrate.svg" alt="Substrate connection in standard CMOS process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Substrate connection in standard CMOS process</p> 

In a **Deep-NWELL (or triple-well) process**, the PWELL of the NMOS device is separated from the p-substrate by the 
Deep NWELL, which allows designers to connect the body of the NMOS device to any potential, like in PMOS. This allows 
better design flexibility, but at the cost of the area, occupied by extra wells. Moreover, Deep-NWELL is very effective 
in insulating sensitive devices from the substrate noise. 


 <br/> <img src="http://localhost:3000/images/layoutBasics/DNWELL-substrate.svg" alt="Substrate connection in Deep NWELL CMOS process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Substrate connection in Deep NWELL CMOS process</p> 


Deep NWELL connections:
- P-sub is connected to ground;
- NWELL is connected to the supply potential (VDD);
- Internal PWELL is connected to any potential required by design. 

 
> **Deep NWELL process summary**:
> - PMOS body can be connected to any potential;
> - NMOS body can be connected to any potential;
> - Can be used to insulate sensitive devices from the substrate noise;
> - Requires more layout area;
> - More expensive to manufacture (requires extra mask).


<div id="maskEffects"></div>

### 3. Mask-related effects, distortion of light

**Lithography** is a key process in the fabrication of CMOS devices. It involves using light (usually extreme 
ultraviolet, EUV) to transfer patterns from a mask onto a thin layer of photosensitive material, called photoresist, 
that covers the silicon wafer. The process starts by coating the substrate with a photosensitive material known as a 
**photoresist**. A **photomask**, which contains the desired pattern, is then positioned over the photoresist. Light is 
projected through the photomask, selectively exposing specific regions of the photoresist. This exposure causes a 
chemical change in the affected areas, making them either soluble or insoluble in a developer solution. Once developed, 
the pattern is transferred onto the substrate using techniques such as etching, chemical vapor deposition, or 
ion implantation.


<br/> <img src="http://localhost:3000/images/layoutBasics/photolithography.png" alt="Photolithography process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Photolithography process</p> 





In the early days of semiconductor manufacturing, **lithography** involved feature sizes much larger than the 
wavelength of light used. Today, feature sizes have shrunk to dimensions smaller than the wavelength of even ultraviolet 
light. This mismatch causes significant deviations between the intended mask design and the actual features printed on 
the wafer.

<br/> <img src="http://localhost:3000/images/layoutBasics/photolithography-mask.png" alt="Photolithography process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Photolithography process</p>  

**Optical Proximity Correction (OPC)** is an advanced mask engineering technique designed to improve the accuracy of 
transferring a layout pattern onto a wafer. It achieves this by modifying the mask geometry to compensate for predictable 
distortions that occur during imaging and subsequent processing steps.   

<br/> <img src="http://localhost:3000/images/layoutBasics/OPC.png" alt="Pattern distortion and correction through OPC" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Pattern distortion and correction through OPC</p> 


<div id="fingersMultipliers"></div>

### 4. CMOS transistors. Fingers and Multipliers

In the analog design, we often use large-sized transistors, that help us achieve desired gain or current. Usually,
such transistors have a large $W/L$ ratio which makes them more sensitive to the manufacturing and temperature gradients.
Moreover, matching is often required for such devices. For these purposes, transistors are folded by using fingers or multipliers.
The main difference between fingers and multiplier is that multipliers are separate devices, where fingers are stacked
to form a single device. 


<br/> <img src="http://localhost:3000/images/layoutBasics/single-finger-parasitics.svg" alt="Fingers vs Multipliers" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Single-finger device parasitics</p> 

Fingers are serving one more important purpose in analog design - parasitics reduction. When we have a single device
with the width $W_n$ and length $L_n$, the main device parasitics are the source-bulk capacitance $C_{SB} = C_{SB}'$ and the 
drain-bulk capacitance $C_{DB}= C_{DB}'$. If the same device has 2 fingers, $W_n/2$ width each and length $L_n$, then the
 source (or drain) area will be shared between them. This will lead to the parasitics being $C_{SB1} = C_{SB}'/2$, 
 $C_{SB2} = C_{SB}'/2$ and $C_{DB} = C_{DB}'/2$. Therefore, the parasitic capacitance of the drain area is reduced by half, 
 which positively affects the speed of the device. Also, because the drain area is shared, drain resistance is also reduced by half.
 

<br/> <img src="http://localhost:3000/images/layoutBasics/finger-parasitics.svg" alt="Fingers vs Multipliers" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Multi-finger device parasitics</p> 


Apart from this, the polysilicon gate of the MOSFET has also some substantial resistance, making the gate voltage potential 
 distribution uneven hereby negatively affecting the performance. In the case of the two-finger device, the gate will 
 look like two hal-sized resistors in parallel, reducing the total resistance by the factor of 2.
 
 > **Key points of using fingers:**
 > - Reduced parasitic capacitance of the drain/source;
 > - Reduced parasitic resistance of the drain/source;
 > - Reduced gate resistance;
 > - Improved speed and resistance of the device;
 > - Reduced area;
 > - Simplified matching;


<div id="capacitors"></div>

### 5. Capacitors

#### 5.1 Capacitor Types in CMOS Technology  

In CMOS technology, there are three main types of capacitors:  

- MOS Capacitor 
- Metal-Oxide-Metal (MOM) Capacitor  
- Metal-Insulator-Metal (MIM) Capacitor  


<br/> <img src="http://localhost:3000/images/layoutBasics/capacitor-types-1.svg" alt="Capacitor types" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Capacitor types</p> 


#### 5.2 Metal-Oxide-Semiconductor (MOS) Capacitors  

A **Metal-Oxide-Semiconductor (MOS) capacitor** functions similarly to a transistor used as a capacitor. 

In this structure:  
- The **gate** serves as the **top plate** of the capacitor.  
- The **drain and source connections** form the **bottom plate**.  
- The **thin oxide layer** under the gate acts as the **insulator layer**.  

<br/> <img src="http://localhost:3000/images/layoutBasics/MOS-cap.svg" alt="MOS capacitor" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">MOS capacitor</p> 

The capacitance of a MOS capacitor varies with the DC voltage applied to the gate. Changes in gate voltage 
affect the depletion region, altering the dielectric properties and thus modifying the capacitance. 
MOS capacitors are particularly well-suited for local supply decoupling applications, where the DC voltage 
remains constant.  


#### 5.3 Metal-Insulator-Metal (MIM) Capacitors  

**Metal-Insulator-Metal (MIM) capacitors** are a type of capacitor which function similarly to a 
**parallel-plate capacitor**, where metal plates (electrodes) are separated by an insulating dielectric material. 

<br/> <img src="http://localhost:3000/images/layoutBasics/MIM-cap.png" alt="MIM capacitor" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">MIM capacitor</p> 


To maximize capacitance, MIM capacitors are often built using a **three-plate structure**. This structure 
enhances capacitance density while maintaining stable performance and low leakage current, due to the high-quality 
dielectric material used in their construction. Moreover, MIM capacitors have a high quality factor which makes them
very suitable for RF applications. **Main drawbacks** of this type of capacitor is that MOM capacitor manufacturing
requires extra mask (and corresponding layer of dielectric) and different parasitics for top and bottom plates, which 
should be taken into account while designing the circuit.


#### 5.4 Metal-Oxide-Metal (MOM) Capacitors  

**Metal-Oxide-Metal (MOM) capacitors** - is an interdigitated, multi-finger structure formed by metal layers, 
with the fingers interlocking like the clasped fingers of two hands. The plates of the capacitor are created using 
standard metal wiring lines, and optionally stitched through vias. The required capacitance is produced by the combination 
of plate-to-plate and fringe capacitances.  

<br/> <img src="http://localhost:3000/images/layoutBasics/MOM-cap.png" alt="MOM capacitor" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">MOM capacitor</p> 

In earlier technology nodes (**350nm to 90nm**), the **MOM capacitor** was the preferred choice. However, as technology 
scaled below **65nm**, fringe capacitance became dominant. The MIM capacitor utilizes both **fringe capacitance** 
and **plate-to-plate capacitance**, forming an efficient **3D structure** ideal for advanced nodes.

<br/> <img src="http://localhost:3000/images/layoutBasics/plate-to-plate-vs-fringe.svg" alt="Dominating type of capacitance vs. process node" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Dominating type of capacitance vs. process node</p> 

The fringe capacitance provides good matching characteristics compared to vertical coupling, primarily due to the 
enhanced process control of lateral dimensions rather than the thickness of metal and dielectric layers. 
To further increase capacitance density, multiple metal layers can be connected in parallel through vias, 
forming a vertical metal wall or mesh. The lowest metal layers (such as M1–M5) are typically used 
in **MOM capacitors** to maximize capacitance density, as these layers have the smallest metal line width and spacing.
This type of capacitors does not require an extra mask which makes them a very low-cost devices. 
**Main drawbacks** of this type of capacitor is that it has higher series inductance and resistance, as well as occuping 
routing metal layers, which makes routing more complicated.  


### 5.5 Capacitor types comparison

Here is the summary of the capacitor types in IC design:

<br/> <img src="http://localhost:3000/images/layoutBasics/capacitor-types-2.svg" alt="Capacitor types comparison" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Capacitor types comparison</p> 


|                                       |MOM                                                             |MIM                                                           |MOS|
|---------------------------------------|----------------------------------------------------------------|--------------------------------------------------------------|-------------------------------------------------------------------------|
|**Structure**                          |Same-layer interdigitated structure with oxide dielectric layer | Two or more metal plates separated by an insulating material |Metal gate electrode, oxide insulator layer, and semiconductor substrate |
| **Capacitance density**               |High                                                            | Moderate to high                                             |Moderate to high                                                         |
| **Capacitance variation with voltage**|Low                                                             | Low                                                          |High                                                                     |
| **Sensitivity to temperature**        |Low                                                             | Moderate                                                     |Low                                                                      |
| **Fabrication**                       |Standard                                                        | Extra mask                                                   |Standard                                                                 |
| **Parasitics**                        |High                                                            | Low                                                          |High                                                                     |


<div id="resistors"></div>

### 6. Resistors
#### 6.1 Resistor types
In CMOS technology, there are three main types of resistors:  

- Diffusion resistor ($p^+$ or $n^+$) 
- NWELL resistor 
- Polysilicon resistor
  
<br/> <img src="http://localhost:3000/images/layoutBasics/resistor-types-2.svg" alt="Different resistor types cross-section" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Different resistor types cross-section</p> 


#### 6.2 Diffusion resistor
**Diffusion resistor** - is a type of resistor which is formed in a diffusion area (as drain/source areas), separated by 
the WELL. Typically, the $p^+$ diff. resistor has a bit lower resistivity than $n^+$. On the other hand, $n^+$ diffusion 
resistor has $10-20%$ lower temperature coefficient (both TC are positive).
<!--The N+ diff. resistor - in contrast - typically has a (10 .. 20%) lower TC (both have pos. TC). The N+ diff. resistor -->
<!--has a small positive VC (voltage coefficient), whereas the P+ resistor has a much higher, but negative VC.-->

#### 6.3 NWELL resistor
**NWELL resistor** - is a type of resistor which is formed in a well area (NWELL or PWELL). It uses the resistance of 
lightly doped area of the wel to form a resistor.
Both diffusion and NWELL resistors are formed directly in the substrate, that's why they have a natural parasitic 
capacitance caused by the reverse-biased junction formed between the diffusion resistor and the opposing doping of the 
substrate.

#### 6.4 Polysilicon resistor

**Polysilicon resistor** - is a type of resistor which is made on top of the STI layer, using polysilicon (which is 
primarily a gate material). The polysilicon itself is quite a resistive material, that's why when it is used to form a 
gate it is usually salicided (doped) to increase its conductance. More advanced versions of the polysilicon resistor can 
be unsalicided, in order to increase the resistivity.

<!--Beyond this, diffusion resistors produce 10–100ohms/square, requiring more area for the same resistor value than polySi, -->
<!--which can produce 30–100ohms/square unshielded, and 100–500ohms/square shielded.-->
Accuracy of polysilicon resistors is way higher than diffusion resistors, +-3% absolute vs. +- 35%  for diffusion 
resistors. The temperature coefficient of polysilicon resistors is about $1/3$ to $2/3$ that of diffusion resistors, 
and the voltage coefficient is about half diffusion resistors.
Additionally, because Polysilicon resistors are above the oxide layer, they can be laser-trimmed for higher accuracy or 
used as fuses without damaging the substrate.

#### 6.5 Metal resistor
**Metal resistor** - is a type of resistor that uses resistivity of the routing metal. This type of resistors has a lot 
of drawbacks, such as low resistivity, large capacitive and inductive parasitics and sensitivity to EM requirements. 
But this type of resistors become very handy while creating relatively small resistors as well as net connections in 
schematic. The common example is the separation of the positive and negative terminals in inductor (otherwise
tools will consider inductor as a plain short), creating ASIC options and programming features.


#### 6.6 Resistor types comparison
Here is the summary of the resistor types used in IC design:

<br/> <img src="http://localhost:3000/images/layoutBasics/resistor-types-1.svg" alt="Resistor types" style="display: block; margin-inline: auto; width: min(80%, 60rem)" /> 
<p style="display: block; text-align: center">Resistor types</p> 

<!--<br/> <img src="http://localhost:3000/images/layoutBasics/resistor-area.png" alt="Resistor area" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> -->
<!--<p style="display: block; text-align: center">Resistor area</p> -->
