---
id: cadenceEnvironmentSetup
title: "Setting up Cadence Environment"
description: "Cadence Environment Setup description"
hideInProd: true
---

    
### Contents:
1. [Introduction](#intro)
2. [Bindkeys File](#bindkeys)
3. [Display Resource File](#drf)
4. [Initialisation File](#cdsinit)
5. [Cadence Environment File](#cdsenv)

<div id="intro"></div>

## 1. Introduction
Sometimes we are moving from one technology to another, from one company to another and we want to keep our bindkeys, 
settings and UI the same. This article will help you to understand which files are responsible for the environment setup in 
Cadence Virtuoso and how to keep and customise them to make your environment to feel home. All you need is to 
create/export/copy the following files and keep them in your home directory. You can customise those files for your needs.
All files are coming with explanations and use examples, so you can see exactly how they are implemented.



<div id="bindkeys"></div>


## 2. Bindkeys 

<br/> 
<img src="http://localhost:3000/images/cadenceEnvironmentSetup/bindkeys-menu.png"  alt="Bindkeys menu" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Bindkeys menu</p>

<br/> 
<img src="http://localhost:3000/images/cadenceEnvironmentSetup/bindkeys-editor.png"  alt="Bindkeys Editor menu" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Bindkeys Editor menu</p>

<pre><code class="language-bash">

</code></pre>


<div id="drf"></div>

## 3. Display Resource File

<pre><code class="language-bash">

</code></pre>


<div id="cdsinit"></div>

## 4. Initialisation File

<pre><code class="language-bash">

</code></pre>


<div id="cdsenv"></div>     

## 5. Cadence Environment File

<br/> 
<img src="http://localhost:3000/images/cadenceEnvironmentSetup/cdsenv-menu.png" alt="Cadence Environment menu" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Cadence Environment menu</p>

<br/> 
<img src="http://localhost:3000/images/cadenceEnvironmentSetup/cdsenv-editor.png" alt="Cadence Environment Editor menu" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Cadence Environment Editor menu</p>

<pre><code class="language-bash">

</code></pre>

## How to get a ***cds.lib*** file location?

To get the ***cds.lib*** location, run the following command in the main CIW window:
<pre><code class="language-lisp">
if(blankstrp(ddGetForcedLib()) then ddGetStartup("cds.lib") else ddGetForcedLib())
</code></pre>

## How to get commands in CIW?

<br/> 
<img src="http://localhost:3000/images/cadenceEnvironmentSetup/log-filter-ciw.png" alt="How to get commands in CIW" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">How to get commands in CIW</p>
