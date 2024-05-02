const regl = require("regl")();
const { utils } = require("./utils");

const { Pane } = require("tweakpane")
const TweakpaneLatex = require("tweakpane-latex")

const pane = new Pane({
    title: "WARNING: GPU INTENSIVE"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Earth Generation

Creating a random, pseudo-realistic earth using a random seed.

`,
  border: false,
  markdown: true,
});


var sp = new URLSearchParams(window.location.search);
console.log(sp.get("seed"))
const PARAMS = {
	seed: sp.get("seed") || 1.3,
    numPoints: 4000
}
pane.addInput(PARAMS, "seed")
    .on("change", (ev) => {
        if (sp.has("seed")) {
            sp.set("seed", ev.value);
            window.location.search = sp.toString();
        } else {
            window.location.href += "?seed="+ev.value
        }
})



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

#define SEED ${parseFloat(PARAMS.seed).toFixed(4)}
#define CAMERADIST 4.5

${utils}

float craters(in vec3 x) {
	// craters based off of
	// https://www.shadertoy.com/view/ldtXWf
	// https://www.shadertoy.com/view/XsGBDt

	// 3d "fourier series" noise map

    vec3 p = floor(x);
    vec3 f = fract(x);
    float fourier = 0.0;
    float ampTotal = 0.0;

	const float condense = -4.0;

	// Drawing a 2 by 2 cube and iterating the vertices / points
    for (int i = -2; i <= 2; i++) 
	for (int j = -2; j <= 2; j++)
	for (int k = -2; k <= 2; k++) {
        vec3 cubeVec = vec3(i,j,k);
        vec3 rand = 0.8 * hash33(p + cubeVec);

		// the more distance (f - cubeVec) away from what is assigned "random" at cubeVec point
		// 3d noise cube
		// smoothly interpolate the points on cube
		// means exponential decay

        float d = distance(f - cubeVec, rand);
        float amp = exp(condense * d);

		// frequency at sqrt(x) creates a different sine wave
		// mimics the shape of a crater
        fourier += amp * sin(2.0*PI * sqrt(d));
        ampTotal += amp;
	}
    return abs(fourier / ampTotal);
}

float surface(in vec2 uv) {
	float lat = 180. * uv.y - 90.;
    float lon = 360. * uv.x;

	// mapping 2d cartesian longitude v. latitude onto a sphere
	float roughness = 3.5;
	vec3 p = roughness * vec3(sin(lon*PI/180.0) * cos(lat*PI/180.0), sin(lat*PI/180.0), cos(lon*PI/180.0) * cos(lat*PI/180.0));

	float res = 0.0;
	for (float i = 0.0; i < 5.0; i++) {

        float noise = 0.4 * FBM(5. * p);

		// higher amplitude at higher frequencies
        float w = clamp(3.0 * pow(0.4, i), 0.0, 1.0);
		res += w * (noise);
	}

	// create waters
	float waterline = 2.5;
	res = min(res, waterline);

	return res;
}

vec2 vecToRect(in vec3 p) {
	// map(p) -> map(lon, lat) -> height

	// 90 - arccos( y / R) * 180 / PI
    float lat = 90.0 - acos(p.y / length(p)) * 180./PI;
    float lon = atan(p.x, p.z) * 180./PI;
    vec2 uv = vec2(lon/360., lat/180.) + 0.5;
	return uv;
}

float map(vec3 p) {
	// convert 3d vector into 2d vector for height value.

    return surface(vecToRect(p));
}


vec3 nEarth(vec3 p) {
	vec2 e = vec2(1.0,0.0)/1e3;
	// ((f + dx) - (f - dx)) / (2 dx) 
	
    p += 0.01 * vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx))/ (2.0 * length(e));
	return normalize(p);
}


vec4 sphere = vec4(0.0, 0.0, 0.0, 1.0);

void main() {

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord;
    uv.y = fragCoord.y*propRatio;
    
    float time = 0.2 * iTime;
    mat3 rotate = mat3( vec3(cos(time), 0.0, sin(time)),
                        vec3(0.0, 1.0, 0.0),
                        vec3(-sin(time), 0.0, cos(time))
                      );
    vec3 ro = vec3(0.0, 0.0, CAMERADIST);
    vec3 rd = normalize( vec3( uv, -2.0) );
    vec3 light = vec3(1.0, 1.0, 1.0);

    // ro *= rotate;
    // rd *= rotate;
	// light *= rotate;
    
    float t = iSphere(ro, rd, sphere);
	// t *= smoothstep(0.0, 1.0, 5.0*t + 0.5);
    
    vec4 col = vec4(0.0, 0.0, 0.0, 1.0);

	if (t > 0.0) {
		
		// if we hit sphere
		vec3 pos = ro + t*rd;

		float height = map(pos - sphere.xyz);
		vec3 norm = nEarth(pos);
		
		float intensity = 0.4*dot(light, norm);
		
		// inverse square law
		float r = length(light - pos);
		intensity = intensity / (r*r);

		// rgba(57,78,71,255)
		vec3 c = intensity*mix(vec3(52./255., 165./255., 111./255.), vec3(57./255., 72./255., 71./255.), smoothstep(0.0, 1.7, height));
		col = vec4(c, 1.0);

		// water
		// water is shinier
		intensity *= smoothstep(0.2, 1.4, height) + 1.0;
		col = vec4(mix(vec3(21./255.,43./255.,83./255.), col.rgb, smoothstep(4.0, 1.0, height)), 1.0);


		// clouds is just opacity on fbm
		// intensity -> 0, opacity *= 1
		// intensity -> large, opacity *= fbm...
		// col.a = mix(1.0, fbm(pos) + fbm(3.0 * pos), smoothstep(0.3, 0.9, intensity));
		col.a *= fbm(2.0*pos) + fbm(4.0*pos);


		col.rgb *= intensity;
	}
    
    gl_FragColor = col;
}
	`
})

regl.frame((context) => {
	drawShape();
})

