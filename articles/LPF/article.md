---
description: "Verilog-A model for low-pass filter (LPF)"
---

## Low-pass filter model
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

</br>

<br/> <img src="http://localhost:3000/images/LPF/lpf-tb.png" disableinvert alt="LPF model testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">LPF model testbench</p>  


<br/> <img src="http://localhost:3000/images/LPF/lpf-sim.png" disableinvert alt="LPF model simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">LPF model simulation result (Filter_Order =  1 - purple, 
Filter_Order = 2 - green)</p> 
 
</br>

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
\tV(out) <+ laplace_nd(V(in),{2*\`M_PI*Cutoff_frequency},{2*\`M_PI*Cutoff_frequency, 1});
\tV(out) <+ laplace_nd(V(in),{2*\`M_PI*Cutoff_frequency},{2*\`M_PI*Cutoff_frequency, 1});
    end

2: begin    // Second Order LPF (-40dB/dec)
\tV(out) <+ laplace_nd(V(in),{(2*\`M_PI*Cutoff_frequency)**2},{(2*\`M_PI*Cutoff_frequency)**2, 4*\`M_PI*Cutoff_frequency,1});
    end
endcase
end
endmodule

</code></pre>

    
