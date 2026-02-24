---
id: comparator
title: "Comparator Verilog-A model"
description: "Verilog-A model for a comparator"
---

## Comparator
This article contains Verilog-A model for a comparator.


**Usage:**

1. Create a new cell in Library Manager named ***comp*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Specify ***VDD*** variable to be the maximum output voltage of the comparator;
4. Specify ***t_edge*** and ***t_delay*** variables to be the rising/falling time and delay of the output waveform;
5. Perform ***Check and Save***;
6. A cell symbol will be created;
7. Instantiate ***comp*** cell into your design;
8. Perform ***Check and Save*** and run the simulation.

</br>


<br/> <img src="http://localhost:3000/images/verilogModels/comparator-tb.png" disableinvert alt="Comparator testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Comparator testbench</p>  


<br/> <img src="http://localhost:3000/images/verilogModels/comparator-sim.png" disableinvert alt="Comparator simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Comparator simulation result</p> 
 
</br>

> **Cell name:** comparator

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/comparator.va)

<pre><code class="language-verilog">    
// Comparator model
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module comparator (inp, inn, out);
    input inp, inn;
    output out;
    electrical inp, inn, out; 
    parameter real VDD = 3.3; \t\t\t// Output voltage during high state
    parameter real t_delay = 1e-9; \t\t// Propagation delay
    parameter real t_edge = 100e-12; \t\t// Rise and fall times
    
    analog begin
        V(out) <+ VDD * transition(V(inp) > V(inn), t_delay, t_edge);
\t\t$bound_step(1/(2*t_delay));  // comment this option if the sim is too slow
    end
endmodule
</code></pre>

    
