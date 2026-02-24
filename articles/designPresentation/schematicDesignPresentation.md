---
id: schematicDesignPresentation
title: "Schematic Design Presentation"
description: "Creating clean and informative schematic diagrams for Analog IC design"
hideInProd: false
---

   

## Schematic Diagrams

How many times we've seen ugly drawings like these in papers, design presentations and guides?

<br/> <img src="http://localhost:3000/images/designPresentation/schDiagramBad.png" disableinvert alt="Looks terrible, isn't it?" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Looks terrible, isn't it?</p> 

Designers and researchers use different software to present their designs or ideas - Visio, PowerPoint, CorelDraw etc.
The most of this software isn't free and not available for everyone. After months of searching for a solution, I've decided 
to create a symbol library for an open-source [Inkscape](https://inkscape.org/), that allows to create vector drawings 
and export them in any suitable format, which is very handy. 



**How to use:**
1. [Download Inkscape](https://inkscape.org/)
1. [Download Inkscape symbols from Github](https://github.com/analoghub-ie/art/tree/main/inkscapeSymbols)

This folder contains 3 sets of symbols:
- [AH-behavioural](https://github.com/analoghub-ie/art/blob/main/inkscapeSymbols/AH-behavioural.svg) - contains 
symbols for block-level diagrams;
- [AH-logic-gates](https://github.com/analoghub-ie/art/blob/main/inkscapeSymbols/AH-logic-gates.svg) - contains
logic gates symbols;
- [AH-analog](https://github.com/analoghub-ie/art/blob/main/inkscapeSymbols/AH-analog.svg) - contains symbols for 
Analog and Mixed-Signal schematic drawings.


2. Paste the file(s) into the following directory (create one if it doesn't exist):

- **Windows:** *C:\\Users\\username\\AppData\\Roaming\\inkscape\\symbols*

- **Linux:** *~/.config/inkscape/symbols*

- **macOS:** */Users/username/.config/inkscape/symbol*

3. Open new document
4. Open the symbols bar: **Object -> Symbols -> AH-behavioural / AH-logic-gates / AH-analog (Ctrl+Shift+Y)**

<br/> <img src="http://localhost:3000/images/designPresentation/addSymbolLibrary.png" disableinvert alt="Adding Symbol Library in Inkscape" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Adding Symbol Library in Inkscape</p> 

5. **Select** desired symbol library: 

<br/> <img src="http://localhost:3000/images/designPresentation/symbolLibrary.png" disableinvert alt="Inkscape Symbol Libraries" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Inkscape Symbol Libraries</p> 

5. **Drag and Drop** the symbol you need or use search.

**Guidelines:**
- Default line thickness is **0.75px**
- Default text size is **3pt**
- Do not resize the individual elements!
- Always use grid
- Enable snapping!
- Grid on/off by **#** key
- Export drawings in *.svg* or *.pdf* format to preserve image quality
- Increase DPI during export to **1500 dpi** to improve image quality

6. You are all set and ready to create beautiful vector drawings like these:

<br/> <img src="http://localhost:3000/images/circuits/ldoPMOS.svg" alt="Inkscape Symbol Libraries use example" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Inkscape Symbol Libraries use example</p> 

If you have any suggestions or want any other symbols to be added, please send an email to: contact@analoghub.ie
