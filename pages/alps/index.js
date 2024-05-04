const regl = require("regl")();
const {utils} = require("./utils");

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

float rand (in float x) {
	return fract(sin(x * 12.9898)
				* 43758.5453123);
}

float rand (in vec2 st) {
	return fract(sin(dot(st.xy,
						vec2(12.9898, 78.233)))
				* 43758.5453123);
}

${utils}

float terrain(in vec2 p) {
	// by default, fractal brownian motion
	float y = fbm(p);

	// add a cliff
	float line = 2.0 * p.x + 0.3;
	for (int i = 0; i < 4; i++)
		line += sin(float(i)*p.x);

	y += 0.3*smoothstep(0.0, 1.0, p.y - line);

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

		if (p.y < fbm(p.xz)) {
			// hit
			return t;
		}
	}
	return -1.0;
}

vec3 nTerrain(in vec3 pos)
{
    // the normal vector
	// (1, df/dz, 0) cross (0, df/dx, 1) = (-df/dx, 1, df/dz)
	vec2 p = pos.xz;
	float delta = 0.01;
	float d = fbm(p);
	float df_dx = (fbm(p + vec2(delta, 0.0)) - d) / delta;
	float df_dz = (fbm(p + vec2(0.0, delta)) - d) / delta;

	vec3 n = vec3(-df_dx, 1.0, df_dz);
	n = normalize(n);

    return n;
}

// https://iquilezles.org/articles/rmshadows/
// float softshadow( in vec3 ro, in vec3 rd, float mint, float maxt, float k ) {
//     float res = 1.0;
//     float t = mint;
//     for( int i=0; i<256 && t<maxt; i++ )
//     {
//         float h = map(ro + rd*t);
//         if( h<0.001 )
//             return 0.0;
//         res = min( res, k*h/t );
//         t += h;
//     }
//     return res;
// }

float shadows(in vec3 p, in vec3 lightRay) {
	vec3 ray = normalize(lightRay);
	for (float t = 0.0; t < 10.0; t++) {
		if (abs(fbm((p + lightRay * t).xz) - fbm(p.xz)) < 0.1) {
			return 1.0;
		}
	}
	return 0.0;
}

vec3 skyColor(in vec3 lightSource, in float time) {
	// https://www.shadertoy.com/view/XsBXDc

	vec3 daytime = vec3(135.0/255.0, 206.0/255.0, 235.0/255.0);
	vec3 nighttime = vec3(0.0, 0.0, 0.0);

    // float sunD = dot(lightSource, nml) > 0.995 ? 1.0 : 0.0;
	// vec3 sun = vec3(6.5, 3.5, 2.0);
	// float skyPow = dot(nml, vec3(0.0, -1.0, 0.0));
    // float centerPow = 0.0; //-dot(uv,uv);
    // float horizonPow = pow(1.0-abs(skyPow), 3.0)*(5.0+centerPow);
	// float sunPow = dot(nml, bgLight);
	// float sp = max(sunPow, 0.0);
    // float scattering = clamp(1.0 - abs(2.0*(-bgLight.y)), 0.0, 1.0);
	// vec3 bgCol = max(0.0, skyPow)*2.0*vec3(0.8);
	// bgCol += 0.5*vec3(0.8)*(horizonPow);
	// bgCol += sun*(sunD+pow( sp, max(128.0, abs(bgLight.y)*512.0) ));
	// bgCol += vec3(0.4,0.2,0.15)*(pow( sp, 8.0) + pow( sp, max(8.0, abs(bgLight.y)*128.0) ));
    // bgCol *= mix(vec3(0.7, 0.85, 0.95), vec3(1.0, 0.45, 0.1), scattering);
    // bgCol *= 1.0 - clamp(bgLight.y*3.0, 0.0, 0.6);
	return vec3(1.0);
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
    
    float cameraDist = 5.0;
    float time = 0.3 * iTime;
    vec3 ro = vec3(0.0, 1.0, cameraDist);
    vec3 rd = normalize( vec3( uv, -2.0) );
    
    float t = -1.0;
    // intersect
    int id = intersect(ro, rd, t);
    
	float lightDist = 3.0;
    vec3 light = vec3(lightDist * cos(10.0), lightDist*abs(sin(10.0)) + PI/4.0, 0.0);
    
    // draw background color
    vec3 col = skyColor(light, time);

    if ( id == 2)
    {
        // we hit the plane
        vec3 pos = ro + t*rd;
        vec3 norm = nTerrain(pos);

		float maxVal = 8.0;
        float intensity = dot(light - pos, norm) * 8.0;
		// intensity = clamp(intensity, 0.0, maxVal);
        
        // inverse square law
        float r = length(light - pos);
        intensity = intensity / (r*r);
        
        col = vec3(94.0/255.0, 72.0/255.0, 64.0/255.0);
		col *= intensity;
		col *= shadows(pos, light-pos);


		float d = length(ro - pos);
		// decaying with distance away from viewer
		float lambda_r = exp(-0.1 * d);
		float lambda_g = exp(-0.1 * d);
		float lambda_b = exp(-0.1 * d);

		col = col * lambda_r + (1.0 - lambda_r) * vec3(0.4, 0.0, 0.0);
		col = col * lambda_b + (1.0 - lambda_b) * vec3(0.0, 0.0, 0.4);
		col = col * lambda_g + (1.0 - lambda_g) * vec3(0.0, 0.4, 0.0);
    }
    
    gl_FragColor = vec4(col,1.0);
}
	`
})

regl.frame((context) => {
	drawShape();
})

