---
description: "Verilog-A model for low-pass filter (LPF)"
---

## Low-pass filter model

This is a behavioral low-pass filter supporting both first-order (−20 dB/dec) and second-order (−40 dB/dec) responses, implemented in the s-domain via Verilog-A's `laplace_nd` — meaning it behaves correctly in both AC and transient simulations without requiring explicit R and C components. `Cutoff_frequency` sets the −3 dB corner and `Filter_Order` selects the roll-off slope (1 or 2). Use first-order for simple pole models (e.g. an LDO output filter or amplifier bandwidth limit) and second-order when you need a sharper cut, such as an anti-aliasing filter in a sigma-delta modulator or a loop filter in a PLL behavioral model. This model is most valuable early in a design when you want to validate system-level frequency-domain behaviour before committing to component values.

This article contains Verilog-A model for a low-pass filter. This model supports two types of filters - 1st-order and 2nd-order.

**Usage:**

1. Create a new cell in Library Manager named ***LPF*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Specify ***Cutoff_frequency*** variable to be -3dB frequency;
4. Specify ***Filter_Order*** variable to be 1 if you want -20dB/dec or 2 if you want -40dB/dec ;
5. Perform ***Check and Save***;
6. A cell symbol will be created;
7. Instantiate ***LPF*** cell into your design;
8. Perform ***Check and Save*** and run the simulation.


<br/> <img src="http://localhost:3000/images/LPF/lpf-tb.png" disableinvert alt="LPF model testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">LPF model testbench</p>  


<br/> <img src="http://localhost:3000/images/LPF/lpf-sim.png" disableinvert alt="LPF model simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">LPF model simulation result (Filter_Order =  1 - purple, 
Filter_Order = 2 - green)</p> 
 

> **Cell name:** LPF

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/LPF.va)

<pre><code class="language-verilog">    
// Low Pass filter model based on -3dB frequency definition
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module LPF(in, out);
electrical in, out;
parameter real Cutoff_frequency = 10k;      // -3dB frequency
parameter real Filter_Order = 1;            // 1 for 20dB/dec, 2 for 40dB/dec

analog begin
case (Filter_Order)
1: begin    // First Order LPF (-20dB/dec)
V(out) <+ laplace_nd(V(in),{2*\`M_PI*Cutoff_frequency},{2*\`M_PI*Cutoff_frequency, 1});
V(out) <+ laplace_nd(V(in),{2*\`M_PI*Cutoff_frequency},{2*\`M_PI*Cutoff_frequency, 1});
    end

2: begin    // Second Order LPF (-40dB/dec)
V(out) <+ laplace_nd(V(in),{(2*\`M_PI*Cutoff_frequency)**2},{(2*\`M_PI*Cutoff_frequency)**2, 4*\`M_PI*Cutoff_frequency,1});
    end
endcase
end
endmodule

</code></pre>

    
