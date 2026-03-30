---
description: "Verilog-A model for Binary to Thermometer encoder"
---

## Binary-to Thermometer Encoder model

This is a behavioral binary-to-thermometer encoder that converts an N-bit binary input into a one-hot thermometer output bus, a key building block in current-steering DAC decoders, pipelined ADC segment selectors, and programmable-gain amplifier stimulus blocks. With `binary_bits = N`, the model drives 2^N output lines; `Start_Bit` selects whether decimal 0 maps to the all-zero word (Start_Bit = 0) or to the LSB-high word (Start_Bit = 1), accommodating different DAC unit-element conventions. Output logic levels are set by `vdd`/`vss` and the input threshold by `threshold`. A typical use-case is driving the unit-element switches of a segmented current-steering DAC array from a binary counter output in a mixed-signal simulation, bypassing the need for a transistor-level decoder during early behavioral verification.

*This page contains Verilog-A model of the binary-to-thermometer encoder. This block can be used for behavioral simulation of the pipelined ADCs, programmable gains/BW etc. This model will automatically select number of outputs based on selected number of input binary bits.*


**Usage:** 
1. Create a new cell in Library Manager named ***bin2therm*** and select cell type ***Verilog A***;
2. Copy and paste the code provided;
3.  Specify ***binary_bits*** variable to be the desired binary bits number;
4. Specify ***Start_Bit*** to be 0 if you want thermometer code to start from 0 or 1 if you want thermometer code to start from 1;
5. Perform ***Check and Save***;
6. A cell symbol will be created;
7. Instantiate ***bin2term*** cell into your design;
8. Perform ***Check and Save*** and run the simulation.


> Example:
> ***binary_bits = 2, Start_Bit = 0***

|Binary input|Thermometer code|
|------------|----------------|
|    00      |      000       |
|    01      |      001       |
|    10      |      010       |
|    11      |      100       |

> Example:
> ***binary_bits = 2, Start_Bit = 1***

|Binary input|Thermometer code|
|------------|----------------|
|    00      |      0001      |
|    01      |      0010      |
|    10      |      0100      |
|    11      |      1000      |


> **Cell name:** bin2term

> **Model type:** Verilog-A

> [Download from Github](https://github.com/analoghub-ie/software/blob/main/Verilog-A/bin2therm.va)

<pre><code class="language-verilog">
// Binary to Thermometer decoder
// Implements two options: 
// Start_Bit = 0: Decimal 0 equals thermometer 0
// Start_Bit = 1: Decimal 0 equals thermometer 1
// Change binary_bits variable for your needs!
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"
\`define binary_bits 4// define number of binary bits here

module bin2therm(in,out);
input [\`binary_bits-1:0] in;
output [2**\`binary_bits-1:0] out;

voltage [\`binary_bits-1:0] in;
voltage [2**\`binary_bits-1:0] out;

parameter real vdd = 1;// voltage level of logic 1 (V)
parameter real vss = 0;// voltage level of logic 0 (V)
parameter real threshold = 0.5;// logic threshold level (V)
parameter integer Start_Bit = 0;    // defines if thermometer starts from 0 or 1

real dout[2**\`binary_bits-1:0];// internal result variable
integer code;
genvar i;

analog begin
// convert binary input to code
    code = 0;
    for (i = 0; i < \`binary_bits; i = i + 1) begin
        @(cross(V(in[i]) - threshold))
            ;
        if (V(in[i]) > threshold)
            code = code + (1 << i);
            end
//$display("Code = %d", code);

case (Start_Bit)
    0: begin// Decimal 0 equals thermometer 0
for(i=1;i<2**\`binary_bits+1;i=i+1) begin
          if(code!=i) begin
              dout[i-1]=vss;
          end
      else begin
          dout[i-1]=vdd;
      end
end
end 

    1: begin// Decimal 0 equals thermometer 1
for(i=0;i<2**\`binary_bits;i=i+1) begin
          if(code!=i) begin
              dout[i]=vss;
          end
      else begin
          dout[i]=vdd;
      end
end
end
endcase

// Plotting outputs
for (i=0; i<2**\`binary_bits; i=i+1)
    V(out[i]) <+ transition(dout[i],0,0);
end
endmodule
</code></pre>

    
