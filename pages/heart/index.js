const regl = require("regl")();
const glslify = require("glslify");

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

float iSphere (in vec3 ro, in vec3 rd, in vec4 sphere)
{
	// MATH:
	// ro + rd * t = p
	// x^2 + y^2 + z^2 = r^2
	// dot(p - sph, p - sph) = r^2 , where sph = sphere's center
	// p^2 - 2 * p * sph + sph^2 = r^2

	// plug in p and solve for t.
	// t^2 + 2*rd*(ro-sph)t + (ro - sph)^2 - r^2 = 0
	// With quadratic, you can find the # of intersections and value of t.
	// That's by hardcoding shit. But for complex shapes, we may need to ray-march since simple derivations are not possible.

	// ray-marching
	float r = sphere.w;
	for (float t = 0.0; t < 20.0; t += 0.01) {
		vec3 p = ro + rd*t;

		// adding a parabola along the x axis
		float slant = 1.3 / (1.0 + exp(0.9 * p.y)) + 1.3;
		p.y = slant * p.y - abs(p.x) * sqrt((10.0 - abs(p.x)) / 14.0);

		p = p - sphere.xyz; // offset position
		if (dot(p, p) - r*r < 1.0) {
			// report hit!
			return t;
		}
	}
	return -1.0;
}

vec3 nSphere(in vec3 source, in vec4 sph)
{
    // normal vector of the surface of the sphere
    // current position on the surface - center of sphere position / sphere radius
    return (source - sph.xyz) / sph.w;
}

float iPlane( in vec3 ro, in vec3 rd)
{
    // Plane is:
    // y = 0
    // ro.y + t*rd.y = 0
    // t = -ro.y/rd.y
    return -ro.y/rd.y;
}

vec3 nPlane(in vec3 pla)
{
    // the normal vector
    return vec3(0.0, 1.0, 0.0);
}

vec4 sphere = vec4(0.0, 1.0, 0.0, 1.0);

float intersect( in vec3 ro, in vec3 rd, out float t)
{
    t = 1000.0;
    float id = -1.0; // by default, it will be a miss
    float tpla = iPlane(ro, rd);
    
    
    // report which ever comes first
    if (tpla > 0.0) {
        id = 2.0;
        t = tpla;
    }
    
    // reports hits and update t
	// ray-marching
    float tsph = iSphere(ro, rd, sphere);
    if (tsph > 0.0) {
        // report hit, you set the order
        // you also set what item did you hit???
        id = 1.0;
        t = tsph;
    }
    
    return id;
}


void main() {

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord;
    uv.y = fragCoord.y*propRatio;
    
    float cameraDist = 5.0;
    float time = 0.2 * iTime;
	sphere.w = 1.0 + 0.2* pow((0.5 + 0.5* sin(2.0*3.14159*time)), 4.0);

    vec3 ro = vec3(0.0, 1.0, cameraDist);
    vec3 rd = normalize( vec3( uv, -2.0) );
    
    float t = -1.0;
    // intersect
    float id = intersect(ro, rd, t);
    
    vec3 light = vec3(0.5, 1.0, 1.0);
    
    // draw black by default
    vec3 col = vec3(0.0);
    
    if ( id > 0.5 && id < 1.5 )
    {
        // if we hit sphere
        vec3 pos = ro + t*rd;
        vec3 norm = nSphere(pos, sphere);
        float intensity = 0.9 - 0.2 * exp(- pow(0.1*dot(light, norm) + 0.1, 2.0));
        
        // inverse square law
        float r = length(light - pos);
        intensity = intensity / (r*r);
        
        col = vec3(0.8, 0.2, 0.2) * intensity;   
    }
    else if ( id > 1.5)
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
	`
})

regl.frame((context) => {
	drawShape();
})

