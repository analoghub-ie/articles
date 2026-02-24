---
description: "Verilog-A model for the Voltage Controlled oscillator (VCO)"
---

## Voltage-controlled oscillator model (VCO)
This article contains two models: 


**Model 1:** Gain (V/Hz) is set directly

**Model 2:** Gain (V/Hz) is set through start/stop frequency

Tunable parameters:
- [1] Gain (in V/Hz) [2] Start/Stop frequency; 
- DC offset;
- Amplitude;
- Start frequency;
- Number of points per period - can be useful for FFT simulations etc.

> **Cell name:** vco

> **Model type:** Verilog-A

> **Download from Github**: [Model 1](https://github.com/analoghub-ie/software/blob/main/Verilog-A/vco1.va),
[Model 2](https://github.com/analoghub-ie/software/blob/main/Verilog-A/vco2.va)
    
<pre><code class="language-verilog">
// VCO model
// Contains two models:
// Model 1: Gain (V/Hz) is set directly
// Model 2: Gain (V/Hz) is set through start/stop frequency
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

// Model 1: Gain (V/Hz) is set directly
module vco(out,in); 
voltage out,in; 
parameter real Gain_Hz_per_V = 1e6; 
parameter real DC_offset = 1;
parameter real Amplitude = 1;
parameter real Points_per_period = 100;
parameter real Start_freq = 1e6;
real phase, freq; 
 
\tanalog begin 
\t\tfreq = Start_freq+Gain_Hz_per_V*V(in); 
\t\tphase = idtmod(freq,0,1); 
\t\tV(out) <+ DC_offset+Amplitude*cos(2*\`M_PI*phase); 
\t\t$bound_step(1/(Points_per_period*freq)); 
\tend 
endmodule 

// Model 2: Gain (V/Hz) is set through start/stop frequency
module vco(out,in); 
voltage out,in; 
parameter real DC_offset = 1;
parameter real Amplitude = 1;
parameter real Points_per_period = 100;
parameter real Start_frequency = 1e6;
parameter real Stop_frequency = 10e6;
real phase, freq, gain; 
 
\tanalog begin 
\t\tgain = Stop_frequency/Start_frequency;
\t\tfreq = Start_frequency+gain*V(in); 
\t\tphase = idtmod(freq,0,1); 
\t\tV(out) <+ DC_offset+Amplitude*cos(2*\`M_PI*phase); 
\t\t$bound_step(1/(Points_per_period*freq)); 
\tend 
endmodule 
</code></pre>
    
        
