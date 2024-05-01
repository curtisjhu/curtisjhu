export const utils = `
// craters based on the following examples
// https://www.shadertoy.com/view/MtjGRD


#define PI 3.14159265359

// https://www.shadertoy.com/view/XdBGzd
// The MIT License
// Copyright © 2014 Inigo Quilez
float iSphere( in vec3 ro, in vec3 rd, in vec4 sph )
{
	vec3 oc = ro - sph.xyz;
	float b = dot( oc, rd );
	float c = dot( oc, oc ) - sph.w*sph.w;
	float h = b*b - c;
	if( h<0.0 ) return -1.0;
	return -b - sqrt( h );
}


#define ITERATIONS 4


// *** Change these to suit your range of random numbers..

// *** Use this for integer stepped ranges, ie Value-Noise/Perlin noise functions.
#define HASHSCALE1 .1031
#define HASHSCALE3 vec3(.1031, .1030, .0973)
#define HASHSCALE4 vec4(.1031, .1030, .0973, .1099)

float hash( in vec2 p ) 
{
    return fract(sin(dot(p, vec2(39.786792357-SEED, 59.4583127+SEED))) * 43758.236237153);
}

float hash13(vec3 p3)
{
    p3  = fract(p3 * HASHSCALE1);
    p3 += dot(p3, p3.yzx + SEED);
    return fract((p3.x + p3.y) * p3.z);
}

///  3 out, 3 in...
vec3 hash33(vec3 p3)
{
        p3 = fract(p3 * HASHSCALE3);
    p3 += dot(p3, p3.yxz + SEED);
    return fract((p3.xxy + p3.yxx)*p3.zyx);

}


// By David Hoskins, May 2014. @ https://www.shadertoy.com/view/4dsXWn
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

float Noise(in vec3 p)
{
    vec3 i = floor(p);
        vec3 f = fract(p); 
        f *= f * (3.0-2.0*f);

    return mix(
                mix(mix(hash13(i + vec3(0.,0.,0.)), hash13(i + vec3(1.,0.,0.)),f.x),
                        mix(hash13(i + vec3(0.,1.,0.)), hash13(i + vec3(1.,1.,0.)),f.x),
                        f.y),
                mix(mix(hash13(i + vec3(0.,0.,1.)), hash13(i + vec3(1.,0.,1.)),f.x),
                        mix(hash13(i + vec3(0.,1.,1.)), hash13(i + vec3(1.,1.,1.)),f.x),
                        f.y),
                f.z);
}

const mat3 m = mat3( 0.00,  0.80,  0.60,
                    -0.80,  0.36, -0.48,
                    -0.60, -0.48,  0.64 ) * 1.7;

float FBM( vec3 p )
{
    float f;

        f = 0.5000 * Noise(p); p = m*p;
        f += 0.2500 * Noise(p); p = m*p;
        f += 0.1250 * Noise(p); p = m*p;
        f += 0.0625   * Noise(p); p = m*p;
        f += 0.03125  * Noise(p); p = m*p;
        f += 0.015625 * Noise(p);
    return f;
}

// NOT IN USE
float iMoon (in vec3 ro, in vec3 rd, in vec4 sphere)
{

	const float epsilon = 0.01;
	const float detail = 0.02;
	float r = sphere.w;

	for (float t = 0.0; t < 10.0; t += detail) {
		vec3 p = ro + rd*t;

		// spherical coordinates
		vec3 s = p - sphere.xyz;
		float s_len = length(s);

		float phi = acos(s.z/s_len);
		float theta = atan(s.y/s.x);

		p -= sphere.xyz;

		// float r = moon(sphere, phi, theta);
		float r = 5.0;

		if (s_len < r) {
			return t;
		}
	}
}

`;