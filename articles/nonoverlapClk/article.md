---
description: "Verilog-A model non-overlapping clock generator"
---

## Non-overlapping clock generator
This article contains Verilog-A models for a Non-overlapping clock generator. 

### Table of Contents  
1. [Non-overlap clock generator (same as clk)](#nonoverlap1)  
2. [Non-overlap clock generator with 2 phases](#nonoverlap2)  
3. [Non-overlap clock generator with 4 phases](#nonoverlap3)  

**Usage:**

1. Create a new cell in Library Manager named ***nonoverlap_clk*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Specify ***vdd*** and ***vss*** variables to reflect high/low levels of the clk;
4. Specify ***t_edge*** and ***t_delay*** variables to be the rising/falling time and delay of the output waveform;
5. Specify ***t_dead*** to define the dead time between phases;
6. Perform ***Check and Save***;
7. A cell symbol will be created;
8. Instantiate ***nonoverlap_clk*** cell into your design;
9. Perform ***Check and Save*** and run the simulation.


<div id="nonoverlap1"></div>


### Non-overlapping clock generator (same as clk)

<br/> <img src="http://localhost:3000/images/nonoverlapClk/nonoverlap1-tb.png" disableinvert alt="Nonoverlap_clk testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Nonoverlap_clk testbench</p>

<br/> <img src="http://localhost:3000/images/nonoverlapClk/nonoverlap1-sim.png" disableinvert alt="Nonoverlap_clk simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Nonoverlap_clk simulation result</p>

> **Cell name:** nonoverlap_clk

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/nonoverlap_clk.va)

<pre><code class="language-verilog">
// Non-overlap clock generator (same freq as clk)
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module nonoverlap_clk (clk, ph1, ph2);
    input clk;
    output ph1, ph2;
    electrical clk, ph1, ph2;

    parameter real vdd = 5.0;\t\t// define clock high
    parameter real vss = 0.0;\t\t// define clock low
    parameter real t_edge = 1e-9;\t// rising/falling edge of ph1/ph2
    parameter real t_delay = 1e-9;\t// delay from the input clock edge for ph1/ph2
    parameter real t_dead = 20e-9; \t// dead-time between ph1/ph2

    real delay_ph1;
    real delay_ph2;
    real d_ph1;
    real d_ph2;

analog begin
@(initial_step) begin
    d_ph1 = 1;
    d_ph2 = 0;
    end

@(cross(V(clk)-vdd/2, +1)) begin\t//rising edge of clk
        d_ph1 = 1;
        d_ph2 = 0;
\t\tdelay_ph1 = t_delay + t_dead;
\t\tdelay_ph2 = t_delay;
end

@(cross(V(clk)-vdd/2, -1)) begin\t//falling edge of clk
        d_ph1 = 0;
        d_ph2 = 1;
\t\tdelay_ph1 = t_delay;
\t\tdelay_ph2 = t_delay + t_dead;
end

V(ph1) <+ vdd*transition(d_ph1,delay_ph1,t_edge) + vss*transition(d_ph2,delay_ph1,t_edge);
V(ph2) <+ vdd*transition(d_ph2,delay_ph2,t_edge) + vss*transition(d_ph1,delay_ph2,t_edge);

end //analog begin
endmodule
</code></pre>

<div id="nonoverlap2"></div>

### Non-overlapping clock generator with 2 phases

<br/> <img src="http://localhost:3000/images/nonoverlapClk/nonoverlap2-tb.png" disableinvert alt="Nonoverlap_clk_2ph testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">2-phases nonoverlap_clk testbench</p>

<br/> <img src="http://localhost:3000/images/nonoverlapClk/nonoverlap2-sim.png" disableinvert alt="Nonoverlap_clk_2ph simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">2-phases nonoverlap_clk simulation result</p>

> **Cell name:** nonoverlap_clk_2ph

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/nonoverlap_clk_2ph.va)

<pre><code class="language-verilog">
// Non-overlap clock generator (frequency-divided)
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module nonoverlap_clk_2ph (clk, ph1, ph2);
    input clk;
    output ph1, ph2;
    electrical clk, ph1, ph2;

   \tparameter real vdd = 5.0;   // define clock high
    parameter real vss = 0.0;\t// define clock low
\tparameter real t_edge = 1e-9;   // rising/falling edge of ph1/ph2
\tparameter real t_delay = 1e-9;  // delay from the input clock edge for ph1/ph2
    parameter real t_dead = 20e-9;  // dead-time between ph1/ph2

    real delay_ph1;
    real delay_ph2;
    real d_ph1;
    real d_ph2;
    integer counter_ph1=0;

analog begin
@(initial_step) begin
    d_ph1 = 1;
    d_ph2 = 0;
    end


@(cross(V(clk)-vdd/2, +1)) begin\t//rising edge of clk
        counter_ph1 = counter_ph1 + 1; // count rising edges
\t\t$display("Rising edge number: %d", counter_ph1);
        case(counter_ph1)
        1: begin
            d_ph1 = 1;
            d_ph2 = 0;
            delay_ph1 = t_delay + t_dead;
\t\t    delay_ph2 = t_delay;
        end
        2: begin 
            d_ph1 = 0;
            d_ph2 = 1;
            delay_ph1 = t_delay;
\t\t    delay_ph2 = t_delay + t_dead;
            counter_ph1 = 0;    // reset counter
        end
endcase
end


/*@(cross(V(clk)-vdd/2, -1)) begin\t//falling edge of clk
        d_ph1 = 0;
        d_ph2 = 1;
\t\tdelay_ph1 = t_delay;
\t\tdelay_ph2 = t_delay + t_dead;
end */

V(ph1) <+ vdd*transition(d_ph1,delay_ph1,t_edge) + vss*transition(d_ph2,delay_ph1,t_edge);
V(ph2) <+ vdd*transition(d_ph2,delay_ph2,t_edge) + vss*transition(d_ph1,delay_ph2,t_edge);

end //analog begin
endmodule
</code></pre>

<div id="nonoverlap3"></div>

### Non-overlapping clock generator with 4 phases

<br/> <img src="http://localhost:3000/images/nonoverlapClk/nonoverlap4-tb.png" disableinvert alt="Nonoverlap_clk_4ph testbench" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">4-phases nonoverlap_clk testbench</p>

<br/> <img src="http://localhost:3000/images/nonoverlapClk/nonoverlap4-sim.png" disableinvert alt="Nonoverlap_clk_4ph simulation result" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">4-phases nonoverlap_clk simulation result</p>

> **Cell name:** nonoverlap_clk_4ph

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/nonoverlap_clk_4ph.va)

