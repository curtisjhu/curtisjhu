exports.utils = `

float rand (in vec3 st) {
	return fract(sin(dot(st,
						vec3(12.9898 + SEED, 78.233 + SEED, 43.103 + SEED)))
				* 43758.5453123 * SEED);
}

float rand (in float x) {
	return fract(sin(x * SEED)
				* 43758.5453123);
}

// Stolen from here:
// https://www.shadertoy.com/view/4dS3Wd
#define NOISE fbm
#define NUM_NOISE_OCTAVES 5
// Precision-adjusted variations of https://www.shadertoy.com/view/4djSRW
float hash(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }
float hash(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }
float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), u);
}
float noise(vec3 x) {
    const vec3 step = vec3(110, 241, 171);

    vec3 i = floor(x);
    vec3 f = fract(x);
 
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the 
    // incremental change to the 1D based on the 3D -> 1D wrapping
    float n = dot(i, step);

    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

float fbm( in vec3 p )
{
	float res = 0.0;
	float a = 1.;
	float f = 1.0;
	float aTot = 0.0;
	vec3 shift = vec3(100.);
	for (int i = 0; i < 5; i++) {
		res += a * noise(f*p);
		aTot += a;
		a *= 0.5;
		f *= 1.2;
		p = p*2.0 + shift; // random
	}
	return res / aTot;
}

float map( in vec3 p, int oct )
{
	vec3 q = p - vec3(0.0,0.1,1.0)*iTime;
    float g = 0.5+0.5*noise( q*0.3 );
    
	float f;
    f  = 0.50000*noise( q ); q = q*2.02;
    if( oct>=2 ) 
    f += 0.25000*noise( q ); q = q*2.23;
    if( oct>=3 )
    f += 0.12500*noise( q ); q = q*2.41;
    if( oct>=4 )
    f += 0.06250*noise( q ); q = q*2.62;
    if( oct>=5 )
    f += 0.03125*noise( q ); 
    
    f = mix( f*0.1-0.5, f, g*g );
        
    return 1.5*f - 0.5 - p.y;
}
`;