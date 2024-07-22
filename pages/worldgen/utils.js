export const utils = `

#define PI 3.14159256
#define E 2.71828182

float rand (in float x) {
	return fract(sin(x * 12.9898)
				* 43758.5453123);
}

float rand (in vec2 st) {
	return fract(sin(dot(st.xy,
						vec2(12.9898, 78.233)))
				* 43758.5453123);
}

float noise(in vec2 pos) {
	vec2 i = floor(pos);
	vec2 f = fract(pos);

	float a = rand(i);
	float b = rand(i + vec2(1.0, 0.0));
	float c = rand(i + vec2(0.0, 1.0));
	float d = rand(i + vec2(1.0, 1.0));

	vec2 u = smoothstep(0.,1.,f);

	// c -- d
	// |    |
	// a -- b
	// Little intuition here.

	return mix(a, b, u.x) +
			(c - a)*u.y*(1.0-u.x) +
			(d - b)*u.x*u.y;
		
}

float fbm(in vec2 pos) {
	float value = 0.0;
	float amplitude = 0.3;
	float frequency = 0.5;

	float angle = 10.0; // arbitrary angle for rotation
	mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

	const int octaves = 10;

	// analogous to fourier series
	for (int i = 0; i < octaves; i++) {
	 	pos = pos * rotationMatrix;

		value += amplitude * noise(frequency * pos);
		frequency *= 2.0;
		amplitude *= 0.6;
	}

	return value;
}

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
	return vec3(.9);
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

`;