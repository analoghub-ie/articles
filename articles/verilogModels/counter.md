---
id: counter
title: "Binary Counter Verilog-A model"
description: "Verilog-A model for a binary counter"
---

## Binary Counter Model Verilog-A
This article contains Verilog-A model for a binary counter, which counts up or down at the edge of the clock, when **en**
 is high.


**Usage:**

1. Create a new cell in Library Manager named ***counter*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Specify ***bits*** variable to define the number of output bits;
4. Specify ***start_code*** variable to be the start code of the counter;
5. Specify ***count_up*** variable to be 1 for increasing or 0 for decresing counting;
6. Specify ***step_size*** variable to be the step size of the counter (increment);
7. Specify ***vth_clk*** variable to be threshold volatge of the clock signal;
8. Specify ***vtol*** and ***ttol*** variables as signal and time tolerance to the clock signal;
9. Specify ***vdd*** variable to be the output voltage of the counter;
10. Specify ***t_edge*** and ***t_delay*** variables to be the rising/falling time and delay of the output waveform;
11. Perform ***Check and Save***;
12. A cell symbol will be created;
13. Instantiate ***counter*** cell into your design;
14. Perform ***Check and Save*** and run the simulation.

</br>


<br/> <img src="http://localhost:3000/images/verilogModels/counter-tb.png" disableinvert alt="Counter testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Counter testbench</p>  


<br/> <img src="http://localhost:3000/images/verilogModels/counter-sim.png" disableinvert alt="Counter model simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Counter model simulation result</p> 
 
</br>

> **Cell name:** counter

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/counter.va)


<pre><code class="language-verilog">
// Verilog-A model for Binary Counter
// Source: AnalogHub.ie
// Author: A. Sidun
// Reference: A. Beckett

\`include "constants.vams"
\`include "disciplines.vams"
\`define bits 4

module counter (clk,en,out);
input clk, en;
output [\`bits-1 :0] out;
electrical clk, en;
electrical  [\`bits-1 :0] out;

parameter integer start_code = 0 from [0:(1<<\`bits)-1];   // Start code for the counter
parameter integer count_up = 1 from [0:1];         // Set 1 for increasing or 0 for decreasing
parameter integer step_size = 1;              // Step size for the counter
parameter real vth_clk = 0.5;               // Clock threshold
parameter real vtol = 0;                  // Signal tolerance on the clk
parameter real ttol = 0;                  // Time tolerance on the clk
parameter real vdd = 1.0;
parameter real vth = 1;
parameter real vss = 0;
parameter real t_delay = 30p;               // Delay time for the output waveform
parameter real t_edge = 30p;               // Rising/falling times of the output waveform
integer outval;                      // Internal counter 

analog begin
  @(initial_step("static","ac")) outval = start_code;
  @(cross(V(clk)-vth_clk,1,vtol,ttol)) begin
    if (V(en)<vth) outval=0.0;
    else outval = (outval +(+count_up- !count_up)*step_size)%(1<<\`bits);
  end
  generate j (\`bits-1 , 0) begin
    V(out[j]) <+ transition (!(!(outval &(1<<j)))*vdd+!(outval&(1<<j))*vss,t_delay,t_edge,t_edge);
  end
end
endmodule
</code></pre>

    
