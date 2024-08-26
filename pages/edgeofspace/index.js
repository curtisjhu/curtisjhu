// Basically the Earth sketch
// TODO:
// Stars: https://clockworkchilli.com/blog/4_space_shaders_-_twinkle_twinkle_little_star
// Sun
// Atmosphere
// clouds
// diffusive lighting
// Snowy peaks
// yellowing
// moon

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
# Edge of Space Generation

Point of View: you are an astronaut flying over a planet.
`,
  border: false,
  markdown: true,
});


var sp = new URLSearchParams(window.location.search);
console.log(sp.get("seed"))
const PARAMS = {
	seed: sp.get("seed") || 1.3,
    numPoints: 4000,
	speed: 0.03
}
pane.addBinding(PARAMS, "seed")
    .on("change", (ev) => {
		if (ev.last) {
			if (sp.has("seed")) {
				sp.set("seed", ev.value);
				window.location.search = sp.toString();
			} else {
				window.location.href += "?seed="+ev.value
			}
        }
})
pane.addBinding(PARAMS, "speed");


const drawShape = regl({
	uniforms: {
		iTime: (context, props) => context.time,
		propRatio: (context, props) => {
			return context.viewportHeight / context.viewportWidth;
		},
		speed: regl.prop("speed")
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
uniform float speed;

#define SEED ${parseFloat(PARAMS.seed).toFixed(4)}
#define CAMERADIST .8

// lower is higher up geographically
#define WATERLINE 3.8
#define ICELINE 2.5

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
	float f = 5.0, a = 1.0;

	float res = 0.0;
	for (float i = 0.0; i < 10.0; i++) {
        res += a* FBM(f * p);
		a *= 0.5; f *= 2.0;
	}

	// create waters
	res = min(res, WATERLINE);

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
    
    float time = speed * iTime;
    mat3 rotate = mat3(
						1.0, 0.0, 0.0,
						vec3(0.0, cos(time), sin(time)),
                        vec3(0.0, -sin(time), cos(time))
                      );
    vec3 ro = vec3(0.0, 1.0, CAMERADIST);
    vec3 rd = normalize( vec3( uv, -2.0) );
    vec3 light = vec3(0.0, 0.0, -1.2*CAMERADIST);

    ro *= rotate;
    rd *= rotate;
    
    float t = iSphere(ro, rd, sphere);
	// t *= smoothstep(0.0, 1.0, 5.0*t + 0.5);
    
	// ray casted position
	// stratosphere colors
	vec2 p = (ro + rd * (-ro.z/rd.z)).xy;
	float dr = distance(p, normalize(p-sphere.xy) * sphere.w);
	float r_k = 0.1;
    vec4 col = mix( vec4(108./255.,146./255.,192./255.,1.), vec4(59./255., 96./255., 149./255., 1.0), smoothstep(0.0, r_k, dr));
	col = mix(col, vec4(0.0, 0.0, 0.0, 1.0), smoothstep(r_k, r_k + 0.3, dr));

	// sun
	// float sun = clamp( dot(light-ro, rd), 0.0, 1.0 );
	// sun = 1.0 + -exp(-pow(sun, 8.0));
	// col = mix(vec4(1.0), col, sun);

	if (t > 0.0) {
		
		// if we hit sphere
		vec3 pos = ro + t*rd;

		float height = map(pos - sphere.xyz);
		vec3 norm = nEarth(pos);
		
		float nLight = dot(normalize(light), normalize(norm));
		// spread it out a bit more
		nLight = 1.2*nLight;

		float nYou = dot(normalize(rd), norm);
		float intensity = nLight;

		// landmass
		vec3 c = intensity*mix(vec3(147./255., 127./255., 111./255.), vec3(41./255., 65./255., 50./255.), smoothstep(WATERLINE+0.1, WATERLINE-0.6, height));
		col = vec4(c, 1.0);

		// water
		col = mix(vec4(9./255.,20./255.,38./255., 1.), col, smoothstep(0.0, 0.2, abs(height - WATERLINE)));

		// icy mountains
		col = mix(vec4(.8), col, smoothstep(0.0, 0.6, abs(height - ICELINE)));

		// clouds is just opacity on fbm
		// intensity -> 0, opacity *= 1
		// intensity -> large, opacity *= fbm...
		// col.a = mix(1.0, fbm(3.*pos) + fbm(6.0 * pos), smoothstep(0.3, 0.9, intensity));
		// col.a *= fbm(2.0*pos) + fbm(4.0*pos);

		col.rgb *= intensity;
	}
    
    gl_FragColor = col;
}
	`
})

regl.frame((context) => {
	drawShape({
		speed: PARAMS.speed
	});
})

