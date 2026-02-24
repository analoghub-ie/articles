---
description: "Analog Design Interview Questions"
hideInProd: true
---

### Table of Contents:
1. [RC-networks questions](#RCNetworks)
1. [OpAmp circuits questions](#opampNetworks)



<div id="RCNetworks"></div>

### 1. RC-networks questions
#### 1.1 LPF-filter transfer function and Bode Plot:
**QUESTION:** Write down the transfer function for the following circuit and draw a Bode plot.

<br/> 
<img src="http://localhost:3000/images/schematicInterview/LPF-question.svg" alt="LPF schematic" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">LPF schematic</p>

<!--Spoiler-->
<details> 
  <summary> <b>SOLUTION:</b> </summary>
That's a very simple circuit that can be represented as a voltage divider:

$$
V_{out} = \\frac{Z_C}{R + Z_C}
$$

Capacitor's impedance is equal to:

$$
Z_C = \\frac{1}{j \\omega C}
$$

Hence, 

$$ 
A_V = \\frac{V_{in}}{V_{out}} = \\frac{1}{2\\pi RC}
$$
   <br/> 
   <img src="http://localhost:3000/images/schematicInterview/LPF-bode.svg" alt="LPF Bode Plot" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
    <p style="display: block; text-align: center">LPF Bode Plot</p>

</details>


<div id="opampNetworks"></div>

### 2. OpAmp-based networks questions


#### 2.1 Non-inverting amplifier transfer function & Bode Plot
**QUESTION:** Write down the transfer function for the following circuit and draw a Bode plot.

<!--Spoiler-->
<details> 
  <summary> <b>SOLUTION:</b> </summary>
Using ideal OpAmp assumption, we can say:

$$
V_p =V_n = V_{in}
$$
Currents flowing:
$$
i_1 + i_2 = 0;
$$
$$
\\frac{ V_{out} - V_n}{ R_2 } + \\frac{ 0 - V_p }{ R_1 } = 0;
$$
Multiplying by $R_1R_2$ we get:
$$
V_{out} R_1 -V_n R_2 -V_p R_2 = 0;
$$
Grouping by node voltages:
$$
V_{out} R_1 = V_n (R_1 + R_2);
$$
Knowing that $V_n = V_{in}$:
$$
V_{out} R_1 = V_{in} (R_1 + R_2);
$$
Dividing by $R_1$:
$$
V_{out} = \\frac{ V_{in} (R_1 + R_2) }{ R_1 };
$$
Finally dividing by $V_{in}$:
$$
\\frac{ V_{out} }{ V_{in} } = \\frac{ (R_1 + R_2) }{ R_1 } = 1 + \\frac{ R_2 }{ R_1 }
$$

</details>
  
