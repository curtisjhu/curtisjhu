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

float fbm( in vec2 pos ) {
	float value = 0.0;
	float amplitude = 1.0;
	float frequency = 0.5;

	float angle = 10.0; // arbitrary angle for rotation
	mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
	
	// max is \sum^octaves amplitude * gamma^i
	const int octaves = 9;

	// analogous to fourier series
	for (int i = 0; i < octaves; i++) {
	 	pos = pos * rotationMatrix;

		value += amplitude * noise(frequency * pos);
		frequency *= 2.0;
		amplitude *= 0.5;
	}

	return value;
}

float fbm_norm( in vec2 pos ) {
	float value = 0.0;
	float amplitude = 1.0;
	float frequency = 0.5;

	float angle = 10.0; // arbitrary angle for rotation
	mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
	
	// max is \sum^octaves amplitude * gamma^i
	const int octaves = 9;

	float tot = 0.0;
	// analogous to fourier series
	for (int i = 0; i < octaves; i++) {
	 	pos = pos * rotationMatrix;

		value += amplitude * noise(frequency * pos);
		tot += amplitude;
		frequency *= 2.0;
		amplitude *= 0.5;
	}

	return value/tot;
}


float shadows(in vec3 p, in float ref, in vec3 lightRay) {
	vec3 ray = normalize(lightRay);
	for (float t = 0.0; t < 10.0; t++) {
		vec3 newPos = p + lightRay * t;
		if (abs(fbm(newPos.xz) - ref) < 0.1) {
			return newPos.y/t;
		}
	}
	return 0.0;
}

vec3 skyColor(in vec3 lightSource, in float time, in vec3 ro, in vec3 rd) {
	// https://www.shadertoy.com/view/XsBXDc

	vec3 daytime = vec3(130.0/255.0, 180.0/255.0, 235.0/255.0);
	vec3 nighttime = vec3(0.0, 0.0, 0.0);

	daytime.y += 0.2 * rd.y;

	float cloudHeight = 10.0;
	// ro.y + rd.y * t = cloudHeight
	float t = clamp((cloudHeight - ro.y)/rd.y, 0.0, 10.0);

	vec2 p = (t * rd + ro).xz;

	float cloud = fbm_norm(2.0*p);
	daytime = mix(vec3(0.8), daytime, cloud);

	return daytime;
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