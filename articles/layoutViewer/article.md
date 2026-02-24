---
description: "Description of article 1"
---

    
## 3D layout viewer
[GDS3D](https://www.utwente.nl/en/news/2012/3/59583/3d-gdsii-viewer-goes-open-source) - is an amazing 3D layout viewer 
that can be used to present your design or even debug some complex layout problems! This is an open-soource software 
provided by University of Twente, Netherlands.

<br/>

<div style="display: block; margin-inline: auto; width: min(90%, 100rem); aspect-ratio: 16/9">
    <iframe 
        src="https://www.youtube.com/embed/F4EArOqNNSU" 
        alt="3D GDS viewer from the IC Design Group, University of Twente" 
        style="width: 100%; height: 100%; border: none;">
    </iframe>
</div>

***Usage (Windows):***
1. Download the software from the official [GitHub repo](https://github.com/icdut24/GDS3D)
2. Go to *path* and change the map file according to your process;
3. [Export GDS in Cadence Virtuoso](/category/cadenceTricks/article/exportGDS)
4. Place GDS into the *path*
5. Modify ***.map*** file according to the process layer definitions;
6. Change GDS name and MAP file name in *.cmd* script;
7. Run *.cmd*


The process definition files contain the physical properties of the process being used, as well as color mappings for 
each layer. These files are simply text files listing every layer in the process along with its properties. An example 
layer, taken from the mock-up process that comes with the program, is defined as follows:

<pre><code class="language-bash">
    LayerStart: Metal 1       # Start tag and layer name as it will appear in the legend
    Layer: 7                  # GDSII layer number     
    Datatype: 0               # GDSII layer data type           
    Height: 620               # Start height (usually in nm)
    Thickness: 150            # Thickness (usually in nm)
    Red: 0.00                 # Red color component (0.0-1.0)
    Green: 0.00               # Green color component (0.0-1.0)
    Blue: 1.00                # Blue color component (0.0-1.0)
    Filter: 0.0               # Transparency (do not use)
    Metal: 1                  # Metal clickable in net highlighting mode (0 for VIA)
    Shortkey: 1               # Shortcut to toggle layer visibility
    Show: 1                   # Set to 0 for layers that are not to be rendered
    Virtual: 10 AND 11        # Define a new layer where 10 AND 11 exist     
    Material: Al              # Define Material of layer for gmsh output only
    OutMaterial: SiO2         # Define OutMaterial of layer for gmsh output only
    MinSpace: 350             # Define Minimum space to merge via for gmsh output only   
    LayerEnd                  # End tag
</code></pre>

The first layer in the file is the substrate and must always be present. Its layer number is always 255 and it is the 
only layer for which a filter value other than 0.0 is advised (0.5 works well here). Comments can be added to the 
definition file by pre-pending them with #.
Toggling layer visibility while the program is running can be easily achieved by setting a shortkey for a layer. 
These shortkeys can be any numerical key (0-9). Modifier keys can also be used, by pre-pending the shortkey with 
(a combination of) , and .
One extra option can be added to a layer, which is "Datatype". This can normally be omitted, as most in processes 
different datatypes with the same layer number do not mean physically different layers. However, the developers 
have heard of one case where N-Well and P-Well "layers" actually had the same layer number but different datatypes. 
In such an event one can specify two layers with the same layer number but differing datatypes to render these layers in, 
for example, different colors.

### 1. Using the program

#### 1.1 Controlling Movement

When the program is running, it is possible to move the camera around using the classical 3D-game controls, the A,W,S,D 
(or the arrow) keys. The Q and Z keys are used to move the camera up and down and the R key can be used to reset the view.
Initially the program has a traditional mouse cursor. In this mode the user can rotate the view by pressing the left mouse 
button and dragging the mouse to the left or right to rotate the view, and up or down to tilt the view. Dragging the 
mouse while holding the right mouse button will strafe the view for left or right motion, and move forwards or backwards 
for up or down motion. Finally, the scroll wheel can be used to move up or down.
By pressing the M key, the program switches to mouse control mode. In this mode the mouse can be used to rotate and tilt 
the camera much like in a 3D-game. The scroll wheel can still be used to move up and down.

#### 1.2 Interface Elements

##### 1.2.1 Legend

The program contains a legend, which can be toggled with the L key, from where the visibility of each layer can be 
toggled. Another way to show or hide layers is by pressing the control key and scrolling the mouse wheel. Scrolling up 
will hide the last visible layer (basically stripping away layers from the top with each 'click') and scrolling down 
will un-hide the last hidden layer. By using the alt instead of the control key, the same procedure can be used, except 
it will start from the bottom up. The third and final way in which the user can toggle layer visibility if by using 
shortkeys defined in the process definition file.

##### 1.2.2 Rulers

It is also possible to create a ruler, by pressing the K button. A red plane will appear in the layout. You can click 
with the left mouse button on points on the plane to define the ruler. To measure in a different layer, hold the CTRL 
key and scroll with your mouse wheel.

##### 1.2.3 Topcell Selection

By pressing the T key the user can bring up a list of all the cells in the GDSII file. By clicking one of these cells 
it will become the "top cell", meaning only it and its sub-cells will be rendered. The cells in this window are 
hierachically ordered, click on the triangles to open up new hierarchy levels.

##### 1.2.4 Performance Counter

The P key brings up a performance counter. This counter shows the number of frames per second, as well as the number of 
triangles being rendered at a given moment.

##### 1.2.5 Exploded View

Pressing the E key will "explode" the view. This means the starting height of each layer will be multiplied by a constant 
value, basically creating gaps between the layers. This can for example be useful when viewing fringe capacitances.

##### 1.2.6 Net Highlighting (Tracing)

Pressing the H key will start net tracing mode. The layout will turn grey and you can now left-click on the top of a 
metal to trace it. Only the trace will have color, making it easy to follow a line. Note that tracing ground and power 
lines can take a long time, press ESCAPE at any time to interrupt the tracing. In order for tracing to work properly, 
the process definition file must have the Metal parameter set to 1 for all metal layers (but NOT for VIA's). The tracer 
expects that the height and thickness of the layers are adjacent and that metals and via's alternate in the metal stack.






    
    
