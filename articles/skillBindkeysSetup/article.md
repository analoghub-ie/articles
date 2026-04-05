---
description: "Setting BindKeys in Cadence Virtuoso Using SKILL Code"
authors:
  - name: "Eugeny Khanchin"
    github: "https://github.com/eKhanchin"
---

# Setting Bind Keys in Cadence Virtuoso Using SKILL Code



Bind keys in Cadence Virtuoso are a great way to boost your productivity and simplify your design work. They let you set 
up custom keyboard shortcuts for specific tasks, so you can breeze through repetitive actions faster and more efficiently.
For the best results, use bind keys for quick, frequently-used tasks. Avoid setting them for actions that take a long 
time, as you might accidentally trigger one and end up waiting for your Virtuoso session to unfreeze. Nobody wants to be 
stuck for five or more minutes because of a misstep!

You can configure bind keys manually using the "Bindkey Editor" form (CIW ⟶ Options ⟶ Bindkeys) or automate the 
process with SKILL code, which we will cover in this guide.


<div id="singleBindkey"></div>

## 1. Single Action Bind Key

To define a bind key for a single action, use the action's function. For example, to make all layers invisible except 
the selected layer in the Layout window’s palette, we use a built-in SKILL function:

[Download from Github](https://github.com/analoghub-ie/software/blob/main/SKILL/set_bindkeys.il)

<pre><code class="language-lisp">

hiSetBindKey("Layout" "Ctrl<Key>Q" "leSetAllLayerVisible(nil)")

</code></pre>

> **Tip:** To discover functions for most actions, enable all filter options in the "Set Log File Display Filter" form 
(CIW ⟶ Options ⟶ Log Filter), perform the action, and check the CIW terminal for the function used.

<br/> <img src="http://localhost:3000/images/skillBindkeysSetup/skillDisplayFilter.png" disableinvert alt="Log File Display Filter Menu" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Log File Display Filter Menu</p> 

<br/> <img src="http://localhost:3000/images/skillBindkeysSetup/skillDisplayLog.png" disableinvert alt="Log File Display Filter Output" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Log File Display Filter Output</p> 

<div id="multipleActions"></div>

## 2. Multiple Actions or Complex Steps
For multiple actions or steps, define a function. For instance, toggle the dimming option and change the dimming 
intensity in the Layout window. These options can be found in the “Display Options” form (Layout window ⟶ Options ⟶ 
Display).

<br/> <img src="http://localhost:3000/images/skillBindkeysSetup/skillEnableDimming.png" disableinvert alt="Enable Dimming Menu" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Enable Dimming Menu</p> 

In SKILL, you can access and change the settings in the 'Display Options' form by interacting with the Layout window's 
object.

Toggling dimming option:

<pre><code class="language-lisp">

procedure(toggleLayoutDimming()
    ;Toggles the dimming feature in the current layout window.
    let((window)
        
        window = hiGetCurrentWindow()
        
        window~>dimmingOn = !window~>dimmingOn
        window~>dimmingScope = "all"
        
        printf("Enable dimming = %L\n" window~>dimmingOn)
    )
)

</code></pre>

We retrieve the current window and toggle its **dimmingOn** value to enable the dimming option. The dimming option is a 
boolean value, which means you can toggle it by using the "not" operator (!). Additionally, we set the dimming scope 
to 'all' to ensure the dimming effect is visible.

Changing dimming intensity:

<pre><code class="language-lisp">

procedure(changeLayoutDimmingIntensity(signum @key (byValue 5))
;Adjusts the dimming intensity of the current layout window by a
;specified value and direction.

;@param signum int
;       The direction of adjustment. Positive values increase
;       intensity, negative values decrease it.
;@key byValue int
;     Optional. The amount by which to adjust the dimming intensity.
;     Default is 5.

let((window intensity)

window = hiGetCurrentWindow()

intensity = window~>dimmingIntensity
intensity = (signum * byValue) + intensity
cond(
(intensity < 0
intensity = 0
)
(intensity > 100
intensity = 100
)
)

window~>dimmingIntensity = intensity

printf("Dimming intensity = %d\n" window~>dimmingIntensity)
)
)

</code></pre>

We also retrieve the current window and its dimming intensity value. This function is designed to be flexible, allowing 
adjustments to either increase or decrease the intensity. You can specify a different step value, with the default 
set to 5.

> **Example:**

<pre><code class="language-lisp">

changeLayoutDimmingIntensity(1 ?byValue 10)

</code></pre>


<div id="functionBindkeys"></div>

## 3. Setting Bind Keys for Functions

Now we’ve got to set bind keys for these two functions.

Each bind key can be configured with a single command, as demonstrated earlier:

<pre><code class="language-lisp">
hiSetBindKey("Layout" "<Key>," "changeLayoutDimmingIntensity(-1)")
hiSetBindKey("Layout" "<Key>." "changeLayoutDimmingIntensity(1)")
hiSetBindKey("Layout" "<Key>/" "toggleLayoutDimming()")

</code></pre>

Or set multiple bind keys in one command:

<pre><code class="language-lisp">

hiSetBindKeys("Layout" list(
list("<Key>," "changeLayoutDimmingIntensity(-1)")
list("<Key>." "changeLayoutDimmingIntensity(1)")
list("<Key>/" "toggleLayoutDimming()")
)
)

</code></pre>

Here, we assign functions to the following bind keys:

- **","** - Decrease dimming intensity.
- **"."** - Increase dimming intensity.
- **"/"** - Toggle dimming option on / off.

<div id="bindkeyComponents"></div>

## 4. Bind Key Components

Each bind key requires:
- **Application Name:** For the Layout window, we use "Layout". Other windows require different application names. 
You can find all available application names in the "Bindkey Editor" form.
- **Key:** The key to set the bind key to. Bind keys can also be set for the mouse. 
Refer to Cadence documentation for more details.
- **Function Call:** The function to execute.


<br/> <img src="http://localhost:3000/images/skillBindkeysSetup/skillBindkeysMenu.png" disableinvert alt="Bindkeys Menu" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Bindkeys Menu</p> 

<div id="loadingBindkeys"></div>

## 5. Loading Bind Keys

Write your SKILL code with bind keys definitions in a **.il** file and load it from CIW using the **load()** function 
or from the SKILL IDE. 

To load bind keys automatically when Virtuoso starts, define or modify the **.cdsinit** file with your SKILL code. 
Place the **.cdsinit** file in one of these locations:

- <your_install_dir>/tools.<platform>/dfII/local/.cdsinit
- Current directory (where Virtuoso is open) - ./.cdsinit
- Your home directory - ~/.cdsinit

Re-open Virtuoso to test the automatic loading.

<div id="conclusion"></div>

6. Conclusion

To maintain a clean and readable code structure, separate your bind key definitions into one file and the functions 
they use into another. This approach helps declutter your code and enhances readability. You can then load these files 
from the **.cdsinit** file or directly from the CIW.
