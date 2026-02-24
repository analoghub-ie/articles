---
description: "Description of article 1"
---

# Transfer functions of RLC circuits
## 1. Voltage divider
|   Element              |\tR\t |\tC\t\t\t  |\t\t\tL\t|
|------------------------|-------|----------------|-------------|
|Laplace domain impedance|$$R$$  |$$1/j\\omega C$$ |$$j\\omega L$$|\t  

Knowing that $s = j\\omega$:
|   Element              |\tR\t |\tC\t\t\t  |\t\t\tL\t|
|------------------------|-------|----------------|-------------|
|Laplace domain impedance|$$R$$  |$$1/sC$$ |$$sL$$|\t


Let's derive a transfer function of a very simple circuit - voltage divider:

<br/>
<img src="http://localhost:3000/images/circuitAnalysisTransferFunctions/voltage-divider.svg" alt="Voltage Divider" style="display: block; margin-inline: auto; width: min(80%, 15rem)" /> 
<p style="display: block; text-align: center">A simple voltage divider</p>

We can see that current $I_1$ is flowing from $V_{in}$ to ground through resistors $R_1$ and $R_2$. Using Ohm's Law we can write:
$$
\\frac{ V_{in} - V_{out} }{R_1} = \\frac{ V_{out} }{R_2}
$$

Multiplying both sides of the equation by $R_1R_2$ we get:
$$
(V_{in} - V_{out})R_2 = V_{in}R_1
$$
$$
V_{in}R_2 - V_{out}R_2 - V_{out}R_1 = 0
$$
Then, grouping for $V_{in}$ and $V_{out}$ we obtain:
$$
V_{out}(R_1 + R_2) = V_{in}R_2
$$
$$
V_{out} = \\frac{V_{in}R_2}{(R_1 + R_2) }
$$
Dividing both sides of the equation by $V_{in}$ we get:
$$
\\frac{V_{out}}{V_{in}} = \\frac{R_2}{R_1+R_2}
$$
Let's have a look on one more important aspect of the resistor divider circuit. Let's add some load $R_L$:

<br/>
<img src="http://localhost:3000/images/circuitAnalysisTransferFunctions/voltage-divider-loaded.svg" alt="Voltage Divider Loaded" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">A simple voltage divider with resistive load</p>

Concept stays the same, but instead of just $R_2$ we have $R_x = R_2||R_L$.
$$
R_x = \\frac{R_2 + R_L}{R_2R_L}
$$
So, substituting $R_x$ into the previous equation we get:
$$
\\frac{V_{out}}{V_{in}} = \\frac{R_x}{R_1+R_x}= \\frac{R_2||R_L}{R_1+R_2||R_L}
$$
Now, this factor will affect the output voltage of the divider:
>**pic of the Vout of two dividers**

Here is what our equation shows us. Let's stop for a second and think of it's physical meaning. In the first example, all current $I_1$ was flowing through $R_1$ and $R_2$. Now, because of the load resistor $R_L$ the current will divide into two paths: through $R_2$ and $R_L$. In other words, adding $R_L$ is equivalent to reducing the size of the $R_2$ in the previous example.

OFFTOP (need to think how integrate it into the text)
We can think of the voltage divider's resistors as of current sources. Let's say we have $R_1 = R_2 = 1k\\Omega$. In this case, both current sources have the same "strength" and hereby divide the voltage exactly by half. If we will make $R_2 = 500\\Omega$, then $R_2$ will become "stronger" and hence will demand more current. At the same time, $R_1$ is 2 times "weaker" than $R_2$ and wouldn't be able to satisfy such current requirements. 

## 2. Low-pass filter

<br/>
<img src="http://localhost:3000/images/circuitAnalysisTransferFunctions/LPF.svg" alt="Low Pass Filter" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">A low-pass filter</p>

Interestingly, this circuit is very similar to our previous example. The only difference is that $R_2$ is now replaced with capacitor $C$. 

<br/>
<img src="http://localhost:3000/images/circuitAnalysisTransferFunctions/LPF-2.svg" alt="Low pass filter as a voltage divider" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Low pass filter as a voltage divider</p>

The impedance of the resistor is $Z_R = R$, the impedance of the capacitor is $Z_C = 1/sC$. Using voltage divider formula we can obtain:
$$
\\frac{V_{out}}{V_{in}} = \\frac{Z_C}{Z_C + Z_R}
$$
substituting:
$$
\\frac{V_{out}}{V_{in}} = \\frac{1/sC}{1/sC + R}
$$
$$
\\frac{V_{out}}{V_{in}} = \\frac{1}{1 + sRC}
$$
    
