---
id: dec2therm
title: "Decimal to Thermometer Encoder Verilog-A model"
description: "Verilog-A model for Decimal to Thermometer encoder"
---

## Decimal to Thermometer Encoder
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

</br>

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

</br>

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
\`define therm_bits 10\t\t\t\t\t\t// define number of output bits here

module dec2therm(out);

output [\`therm_bits-1:0] out;
voltage [\`therm_bits-1:0] out;

parameter real vdd = 5;\t\t\t\t\t// voltage level of logic 1 (V)
parameter real vss = 0;\t\t\t\t\t// voltage level of logic 0 (V)
parameter integer Decimal_Code = 5; \t// input decimal code
parameter integer Start_Bit = 0;    \t// defines if thermometer starts from 0 or 1

real dout[\`therm_bits-1:0];\t\t\t\t\t// internal result variable
genvar i;

analog begin

case (Start_Bit)
    0: begin\t// Decimal 0 equals thermometer 0
\t\tfor(i=1;i<\`therm_bits+1;i=i+1) begin
          \t\tif(Decimal_Code!=i) begin
              \t\tdout[i-1]=vss;
          \t\tend
      \t\telse begin
          \t\tdout[i-1]=vdd;
      \t\tend
\t\tend
\tend 

    1: begin\t// Decimal 0 equals thermometer 1
\t\tfor(i=0;i<\`therm_bits;i=i+1) begin
          \t\tif(Decimal_Code!=i) begin
              \t\tdout[i]=vss;
          \t\tend
      \t\telse begin
          \t\tdout[i]=vdd;
      \t\tend
\t\tend
\tend
endcase

// Plotting outputs
for (i=0; i<\`therm_bits; i=i+1)
\t    V(out[i]) <+ transition(dout[i],0,0);
end

endmodule
</code></pre>
    
