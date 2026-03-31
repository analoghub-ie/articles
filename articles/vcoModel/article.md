---
description: "Verilog-A model for the Voltage Controlled oscillator (VCO)"
---

# Voltage-controlled oscillator model (VCO)

This is a behavioral sinusoidal VCO model where the output frequency varies linearly with the input control voltage, suitable for PLL behavioral simulations, FM modulation testbenches, and VCO gain characterization without a full transistor-level oscillator. Two variants are provided: Model 1 sets the tuning sensitivity directly via `Gain_Hz_per_V` (Hz/V); Model 2 derives it automatically from a `Start_frequency`/`Stop_frequency` tuning range — convenient when the VCO spec is expressed as a bandwidth rather than a gain slope. Shared parameters include `DC_offset` (output midpoint), `Amplitude`, and `Points_per_period` (simulator steps per cycle — increase this for accurate FFT-based phase-noise analysis). The internal `$bound_step` call adapts the maximum timestep to the instantaneous frequency, ensuring the waveform is correctly resolved even at high frequencies. A typical use-case is the oscillator core in a PLL behavioral model for lock-time or phase-noise co-simulation.

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
 
analog begin 
freq = Start_freq+Gain_Hz_per_V*V(in); 
phase = idtmod(freq,0,1); 
V(out) <+ DC_offset+Amplitude*cos(2*\`M_PI*phase); 
$bound_step(1/(Points_per_period*freq)); 
end 
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
 
analog begin 
gain = Stop_frequency/Start_frequency;
freq = Start_frequency+gain*V(in); 
phase = idtmod(freq,0,1); 
V(out) <+ DC_offset+Amplitude*cos(2*\`M_PI*phase); 
$bound_step(1/(Points_per_period*freq)); 
end 
endmodule 
</code></pre>
    
        
