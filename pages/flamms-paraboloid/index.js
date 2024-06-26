// References
// https://en.wikipedia.org/wiki/Schwarzschild_metric#Flamm's_paraboloid
// https://www.shadertoy.com/view/XsffD8

const regl = require("regl")();

const { Pane } = require("tweakpane")
const TweakpaneLatex = require("tweakpane-latex")

const pane = new Pane({
    title: "WARNING: GPU INTENSIVE"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Flamm's Paraboloid

Here's one of the earlier geometric interpretations of black holes in 3D space (done with ray tracing)
`,
  border: false,
  markdown: true,
});



var sp = new URLSearchParams(window.location.search);
console.log(sp.get("angle"))
const PARAMS = {
	angle: parseFloat(sp.get("angle")) || 0.7,
	rs: parseFloat(sp.get("rs")) || 0.3,
    gridLines: false
}

pane.addInput(PARAMS, "angle", {
    min: 0,
    max: 3.14159
});

pane.addInput(PARAMS, "rs", {
    min: 0.1,
    max: 1.6
})
pane.addInput(PARAMS, "gridLines");

const forms = pane.addFolder({ title: "Formulas", expanded: false});
forms.addBlade({
  view: "latex",
  content: `

  Flamm's Paraboloid is modeled with cylindrical coordinates $(r, \\phi, w)$:
  $$ w = 2 \\sqrt{r_s (r - r_s)} $$
  Where $r_s$ is the Schwarzschild radius (event horizon).

  This fits the Schwarzschild metric for $r > r_s$ if you set $\\theta = \\pi/2$ and $t$ = constant:
`,
  border: false,
  markdown: true,
});

const deriv = pane.addFolder({ title: "Derivations", expanded: false});
deriv.addBlade({
  view: "latex",
  content: `

  Starting with the Schwarzchild metric in $(t, r, \\theta, \\phi)$ is as follows:
  $$ ds^2 = \\left( 1 - \\frac{r_s}{r}\\right) c^2 dt^2 - \\left(1 - \\frac{r_s}{r}\\right)^{-1} dr^2 - r^2 d\\Omega^2$$

  $\\Omega$ is a point on the two sphere $S^2$, $\\theta$ is the colattitude of $\\Omega$, $\\phi$ is the longitude of $\\Omega$. Defined in the relationship:

  $$ d\\Omega^2 = d\\theta^2 + sin^2(\\theta) d\\phi^2 $$

  By setting $\\theta = \\pi/2$ and $t$ = constant we can reduce to the Scharzschild metric for a specific $(\\theta = \\pi/2, dt = 0)$:
  $$ -ds^2 = \\left(1 - \\frac{r_s}{r}\\right)^{-1} dr^2 + r^2 d\\phi^2 $$

  The Euclidean metric in cylindrical coordinates: 
  $$ -ds^2 = dw^2 + dr^2 + r^2 d\\phi^2$$
  $$ -ds^2 = \\left( 1 + \\left( \\frac{dw}{dr} \\right)^2 \\right) dr^2 + r^2 d\\phi^2$$

  We can solve for when it satisfies Schwarzschild metric in $(\\theta = \\pi/2, dt = 0)$ by comparing above:
  $$ 1 + \\left( \\frac{dw}{dr} \\right)^2 = \\left(1 - \\frac{r_s}{r}\\right)^{-1} $$
  $$ w(r) = \\int \\frac{dr}{\\sqrt{r/r_s - 1}} = 2 \\sqrt{r_s (r - r_s)} + C$$
`,
  border: false,
  markdown: true,
});

const drawShape = regl({
    uniforms: {
        iTime: (context, props) => context.time,
        propRatio: (context, props) => {
            return context.viewportHeight / context.viewportWidth;
        },
        rotateAngle: regl.prop("rotateAngle"),
        rs: regl.prop("rs"),
        gridLines: regl.prop("gridLines")
    },

    attributes: {
        position: [
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, -1],
            [-1, 1],
            [1, 1],
        ],
    },
    count: 6,
    primitive: "triangle",
    vert: `
precision mediump float;
attribute vec2 position;
varying vec2 fragCoord;

void main() {
	fragCoord = position;
	gl_Position = vec4(position, 0, 1);
}
	`,
    frag: `
precision mediump float;
varying vec2 fragCoord;
uniform float iTime;
uniform float propRatio;
uniform float rotateAngle;
uniform float rs;
uniform bool gridLines;

#define PI 3.1415926535
#define BLACKHOLE vec2(0.0)
#define CAMERADIST 6.0

float spaceFabric(in vec2 p) {
    float r = length(p - BLACKHOLE);
    return 2.0*sqrt(rs * (r - rs));
}

float iFabric( in vec3 ro, in vec3 rd)
{

    for (float t = 0.0; t < 10.0; t += 0.01) {
        vec3 pos = ro + rd*t;

        if (pos.y < spaceFabric(pos.xz)) {
            return t;
        }
    }
    
    return -1.0;
}

vec3 nFabric(in vec3 p)
{
    // the normal vector
    float eps = 0.001;
    vec2 e = vec2( eps, 0.0 );
    float df_dx = (spaceFabric(p.xz + e.xy) - spaceFabric(p.xz - e.xy)) / (2.0*eps);
    float df_dz = (spaceFabric(p.xz + e.yx) - spaceFabric(p.xz - e.yx)) / (2.0*eps); 

    return vec3(-df_dx, 1.0, df_dz);
}

float iPlane( in vec3 ro, in vec3 rd) {
    float height = min(rs, 0.3);
    return (height-ro.y)/rd.y;
}


int intersect( in vec3 ro, in vec3 rd, out float t)
{
    t = 1000.0;
    int id = -1; // by default, it will be a miss
    float tfab = iFabric(ro, rd);
    float tpla = iPlane(ro, rd);
    
    // report which ever comes first
    if (tfab < tpla) {
        id = 2;
        t = tfab;
    } else if (tpla > 0.0) {
        id = 1;
        t = tpla;
    }
    
    return id;
}


void main() {

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord;
    uv.y = fragCoord.y*propRatio;
    
    float time = 0.5 * iTime;

    // float angle = time;
    float angle = clamp(rotateAngle, 0.0, PI);
    mat3 rotate = mat3( 
                    vec3(1.0, 0.0, 0.0),
                    vec3(0.0, cos(angle), sin(angle)),
                    vec3(0.0, -sin(angle), cos(angle))
                    );

    vec3 ro = normalize(vec3(0.0, 0.0, 1.0)) * CAMERADIST;
    ro *= rotate;
    vec3 rd = normalize( vec3( uv, -1.0) );
    rd *= rotate;
    
    float t = -1.0;
    // intersect
    int id = intersect(ro, rd, t);
    
    vec3 light = vec3(0.0, 1.0, 0.0);
    
    // draw black by default
    vec3 col = vec3(0.0);
    
    if ( id == 1 )
    {
        col = vec3(0.1);
    }
    
    if ( id == 2 )
    {
        // we hit the plane
        vec3 pos = ro + t*rd;
        vec3 norm = nFabric(pos);
        float intensity = dot(light, norm);
        
        // inverse square law
        float r = length(light - pos);
        intensity = intensity / (r*r);

        // gridlines
        // with |x|^k + |y|^k = r^|k| as distance func
        vec2 point = pos.xz;
        vec2 step_origin = floor(point) + 0.5; // make "little" coordinate systems.
        float k  = 100.0;
        vec2 p = abs(point - step_origin); 
        float val = pow(pow(p.x, k) + pow(p.y, k), 1.0/k);

        float thickness = 0.5, falloff = 70.0;
        float brightness = 1.0 - (thickness - val)*falloff;
        
        col = vec3(0.3) * intensity;

        if (gridLines) {
            col *= brightness;
        }
    }
    
    gl_FragColor = vec4(col,1.0);
}
	`,
});

regl.frame((context) => {
	drawShape({
        rotateAngle: PARAMS.angle,
        rs: PARAMS.rs,
        gridLines: PARAMS.gridLines
    });
})

