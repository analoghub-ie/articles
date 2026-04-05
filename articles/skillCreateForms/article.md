---
description: "Creating interactive forms in Cadence Virtuoso using SKILL"
authors:
  - name: "Eugeny Khanchin"
    github: "https://github.com/eKhanchin"
---

# Creating Forms in SKILL Code: A Practical Guide


Why should we create graphical user interfaces (GUIs) for our tools?  

GUIs offer a user-friendly and intuitive way to interact with software, making complex tasks more accessible and 
efficient. They provide visual feedback and structured workflows, reducing errors and enhancing productivity, 
allowing users to focus on their work rather than memorizing commands. GUIs also simplify training, making it 
easier for new users to explore features without extensive documentation.

SKILL code offers powerful ways to develop GUIs (or forms) within the Virtuoso environment.
Cadence provides comprehensive documentation for all their hi* functions, which handle form development, along with 
examples of various features:

- [Worked example using all available SKILL UI fields (Cadence Support Portal)](https://support.cadence.com/apex/ArticleAttachmentPortal?id=a1O3w000009bdqAEAQ&pageName=ArticleContent)
- [Advanced GUI building using dynamically resizable layout forms (Cadence Support Portal)](https://support.cadence.com/apex/ArticleAttachmentPortal?id=a1O0V000009EVYjUAO&pageName=ArticleContent)

In this guide, we'll walk through the GUI development process using a practical example. We'll use layout forms and 
define several callbacks, with the full code attached at the end.


<div id="layoutForms"></div>

## 1. Layout Forms

There are two main approaches for field placement in a GUI: using pixels **(hiCreateAppForm())** and using layout 
forms **(hiCreateLayoutForm())**. 
Placing fields using pixels gives you freedom in choosing exact x, y coordinates and a size for your fields. 
Despite the fact that it’s intuitive, the major problem with this approach is it’s not scalable. 
The more complex the GUI is, the harder it’s to add a new field to it.
Imagine you have to add a new field to a complex GUI such this:

<br/> <img src="http://localhost:3000/images/skillCreateForms/guiExample.png" disableinvert alt="Complex GUI example" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Complex GUI example</p> 

In the by-pixel approach, in addition to a new field, you’ll have to change the location of other fields manually. Which 
will end up in long and tedious work.
A more modern and scalable approach is using layout forms. At first, it’s not as intuitive as defining locations by 
pixels, but after you get hold of it, it turns into a powerful skill in GUI development. Layout forms allow you to build 
GUIs with container layouts (like Lego). When you have to add a new field, you just add it to the required layout and 
other fields will move automatically.

So for scalable and robust GUIs it is recommended to use layout forms approach.

Now, let’s get to our practical example.


<div id="guiTemplate"></div>

## 2. GUI Template

Start by building a GUI template. Our GUI will receive the top cell's library, cell, and view names as input and display
library and cell names used in the top cell's hierarchy.

[Download from Github](https://github.com/analoghub-ie/software/blob/main/SKILL/create_form.il)

<pre><code class="language-lisp">
procedure( createLibrariesCellsInUseForm()
let( (libraryLabel libraryStringField cellLabel cellStringField viewLabel
  viewStringField topGridLayout browseButton horizontalLayout
  infoReportField getInfoButton verticalLayout)

libraryLabel = hiCreateLabel(
?name 'libraryLabel
?labelText "Library"
?justification 'right
)

libraryStringField = hiCreateStringField(
?name 'libraryStringField
)

cellLabel = hiCreateLabel(
?name 'cellLabel
?labelText "Cell"
?justification 'right
)

cellStringField = hiCreateStringField(
?name 'cellStringField
)

viewLabel = hiCreateLabel(
?name 'viewLabel
?labelText "View"
?justification 'right
)

viewStringField = hiCreateStringField(
?name 'viewStringField
)

topGridLayout = hiCreateGridLayout(
'topGridLayout
?spacing 10
?items list(
list(libraryLabel 'row 0 'col 0)
list(libraryStringField 'row 0 'col 1)
list(cellLabel 'row 1 'col 0)
list(cellStringField 'row 1 'col 1)
list(viewLabel 'row 2 'col 0)
list(viewStringField 'row 2 'col 1)
list('col_stretch 0 0)
list('col_stretch 1 1)
)
)

browseButton = hiCreateButton(
?name 'browseButton
?buttonText "Browse"
?callback ""
)

horizontalLayout = hiCreateHorizontalBoxLayout(
'horizontalLayout
?frame "Top Cell Info"
?spacing 10
?items list(
list(topGridLayout 'stretch 1)
list(browseButton 'stretch 0)
)
)

infoReportField = hiCreateReportField(
?name 'infoReportField
?title "Hierarchy Info"
?headers list(
list("Library" 100 'left 'string t)
list("Cell" 100 'left 'string t)
)
)

getInfoButton = hiCreateButton(
?name 'getInfoButton
?buttonText "Get Hierarchy Info"
?callback ""
)

verticalLayout = hiCreateVerticalBoxLayout(
'verticalLayout
?items list(horizontalLayout infoReportField getInfoButton)
)

hiCreateLayoutForm(
'librariesCellsInUseForm
"Libraries Cells in Use"
verticalLayout
?buttonLayout 'Empty
)
);let
);procedure


</code></pre>

Here, we define labels, string fields, buttons and a report field, and use form layouts to organize the fields into sections.
To display the GUI in SKILL, create the form and display it with these two commands:

<pre><code class="language-lisp">
form = createLibrariesCellsInUseForm()
hiDisplayForm(form)
</code></pre>

<br/> <img src="http://localhost:3000/images/skillCreateForms/displayGUI.png" disableinvert alt="Display GUI in SKILL" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center">Display GUI in SKILL</p> 

> **Tip:**
> If you change anything in the form’s creation function, you have to re-create the form to see the changes. 
> Re-run the two functions above.

<div id="mapCallback"></div>

## 3. Map Callback

Map callbacks are used to perform additional setup or customization when a form is instantiated and displayed. They are 
particularly useful for initializing form fields, setting default values, adjusting field sizes, or performing any other 
setup tasks that need to occur when the form is first displayed.


Define a map callback for our GUI to change the size of *"Browse"* and *"Get Hierarchy Info"* buttons and initialize top 
cell info fields if a cell view is currently open.

<pre><code class="language-lisp">
procedure( librariesCellsInUseFormMapCB(form)
;Map callback function for initializing the Libraries Cells In Use
;form fields.

;@param form formObject
;The form object being instantiated.

let( (cv)

hiInstantiateForm(form)
hiSetFieldMinSize(form 'browseButton ?widgetHeight 25)
hiSetFieldMinSize(form 'getInfoButton ?widgetHeight 35)

cv = geGetEditCellView()
when( cv
form~>libraryStringField~>value = cv~>libName
form~>cellStringField~>value = cv~>cellName
form~>viewStringField~>value = cv~>viewName
);when
);let
);procedure
</code></pre>

Here, we must instantiate the form before modifying its fields’ sizes. Additionally, we assign values to our string 
fields. Set the function as a map callback by adding the **?mapCB** keyword to the **hiCreateLayoutForm()** function.

<pre><code class="language-lisp">
hiCreateLayoutForm(
'librariesCellsInUseForm
"Libraries Cells in Use"
verticalLayout
?buttonLayout 'Empty
?mapCB 'librariesCellsInUseFormMapCB
)

</code></pre>

> **Note:**
> You can define field callbacks either as a symbol, like 'myFunc, or as a string, such as **"myFunc()"**. Using a 
> symbol automatically passes default arguments to the function based on the field, with each field's callback having its 
> own set of default arguments. In case of the **?mapCB**, it sends the current form object as an argument. Setting callbacks 
> as strings is useful when you need to pass different arguments to a function.

<br/> <img src="http://localhost:3000/images/skillCreateForms/callbackExample.png" disableinvert alt="Callback example" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center">Callback example</p> 

<div id="modifyCallback"></div>

## 4. Modify Callback

A modify callback in SKILL is a function that is triggered whenever the user changes the value of a string field, 
such as by typing a new value. This callback is executed immediately when a change is detected in the field, but 
before the change is displayed.


The modify callback function can return one of three values:

- **t:** If the function returns *t*, the changes made to the field are allowed and displayed as they are entered.
- **nil:** If the function returns *nil*, the changes are not allowed, and the original value of the field is retained.
- **value:** If the function returns a *string*, this value replaces the current value of the field.

This mechanism provides a powerful way to validate input, update other fields, or trigger additional logic based on the 
new value, enabling dynamic and responsive interactions within SKILL forms.


Add a modify callback to the library string field to validate the entered name and highlight the field if incorrect.

<pre><code class="language-lisp">
procedure( libraryNameModifyCB(field scope latestTextValue sourceOfChange)
;Modify callback function for validating and highlighting the library
;name field.
;
;@param field formField
;       The form field being modified.
;@param scope formObject
;       The form object contains the field.
;@param latestTextValue string
;       The latest text value entered in the field.
;@param sourceOfChange any
;       The source of the change, indicating whether the modification
;       was user-initiated.
;@return t boolean
;        Returns t to allow the changes made to the field.

let( (libraryObject)
when( sourceOfChange
libraryObject = ddGetObj(latestTextValue)
if( !libraryObject
then
hiHighlightField(scope field~>hiFieldSym 'error)
else
hiHighlightField(scope field~>hiFieldSym 'background)
);if
);when

t
);let
);procedure

</code></pre>

Here, we attempt to retrieve a library object using its name and adjust the string field's highlight based on the result.
Set the function as a modify callback by adding the **?modifyCallback** keyword to the library's 
**hiCreateStringField()** function.

<pre><code class="language-lisp">
libraryStringField = hiCreateStringField(
?name 'libraryStringField
?modifyCallback 'libraryNameModifyCB
)

</code></pre>

<br/> <img src="http://localhost:3000/images/skillCreateForms/modifyCallback.png" disableinvert alt="" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center"></p> 

> **Note:** 
> To practice, you can add modify callbacks to the cell and view string fields.

<div id="buttonBrowseCallback"></div>

## 5. Button Callback - Browse

Instead of manually entering library/cell/view names, we can define a callback to invoke the Library Manager for 
selection.

<pre><code class="language-lisp">
procedure( browseLibraryCellViewCB(form)
;Callback function for synchronizing library, cell, and view fields with
;the form.

;@param form formObject
;The form object containing the fields to be synchronized.
ddsSyncWithForm(form 'browse 'libraryStringField 'cellStringField
'viewStringField)
);procedure
</code></pre>

Here, we use the built-in **ddsSyncWithForm()** function, which requires a form, an action to perform, and fields’ symbols 
to update when selection is done.

Add this function to the browse button as a callback. Use the string approach this time, as we want to send only the 
form as an argument.

<pre><code class="language-lisp">
browseButton = hiCreateButton(
?name 'browseButton
?buttonText "Browse"
?callback "browseLibraryCellViewCB(hiGetCurrentForm())"
)
</code></pre>

<br/> <img src="http://localhost:3000/images/skillCreateForms/cellExample.png" disableinvert alt="" style="display: block; margin-inline: auto; width: min(80%, 60rem)" /> 
<p style="display: block; text-align: center"></p> 

<div id="buttonRunCallback"></div>

## 6. Button Callback - Run

The run button executes the main algorithm. Here, we’ll use the **getLibrariesCellsUsedIn()** function, described in the 
*“Extracting Library and Cell Names from a Top Cell Hierarchy Using SKILL Code”* guide.

Define a function to run the algorithm, get results, and display them in a table.

<pre><code class="language-lisp">
procedure( getUsedLibrariesCellsCB(form)
;Callback function to extract and display used libraries and cells from a
;specified cell view.
;
;@param form formObject
;The form object containing the input fields and report field.
prog( (libName cellName viewName cellView usedLibrariesCellsTable choices)

; Get input
libName = form~>libraryStringField~>value
cellName = form~>cellStringField~>value
viewName = form~>viewStringField~>value

; Check input
unless( checkInput(libName cellName viewName)
return()
);unless

; Pre-process input
cellView = dbOpenCellViewByType(libName cellName viewName)

; Run the libraries and cells extraction function
usedLibrariesCellsTable = getLibrariesCellsUsedIn(cellView)

; Post-process output
foreach( library usedLibrariesCellsTable
foreach( cell usedLibrariesCellsTable[library]
choices = cons(list(library cell) choices)
);foreach
);foreach

; Show output in a table
form~>infoReportField~>choices = choices

return(t)
);prog
);procedure
</code></pre>

Here, first of all, we check the input, and if it’s incorrect we exit the function in an early stage by **return()**. 
To use the **return()** function to exit your function at a desired stage, you’ll have to wrap your code in the **prog()** 
scope, instead of the **let()**.
Next, we get the cell view object, using the provided library/cell/view names.

After this, we use the cell view object to get libraries and cells names that are in use in this cell view’s hierarchy.
When we get the result, we need to process it to be able to add to the report field, our results table.
And finally, we add the processed results to the report field.

Add this function to the run button as a callback.

<pre><code class="language-lisp">
getInfoButton = hiCreateButton(
?name 'getInfoButton
?buttonText "Get Hierarchy Info"
?callback "getUsedLibrariesCellsCB(hiGetCurrentForm())"
)
</code></pre>

Now, when you provide correct library/cell/view names and click the run button, you'll see the extracted results 
in the report field.

<br/> <img src="http://localhost:3000/images/skillCreateForms/extractedResults.png" disableinvert alt="" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center"></p> 


<div id="conclusion"></div>

## 7. Conclusion

In this guide, we've explored how to use layout forms, define various callbacks, highlight string fields, display 
error messages, invoke the Library Manager, and utilize **let()** and **prog()** scopes. To further explore, check out 
Cadence guides on creating forms and experiment with different fields and parameters.

<div id="fullCode"></div>

## 8. Full code

<pre><code class="language-lisp">
procedure( createLibrariesCellsInUseForm()

;Creates a form for displaying and interacting with library, cell, and
;view information.

;@return formObject
;The created form object for libraries and cells in use.

let( (libraryLabel libraryStringField cellLabel cellStringField viewLabel
  viewStringField topGridLayout browseButton horizontalLayout
  infoReportField getInfoButton verticalLayout)

libraryLabel = hiCreateLabel(
?name 'libraryLabel
?labelText "Library"
?justification 'right
)

libraryStringField = hiCreateStringField(
?name 'libraryStringField
?modifyCallback 'libraryNameModifyCB
)

cellLabel = hiCreateLabel(
?name 'cellLabel
?labelText "Cell"
?justification 'right
)

cellStringField = hiCreateStringField(
?name 'cellStringField
)

viewLabel = hiCreateLabel(
?name 'viewLabel
?labelText "View"
?justification 'right
)

viewStringField = hiCreateStringField(
?name 'viewStringField
)

topGridLayout = hiCreateGridLayout(
'topGridLayout
?spacing 10
?items list(
list(libraryLabel 'row 0 'col 0)
list(libraryStringField 'row 0 'col 1)
list(cellLabel 'row 1 'col 0)
list(cellStringField 'row 1 'col 1)
list(viewLabel 'row 2 'col 0)
list(viewStringField 'row 2 'col 1)
list('col_stretch 0 0)
list('col_stretch 1 1)
)
)

browseButton = hiCreateButton(
?name 'browseButton
?buttonText "Browse"
?callback "browseLibraryCellViewCB(hiGetCurrentForm())"
)

horizontalLayout = hiCreateHorizontalBoxLayout(
'horizontalLayout
?frame "Top Cell Info"
?spacing 10
?items list(
list(topGridLayout 'stretch 1)
list(browseButton 'stretch 0)
)
)

infoReportField = hiCreateReportField(
?name 'infoReportField
?title "Hierarchy Info"
?headers list(
list("Library" 100 'left 'string t)
list("Cell" 100 'left 'string t)
)
)

getInfoButton = hiCreateButton(
?name 'getInfoButton
?buttonText "Get Hierarchy Info"
?callback "getUsedLibrariesCellsCB(hiGetCurrentForm())"
)

verticalLayout = hiCreateVerticalBoxLayout(
'verticalLayout
?items list(horizontalLayout infoReportField getInfoButton)
)

hiCreateLayoutForm(
'librariesCellsInUseForm
"Libraries Cells in Use"
verticalLayout
?buttonLayout 'Empty
?mapCB 'librariesCellsInUseFormMapCB
)
);let
);procedure


procedure( librariesCellsInUseFormMapCB(form)

;Map callback function for initializing the Libraries Cells In Use
;form fields.

;@param form formObject
;The form object being instantiated.

let( (cellView)

hiInstantiateForm(form)
hiSetFieldMinSize(form 'browseButton ?widgetHeight 25)
hiSetFieldMinSize(form 'getInfoButton ?widgetHeight 35)

cellView = geGetEditCellView()
when( cellView
form~>libraryStringField~>value = cellView~>libName
form~>cellStringField~>value = cellView~>cellName
form~>viewStringField~>value = cellView~>viewName
);when
);let
);procedure


procedure( libraryNameModifyCB(field scope latestTextValue sourceOfChange)

;Modify callback function for validating and highlighting the library
;name field.

;@param field formField
;    The form field being modified.
;@param scope formObject
;    The form object containing the field.
;@param latestTextValue string
;    The latest text value entered in the field.
;@param sourceOfChange any
;The source of the change, indicating whether the modification
;was user-initiated.
;@return t boolean
;Returns t to allow the changes made to the field.

let( (libraryObject)
when( sourceOfChange
libraryObject = ddGetObj(latestTextValue)
if( !libraryObject
then
hiHighlightField(scope field~>hiFieldSym 'error)
else
hiHighlightField(scope field~>hiFieldSym 'background)
);if
);when

t
);let
);procedure


procedure( browseLibraryCellViewCB(form)

;Callback function for synchronizing library, cell, and view fields with
;the form.

;@param form formObject
;The form object containing the fields to be synchronized.

ddsSyncWithForm(form 'browse 'libraryStringField 'cellStringField
'viewStringField)
);procedure


procedure( getUsedLibrariesCellsCB(form)

;Callback function to extract and display used libraries and cells from a
;specified cell view.

;@param form formObject
;The form object containing the input fields and report field.

prog( (libName cellName viewName cellView usedLibrariesCellsTable choices)

; Get input
libName = form~>libraryStringField~>value
cellName = form~>cellStringField~>value
viewName = form~>viewStringField~>value

; Check input
unless( checkInput(libName cellName viewName)
return()
);unless

; Pre-process input
cellView = dbOpenCellViewByType(libName cellName viewName)

; Run the libraries and cells extraction function
usedLibrariesCellsTable = getLibrariesCellsUsedIn(cellView)

; Post-process output
foreach( library usedLibrariesCellsTable
foreach( cell usedLibrariesCellsTable[library]
choices = cons(list(library cell) choices)
);foreach
);foreach

; Show output in a table
form~>infoReportField~>choices = choices

return(t)
);prog
);procedure


procedure( checkInput(libName cellName viewName)

;Validates the existence of a specified library, cell, and view
;combination.

;@param libName string
;       The name of the library to check.
;@param cellName string
;       The name of the cell to check.
;@param viewName string
;       The name of the view to check.
;@return boolean
;        Returns t if the library, cell, and view exist; otherwise,
;        displays an error dialog and returns nil.

prog( (viewObject)

viewObject = ddGetObj(libName cellName viewName)
unless( viewObject
hiDisplayAppDBox(
?name 'errorAppDBox
?dboxBanner "*ERROR* Libraries Cells in Use"
?dboxText "Selected library, cell or view don't exist!"
?dialogType hicErrorDialog
?buttonLayout 'Close
)

return()
);unless

return(t)
);prog
);procedure


procedure( getLibrariesCellsUsedIn(cellView 
            @optional (usedLibrariesCellsTable nil))
    
    ;Retrieves all libraries and cells used in the hierarchy of a given
    ;cell view.

    ;@param cellView dbObject
    ;The cell view object from which to retrieve the hierarchy.

    ;@param usedLibrariesCellsTable table
    ;Optional. A table to keep track of used libraries and cells.
    ;If not provided, a new table is created.

    ;@return table
    ;A table containing libraries as keys and tables of cell names as
    ;values, representing the hierarchy.
    
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
    ; Maps a view name to a common view name that includes 'instances'
    ;for hierarchy traversal.

    ;@param viewName string
    ;The name of the view to be mapped.

    ;@return string
    ;The mapped view name.
    

    if( viewName == "symbol"  ; Symbol's cell view doesn't have ~>instances
    then
        "schematic"
    else
        viewName
    );if
);procedure

</code></pre>
