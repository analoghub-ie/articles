---
description: "RLC-calculator for PCB trace"
---

## RLC-calculator for a PCB trace
This article contains MATLAB script for the calculation of the parasitic parameters of the PCB trace.
> **Script limitations:**
> - Valid under 1GHz
> - Skin effect is omitted
> - Copper roughness is omitted
> - Loss tangent is omitted
>- Geometry limitations:
> - W/H < 7.475 - 1.25*(T/H) -  for a microstrip
> - W/B < 2.375 - 1.25*(T/B) - for a stripline

<ldo-calculator></ldo-calculator>

First coefficient in equation - conversion from inches to m.


H - height


W - width


**Microstrip Equations:**


$$ 
R = 1000   \\frac{\\rho_0(1 + \\alpha (temp-25))}{TW} [m\\Omega/m]
$$

$$ 
C = 26.378 \\frac{  (\\epsilon_r + 1.41)}{\\ln{ \\frac{5.98H}{0.8W + T} } } [pF/m]
$$

$$ 
L = 199.65 \\ln \\frac{ 5.98 H} {0.8W + T} [nH/m]
$$

$$ 
Z = 87 \\frac{\\ln{\\frac{5.98 H}{0.8W+ T}} }{ \\sqrt{\\epsilon_r + 1.41}}
$$

**Stripline Equations:**
$$ 
R = 1000   \\frac{\\rho_0(1 + \\alpha (temp-25))}{TW} [m\\Omega/m]
$$

$$ 
C = 39.37  \\frac{ \\epsilon_r \\sqrt{2} }{\\ln{ \\frac{1.9 B}{0.8W + T} } } [pF/m]
$$

$$ 
L = 199.8425  \\ln \\frac{ 1.9 B} {0.8W + T} [nH/m]
$$

$$ 
Z = 60  \\frac{\\ln{\\frac{1.9 B}{0.8W+ T}} }{ \\sqrt{\\epsilon_r}}
$$
</br>

<pre><code class="language-matlab">   
%% PCB lumped parameters calculator (microstrip/stripline)
% Author: A.Sidun
% Source: AnalogHub.ie
% Limitations:
% - Valid under 1GHz
% - Skin effect is omitted
% - Copper roughness is omitted
% - Loss tangent is omitted
% - Geometry limitations:
% W/H < 7.475 - 1.25*(T/H) -  for a microstrip
% W/B < 2.375 - 1.25*(T/B) - for a stripline
% Source: https://resources.system-analysis.cadence.com/blog/msa2021-is-there-a-pcb-trace-inductance-rule-of-thumb

%% Input parameters
type = "microstrip";\t\t\t\t% can be microstrip or stripline
temp = 25;\t\t\t\t\t% temperature [C]
length = 1e-3;\t\t\t\t\t% trace length [m]
width = 0.5e-3;                                 % trace width [m]
thickness = 35e-6;\t\t\t\t% trace thickness [m]
height = 0.4e-3;\t\t\t\t% height over a plane [m] 

%% Constants
ro = 1.724e-8;\t\t\t\t\t% resistivity of copper [Ohm/m]
alpha = 3.9e-3;\t\t\t\t\t% temperature coefficient of copper
eps_r = 4.46;\t\t\t\t\t% relative permittivity of copper

%% Calculations
B = 2*height+thickness;\t\t\t\t% plane-to-plane distance [m]
switch type
    case "microstrip"
        if ( width/height < 7.475 - 1.25*(thickness/height) )
            R_lumped = 1e3*ro*(1 + alpha*(temp-25))/(thickness*width);\t\t\t\t% mOhms/meter
            C_lumped = 26.378*(eps_r+1.41)/( log( 5.98*height/(0.8*width+thickness) ) );\t% pF/meter
            L_lumped = 199.65*log( 5.98*height/(0.8*width + thickness) );\t\t\t% nH/meter
            Z = 87*log(5.98*height/(0.8*width + thickness)) / sqrt(eps_r + 1.41);
            
            R = R_lumped*length; % mOhm
            L = L_lumped*length; % nH
            C = C_lumped*length; % pF
            
            disp("PCB " + type + " parameters:")
            disp("R = " + R + " mOhms")
            disp("C = " + C + " pF")
            disp("L = " + L + " nH")
            disp("Z = " + Z + " Ohm")
        else 
          disp("Please check geometry of the trace.")  
        end
     case "stripline"
        if ( width/B < 2.375 - 1.25*(thickness/B) )
           R_lumped = 1e3*ro*(1 + alpha*(temp-25))/(thickness*width);                   % mOhms/meter
           C_lumped = 39.37*eps_r*sqrt(2) / ( log(1.9*B/(0.8*width + thickness)) );     % pF/meter
           L_lumped = 199.8425*log( 1.9*B/(0.8*width + thickness) );                    % nH/meter
           Z = 60*log(1.9*B/(0.8*width + thickness)) / sqrt(eps_r); 
           
           R = R_lumped*length; % mOhm
           L = L_lumped*length; % nH
           C = C_lumped*length; % pF
           
           disp("PCB " + type + " parameters:")
           disp("R = " + R + " mOhms")
           disp("C = " + C + " pF")
           disp("L = " + L + " nH")
           disp("Z = " + Z + " Ohm")
         else 
          disp("Please check geometry of the trace.")  
        end
end

</code></pre>

    
