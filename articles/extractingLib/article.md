---
description: "Extracting Library and Cell Names from a Top Cell Hierarchy Using SKILL Code"
---

## Extracting Library and Cell Names from a Top Cell Hierarchy Using SKILL Code


### Contents:
1. [Approach](#approach)
2. [SKILL Code](#skillCode)
3. [SKILL Code Overview](#codeOverview)
4. [Function Output](#functionOutput)
5. [Usage Examples](#usageExamples)
6. [Alternative Methods](#alternativeMethods)


This guide explains how to extract the names of libraries and cells used in a top cell hierarchy within layout and schematic views. 
Essentially, it answers the question: What libraries and cells are utilized in the design?

### Key Considerations:
- The goal is to collect library and cell names once. For object counting, other techniques should be used.
- Larger top cells may result in longer execution times.


<div id="approach"></div>

### 1. Approach
The method involves traversing the top cell's hierarchy, like navigating through layout or schematic windows. 
Manually, you would select an instance and descend into its cell view. Our SKILL code achieves this using recursion, 
tracking visited library and cell names with SKILL's table data structure.

<div id="skillCode"></div>

### 2. SKILL Code
<pre><code class="language-lisp">
procedure( getLibrariesCellsUsedIn(cellView 
            @optional (usedLibrariesCellsTable nil))
    ;Retrieves all libraries and cells used in the hierarchy of a given
    ;cell view.

    @param cellView dbObject
    ;The cell view object from which to retrieve the hierarchy.

    @param usedLibrariesCellsTable table
    ;Optional. A table to keep track of used libraries and cells.
    ;If not provided, a new table is created.

    @return table
    ;A table containing libraries as keys and tables of cell names as
    ;values, representing the hierarchy.
    */
    let( (cellTable libName cellName cellObject message viewName nextCellView)

        ; First initialization
        unless( usedLibrariesCellsTable
            usedLibrariesCellsTable = makeTable('usedLibrariesCellsTable nil)
            cellTable = makeTable('cellTable nil)
            cellTable[cellView~>cellName] = t
            usedLibrariesCellsTable[cellView~>libName] = cellTable
        );unless

        foreach( instance cellView~>instHeaders
            libName = instance~>libName
            cellName = instance~>cellName
            cellObject = ddGetObj(libName cellName)
                            
            if( !cellObject
            then
                message = strcat("[getLibrariesCellsUsedIn] " libName "/"
                    cellName " cell doesn't exist in your Library Manager")
                warn(message)
            else
                ; Creates cells' table for a library
                unless( usedLibrariesCellsTable[libName]
                    cellTable = makeTable('cellTable nil)
                    usedLibrariesCellsTable[libName] = cellTable
                );unless
                
                unless( usedLibrariesCellsTable[libName][cellName]
                    ; This cell is not in table yet
                    usedLibrariesCellsTable[libName][cellName] = t
                    
                    ; Gets instance's cell view
                    viewName = mapViewName(instance~>viewName)
                    nextCellView = dbOpenCellViewByType(libName cellName viewName)
                    when( nextCellView
                        usedLibrariesCellsTable = getLibrariesCellsUsedIn(nextCellView
                            usedLibrariesCellsTable)
                    );when
                );unless
            );if
        );foreach
            
        usedLibrariesCellsTable
    );let
);procedure


procedure( mapViewName(viewName)
    ;Maps a view name to a common view name that includes 'instances'
    ;for hierarchy traversal.

    @param viewName string
    ;The name of the view to be mapped.

    @return string
    ;The mapped view name.

    if( viewName == "symbol"  ; Symbol's cell view doesn't have ~>instances
    then
        "schematic"
    else
        viewName
    );if
);procedure
</code></pre>

<div id="codeOverview"></div>

### 3. SKILL Code Overview

Encapsulating code in functions allows us to reuse the code in other tools.

**Lines 1-17:**

Define the main function, including its name and arguments. Documentation is optional but recommended.
- cellView: The top cell's cell view dbObject, obtainable via dbOpenCellViewByType.
- usedLibrariesCellsTable: An optional argument for tracking visited libraries and cells during recursion.

**Line 18:**

Use let to define local variables (memory management in Virtuoso is beyond this guide's scope, though, it can be a different topic for a guide).

**Lines 20-26:**

Initialize the tracker table for the first time, which will track visited libraries and cells.

**Lines 28-58:**

Traverse all instances in the current cell view, marking them as "visited" and delving deeper into the hierarchy.

**Lines 29-31:**

Define variables to hold instance’s necessary data for the algorithm.

**Lines 33-37:**

Check if current library and cell names exist in the database, using a “dd” object. If not, print a warning in the CIW and skip the descension code for the current instance.

**Lines 39-43:**

If visiting the library name for the first time, initialize a table for cell names. 

**Lines 45-56:**

Skip if the cell name has been visited; otherwise:
- Line 47: Mark it as visited.
- Line 50: Map the view name to ensure instances are accessible. When we traverse the schematic hierarchy, every instance’s view will be a symbol, which, when open, doesn’t include information, such as “instances”. Thus, we need to map a “symbol” to a “schematic” view using our helper function - mapViewName.
- Line 51: Open the next cell view, using the mapped view name.
- Lines 52-55: Descend into the next cell view.

**Line 60:**

Each recursive function iteration returns a reference to the tracker table.

**Lines 65-82:**

mapViewName: Maps *"symbol"* to *"schematic"* view; otherwise, returns the given view name.

<div id="functionOutput"></div>

### 4. Function Output

The main function, *getLibrariesCellsUsedIn*, returns a SKILL table with library and cell names as strings. This data can 
be used to call other functions, create objects, or access further information.

<div id="usageExamples"></div>

### 5. Usage Examples

After loading the main code, run the following in CIW:
<pre><code class="language-lisp">
libName = “my_lib_name”  ; Replace with actual names
cellName = “my_cell_name”
viewName = “view_name”
cellView = dbOpenCellViewByType(libName cellName viewName)
table = getLibrariesCellsUsedIn(cellView)

</code></pre>

After execution, the *table* variable can be utilized in various ways:

- Get library names only:
<pre><code class="language-lisp">
libraries = table~>?
</code></pre>


- Get library’s cell names:
<pre><code class="language-lisp">
libName = “my_lib_name”  ; Replace with actual name
cells = table[libName]~>?
</code></pre>


- Access each cell in each library:
<pre><code class="language-lisp">
foreach( libName table
foreach( cellName table[libName]
; Do stuff, e.g., open cell view, get views names, etc.
; cellView = dbOpenCellViewByType(libName cellName "layout")
; views = ddGetObj(libName cellName)~>views~>name
)
)
</code></pre>

<div id="alternativeMethods"></div>

### 6. Alternative Methods

Besides SKILL, other methods exist for hierarchy extraction:

- From layout or schematic window:
Use *Edit -> Hierarchy -> Tree…*  or *Shift+T* bind key (by default) to generate a text file with hierarchy info.


<br/> <img src="http://localhost:3000/images/extractingLib/skillHierarchyTree.png" disableinvert alt="SKILL Hierarchy Tree" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">SKILL Hierarchy Tree</p> 

In schematic view it’s *“Print Tree”*.

- Using fastTree tool in a Linux terminal (if installed):

<pre><code class="language-lisp">

fastTree -lib  <library name> -cell <cell name> -view <view name> -cdslib <path to CDS lib file>

</code></pre>

This creates a file *(default: cellName.viewName.tree)* that can be parsed with SKILL or other programming languages.


 > **Author:** [Eugeny Khanchin](https://www.linkedin.com/in/eugenykhanchin/)
