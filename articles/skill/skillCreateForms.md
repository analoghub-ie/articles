---
id: skillCreateForms
title: "Creating Forms in SKILL Code: A Practical Guide"
description: "A practical guide explaining how to create forms using SKILL"
hideInProd: false
---

## Creating Forms in SKILL Code: A Practical Guide


### Contents:
1. [Layout Forms](#layoutForms)
2. [GUI Template](#guiTemplate)
3. [Map Callback](#mapCallback)
4. [Modify Callback](#modifyCallback)
5. [Button Callback - Browse](#buttonBrowseCallback)
6. [Button Callback - Run](#buttonRunCallback)
7. [Conclusion](#conclusion)
8. [Full code](#fullCode)

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

### 1. Layout Forms

There are two main approaches for field placement in a GUI: using pixels **(hiCreateAppForm())** and using layout 
forms **(hiCreateLayoutForm())**. 
Placing fields using pixels gives you freedom in choosing exact x, y coordinates and a size for your fields. 
Despite the fact that it’s intuitive, the major problem with this approach is it’s not scalable. 
The more complex the GUI is, the harder it’s to add a new field to it.
Imagine you have to add a new field to a complex GUI such this:

<br/> <img src="http://localhost:3000/images/skill/guiExample.png" disableinvert alt="Complex GUI example" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
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

### 2. GUI Template

Start by building a GUI template. Our GUI will receive the top cell's library, cell, and view names as input and display 
library and cell names used in the top cell's hierarchy.

<pre><code class="language-lisp">
procedure( createLibrariesCellsInUseForm()
\tlet( (libraryLabel libraryStringField cellLabel cellStringField viewLabel
\t\t  viewStringField topGridLayout browseButton horizontalLayout
\t\t  infoReportField getInfoButton verticalLayout)
\t\t
\t\tlibraryLabel = hiCreateLabel(
\t\t\t?name 'libraryLabel
\t\t\t?labelText "Library"
\t\t\t?justification 'right
\t\t)

\t\tlibraryStringField = hiCreateStringField(
\t\t\t?name 'libraryStringField
\t\t)
\t\t
\t\tcellLabel = hiCreateLabel(
\t\t\t?name 'cellLabel
\t\t\t?labelText "Cell"
\t\t\t?justification 'right
\t\t)

\t\tcellStringField = hiCreateStringField(
\t\t\t?name 'cellStringField
\t\t)
\t\t
\t\tviewLabel = hiCreateLabel(
\t\t\t?name 'viewLabel
\t\t\t?labelText "View"
\t\t\t?justification 'right
\t\t)

\t\tviewStringField = hiCreateStringField(
\t\t\t?name 'viewStringField
\t\t)
\t\t
\t\ttopGridLayout = hiCreateGridLayout(
\t\t\t'topGridLayout
\t\t\t?spacing 10
\t\t\t?items list(
\t\t\t\tlist(libraryLabel 'row 0 'col 0)
\t\t\t\tlist(libraryStringField 'row 0 'col 1)\t
\t\t\t\tlist(cellLabel 'row 1 'col 0)
\t\t\t\tlist(cellStringField 'row 1 'col 1)
\t\t\t\tlist(viewLabel 'row 2 'col 0)
\t\t\t\tlist(viewStringField 'row 2 'col 1)
\t\t\t\tlist('col_stretch 0 0)
\t\t\t\tlist('col_stretch 1 1)\t
\t\t\t)
\t\t)
\t\t
\t\tbrowseButton = hiCreateButton(
\t\t\t?name 'browseButton
\t\t\t?buttonText "Browse"
\t\t\t?callback ""
\t\t)

\t\thorizontalLayout = hiCreateHorizontalBoxLayout(
\t\t\t'horizontalLayout
\t\t\t?frame "Top Cell Info"
\t\t\t?spacing 10
\t\t\t?items list(
\t\t\t\tlist(topGridLayout 'stretch 1)
\t\t\t\tlist(browseButton 'stretch 0)
\t\t\t)\t
\t\t)
\t\t
\t\tinfoReportField = hiCreateReportField(
\t\t\t?name 'infoReportField
\t\t\t?title "Hierarchy Info"
\t\t\t?headers list(
\t\t\t\tlist("Library" 100 'left 'string t)
\t\t\t\tlist("Cell" 100 'left 'string t)
\t\t\t)
\t\t)
\t\t
\t\tgetInfoButton = hiCreateButton(
\t\t\t?name 'getInfoButton
\t\t\t?buttonText "Get Hierarchy Info"
\t\t\t?callback ""
\t\t)
\t\t
\t\tverticalLayout = hiCreateVerticalBoxLayout(
\t\t\t'verticalLayout
\t\t\t?items list(horizontalLayout infoReportField getInfoButton)\t
\t\t)
\t
\t\thiCreateLayoutForm(
\t\t\t'librariesCellsInUseForm
\t\t\t"Libraries Cells in Use"
\t\t\tverticalLayout
\t\t\t?buttonLayout 'Empty
\t\t)
\t);let
);procedure


</code></pre>

Here, we define labels, string fields, buttons and a report field, and use form layouts to organize the fields into sections.
To display the GUI in SKILL, create the form and display it with these two commands:

<pre><code class="language-lisp">
form = createLibrariesCellsInUseForm()
hiDisplayForm(form)
</code></pre>

<br/> <img src="http://localhost:3000/images/skill/displayGUI.png" disableinvert alt="Display GUI in SKILL" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center">Display GUI in SKILL</p> 

> **Tip:**
> If you change anything in the form’s creation function, you have to re-create the form to see the changes. 
> Re-run the two functions above.

<div id="mapCallback"></div>

### 3. Map Callback

Map callbacks are used to perform additional setup or customization when a form is instantiated and displayed. They are 
particularly useful for initializing form fields, setting default values, adjusting field sizes, or performing any other 
setup tasks that need to occur when the form is first displayed.


Define a map callback for our GUI to change the size of *"Browse"* and *"Get Hierarchy Info"* buttons and initialize top 
cell info fields if a cell view is currently open.

<pre><code class="language-lisp">
procedure( librariesCellsInUseFormMapCB(form)
\t;Map callback function for initializing the Libraries Cells In Use
\t;form fields.
\t
\t;@param form formObject
\t\t;The form object being instantiated.

\tlet( (cv)
\t\t
\t\thiInstantiateForm(form)
\t\thiSetFieldMinSize(form 'browseButton ?widgetHeight 25)
\t\thiSetFieldMinSize(form 'getInfoButton ?widgetHeight 35)
\t\t
\t\tcv = geGetEditCellView()
\t\twhen( cv
\t\t\tform~>libraryStringField~>value = cv~>libName
\t\t\tform~>cellStringField~>value = cv~>cellName
\t\t\tform~>viewStringField~>value = cv~>viewName
\t\t);when
\t);let
);procedure
</code></pre>

Here, we must instantiate the form before modifying its fields’ sizes. Additionally, we assign values to our string 
fields. Set the function as a map callback by adding the **?mapCB** keyword to the **hiCreateLayoutForm()** function.

<pre><code class="language-lisp">
hiCreateLayoutForm(
\t\t'librariesCellsInUseForm
\t\t"Libraries Cells in Use"
\t\tverticalLayout
\t\t?buttonLayout 'Empty
\t\t?mapCB 'librariesCellsInUseFormMapCB
\t)

</code></pre>

> **Note:**
> You can define field callbacks either as a symbol, like 'myFunc, or as a string, such as **"myFunc()"**. Using a 
> symbol automatically passes default arguments to the function based on the field, with each field's callback having its 
> own set of default arguments. In case of the **?mapCB**, it sends the current form object as an argument. Setting callbacks 
> as strings is useful when you need to pass different arguments to a function.

<br/> <img src="http://localhost:3000/images/skill/callbackExample.png" disableinvert alt="Callback example" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center">Callback example</p> 

<div id="modifyCallback"></div>

### 4. Modify Callback

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
\t;Modify callback function for validating and highlighting the library
\t;name field.
\t;
\t;@param field formField
\t;       The form field being modified.
\t;@param scope formObject
\t;       The form object contains the field.
\t;@param latestTextValue string
\t;       The latest text value entered in the field.
\t;@param sourceOfChange any
\t;       The source of the change, indicating whether the modification
\t;       was user-initiated.
\t;@return t boolean
\t;        Returns t to allow the changes made to the field.

\tlet( (libraryObject)
\t\twhen( sourceOfChange
\t\t\tlibraryObject = ddGetObj(latestTextValue)
\t\t\tif( !libraryObject
\t\t\tthen
\t\t\t\thiHighlightField(scope field~>hiFieldSym 'error)
\t\t\telse
\t\t\t\thiHighlightField(scope field~>hiFieldSym 'background)
\t\t\t);if
\t\t);when
\t\t
\t\tt
\t);let
);procedure

</code></pre>

Here, we attempt to retrieve a library object using its name and adjust the string field's highlight based on the result.
Set the function as a modify callback by adding the **?modifyCallback** keyword to the library's 
**hiCreateStringField()** function.

<pre><code class="language-lisp">
libraryStringField = hiCreateStringField(
\t\t\t?name 'libraryStringField
\t\t\t?modifyCallback 'libraryNameModifyCB
\t\t)

</code></pre>

<br/> <img src="http://localhost:3000/images/skill/modifyCallback.png" disableinvert alt="" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center"></p> 

> **Note:** 
> To practice, you can add modify callbacks to the cell and view string fields.

<div id="buttonBrowseCallback"></div>

### 5. Button Callback - Browse

Instead of manually entering library/cell/view names, we can define a callback to invoke the Library Manager for 
selection.

<pre><code class="language-lisp">
procedure( browseLibraryCellViewCB(form)
\t;Callback function for synchronizing library, cell, and view fields with
\t;the form.

\t;@param form formObject
\t\t;The form object containing the fields to be synchronized.
\tddsSyncWithForm(form 'browse 'libraryStringField 'cellStringField
\t\t'viewStringField)
);procedure
</code></pre>

Here, we use the built-in **ddsSyncWithForm()** function, which requires a form, an action to perform, and fields’ symbols 
to update when selection is done.

Add this function to the browse button as a callback. Use the string approach this time, as we want to send only the 
form as an argument.

<pre><code class="language-lisp">
browseButton = hiCreateButton(
\t\t\t?name 'browseButton
\t\t\t?buttonText "Browse"
\t\t\t?callback "browseLibraryCellViewCB(hiGetCurrentForm())"
\t\t)
</code></pre>

<br/> <img src="http://localhost:3000/images/skill/cellExample.png" disableinvert alt="" style="display: block; margin-inline: auto; width: min(80%, 60rem)" /> 
<p style="display: block; text-align: center"></p> 

<div id="buttonRunCallback"></div>

### 6. Button Callback - Run

The run button executes the main algorithm. Here, we’ll use the **getLibrariesCellsUsedIn()** function, described in the 
*“Extracting Library and Cell Names from a Top Cell Hierarchy Using SKILL Code”* guide.

Define a function to run the algorithm, get results, and display them in a table.

<pre><code class="language-lisp">
procedure( getUsedLibrariesCellsCB(form)
\t;Callback function to extract and display used libraries and cells from a
\t;specified cell view.
\t;
\t;@param form formObject
\t\t;The form object containing the input fields and report field.
\tprog( (libName cellName viewName cellView usedLibrariesCellsTable choices)
\t\t
\t\t; Get input
\t\tlibName = form~>libraryStringField~>value
\t\tcellName = form~>cellStringField~>value
\t\tviewName = form~>viewStringField~>value
\t\t
\t\t; Check input
\t\tunless( checkInput(libName cellName viewName)
\t\t\treturn()
\t\t);unless
\t\t
\t\t; Pre-process input
\t\tcellView = dbOpenCellViewByType(libName cellName viewName)
\t\t
\t\t; Run the libraries and cells extraction function
\t\tusedLibrariesCellsTable = getLibrariesCellsUsedIn(cellView)
\t\t
\t\t; Post-process output
\t\tforeach( library usedLibrariesCellsTable
\t\t\tforeach( cell usedLibrariesCellsTable[library]
\t\t\t\tchoices = cons(list(library cell) choices)
\t\t\t);foreach
\t\t);foreach

\t\t; Show output in a table
\t\tform~>infoReportField~>choices = choices
\t\t
\t\treturn(t)
\t);prog
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
\t\t\t?name 'getInfoButton
\t\t\t?buttonText "Get Hierarchy Info"
\t\t\t?callback "getUsedLibrariesCellsCB(hiGetCurrentForm())"
\t\t)
</code></pre>

Now, when you provide correct library/cell/view names and click the run button, you'll see the extracted results 
in the report field.

<br/> <img src="http://localhost:3000/images/skill/extractedResults.png" disableinvert alt="" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center"></p> 


<div id="conclusion"></div>

### 7. Conclusion

In this guide, we've explored how to use layout forms, define various callbacks, highlight string fields, display 
error messages, invoke the Library Manager, and utilize **let()** and **prog()** scopes. To further explore, check out 
Cadence guides on creating forms and experiment with different fields and parameters.

<div id="fullCode"></div>

### 8. Full code

<pre><code class="language-lisp">
procedure( createLibrariesCellsInUseForm()
\t
\t;Creates a form for displaying and interacting with library, cell, and
\t;view information.

\t;@return formObject
\t;\tThe created form object for libraries and cells in use.
\t
\tlet( (libraryLabel libraryStringField cellLabel cellStringField viewLabel
\t\t  viewStringField topGridLayout browseButton horizontalLayout
\t\t  infoReportField getInfoButton verticalLayout)
\t\t
\t\tlibraryLabel = hiCreateLabel(
\t\t\t?name 'libraryLabel
\t\t\t?labelText "Library"
\t\t\t?justification 'right
\t\t)

\t\tlibraryStringField = hiCreateStringField(
\t\t\t?name 'libraryStringField
\t\t\t?modifyCallback 'libraryNameModifyCB
\t\t)
\t\t
\t\tcellLabel = hiCreateLabel(
\t\t\t?name 'cellLabel
\t\t\t?labelText "Cell"
\t\t\t?justification 'right
\t\t)

\t\tcellStringField = hiCreateStringField(
\t\t\t?name 'cellStringField
\t\t)
\t\t
\t\tviewLabel = hiCreateLabel(
\t\t\t?name 'viewLabel
\t\t\t?labelText "View"
\t\t\t?justification 'right
\t\t)

\t\tviewStringField = hiCreateStringField(
\t\t\t?name 'viewStringField
\t\t)
\t\t
\t\ttopGridLayout = hiCreateGridLayout(
\t\t\t'topGridLayout
\t\t\t?spacing 10
\t\t\t?items list(
\t\t\t\tlist(libraryLabel 'row 0 'col 0)
\t\t\t\tlist(libraryStringField 'row 0 'col 1)\t
\t\t\t\tlist(cellLabel 'row 1 'col 0)
\t\t\t\tlist(cellStringField 'row 1 'col 1)
\t\t\t\tlist(viewLabel 'row 2 'col 0)
\t\t\t\tlist(viewStringField 'row 2 'col 1)
\t\t\t\tlist('col_stretch 0 0)
\t\t\t\tlist('col_stretch 1 1)\t
\t\t\t)
\t\t)
\t\t
\t\tbrowseButton = hiCreateButton(
\t\t\t?name 'browseButton
\t\t\t?buttonText "Browse"
\t\t\t?callback "browseLibraryCellViewCB(hiGetCurrentForm())"
\t\t)

\t\thorizontalLayout = hiCreateHorizontalBoxLayout(
\t\t\t'horizontalLayout
\t\t\t?frame "Top Cell Info"
\t\t\t?spacing 10
\t\t\t?items list(
\t\t\t\tlist(topGridLayout 'stretch 1)
\t\t\t\tlist(browseButton 'stretch 0)
\t\t\t)\t
\t\t)
\t\t
\t\tinfoReportField = hiCreateReportField(
\t\t\t?name 'infoReportField
\t\t\t?title "Hierarchy Info"
\t\t\t?headers list(
\t\t\t\tlist("Library" 100 'left 'string t)
\t\t\t\tlist("Cell" 100 'left 'string t)
\t\t\t)
\t\t)
\t\t
\t\tgetInfoButton = hiCreateButton(
\t\t\t?name 'getInfoButton
\t\t\t?buttonText "Get Hierarchy Info"
\t\t\t?callback "getUsedLibrariesCellsCB(hiGetCurrentForm())"
\t\t)
\t\t
\t\tverticalLayout = hiCreateVerticalBoxLayout(
\t\t\t'verticalLayout
\t\t\t?items list(horizontalLayout infoReportField getInfoButton)\t
\t\t)
\t
\t\thiCreateLayoutForm(
\t\t\t'librariesCellsInUseForm
\t\t\t"Libraries Cells in Use"
\t\t\tverticalLayout
\t\t\t?buttonLayout 'Empty
\t\t\t?mapCB 'librariesCellsInUseFormMapCB
\t\t)
\t);let
);procedure


procedure( librariesCellsInUseFormMapCB(form)
\t
\t;Map callback function for initializing the Libraries Cells In Use
\t;form fields.
\t
\t;@param form formObject
\t;\tThe form object being instantiated.
\t
\tlet( (cellView)
\t\t
\t\thiInstantiateForm(form)
\t\thiSetFieldMinSize(form 'browseButton ?widgetHeight 25)
\t\thiSetFieldMinSize(form 'getInfoButton ?widgetHeight 35)
\t\t
\t\tcellView = geGetEditCellView()
\t\twhen( cellView
\t\t\tform~>libraryStringField~>value = cellView~>libName
\t\t\tform~>cellStringField~>value = cellView~>cellName
\t\t\tform~>viewStringField~>value = cellView~>viewName
\t\t);when
\t);let
);procedure


procedure( libraryNameModifyCB(field scope latestTextValue sourceOfChange)
\t
\t;Modify callback function for validating and highlighting the library
\t;name field.
\t
\t;@param field formField
\t;    The form field being modified.
\t;@param scope formObject
\t;    The form object containing the field.
\t;@param latestTextValue string
\t;    The latest text value entered in the field.
\t;@param sourceOfChange any
\t;\tThe source of the change, indicating whether the modification
\t;\twas user-initiated.
\t;@return t boolean
\t;\tReturns t to allow the changes made to the field.

\tlet( (libraryObject)
\t\twhen( sourceOfChange
\t\t\tlibraryObject = ddGetObj(latestTextValue)
\t\t\tif( !libraryObject
\t\t\tthen
\t\t\t\thiHighlightField(scope field~>hiFieldSym 'error)
\t\t\telse
\t\t\t\thiHighlightField(scope field~>hiFieldSym 'background)
\t\t\t);if
\t\t);when
\t\t
\t\tt
\t);let
);procedure


procedure( browseLibraryCellViewCB(form)

\t;Callback function for synchronizing library, cell, and view fields with
\t;the form.

\t;@param form formObject
\t;\tThe form object containing the fields to be synchronized.
\t
\tddsSyncWithForm(form 'browse 'libraryStringField 'cellStringField
\t\t'viewStringField)
);procedure


procedure( getUsedLibrariesCellsCB(form)
\t
\t;Callback function to extract and display used libraries and cells from a
\t;specified cell view.
\t
\t;@param form formObject
\t;\tThe form object containing the input fields and report field.
\t
\tprog( (libName cellName viewName cellView usedLibrariesCellsTable choices)
\t\t
\t\t; Get input
\t\tlibName = form~>libraryStringField~>value
\t\tcellName = form~>cellStringField~>value
\t\tviewName = form~>viewStringField~>value
\t\t
\t\t; Check input
\t\tunless( checkInput(libName cellName viewName)
\t\t\treturn()
\t\t);unless
\t\t
\t\t; Pre-process input
\t\tcellView = dbOpenCellViewByType(libName cellName viewName)
\t\t
\t\t; Run the libraries and cells extraction function
\t\tusedLibrariesCellsTable = getLibrariesCellsUsedIn(cellView)
\t\t
\t\t; Post-process output
\t\tforeach( library usedLibrariesCellsTable
\t\t\tforeach( cell usedLibrariesCellsTable[library]
\t\t\t\tchoices = cons(list(library cell) choices)
\t\t\t);foreach
\t\t);foreach

\t\t; Show output in a table
\t\tform~>infoReportField~>choices = choices
\t\t
\t\treturn(t)
\t);prog
);procedure


procedure( checkInput(libName cellName viewName)
\t
\t;Validates the existence of a specified library, cell, and view
\t;combination.
\t
\t;@param libName string
\t;       The name of the library to check.
\t;@param cellName string
\t;       The name of the cell to check.
\t;@param viewName string
\t;       The name of the view to check.
\t;@return boolean
\t;        Returns t if the library, cell, and view exist; otherwise,
\t;        displays an error dialog and returns nil.
\t
\tprog( (viewObject)
\t
\t\tviewObject = ddGetObj(libName cellName viewName)
\t\tunless( viewObject
\t\t\thiDisplayAppDBox(
\t\t\t\t?name 'errorAppDBox
\t\t\t\t?dboxBanner "*ERROR* Libraries Cells in Use"
\t\t\t\t?dboxText "Selected library, cell or view don't exist!"
\t\t\t\t?dialogType hicErrorDialog\t
\t\t\t\t?buttonLayout 'Close
\t\t\t)
\t\t\t
\t\t\treturn()
\t\t);unless
\t\t
\t\treturn(t)
\t);prog
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


 > **Author:** [Eugeny Khanchin](https://www.linkedin.com/in/eugenykhanchin/)
