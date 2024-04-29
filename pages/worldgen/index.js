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

${utils}

float iTerrain( in vec3 ro, in vec3 rd)
{
	// https://www.shadertoy.com/view/4ttSWf
	for (float t = 0.0; t < 10.0; t += 0.1) {
		vec3 p = ro + rd * t;
		p.y += 1.0; // offset

		if (abs(p.y - fbm(p.xz)) < 0.1) {
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
	float df_dx = (fbm(p + vec2(delta, 0.0)) - fbm(p)) / delta;
	float df_dz = (fbm(p + vec2(0.0, delta)) - fbm(p)) / delta;

	vec3 n = vec3(-df_dx, 1.0, df_dz);
	n = normalize(n);

    return n;
}

vec3 skyColor(in float time) {
	// https://www.shadertoy.com/view/XsBXDc

	vec3 daytime = vec3(135.0/255.0, 206.0/255.0, 235.0/255.0);
	vec3 nighttime = vec3(0.0, 0.0, 0.0);
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
    float time = 2. * iTime;
    vec3 ro = vec3(0.0, 1.0, cameraDist);
    vec3 rd = normalize( vec3( uv, -2.0) );
    
    float t = -1.0;
    // intersect
    int id = intersect(ro, rd, t);
    
    vec3 light = vec3(1.0, 1.0, 1.0);
    
    // draw background color
    vec3 col = skyColor(time);

    if ( id == 2)
    {
        // we hit the plane
        vec3 pos = ro + t*rd;
        vec3 norm = nTerrain(pos);
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

