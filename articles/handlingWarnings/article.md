---
description: "This article explains how to handle error/warning/info messages in SKILL"
---

## Handling error/warning/info messages in SKILL


### Contents:
1. [Function - hiDisplayAppDBox()](#hiDisplayAppDBox)
2. [Display an error message](#displayError)
3. [Display a warning message](#displayWarning)
4. [Display an info message](#displayInfo)
5. [Display a dialog box](#displayDialog)
6. [Functions - error(), warn() and info()](#errFunctions)
7. [Conclusion](#conclusion)

In programming, effective communication with users and robust error handling are essential for creating reliable and 
user-friendly applications.

Providing immediate feedback and guidance helps users understand what the script does and decide what to do next. By 
reporting errors and warnings, we can help users to diagnose and resolve issues.

This guide provides an overview of messaging and debugging functions in SKILL, including **hiDisplayAppDBox()**, 
**error()**, **warn()**, and **info()**. These functions are essential for communicating with users, handling errors, 
and providing informational messages within the Cadence Virtuoso environment.


<div id="hiDisplayAppDBox"></div>

### 1. Function - hiDisplayAppDBox()
This function displays a pop-up box with a custom message. It can be used to display error, warning, informational 
or dialog messages.

Use **hiDisplayAppDBox()** when you need to interact with the user through the GUI, such as confirming an action, 
displaying an error that requires user acknowledgment, or providing important information.
We can customize the pop-up box with optional arguments like message text, box type, buttons, etc., to match our needs.

<pre><code class="language-lisp">
hiDisplayAppDBox(
\t?name 'errorAppDBox
\t?dboxBanner "*ERROR* My App"
\t?dboxText "Failed to open a file!"
\t?dialogType hicErrorDialog\t
\t?buttonLayout 'Close
)
</code></pre>

<br/> <img src="http://localhost:3000/images/handlingWarnings/displayError.png" disableinvert alt="Example using hiDisplayAppDBox() function" style="display: block; margin-inline: auto; width: min(80%, 15rem)" /> 
<p style="display: block; text-align: center">Example using hiDisplayAppDBox() function</p> 

<div id="displayError"></div>

### 2. Display an error message

Errors should prevent a user from continuing using a script if something went wrong. They should be clear, so the user 
understands why the script failed and what to do next.

For example, failing to write to a file or providing incorrect type of input:

<pre><code class="language-lisp">
procedure( writeData(filePath data)
\tprog( (outPort message)
\t\t
\t\toutPort = outfile(filePath "w")
\t\tunless( outPort
\t\t\tsprintf(message "Failed to open a \\"%s\\" file!\\nPlease check that the provided path is correct and you have write permissions."
\t\t\t\tfilePath)
\t\t\thiDisplayAppDBox(
\t\t\t\t?name 'errorAppDBox
\t\t\t\t?dboxBanner "*ERROR* Writing Data"
\t\t\t\t?dboxText message
\t\t\t\t?dialogType hicErrorDialog\t
\t\t\t\t?buttonLayout 'Close
\t\t\t)
\t\t\t
\t\t\treturn()
\t\t);unless
\t\t
\t\tunless( stringp(data)
\t\t\tsprintf(message "The provided data type - %L.\\nPlease provide data as a string!"
\t\t\t\ttype(data))
\t\t\t
\t\t\thiDisplayAppDBox(
\t\t\t\t?name 'errorAppDBox
\t\t\t\t?dboxBanner "*ERROR* Writing Data"
\t\t\t\t?dboxText message
\t\t\t\t?dialogType hicErrorDialog\t
\t\t\t\t?buttonLayout 'Close
\t\t\t)
\t\t\t
\t\t\treturn()
\t\t);unless
\t\t
\t\tfprintf(outPort "%s\\n" data)
\t\tclose(outPort)
\t\t
\t\treturn(t)
\t);prog
);procedure
</code></pre>

<br/> <img src="http://localhost:3000/images/handlingWarnings/errorExample.png" disableinvert alt="Example of an error message" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Example of an error message</p> 

> **Note:** The code after the **hiDisplayAppDBox()** function is executed, so make sure to exit/stop a function after 
showing an error message.

<div id="displayWarning"></div>

### 3. Display a warning message

Warnings inform users of conditions that might lead to problems but do not immediately prevent the script from continuing.

For example, when the netbatch/cloud settings are missing, but we can still run the script locally:

<pre><code class="language-lisp">
procedure( runVerifications()
\tlet( (message)
\t\t
\t\tunless( getShellEnvVar("NETBATCH_POOL")
\t\t\tmessage = "Netbatch settings are missing!\\nRunning the tasks locally."
\t\t\thiDisplayAppDBox(
\t\t\t\t?name 'warningAppDBox
\t\t\t\t?dboxBanner "*WARNING* My App"
\t\t\t\t?dboxText message
\t\t\t\t?dialogType hicWarningDialog\t
\t\t\t\t?buttonLayout 'Close
\t\t\t)
\t\t);unless
\t\t
\t\t; Rest of the code here
\t);let
);procedure
</code></pre>

<br/> <img src="http://localhost:3000/images/handlingWarnings/warningExample.png" disableinvert alt="Example of a warning message" style="display: block; margin-inline: auto; width: min(80%, 15rem)" /> 
<p style="display: block; text-align: center">Example of a warning message</p> 

<div id="displayInfo"></div>

### 4. Display an info message

Info messages also do not prevent the script from continuing and are best to communicate progress, confirm actions, 
and offer guidance and tips.

For example, we inform the user when the script is finished:

<pre><code class="language-lisp">
procedure( runTask()
\tlet( (message success)
\t\t
\t\t; Implement task logic here
\t\t
\t\tif( success
\t\tthen
\t\t\tmessage = "The task is finished successfully!"
\t\telse
\t\t\tmessage = "The task is finished with errors!\\nPlease refer to a log file."
\t\t);if
\t\t
\t\thiDisplayAppDBox(
\t\t\t?name 'infoAppDBox
\t\t\t?dboxBanner "*INFO* My App"
\t\t\t?dboxText message
\t\t\t?dialogType hicMessageDialog\t
\t\t\t?buttonLayout 'Close
\t\t)
\t);let
);procedure
</code></pre>

<br/> <img src="http://localhost:3000/images/handlingWarnings/infoExample.png" disableinvert alt="Example of an info message" style="display: block; margin-inline: auto; width: min(80%, 15rem)" /> 
<p style="display: block; text-align: center">Example of an info message</p> 

<div id="displayDialog"></div>

### 5. Display a dialog box

Displaying a dialog box is required when you need to interact directly with the user. Dialog boxes are ideal for 
situations where you need to make selections from the user. This could include entering data, choosing options, or 
confirming settings.

Before executing actions that have significant consequences, such as deleting data or applying major changes, a dialog 
box can be used to confirm the user's intent. This helps prevent accidental actions and ensures that the user is aware 
of the impact.

For example, when we want the user to choose what to do when a file is missing:

<pre><code class="language-lisp">
procedure( askUser()
\tlet( (answer)

\t\tanswer = hiDisplayAppDBox(
\t\t\t?name 'questionAppDBox
\t\t\t?dboxBanner "*QUESTION* My App"
\t\t\t?dboxText "A file is missing!\\nYou can either create a new one, continue or abort."
\t\t\t?dialogType hicQuestionDialog\t
\t\t\t?buttonLayout 'UserDefined
\t\t\t?buttons list("Create New File" "Continue" "Abort")
\t\t)
\t\t
\t\tcase( answer
\t\t\t( 1
\t\t\t\tprintf("Creating a new file\\n")
\t\t\t)
\t\t\t( 2
\t\t\t\tprintf("Continuing\\n")
\t\t\t)
\t\t\t( 3
\t\t\t\tprintf("Aborting\\n")
\t\t\t)
\t\t);case
\t);let
);procedure
</code></pre>

<br/> <img src="http://localhost:3000/images/handlingWarnings/dialogExample.png" disableinvert alt="Example of a dialog message" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center">Example of a dialog message</p> 

Here, we use ?buttons option to define the buttons. **hiDisplayAppDBox()** returns the number of the button clicked 
(1-based), which helps us to determine which logic to run after.

You can also provide callbacks to each button directly via the **?callback** option:

<pre><code class="language-lisp">
procedure( askUser()
\thiDisplayAppDBox(
\t\t?name 'questionAppDBox
\t\t?dboxBanner "*QUESTION* My App"
\t\t?dboxText "A file is missing!\\nYou can either create a new one, continue or abort."
\t\t?dialogType hicQuestionDialog\t
\t\t?buttonLayout 'UserDefined
\t\t?buttons list("Create New File" "Continue" "Abort")
\t\t?callback list("createNewFile()" nil "abort()")
\t)
\t
\tprintf("Code continues here\\n")
);procedure


procedure( createNewFile()
\tprintf("Creating a new file\\n")
);procedure


procedure( abort()
\tprintf("Aborting\\n")
);procedure
</code></pre>

> **Note:** Though, the clicked button runs a dedicated function, the code after the **hiDisplayAppDBox()** continues 
to run after the click. Also, if the callback is set to **"nil"**, the button does nothing.

<div id="errFunctions"></div>

### 6. Functions - error(), warn() and info()

There is another way to show error, warning and informational messages.
These functions print colored messages into the CIW, providing information for debugging without popping a box.

#### Overview:

- **error()** - prints an error message and halts the execution of the current script.

<br/> <img src="http://localhost:3000/images/handlingWarnings/errorFunction.png" alt="Output of the error() function" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Output of the error() function</p> 

> **Note:** The **error()** function halts code execution and prevents any subsequent script code from running.

- **warn()** - prints a warning message without halting script execution.

<br/> <img src="http://localhost:3000/images/handlingWarnings/warnFunction.png" alt="Output of the warn() function" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Output of the warn() function</p> 

- **info()** - prints an informational message.

<br/> <img src="http://localhost:3000/images/handlingWarnings/infoFunction.png" alt="Output of the info() function" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Output of the einfo() function</p> 

To try these functions, replace **hiDisplayAppDBox()** with **error()**, **warn()**, and **info()** in the earlier 
examples for error, warning, and informational messages, respectively.

<div id="conclusion"></div>

### 7. Conclusion 

Mastering the use of messaging and debugging functions such as **hiDisplayAppDBox()**, **error()**, **warn()**, and 
**info()** is crucial for developing robust and user-friendly applications. These functions provide effective 
communication with users by providing immediate feedback and guidance. They also enhance error handling, ensuring that 
scripts run smoothly and efficiently.

 > **Author:** [Eugeny Khanchin](https://www.linkedin.com/in/eugenykhanchin/)
