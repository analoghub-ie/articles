---
description: "Verilog-A model for Decimal to Thermometer encoder"
---

## Decimal to Thermometer Encoder

This is a static combinatorial block that drives a thermometer-coded output bus from a fixed decimal value given as the `Decimal_Code` parameter, with no input port or clock. It is the direct decimal-input counterpart to the `bin2therm` model — most useful for pre-setting a thermometer bus to a known level, for example initializing a current-steering DAC array or a programmable-gain bank to a specific state at simulation start. `therm_bits` sets the number of output lines and `Start_Bit` selects whether code 0 maps to the all-zero or the LSB-high thermometer word. For dynamic (time-varying) thermometer encoding driven by a live binary signal, use the `bin2therm` model instead.

This article contains Verilog-A model for Decimal to Thermometer encoder. This block can be used for behavioral simulation of the pipelined ADCs, programmable gains/BW etc. This model will automatically select number of outputs based on selected number of input binary bits.
**Usage:**

1. Create a new cell in Library Manager named ***dec2therm*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3. Specify ***therm_bits*** variable to be the desired thermometer bits number;
4. Specify ***Start_Bit*** to be 0 if you want thermometer code to start from 0 or 1  if you want thermometer code to start from 1;
5. Perform ***Check and Save***;
6. A cell symbol will be created;
7. Instantiate ***dec2term*** cell into your design;
8. Perform ***Check and Save*** and run the simulation.


> Example:
> ***therm_bits = 4, Start_Bit = 0***

|Decimal input|Thermometer code|
|------------|----------------|
|    0      |      0000       |
|    1      |      0001       |
|    2      |      0010       |
|    3      |      0100       |

> Example:
> ***therm_bits = 4, Start_Bit = 1***

|Decimal input|Thermometer code|
|------------|----------------|
|    0      |      0001      |
|    1      |      0010      |
|    2      |      0100      |
|    2      |      1000      |


> **Cell name:** dec2term

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/dec2therm.va)



<pre><code class="language-verilog">
// Decimal to Thermometer decoder
// Implements two options: 
// Start_Bit = 0: Decimal 0 equals thermometer 0
// Start_Bit = 1: Decimal 0 equals thermometer 1
// Change therm_bits variable for your needs!
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"
\`define therm_bits 10// define number of output bits here

module dec2therm(out);

output [\`therm_bits-1:0] out;
voltage [\`therm_bits-1:0] out;

parameter real vdd = 5;// voltage level of logic 1 (V)
parameter real vss = 0;// voltage level of logic 0 (V)
parameter integer Decimal_Code = 5; // input decimal code
parameter integer Start_Bit = 0;    // defines if thermometer starts from 0 or 1

real dout[\`therm_bits-1:0];// internal result variable
genvar i;

analog begin

case (Start_Bit)
    0: begin// Decimal 0 equals thermometer 0
for(i=1;i<\`therm_bits+1;i=i+1) begin
          if(Decimal_Code!=i) begin
              dout[i-1]=vss;
          end
      else begin
          dout[i-1]=vdd;
      end
end
end 

    1: begin// Decimal 0 equals thermometer 1
for(i=0;i<\`therm_bits;i=i+1) begin
          if(Decimal_Code!=i) begin
              dout[i]=vss;
          end
      else begin
          dout[i]=vdd;
      end
end
end
endcase

// Plotting outputs
for (i=0; i<\`therm_bits; i=i+1)
    V(out[i]) <+ transition(dout[i],0,0);
end

endmodule
</code></pre>
    
