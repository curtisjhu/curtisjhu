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
# Moon Generation

Creating a random, pseudo-realistic moon using a random seed.

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
	const float spacing = 3.2;
	for (float i = 0.0; i < 5.0; i++) {
		// less spaced out for i increases exponentially
        float c = craters(0.5 * pow(spacing, i) * p);

		// add crater noise. Decays 
        float noise = 0.4 * exp(-4.0 * c) * FBM(10. * p);

		// higher amplitude at higher frequencies
        float w = clamp(3.0 * pow(0.4, i), 0.0, 1.0);
		res += w * (c + noise);
	}

	return res;
}

float map(vec3 p) {
	// convert 3d vector into 2d vector for height value.

	// map(p) -> map(lon, lat) -> height

	// 90 - arccos( y / R) * 180 / PI
    float lat = 90.0 - acos(p.y / length(p)) * 180./PI;
    float lon = atan(p.x, p.z) * 180./PI;
    vec2 uv = vec2(lon/360., lat/180.) + 0.5;

    return surface(uv);
}


vec3 nMoon(vec3 p) {
	vec2 e = vec2(1.0,0.0)/1e3;
	// ((f + dx) - (f - dx)) / (2 dx) 
	
    p += 0.01 * vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx))/ (2.0 * length(e));
	return normalize(p);
}

float iStars(in vec3 ro, in vec3 rd) {
	// pseudorandom in 2d

	// ro.z + rd.z * t = 0
	float t = -ro.z / rd.z;

	vec3 R = rd * t;
	float phi_x = acos(ro.z/R.x);
	float theta_y = acos(ro.z/R.y);

	if (hash(vec2(phi_x, theta_y)) > 0.99) {
		return 1.0;
	}

	return -1.0;
}

vec4 sphere = vec4(0.0, 0.0, 0.0, 1.0);

int intersect( in vec3 ro, in vec3 rd, out float t)
{
    t = 1000.0;
    int id = -1; // by default, it will be a miss
    float tsph = iSphere(ro, rd, sphere);
    
    // reports hits and update t
    if (tsph > 0.0) {
        // report hit, you set the order
        id = 1;
        t = tsph;
    }
	else {
		// too slow rn
    	// float tstars = iStars(ro, rd);
		// if (tstars > 0.0) {
		// 	id = 2;
		// 	t = tstars; // not relevant information
		// }
	}
    
    return id;
}


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

    ro *= rotate;
    rd *= rotate;
	light *= rotate;
    
    float t = -1.0;
    int id = intersect(ro, rd, t);
    
    
    vec3 col = vec3(0.0);
    
    if ( id == 1 )
    {
        // if we hit sphere
        vec3 pos = ro + t*rd;

		float height = map(pos - sphere.xyz);
        vec3 norm = nMoon(pos);
		
        float intensity = 0.4 * dot(light, norm);
        
        // inverse square law
        float r = length(light - pos);
        intensity = intensity / (r*r);

		col = intensity * mix(vec3(0.58, 0.57, 0.55), vec3(0.15, 0.13, 0.1), smoothstep(0.0, 3.0, height));
    }
    
    gl_FragColor = vec4(col,1.0);
}
	`
})

regl.frame((context) => {
	drawShape();
})

