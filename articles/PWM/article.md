---
description: "Verilog-A model for pulse width generator"
---

## Pulse Width Modulated generator
This article contains Verilog-A models for a Pulse Width Modulated generator. 


**Usage:**

1. Create a new cell in Library Manager named ***pwm_gen_clk*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Specify ***vdd*** and ***vss*** variables to reflect high/low levels of the clk;
4. Specify ***t_edge*** and ***t_delay*** variables to be the rising/falling time and delay of the output waveform;
5. Specify ***period*** to define the input clock period;
6. Specify ***duty*** to define the desired output duty cycle;
6. Perform ***Check and Save***;
7. A cell symbol will be created;
8. Instantiate ***pwm_gen_clk*** cell into your design;
9. Perform ***Check and Save*** and run the simulation.



### Pulse Width Modulated generator

> **Cell name:** pwm_gen_clk

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/pwm_gen_clk.va)

<pre><code class="language-verilog">
// PWM generator (fixed duty cycle, internal clock)
// Author: A. Sidun
// Source: AnalogHub.ie
\`include "constants.vams"
\`include "disciplines.vams"

module pwm_gen_clk(vout,clk);
output vout;
input clk;
electrical vout, clk;

parameter real t_delay = 1e-9;      //Output Waveform delay Time.
parameter real vss = 0.0;           //Zero Value used in Output Pulse Waveform.
parameter real vdd = 1.0;           //One Value used in Output Pulse Waveform.
parameter real period = 1e-6;       //Period of Input Waveform.
parameter real t_edge = 1e-9;
parameter real duty = 0.5 from (0.0:1.0); //Duty Factor for Output Pulse Waveform.


integer trigger;
real width; //Output Pulse Width (Duration of 'vdd').
real period_1, duty_1, max_step;

analog begin
   @(initial_step) begin
      max_step = min(t_edge, t_edge);
      width = duty * (period - (t_edge + t_edge));
   end //initial_step

   $bound_step(max_step);
   @(cross(V(clk) - vdd/2, +1)) begin
      @( timer(t_delay, period) ) trigger = 1; //Generation of rising Edge
      @( timer(t_delay+t_edge+width, period) ) trigger = 0; //Generation of falling Edge
   end

   V(vout) <+ vss + (vdd-vss) * transition(trigger, 0.0, t_edge, t_edge);
end //analog

endmodule
</code></pre>

    
