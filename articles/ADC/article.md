---
description: "Verilog-A model for an ADC"
---

## Analog-to-Digital (ADC) Verilog-A model

This is a behavioral N-bit analog-to-digital converter, most useful in mixed-signal testbenches where you need an ideal ADC to represent the digital backend — for example, verifying that an LDO or buffer output stays within a specified input range. The model samples the analog input `in` on a configurable clock edge, quantizes it uniformly between `vmin` and `vmax`, and drives a parallel binary output bus at `vdd`/`vss` logic levels. Resolution is controlled by the `bits` macro at the top of the file (default: 12-bit); `td` and `tt` add realistic clock-to-output delay and output transition time, or can be zeroed for ideal instantaneous conversion. A typical use-case is pairing this model with a DAC in a loopback testbench to validate a complete analog front-end signal chain.

This article contains Verilog-A model for an Analog-to-Digital Converter (ADC).


**Usage:**

1. Create a new cell in Library Manager named ***ADC*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Modify ***bits*** variable to define ADC resolution;
4. Specify ***vmin*** and ***vmax*** variables to define the input signal swing;
5. Specify ***vdd*** and ***vss*** variables to define output voltage levels;
6. Specify ***tt*** and ***td*** variables to define rising/falling edge times and output signal delay;
7. Specify ***dir*** variable to be +1 for rising and -1 for falling clock edge triggering;
8. Perform ***Check and Save***;
9. A cell symbol will be created;
10. Instantiate ***ADC*** cell into your design;
11. Perform ***Check and Save*** and run the simulation.



<br/> <img src="http://localhost:3000/images/ADC/adc-dac-tb.png" disableinvert alt="ADC-DAC testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">ADC-DAC testbench</p>  


<br/> <img src="http://localhost:3000/images/ADC/adc-dac-sim.png" disableinvert alt="ADC-DAC simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">ADC-DAC simulation result</p> 
 

> **Cell name:** ADC

> **Model type:** Verilog-A

> [Download from GitHub](https://github.com/analoghub-ie/software/blob/main/Verilog-A/ADC.va)

<pre><code class="language-verilog">
// N-bit Analog to Digital Converter
// LSB is <0>
// Change binary_bits variable for your needs!
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"
\`define bits 12// define number of binary bits here
module ADC (out, in, clk);
    parameter real vmin = 0.0;// minimum input voltage (V)
    parameter real vmax = 1.0 from (vmin:inf);// maximum input voltage (V)
    parameter real td = 0 from [0:inf);// delay from clock edge to output (s)
    parameter real tt = 0 from [0:inf);// transition time of output (s)
    parameter real vdd = 5;// voltage level of logic 1 (V)
    parameter real vss = 0;// voltage level of logic 0 (V)
    parameter real thresh = (vdd+vss)/2;// logic threshold level (V)
    parameter integer dir = +1 from [-1:1] exclude 0;
    // 1 for trigger on rising edge
// -1 for falling
    localparam integer levels = 1<<\`bits;
    input in, clk;
    output [\`bits-1:0] out;
    voltage in, clk;
    voltage [\`bits-1:0] out;
    integer result;
    genvar i;

    analog begin
        @(cross(V(clk)-thresh, dir) or initial_step) begin
    result = levels*((V(in) - vmin))/(vmax - vmin);
    if (result > levels-1)
        result = levels-1;
    else if (result < 0)
        result = 0;
end

for (i=0; i<\`bits; i=i+1)
    V(out[i]) <+ transition(result & (1<<i) ? vdd : vss, td, tt);
    end
endmodule

</code></pre>

    
