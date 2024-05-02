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
# Alcubierre Warp Drives

In 1994, Miguel Alcubierre laid out the mathematical formulations for warp drives.
This allows objects to move past the speed of light within the framework of general relativity.
This allows interstellar travel.
It essentially warps the space around it, allowing objects locally to travel below the speed of light, but the bubble itself is at superluminar speeds.
The spaceship is essentially riding a "wave"
`,
  border: false,
  markdown: true,
});



var sp = new URLSearchParams(window.location.search);
console.log(sp.get("angle"))
const PARAMS = {
	angle: parseFloat(sp.get("angle")) || 0.3,
	v: parseFloat(sp.get("v")) || 0.5,
}

pane.addInput(PARAMS, "angle")
    .on("change", (ev) => {
        if (sp.has("angle")) {
            sp.set("angle", ev.value);
            window.location.search = sp.toString();
        } else {
            window.location.href += "?angle="+ev.value
        }
})

pane.addInput(PARAMS, "v")
    .on("change", (ev) => {
        if (sp.has("v")) {
            sp.set("v", ev.value);
            window.location.search = sp.toString();
        } else {
            window.location.href += "?v="+ev.value
        }
})

const forms = pane.addFolder({ title: "Formulas", expanded: false});
forms.addBlade({
  view: "latex",
  content: `
Say a spacecraft's trajectory is shown:
$$ ds^2 = -c^2 dt^2 +(dx - v_s(t) f(r_s)dt)^2 + dy^2 + dz^2 $$

We arbitrarily define a top hat shape:
$$ f(r) = \\frac{tanh(\\sigma (r + R)) - tanh(\\sigma (r - R))}{ 2 tanh(\\sigma R)}$$
where $\\sigma$ and $R$ are constants. $R$ is the radius of the bubble. As $\\sigma \\rightarrow \\infty$ then the warp shell will be infinitely thin, vice versa. 

The vertical warping of a planar space is then defined:
$$ \\theta = v_s * \\frac{x_s}{r_s} \\frac{df}{dr_s}$$

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
        velocity: regl.prop("v")
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
uniform float velocity;

#define PI 3.1415926535

float tanh(in float x) {
    return (exp(x) - exp(-x)) / (exp(x) + exp(-x));
}

float topHat(in float r) {
    float sigma = 6.0;
    float R = 1.0;
    return (tanh(sigma*(r+R)) - tanh(sigma*(r-R)))/(2.0*tanh(sigma*R));
}

float spaceFabric(in vec2 p, in vec2 ship) {
    float y = 0.0;

    float r = length(p - ship);

    float delta = 0.01;
    float df_dr = (topHat(r+delta) - topHat(r)) / delta;

    float v_s = velocity; // velocity determines power of the field around

    y += v_s * p.x * df_dr / r;

    return y;
}

float iPlane( in vec3 ro, in vec3 rd)
{

    for (float t = 6.0; t < 10.0; t += 0.02) {
        vec3 pos = ro + rd*t;

        if (pos.y < spaceFabric(pos.xz, vec2(0.0, 0.0))) {
            return t;
        }
    }
    
    return -1.0;
}

vec3 nPlane(in vec3 p)
{
    // the normal vector
    float delta = 0.01;
    vec2 ship = vec2(0.0);
    float df_dx = (spaceFabric(p.xz + vec2(delta, 0.0), ship) - spaceFabric(p.xz, ship)) / delta;
    float df_dz = (spaceFabric(p.xz + vec2(0.0, delta), ship) - spaceFabric(p.xz, ship)) / delta; 

    return vec3(-df_dx, 1.0, df_dz);
}


int intersect( in vec3 ro, in vec3 rd, out float t)
{
    t = 1000.0;
    int id = -1; // by default, it will be a miss
    float tpla = iPlane(ro, rd);
    
    // report which ever comes first
    if (tpla > 0.0) {
        id = 2;
        t = tpla;
    }
    
    return id;
}


void main() {

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord;
    uv.y = fragCoord.y*propRatio;
    
    float time = 0.5 * iTime;

    // float angle = mix(PI/6.0, PI/2.0, 0.5*sin(time) + 0.5);
    float angle = rotateAngle;
    mat3 rotate = mat3( vec3(cos(angle), 0.0, sin(angle)),
                        vec3(0.0, 1.0, 0.0),
                        vec3(-sin(angle), 0.0, cos(angle))
                      );

    vec3 ro = vec3(0.0, 2.0, 7.0);
    ro *= rotate;
    vec3 rd = normalize( vec3( uv, -1.0) );
    rd *= rotate;
    
    float t = -1.0;
    // intersect
    int id = intersect(ro, rd, t);
    
    vec3 light = vec3(1.0, 1.0, 0.0);
    
    // draw black by default
    vec3 col = vec3(0.0);
    
    if ( id == 2)
    {
        // we hit the plane
        vec3 pos = ro + t*rd;
        vec3 norm = nPlane(pos);
        float intensity = dot(light, norm);
        
        // inverse square law
        float r = length(light - pos);
        intensity = intensity / (r*r);
        
        col = vec3(0.4, 0.4, 0.4) * intensity;
    }
    
    gl_FragColor = vec4(col,1.0);
}
	`,
});

regl.frame((context) => {
	drawShape({
        rotateAngle: PARAMS.angle,
        v: PARAMS.v
    });
})

