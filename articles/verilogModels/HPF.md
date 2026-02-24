---
id: HPF
title: "High-pass filter (HPF) Verilog-A model"
description: "Verilog-A model for high-pass filter (HPF)"
hideInProd: false
---

## High-pass filter model
This article contains Verilog-A model for a high-pass filter.

**Usage:**

1. Create a new cell in Library Manager named ***HPF*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Specify ***Cutoff_frequency*** variable to be -3dB frequency;
4. Perform ***Check and Save***;
5. A cell symbol will be created;
6. Instantiate ***HPF*** cell into your design;
7. Perform ***Check and Save*** and run the simulation.

</br>

<br/> <img src="http://localhost:3000/images/verilogModels/hpf-tb.png" disableinvert alt="HPF model testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">HPF model testbench</p>  


<br/> <img src="http://localhost:3000/images/verilogModels/hpf-sim.png" disableinvert alt="LPF model simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">HPF model simulation result</p> 
 
</br>

> **Cell name:** HPF

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/HPF.va)

<pre><code class="language-verilog">
// High Pass filter model based on -3dB frequency definition
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module HPF(in, out);
electrical in, out;
parameter real Cutoff_frequency = 10k;      // -3dB frequency

analog begin
 V(out) <+ laplace_nd(V(in),{0, 1},{2*\`M_PI*Cutoff_frequency, 1});
    end
endcase
end
endmodule
</code></pre>

    
