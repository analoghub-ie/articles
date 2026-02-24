---
description: "How to display Verilog-A model parameters on schematic in Cadence Virtuoso"
---

## How to display Verilog-A model parameters in Cadence Virtuoso?

Displaying *Verilog-A* model parameters on the schematic can be useful to track changes.
To do that, all you need is to add text label (Create → Label **[Hotkey L]**) and then press **F3** to display options
menu:

<br/> <img src="http://localhost:3000/images/displayParamsVerilogA/params-display-2.png" disableinvert alt="Create Verilog-A parameters label" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Create Verilog-A parameters label</p> 

Then select **Analog Device Annotate** and enter *Verilog-A* parameter name in **"cdsParam("your_param")"**. Repeat that action for all 
Verilog-A model parameters that you want to be displayed. After that, you will see specified parameters on schematic as 
show below:

<br/> <img src="http://localhost:3000/images/displayParamsVerilogA/params-display.png" disableinvert alt="Displaying Verilog-A parameters on schematic" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Displaying Verilog-A parameters on schematic</p> 
