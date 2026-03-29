---
description: "Monte Carlo analysis in Cadence Virtuoso — local mismatch, global process variation, and corners explained"
hideInProd: true
---

## Monte Carlo Analysis

### Table of Contents
1. [Introduction](#intro)
2. [Sources of variation](#sources)
3. [Local mismatch](#local)
4. [Global process variation](#global)
5. [Local vs global in Monte Carlo](#mc-types)
6. [Process corners](#corners)
7. [Running Monte Carlo in Virtuoso](#virtuoso)
8. [Interpreting results](#results)


<div id="intro"></div>

### 1. Introduction

Real silicon never matches the schematic exactly. Every transistor, resistor, and capacitor on a chip is subject to
manufacturing variability — no two devices are identical, and no two wafers are identical. **Monte Carlo analysis**
and **process corner simulation** are the two complementary tools used to quantify how this variability affects
circuit performance.

- **Monte Carlo** — statistical simulation. Each run draws random samples for every device parameter from a
  probability distribution. After hundreds of runs, you get a distribution of the circuit output (gain, offset,
  bandwidth, etc.) and can estimate yield.
- **Process corners** — deterministic worst-case simulation. A small set of hand-picked parameter combinations
  (fast/slow NMOS, fast/slow PMOS, temperature extremes) that bound the expected process space.

Both are necessary. Corners tell you the worst case quickly; Monte Carlo tells you how likely that worst case is and
reveals failures that corners miss.


<div id="sources"></div>

### 2. Sources of Variation

Manufacturing variation in CMOS processes falls into two orthogonal categories:

| Category | Also called | Scope | Correlation |
|---|---|---|---|
| Global (inter-die) | Process variation | Wafer / lot | All devices on a die shift together |
| Local (intra-die) | Mismatch | Within a die | Independent between devices |

Understanding which category dominates a given failure mode determines which simulation method to use.


<div id="local"></div>

### 3. Local Mismatch

**Local mismatch** describes the random difference between two nominally identical devices placed close together on
the same die. Even though they share the same global process conditions, microscopic variations in oxide thickness,
dopant atom placement (shot noise of implantation), and lithographic edge roughness cause their parameters to differ.

#### 3.1 Pelgrom's Law

The dominant model for MOSFET mismatch is **Pelgrom's Law** (1989). For threshold voltage $V_{th}$ mismatch between
two matched transistors:

$$
\sigma^2(\Delta V_{th}) = \frac{A_{V_{th}}^2}{WL}
$$

where $A_{V_{th}}$ is a process-specific mismatch coefficient (typically 1–5 mV·µm), and $W$, $L$ are the transistor
dimensions. Similarly for current factor $\beta = \mu C_{ox} W/L$:

$$
\frac{\sigma^2(\Delta \beta / \beta)}{1} = \frac{A_\beta^2}{WL}
$$

Key insight: **mismatch scales inversely with device area**. A 4× larger transistor halves $\sigma(\Delta V_{th})$.
This is the fundamental trade-off between area and matching in analog design.

#### 3.2 What Mismatch Affects

- **Differential pairs** — input-referred offset voltage of an amplifier or comparator
- **Current mirrors** — systematic current error between branches
- **DAC/ADC unit cells** — INL/DNL degradation
- **Cross-coupled pairs** — metastability window of latches

#### 3.3 Mismatch in Simulation

The PDK provides mismatch models as statistical parameter distributions (usually Gaussian) attached to each device
instance. In Cadence, these are activated via the **mismatch** Monte Carlo mode — each instance gets an independent
random draw. Devices on the same net share *global* parameters but get *independent* mismatch parameters.


<div id="global"></div>

### 4. Global Process Variation

**Global process variation** (also called *lot-to-lot* or *inter-die* variation) describes shifts that affect all
devices on a die in a correlated way. If the oxide grew 0.5 Å thicker on a given wafer, every MOSFET on that wafer
has a higher $V_{th}$ — by the same amount.

Sources include:
- Oxide growth rate variation (affects $C_{ox}$, $V_{th}$)
- Implant dose and energy spread (affects $V_{th}$, $I_{on}$)
- Anneal temperature variation (affects dopant activation)
- Photo-lithography CD (critical dimension) variation (affects $L_{eff}$)

#### 4.1 Global Variation in Simulation

Global variation is modelled as correlated shifts to model parameters — a single random number drawn once per
simulation run, applied equally to all instances of the same device type. In Cadence this is the **process** Monte
Carlo mode.


<div id="mc-types"></div>

### 5. Local vs Global in Monte Carlo

A full Monte Carlo run in Cadence Virtuoso can simulate three combinations:

| Mode | What varies | Typical use |
|---|---|---|
| **Process only** | Global parameters per run | Yield from process drift |
| **Mismatch only** | Local parameters per instance | Offset, mirror error, yield from mismatch |
| **Process + Mismatch** | Both simultaneously | Full statistical yield sign-off |

> **Rule of thumb:** Run *mismatch only* first to debug offset-sensitive blocks. Run *process + mismatch* for
> final yield estimation.

#### 5.1 How Many Runs?

For a yield target $Y$ with confidence interval $\pm\epsilon$ at confidence level $1-\alpha$:

$$
N \approx \frac{z_{\alpha/2}^2 \cdot Y(1-Y)}{\epsilon^2}
$$

For 99% yield ($Y = 0.99$), $\pm 0.5\%$ interval, 95% confidence: $N \approx 1500$ runs.

In practice, 200–500 runs reveal the distribution shape; 1000+ runs are needed for tails below 1%.


<div id="corners"></div>

### 6. Process Corners

Process corners are a deterministic alternative to Monte Carlo. The foundry defines a small set of parameter
combinations that span the expected process space. Each corner is a `.scs` (Spectre) or `.lib` file that overrides
the nominal model parameters.

#### 6.1 Standard Corners

| Corner | NMOS | PMOS | Speed | $I_{on}$ |
|---|---|---|---|---|
| **TT** | Typical | Typical | Nominal | Nominal |
| **FF** | Fast | Fast | Fastest | Highest |
| **SS** | Slow | Slow | Slowest | Lowest |
| **SF** | Slow | Fast | — | — |
| **FS** | Fast | Slow | — | — |

FF/SS bound the same-type (digital) worst case. SF/FS expose cross-type failures common in:
- Differential pairs with asymmetric NMOS/PMOS poles
- Level shifters
- CMOS logic stages with skewed pull-up/pull-down

#### 6.2 Temperature and Supply Corners

Process corners are always combined with temperature and supply voltage extremes. A full PVT corner matrix:

| Dimension | Typical | Min | Max |
|---|---|---|---|
| Process | TT | SS | FF |
| Voltage ($V_{DD}$) | Nom | Nom − 10% | Nom + 10% |
| Temperature | 27 °C | −40 °C | 125 °C |

A full sign-off matrix has $5 \times 3 \times 3 = 45$ corners, though in practice only a subset is simulated (e.g.
FF/Vmax/−40°C for speed, SS/Vmin/125°C for current and setup time).

#### 6.3 Corners vs Monte Carlo

| | Corners | Monte Carlo |
|---|---|---|
| Speed | Fast (< 1 min) | Slow (hours) |
| Covers | Bounding box | Full distribution |
| Misses | Correlated multi-param failures | Nothing (statistical) |
| Output | Pass/fail per corner | Yield, $\sigma$, histograms |
| Use early in design | ✓ | Later, pre-tapeout |


<div id="virtuoso"></div>

### 7. Running Monte Carlo in Cadence Virtuoso

#### 7.1 Setup in ADE Explorer / ADE L

TODO: screenshots and step-by-step walkthrough

1. Open **Analyses → Monte Carlo**
2. Select variation type: *Process*, *Mismatch*, or *Process + Mismatch*
3. Set number of runs (start with 200)
4. Select outputs to track (e.g. offset voltage, gain, bandwidth)
5. Run and open **Results → Statistical**

#### 7.2 Setup in ADE Assembler

TODO: screenshots

#### 7.3 Corner Simulation Setup

TODO: screenshots — selecting corner `.scs` files, sweep across PVT corners


<div id="results"></div>

### 8. Interpreting Results

#### 8.1 Histogram and Distribution

After a Monte Carlo run, plot a histogram of each output. Check:
- **Mean** — systematic offset from nominal (may indicate model bias)
- **$\sigma$** — spread; target is typically output spec / 6 for 6-sigma design
- **Skewness** — non-Gaussian tails suggest a nonlinear failure mechanism
- **Outliers** — investigate individual failed runs with **Results → Waveform**

#### 8.2 Yield Estimation

$$
\text{Yield} = \frac{\text{runs within spec}}{\text{total runs}} \times 100\%
$$

Report yield with a confidence interval. With 500 runs and 490 passing: yield = 98% ± 1.2% (95% CI).

#### 8.3 Sensitivity Analysis

Cadence can rank which model parameters contribute most to output spread — use **Sensitivity** plot in the
statistical results window. This guides where to spend area budget to improve matching.

#### 8.4 Corner vs MC Cross-check

A result that fails Monte Carlo but passes all corners indicates a multi-parameter correlated failure — the corners
do not bound that region. In this case, add a targeted corner or tighten the design margin.