<pre><code class="language-verilog">
// 4-phases non-overlap clock generator 
// Author: A. Sidun
// Source: AnalogHub.ie

//               ____      ____      ____      ____      ____      ____
// CLK      ____|    |____|    |____|    |____|    |____|    |____|    |____
//               _________                               _________
// PH1      ____|         |_____________________________|         |_______________  
//                         _________                               _________                 
// PH2      ______________|         |_____________________________|         |_______________ 
//                                   _________                               _________ 
// PH3      ________________________|         |_____________________________|         |_______________ 
//                                             _________                               _________ 
// PH4      __________________________________|         |_____________________________|         |_______________ 

// Non-overlap clock generator (frequency-divided)

\`include "constants.vams"
\`include "disciplines.vams"

module nonoverlap_clk_4ph (clk, ph1, ph2, ph3, ph4);
    input clk;
    output ph1, ph2, ph3, ph4;
    electrical clk, ph1, ph2, ph3, ph4;

   \tparameter real vdd = 1.0;   // define clock high
    parameter real vss = 0.0;\t// define clock low
\tparameter real t_edge = 1e-9;   // rising/falling edge of ph1/ph2
\tparameter real t_delay = 1e-9;  // delay from the input clock edge for ph1/ph2/ph3/ph4
    parameter real t_dead = 20e-9;  // dead-time between ph1/ph2/ph3/ph4

    real delay_ph1;
    real delay_ph2;
    real delay_ph3;
    real delay_ph4;
    real bit_ph1;
    real bit_ph2;
    real bit_ph3;
    real bit_ph4;
    integer clk_edge_count=0;   // clock rising edge counter

analog begin
@(initial_step) begin
    bit_ph1 = 0;
    bit_ph2 = 0;
    bit_ph3 = 0;
    bit_ph4 = 0;
    end


@(cross(V(clk)-vdd/2, +1)) begin\t//rising edge of clk
        clk_edge_count = clk_edge_count + 1; // count rising edges
\t\t//$display("Rising edge number: %d", clk_edge_count);
        case(clk_edge_count)
        1: begin
            bit_ph1 = 1;
            bit_ph2 = 0;
            bit_ph3 = 0;
            bit_ph4 = 0;
\t\t\tdelay_ph4 = t_delay;
            delay_ph1 = t_delay + t_dead;
        end
        2: begin 
            bit_ph1 = 0;
            bit_ph2 = 1;
            bit_ph3 = 0;
            bit_ph4 = 0;
\t\t\tdelay_ph1 = t_delay;
\t\t    delay_ph2 = t_delay + t_dead;

        end
        3: begin 
            bit_ph1 = 0;
            bit_ph2 = 0;
            bit_ph3 = 1;
            bit_ph4 = 0;
\t\t\tdelay_ph2 = t_delay;
\t\t\tdelay_ph3 = t_delay + t_dead;

        end
        4: begin 
            bit_ph1 = 0;
            bit_ph2 = 0;
            bit_ph3 = 0;
            bit_ph4 = 1;
\t\t\tdelay_ph3 = t_delay;
\t\t\tdelay_ph4 = t_delay + t_dead;
            clk_edge_count = 0;    // reset counter
        end
endcase
end

V(ph1) <+ vdd*transition(bit_ph1,delay_ph1,t_edge) + vss*transition(bit_ph2,delay_ph1,t_edge);
V(ph2) <+ vdd*transition(bit_ph2,delay_ph2,t_edge) + vss*transition(bit_ph1,delay_ph2,t_edge);
V(ph3) <+ vdd*transition(bit_ph3,delay_ph3,t_edge) + vss*transition(bit_ph3,delay_ph3,t_edge);
V(ph4) <+ vdd*transition(bit_ph4,delay_ph4,t_edge) + vss*transition(bit_ph4,delay_ph4,t_edge);

end //analog begin
endmodule
</code></pre>

    
