---
description: "Verilog-A model for level shifter (digital)"
---

## Digital Level Shifter
This article contains Verilog-A model for a digital Level Shifter.


### Table of Contents  
1. [Level-shifter without inversion (same as clk)](#ls-1)  
2. [Level-shifter with inversion](#ls-2)  
 

**Usage:**

1. Create a new cell in Library Manager named ***level_shifter*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Specify ***input_swing*** variable to be the output swing;
4. Specify ***t_edge*** and ***t_delay*** variables to be the rising/falling time and delay of the output waveform;
5. Perform ***Check and Save***;
6. A cell symbol will be created;
7. Instantiate ***level_shifter*** cell into your design;
8. Perform ***Check and Save*** and run the simulation.


<div id="ls-1"></div>

> **Cell name:** level_shifter

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/level_shifter.va)

<pre><code class="language-verilog">
// Digital level shifter (without inversion)
// Takes differential input - connect your signal to inp, reference to inn
// Output will be level-shifted to the "low" and "high" levels
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module level_shifter (inp, inn, outn, outp, low, high);
    input inp, inn, low, high;
    output outp, outn;
    electrical inp, inn, outp, outn, low, high;
integer d_outp, d_outn;             // logic output state

   parameter real input_swing = 5.0;   // define input signal swing
parameter real t_edge = 1e-9;
parameter real t_delay = 1e-9;

analog begin
@(initial_step) begin
    d_outp = 0;
    d_outn = 1;
    end

@(cross(V(inp)-V(inn) - 0.5*input_swing,0)) begin
    if (V(inp)-V(inn)>0.5*input_swing) begin
        d_outp = 1;
        d_outn = 0;
    end
    else begin
        d_outp = 0;
        d_outn = 1;
end // end if

end // end cross

V(outp) <+ V(high)*transition(d_outp,t_delay,t_edge) + V(low)*transition(d_outn,t_delay,t_edge);
V(outn) <+ V(high)*transition(d_outn,t_delay,t_edge) + V(low)*transition(d_outp,t_delay,t_edge);

end //analog begin
endmodule
</code></pre>

<div id="ls-2"></div>


> **Cell name:** level_shifter_inv

> **Model type:** Verilog-A

<pre><code class="language-verilog">  
// Level shifter with inversion (digital)
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module level_shifter_inv (inp, inn, outn, outp, low, high);
    input inp, inn, low, high; 
    output outp, outn;
    electrical inp, inn, outp, outn, low, high;
    parameter real VDD = 5.0; // Output voltage during high state

analog begin

@(initial_step)
V(outp) <+ V(high);
V(outn) <+ V(low);

 if ((V(inp)-V(inn)) > VDD/2) begin
V(outp) <+ V(high);
V(outn) <+ V(low);
end 

if ((V(inp)-V(inn)) < VDD/2) begin
V(outp) <+ V(low);
V(outn) <+ V(high);
end 
end

endmodule
</code></pre>
    
