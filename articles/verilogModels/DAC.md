---
id: DAC
title: "Digital-to-Analog Converter (DAC) Verilog-A model (any resolution)"
description: "Verilog-A model for a DAC"
---

## Digital-to_analog (DAC) Verilog-A model
This article contains Verilog-A model for a Digital-toAnalog Converter (DAC).


**Usage:**

1. Create a new cell in Library Manager named ***DAC*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Modify ***bits*** variable to define DAC resolution;
4. Specify ***vmin*** and ***vmax*** variables to define the input signal swing;
5. Specify ***vdd*** and ***vss*** variables to define output voltage levels;
6. Specify ***tt*** and ***td*** variables to define rising/falling edge times and output signal delay;
7. Specify ***dir*** variable to be +1 for rising and -1 for falling clock edge triggering;
8. Perform ***Check and Save***;
9. A cell symbol will be created;
10. Instantiate ***DAC*** cell into your design;
11. Perform ***Check and Save*** and run the simulation.

</br>


<br/> <img src="http://localhost:3000/images/verilogModels/adc-dac-tb.png" disableinvert alt="ADC-DAC testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">ADC-DAC testbench</p>  


<br/> <img src="http://localhost:3000/images/verilogModels/adc-dac-sim.png" disableinvert alt="ADC-DAC simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">ADC-DAC simulation result</p>  

</br>

> **Cell name:** DAC

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/DAC.va)

<pre><code class="language-verilog">
// N-bit Digital to Analog Converter
// LSB is <0>
// Change binary_bits variable for your needs!
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"
\`define bits 12\t\t\t\t\t\t\t// define number of binary bits here

module DAC(out, in, clk);
    parameter real vmin = 0.0;\t\t\t// minimum input voltage (V)
    parameter real vmax = 1.0 from (vmin:inf);\t// maximum input voltage (V)
    parameter real td = 0;\t\t\t// delay from clock edge to output (s)
    parameter real tt = 0;\t\t\t// transition time of output (s)
    parameter real vdd = 5.0;\t\t\t// voltage level of logic 1 (V)
    parameter real vss = 0;\t\t\t// voltage level of logic 0 (V)
    parameter real thresh = (vdd+vss)/2;\t// logic threshold level (V)
    parameter integer dir = +1 from [-1:1] exclude 0;
    \t\t\t\t\t\t// 1 for trigger on rising edge
\t\t\t\t\t\t// -1 for falling
    localparam real fullscale = vmax - vmin;

    output out;
    input [\`bits-1:0] in;
    input clk;
    voltage out, clk;
    voltage [\`bits-1:0] in;
    real aout;
    integer weight;
    genvar i;

    analog begin
\t@(cross(V(clk) - thresh, dir) or initial_step) begin
\t    aout = 0;
\t    weight = 2;
\t    for (i = \`bits - 1; i >= 0; i = i - 1) begin
\t\tif (V(in[i]) > thresh) begin
\t\t    aout = aout + fullscale/weight;
\t\tend
\t\tweight = weight*2;
\t    end
\tend
\tV(out) <+ transition(aout + vmin, td, tt);
    end
endmodule
</code></pre>

    
