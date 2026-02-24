---
id: hiRegTimer
title: "Scheduling Tasks with hiRegTimer()"
description: "This article explains how to schedule tasks with hiRegTimer() in SKILL"
hideInProd: false
---

## Scheduling Tasks with hiRegTimer()

### Contents:
1. [How to use hiRegTimer()](#howToUse)
2. [Repeating tasks](#repeatingTasks)
3. [Practical example](#practicalExample)
4. [Understanding SKILL’s tm structure](#skillTmStructure)
5. [More tips](#moreTips)
6. [Conclusion](#conclusion)

In Cadence's Virtuoso environment, automation tools and scripts are essential for optimizing chip design development. 
We can benefit even more from automating tasks to run at regular intervals or specific times without manual intervention. 
Whether you need to monitor conditions or execute background tasks for resource cleanup, scheduling these tasks to run 
repeatedly is invaluable.

SKILL offers a function for scheduling tasks - **hiRegTimer()**. This function allows you to schedule and execute tasks 
at regular intervals, freeing up your time and resources for more critical activities. This guide will show you how to 
use **hiRegTimer()** to schedule and repeat your tasks efficiently.


<div id="howToUse"></div>

### 1. How to use hiRegTimer()

The **hiRegTimer()** function takes two arguments - a function to run (provided as a string) and a number representing 
tenths of seconds after which the function should run.

**Example:**

<pre><code class="language-lisp">
procedure( func()
\tprintf("Hello\\n")
)

hiRegTimer("func()" 100)
</code></pre>

In this example, we register **func()** to run after 10 seconds.

<br/> <img src="http://localhost:3000/images/skill/hiRegTimerExample.png" alt="Example of running hiRegTimer() function in CIW" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Example of running hiRegTimer() function in CIW</p> 

> **Note:** Scheduled tasks will run in the current Virtuoso session. If you reopen Virtuoso, tasks from the previous session 
will be removed.

<div id="repeatingTasks"></div>

### 2. Repeating tasks

To repeat a task, we’ll need to run **hiRegTimer()** again. To do so, we can create a simple recursion, like this:

<pre><code class="language-lisp">
procedure( func()
\tprintf("Hello\\n")
)

procedure( repeatTask(function)
\tlet( (repeatCommand)
\t
\t\tsprintf(repeatCommand "%s repeatTask(\\"%s\\")" function function)
\t\thiRegTimer(repeatCommand 100)
\t);let
);procedure
</code></pre>

Here, the first argument of **hiRegTimer()** is modified to include a recursive call to **repeatTask()**. In the example 
above, the repeatCommand variable will contain **“func() repeatCommand(\\”func()\\”)”**.

> **Tip:** To stop the function from repeating, simply redefine **repeatTask()** to do nothing.

<pre><code class="language-lisp">
procedure( repeatTask(function)
\tnil
)
</code></pre>

<div id="practicalExample"></div>

### 3. Practical example

Let’s implement a wrapper function to schedule a task at a specific time and optionally repeat it daily.

<pre><code class="language-lisp">
procedure( sayHello()
\tprintf("Hello\\n")
)


procedure( scheduleTask(function scheduleTime @key (everyDay nil))
\t/*
\tSchedules a task to be executed at a specified time, optionally
\trepeating every day.

\t@param function string
\t\tThe name of the SKILL function to be executed at the scheduled time.

\t@param scheduleTime string
\t\tThe target time in the format "HH:MM:SS" at which the function should
\t\tbe executed.

\t@param everyDay boolean
\t\tAn optional parameter indicating whether the task should be scheduled
\t\tto repeat every day. Defaults to 'nil'.
\t*/
\tlet( (secondsLeft scheduleFunction)
\t\t
\t\tsecondsLeft = getSecondsLeft(scheduleTime)
\t\tscheduleFunction = function
\t\twhen( everyDay
\t\t\tsprintf(scheduleFunction "%s scheduleTask(\\"%s\\")" function function)
\t\t);when
\t\t
\t\thiRegTimer(scheduleFunction secondsLeft*10)
\t);let
);procedure


procedure( getSecondsLeft(otherTime)
\t/*
\tCalculates the number of seconds remaining until a specified time on
\tthe current or next day.

\t@param otherTime string
\t\tThe target time in the format "HH:MM:SS" for which the remaining
\t\tseconds are to be calculated.

\t@return integer
\t\tReturns the number of seconds left until the specified time. If the
\t\ttime has already passed today, it calculates the seconds remaining
\t\tuntil the same time on the next day.
\t*/
\tlet( (monthsTable dateTime day month year otherDateTime secondsLeft
\t\t  maxDaysInMonth)
\t\t
\t\tmonthsTable = getMonthsTable()
\t\t
\t\tdateTime = timeToTm(stringToTime(getCurrentTime()))
\t\tday = dateTime~>tm_mday
\t\tmonth = monthsTable[dateTime~>tm_mon+1]
\t\tyear = dateTime~>tm_year + 1900
\t\tsprintf(otherDateTime "%s %d %s %d" month day otherTime year)
\t\t
\t\tsecondsLeft = compareTime(otherDateTime getCurrentTime())
\t\twhen( secondsLeft <= 0
\t\t\t; Consider the next day
\t\t\tmaxDaysInMonth = getMonthDaysNumber(month)
\t\t\twhen( month == "Feb" && mod(year 4) != 0
\t\t\t\tmaxDaysInMonth = 28
\t\t\t);when
\t\t\t
\t\t\tday += 1
\t\t\twhen( day > maxDaysInMonth
\t\t\t\t; Next month
\t\t\t\tday = 1
\t\t\t\tmonth = monthsTable[dateTime~>tm_mon+2]
\t\t\t\tunless( month\t;13th month doesn't exists
\t\t\t\t\t; Next year
\t\t\t\t\tmonth = monthsTable[1]
\t\t\t\t\tyear += 1
\t\t\t\t);unless
\t\t\t);when
\t\t\t
\t\t\tsprintf(otherDateTime "%s %d %s %d" month day otherTime year)
\t\t\t
\t\t\tsecondsLeft = compareTime(otherDateTime getCurrentTime())
\t\t);when
\t\t
\t\tsecondsLeft
\t);let
);procedure


procedure( getMonthsTable()
\t/*
\tGets a table mapping month numbers to their corresponding three-letter
\tabbreviations.

\t@return table
\t\tReturns a table where each key is a month number (1 through 12), and
\t\teach value is the corresponding three-letter abbreviation of the month
\t\tname.
\t*/
\tlet( (monthsTable)
\t\t
\t\tmonthsTable = makeTable('monthsTable nil)
\t\tmonthsTable[1] \t= "Jan"
\t\tmonthsTable[2] \t= "Feb"
\t\tmonthsTable[3] \t= "Mar"
\t\tmonthsTable[4] \t= "Apr"
\t\tmonthsTable[5] \t= "May"
\t\tmonthsTable[6] \t= "Jun"
\t\tmonthsTable[7] \t= "Jul"
\t\tmonthsTable[8] \t= "Aug"
\t\tmonthsTable[9] \t= "Sep"
\t\tmonthsTable[10] = "Oct"
\t\tmonthsTable[11] = "Nov"
\t\tmonthsTable[12] = "Dec"
\t\t
\t\tmonthsTable
\t);let
);procedure


procedure( getMonthDaysNumber(month)
\t/*
\tReturns the number of days in a given month, accounting for leap years
\tin February.

\t@param month string
\t\tThe three-letter abbreviation of the month name.

\t@return integer
\t\tReturns the maximum number of days in the specified month. February
\t\tis assumed to have 29 days to account for leap years.
\t*/
\tlet( (maxDays)
\t\tcond( 
\t\t\t( month == "Feb"
\t\t\t\tmaxDays = 29
\t\t\t)
\t\t\t( or(month == "Apr" month == "Jun" month == "Sep" month == "Nov")
\t\t\t\tmaxDays = 30
\t\t\t)
\t\t\t( or(month == "Jan" month == "Mar" month == "May" month == "Jul"
\t\t\t\t\tmonth == "Aug" month == "Oct" month == "Dec")
\t\t\t\tmaxDays = 31
\t\t\t)
\t\t);cond
\t\t
\t\t
\t\tmaxDays

\t);let
);procedure
</code></pre>

Here, our function schedules a provided function at a specific time. If the specified time is already passed, it will 
schedule for the same time on the next day.

**Helper functions:**

- **getSecondsLeft():** Calculates seconds remaining until a specified time. It does the comparison between current time 
and the target date (today or tomorrow).
- **getMonthsTable():** Maps month numbers to three-letter abbreviations.
- **getMonthDaysNumber():** Returns the number of days in a given month, accounting for leap years.

To schedule a task once, run:

<pre><code class="language-lisp">
scheduleTask("sayHello()" "16:55:00")
</code></pre>

To repeat it every day:

<pre><code class="language-lisp">
scheduleTask("sayHello()" "16:55:00" ?everyDay t)
</code></pre>

<div id="skillTmStructure"></div>

### 4. Understanding SKILL’s tm structure

SKILL’s tm structure requires a bit of clarification:

<pre><code class="language-lisp">
dateTime = timeToTm(stringToTime(getCurrentTime()))
</code></pre>

The tm structure holds info about the time and date.

<br/> <img src="http://localhost:3000/images/skill/skillTmStructure.png" alt="tm structure’s parameters and values" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">tm structure’s parameters and values</p> 

However, month and year parameters are not straightforward:
- Month representation is from 0 to 11 - For example, in case of May, it will show a number of 4. So, in your SKILL code 
you’ll have to consider that and to add 1 to the month’s number:

<pre><code class="language-lisp">
dateTime~>tm_mon + 1
</code></pre>


- Year representation starts from 1900 - For example, in the year of 2025, it will show a number of 125. So, you’ll 
always need to add 1900 to it:

<pre><code class="language-lisp">
dateTime~>tm_year + 1900
</code></pre>

<div id="moreTips"></div>

### 5. More tips

- You should take care not to schedule anything that is too lengthy to run, since this will appear to occasionally 
freeze the user interface as the scheduled task runs.
- It’s hard to keep track of which functions are registered to run in intervals. So try not scheduling many.
- You may check Cadence’s examples of using the **hiRegTimer()** function. Start with this one:
[Cadence hiRegTimer() Example](https://support.cadence.com/apex/ArticleAttachmentPortal?id=a1Od0000000nZocEAE&pageName=ArticleContent)

<div id="conclusion"></div>

### 6. Conclusion 

By leveraging **hiRegTimer()**, you can automate routine tasks and optimize your workflow. Explore its capabilities and 
see how it can enhance your project efficiency.


 > **Author:** [Eugeny Khanchin](https://www.linkedin.com/in/eugenykhanchin/)
