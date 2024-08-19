const regl = require("regl")();
const {utils} = require("./utils");

const { Pane } = require("tweakpane");
const TweakpaneLatex = require("tweakpane-latex")

const pane = new Pane({
    title: "WARNING: GPU INTENSIVE"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Terrain Generation

Generating pseudo-realistic terrain
using fractional brownian motion, ray tracing.
`,
  border: false,
  markdown: true,
});



const drawShape = regl({
	uniforms: {
		iTime: (context, props) => context.time,
		propRatio: (context, props) => {
			return context.viewportHeight / context.viewportWidth;
		}
	},
	
	attributes: {
		position: [[-1, -1], [1, -1], [-1, 1], [1, -1], [-1, 1], [1, 1]]
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

${utils}

float terrain(in vec2 p) {
	// by default, fractal brownian motion
	float y = fbm(p);

	// add a cliff
	float line = -0.2 * p.x + 1.2;
	y += .8*smoothstep(1.0, 0.0, p.y - line);

	return y;
}

float iTerrain( in vec3 ro, in vec3 rd)
{
	// https://www.shadertoy.com/view/4ttSWf

	// estimate how far it is first.
	const float delta = 0.1;
	
	for (float t = 0.0; t < 10.0; t += delta) {

		vec3 p = ro + rd * t;
		p.y += 0.5; // offset

		if (p.y < terrain(p.xz)) {
			// hit
			return t;
		}
	}
	return -1.0;
}

vec4 nTerrain(in vec3 pos, in vec3 lightRay)
{
    // the normal vector
	// (1, df/dz, 0) cross (0, df/dx, 1) = (-df/dx, 1, df/dz)

	vec2 p = pos.xz;
	vec2 delta = vec2(0.01, 0.0);
	float d = terrain(p);

	// f = terrain(p)
	float df_dx = (terrain(p + delta.xy) - d) / delta.x;
	float df_dz = (terrain(p + delta.yx) - d) / delta.x;

	vec3 n = vec3(-df_dx, 1.0, df_dz);
	n = normalize(n);

	// Trying to safe computation by weirdly putting it here
	// float R = shadows(pos, d, lightRay);
	float R = 1.0;

    return vec4(n, R);
}

int intersect( in vec3 ro, in vec3 rd, out float t)
{
    t = 1000.0;
    int id = -1; // by default, it will be a miss
    float tpla = iTerrain(ro, rd);
    
    
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
    
    float cameraDist = 6.0;
	float height = 4.0;
    float time = 0.3 * iTime;
    vec3 ro = vec3(0.0, height, cameraDist);
    vec3 rd = normalize( vec3( uv, -1.0 ) );

	ro.z += time;

	float angle = -PI/2.0 * 0.4;
	mat2 rotateCamera = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
	rd.yz *= rotateCamera;
    
    float t = -1.0;
    // intersect
    int id = intersect(ro, rd, t);
    
	float theta = PI/3.0 * sin(time);
	float phi = PI/6.0;
    vec3 light = cameraDist * vec3(sin(theta) * sin(phi), cos(theta), sin(theta) * cos(phi));
    
    // draw background color
    vec3 col = skyColor(light, time, ro, rd);

    if ( id == 2)
    {
        // we hit the plane
        vec3 pos = ro + t*rd;
        vec4 norm = nTerrain(pos, light - pos);

		float maxVal = 8.0;
        float intensity = dot(normalize(light - pos), normalize(norm.xyz));
		// intensity = clamp(intensity, 0.0, maxVal);
        
        // inverse square law
        // float r = length(light - pos)*0.2;
        // intensity = intensity / (r*r);
        
        col = vec3(94.0/255.0, 72.0/255.0, 64.0/255.0);

		// icecap
		float icecapHeight = 0.2;
		col = mix(col, vec3(1.0), smoothstep(0.0, 1.0, pos.y - icecapHeight) * smoothstep(0.6, 1.0, intensity));

		col *= intensity;

		float d = length(ro - pos);
		// decaying with distance away from viewer
		float k = 0.01;
		vec3 lambda = vec3(exp(-k * d), exp(-1.0*k* d), exp(-4.0*k*d));
		vec3 hue = vec3(0.4, 0.0, 0.0);

		col = mix(hue.xxx, col, lambda);
    }
    
    gl_FragColor = vec4(col,1.0);
}
	`
})

regl.frame(() => {
	regl.clear({ color: [0, 0, 0, 1], depth: 1 });
	drawShape();
})

