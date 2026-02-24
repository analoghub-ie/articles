---
id: netNaming
title: "Net naming tricks in Cadence Virtuoso"
description: "Net naming tricks in Cadence Virtuoso"
hideInProd: false
---

### List of tricks
1. [How to rename multiple nets simultaniously in Cadence Virtuoso?](#multipleNetsRename)
2. [How to create a bus in Cadence Virtuoso?](#createBus)
3. [How to edit net name directly in Cadence Virtuoso?](#directNetEditing)
4. [How to connect a bus to a net in Cadence Virtuoso?](#busToNet)
5. [How to connect multiple wires to the same potential in Cadence Virtuoso?](#multipleWiresToNet)

<div id="multipleNetsRename"></div>


## 1. How to rename all nets in Cadence Virtuoso?
This is how to rename multiple nets in Cadence Virtuoso.
1. Have your schematic with the multiple nets that you want to rename simultaniously:

<br/> <img src="http://localhost:3000/images/cadenceTricks/renaming-multiple-nets-1.png" disableinvert alt="Original schematic with multiple nets" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Original schematic with multiple nets</p> 

2. Create a pin named same as your current net name (Press *P* and enter the net name you have in the schematic):
<br/> <img src="http://localhost:3000/images/cadenceTricks/renaming-multiple-nets-2.png" disableinvert alt="Creating a pin with the same net name" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Creating a pin with the same net name</p> 

Add the pin to the schematic and press *Check and Save* (or *Shift+X*).

3. Change the pin name to the desired net name:
You can select the created pin and press **Q hotkey** to open properties and edit the name of the pin or select pin name and press **T** to edit-in-place:

<br/> <img src="http://localhost:3000/images/cadenceTricks/renaming-multiple-nets-3.png" disableinvert alt="Renaming a pin to a target name" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Renaming a pin to a target name</p> 

Change the name of the pin to the *target net name* and perform *Check and Save*. All your nets are now renamed.




<div id="createBus"></div>

## 2. How to create a bus in Cadence Virtuoso?

1. First, press **L** hotkey to create a wire name:

<br/> <img src="http://localhost:3000/images/cadenceTricks/bus-naming-1.png" disableinvert alt="Bus nets" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Bus nets</p> 

2. Then, create a bus name and add an index, according to the number of nets (in this example we have 4 nets so the net 
index is <0:3> or <1:4>) and select options *Expand Bus Names* and *Attach to Multiple Wires*:

<br/> <img src="http://localhost:3000/images/cadenceTricks/bus-naming-2.png" disableinvert alt="Adding bus name" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Adding bus name</p> 

3. Then, click on the first net of the bus and stretch till the last one:

<br/> <img src="http://localhost:3000/images/cadenceTricks/bus-naming-3.png" disableinvert alt="Stretching a bus name" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Stretching a bus name</p> 

4. Bus has been created!

<br/> <img src="http://localhost:3000/images/cadenceTricks/bus-naming-4.png" disableinvert alt="Bus naming results" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Bus naming results</p> 

<div id="directNetEditing"></div>

## 3. How to edit net name directly in Cadence Virtuoso?

Select the net name and press **T hotkey**. Now you can enter net name directly:

<br/> <img src="http://localhost:3000/images/cadenceTricks/direct-net-editing.png" disableinvert alt="Bus nets" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Bus nets</p> 

<div id="busToNet"></div>

## 4. How to connect a bus to a net in Cadence Virtuoso?
Sometimes we need to connect a multiple separate nets to a bus. Let's say, we have a block input of <2:0> and we want to
connect bits <1>, <3>, <5> to this input. In order to do that, we can write ***bit<1>, bit<3>, bit<5>*** on the input net.
However, the simplier way of doing that is writing ***bit<1,3,5>***:

<br/> <img src="http://localhost:3000/images/cadenceTricks/multiple-bus-1.png" disableinvert alt="Connecting multiple nets to the bus" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Connecting multiple nets to the bus (all notations are equivalent)</p> 

Moreover, if the spacing between bus nets is defined (let's say, we want just the odd nets to be connected), we can 
simplify it to ***bit<1:5:2>*** which means to connect bits from <1> to <5> with the increment of 2. This can be 
particularly useful while connecting multiple wires with an equal spacing.

<div id="multipleWiresToNet"></div>

## 5. How to connect multiple wires to the same potential in Cadence Virtuoso?

Sometimes we need to connect a bus to a multiple wires (i.e. VDD/VSS for a digital bus). In order to do that, there is
no need of creating multiple voltage sources to define the code. The simpler way of doing that is shown on the picture 
below:

<br/> <img src="http://localhost:3000/images/cadenceTricks/multiple-bus-2.png" disableinvert alt="Connecting multiple nets to the bus" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Connecting multiple nets to the bus</p> 

So, if we want to define a sequence where net1 = VDD and net2 = VSS, if we want to get the input of our block to be
***100***, then we have to write the equation like this: ***<*1>net1, <*2> net2>***. <*int>net_name denotes number of 
times ***int*** that ***net_name*** is connected to the bus.
