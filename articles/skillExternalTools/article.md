---
description: "This article describes how run external tools via SKILL"
---

### Contents:
1. [Straightforward system() Function](#systemFunction)
2. [Reading Output with ipcBeginProcess()](#readingOutput)
3. [Using ipcBeginProcess() with Handlers](#usingIpcBeginProcess)
4. [Conclusion](#conclusion)


## Running External Tools via SKILL

When working with a programming language, we should stick to it as much as possible for consistency, efficiency, 
integration, error handling, scalability, and more.

However, no language can do everything, including SKILL. For tasks like file management (copy, permissions) or 
working with Excel files, using terminal commands to call external tools is invaluable.

In this guide, we'll explore various ways to use terminal commands via SKILL to run external tasks.

<div id="systemFunction"></div>

## 1. Straightforward system() Function

The system() function in SKILL is used to execute external commands or programs from within a SKILL script. This function allows you to interact with the operating system and run shell commands directly, which can be useful for automating tasks, integrating external tools, or manipulating files outside the Virtuoso environment.

Let’s see how to copy a file:

<pre><code class="language-lisp">
let( (filePath destinationPath command exitCode)
\tfilePath = "./myfile"
\tdestinationPath = "./new_file"
\tsprintf(command "cp %s %s" filePath destinationPath)
\t
\texitCode = system(command)
\tif( exitCode == 0
\tthen
\t\tprintf("Succeeded to copy file\n")
\telse
\t\tprintf("Failed to copy file\n")
\t);if
);let
</code></pre>

Here, we use Lunix’s *“cp”* command. You can also run an external script/tool (Bash, Perl, Python) by providing its full 
path:

<pre><code class="language-lisp">
let( (scriptFile command exitCode)
\tscriptFile = "/tmp/myScript.sh"
\tsprintf(command "sh %s" scriptFile)
\t
\texitCode = system(command)
\tif( exitCode == 0
\tthen
\t\tprintf("Succeeded to run the script\n")
\telse
\t\tprintf("Failed to run the script\n")
\t);if
);let
</code></pre>

This function is best for short tasks, as it freezes the Virtuoso session until the command is finished. Note that you 
can't read output when using this function.

<div id="readingOutput"></div>

## 2. Reading Output with ipcBeginProcess()


The **ipcBeginProcess** function in SKILL is part of the Inter-Process Communication (IPC) suite of functions, which 
allows SKILL scripts to interact with external processes in a more controlled and interactive manner than the **system()**
function. This is particularly useful for applications where you need to start a process, send data to it, and receive 
data from it, enabling more complex integrations with external tools.

Let’s see how to read an output from a terminal command:

<pre><code class="language-lisp">
let( (command process output nextLine)
\tcommand = "find . -name '*.txt'"
\tprocess = ipcBeginProcess(command)
\tipcWait(process)
\t
\toutput = ""
\twhile( nextLine = ipcReadProcess(process)
\t\toutput = strcat(output nextLine)
\t);while
\t
\tprintf("%s\n" output)
);let
</code></pre>

Here, **ipcBeginProcess()** creates a subprocess to run the command. We wait for it to finish with **ipcWait()** and 
read its buffered output with **ipcReadProcess()**. The while loop is necessary because **ipcReadProcess()** reads 
output from the buffer, not all at once.

Using the function this way is still best for short tasks, as waiting for the process to finish freezes the Virtuoso 
session. However, now we know how to read commands’ output.

<div id="usingIpcBeginProcess"></div>

## 3. Using ipcBeginProcess() with Handlers

The **ipcBeginProcess** function can provide much more. We can use handlers to run long tasks and read their output, 
without freezing the Virtuoso session.

In the previous section, we used the command without additional options, which are:
- Host name - Basically, where to run the command. Usually, we will run commands locally, by providing an empty 
string (“”).
- Data and error handlers - Functions to handle received data from *stdout* and *stderr* pipes, useful for reading output 
and error checking.
- Post or exit handler - Function called when the subprocess terminates, useful for post-processing and error handling.
- Log file - Path to a log file where all output will be saved.

Let’s look at the next example. We’ll run the *“find”* command from previous example, using the additional options:

<pre><code class="language-lisp">
let( (command)
\tcommand = "find . -name '*.txt'"
\tipcBeginProcess(
\t\tcommand
\t\t""  ; Local
\t\t'readData
\t\t'readError
\t\t'exitHandler
\t)
);let

procedure( readData(childId data)
\t; Do data handling stuff here
\tprintf("Process: %d\nOutput:\n%s\n" childId data)
);procedure

procedure( readError(childId data)
\t; Do error handling stuff here
\tprintf("Process: %d\nOutput:\n%s\n" childId data)
);procedure

procedure( exitHandler(childId exitStatus)
\t; Do post processing stuff here
\tprintf("Process %d finished with code %d\n" childId exitStatus)
);procedure
</code></pre>

In this example, the Virtuoso session remains responsive, allowing you to continue working while the process runs. 
The buffered output is printed in real-time, demonstrating how handlers can be used to manage and display process data 
effectively.

> **Tip:** Debugging handler functions can be challenging because SKILL IDE doesn't highlight errors within them. 
> Test your handlers before running long tasks. Use breakpoints, which do work, to analyze the state of your handler 
> functions.

<div id="conclusion"></div>

## 4.Conclusion

In this guide, we've explored how to run external tools via SKILL using **system()** and **ipcBeginProcess()**. 
Use **system()** for short tasks where output isn't needed, and **ipcBeginProcess()** with handlers for longer tasks 
requiring output handling. Each approach has its place, depending on the task at hand.

 > **Author:** [Eugeny Khanchin](https://www.linkedin.com/in/eugenykhanchin/)
