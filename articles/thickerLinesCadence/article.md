---
description: "How to make wires thicker in Cadence Virtuoso"
---

## How to make wires/lines thicker in Cadence Virtuoso?

Let's make Cadence Virtuoso schematic look nicer and more friendly for print export. Default line thickness is too small,
 so let's change that. First, in main CIW window, navigate to **Tools → Display Resource Manager → Edit** :

<br/> <img src="http://localhost:3000/images/thickerLinesCadence/drf-menu.png"  alt="Display resource Manager menu" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Display resource Manager menu</p> 

Then select your technology library (not analogLib) and type **wire** in a search box:

<br/> <img src="http://localhost:3000/images/thickerLinesCadence/drf-wire.png"  alt="Changing wire thickness (thickline2)" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Changing wire thickness (thickline2)</p> 

Change the wire thickness to **thickline2** or any one you like.
Then type **device** in a search box:

<br/> <img src="http://localhost:3000/images/thickerLinesCadence/drf-device.png"  alt="Changing symbol thickness (thickline2)" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Changing symbol thickness (thickline2)</p>

Change the device line thickness to **thickline2** or any one you like.

<br/> <img src="http://localhost:3000/images/thickerLinesCadence/drf-save.png" alt="Saving DRF change" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Saving DRF change</p>  

Press **Modify Current Packet** to save.
To see changes, in Schematic window perform: **View → Redraw (F6)**:

<br/> <img src="http://localhost:3000/images/thickerLinesCadence/drf-result.png" disableinvert alt="DRF change result" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">DRF change result</p> 

Done! You can also change colors/fillings/line types for your needs.
