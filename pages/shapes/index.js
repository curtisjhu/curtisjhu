// https://iquilezles.org/articles/distfunctions/

const regl = require("regl")();

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
		propRatio: (context, props) => {
			return context.viewportHeight / context.viewportWidth;
		}
    },
    attributes: {
        position: regl.buffer([
            [-1, -1],
            [1, 1],
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, -1],
        ]),
    },
    count: 6,
    vert: `
    precision mediump float;
    attribute vec2 position;
	varying vec2 fragCoord;
    void main() {
		fragCoord = position;
    	gl_Position = vec4(position, 0, 1);
    }`,
    frag: `

precision mediump float;
varying vec2 fragCoord;
uniform float iTime;
uniform float propRatio;

float iSphere (in vec3 ro, in vec3 rd, in vec4 sphere)
{
    vec3 nro = ro - sphere.xyz;
    float r = sphere.w;
    float b = 2.0 * dot(rd, nro);
    float c = dot(nro, nro) - r*r;
    
    // discriminant shows the # of roots
    float h = b*b - 4.0*c;
    
    // if discriminants < 0 (imaginary), then return a miss;
    if (h < 0.0)
        return -1.0;
        
    // if 1+ discriminant, return the t value that intersects
    // this is the quadratic equation.
    return (-b - sqrt(h)) / 2.0;
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
    float tsph = iSphere(ro, rd, sphere);
    float tpla = iPlane(ro, rd);
    
    
    // report which ever comes first
    if (tpla > 0.0) {
        id = 2.0;
        t = tpla;
    }
    
    // reports hits and update t
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
    float time = 2. * iTime;
    mat3 rotate = mat3( vec3(cos(time), 0.0, sin(time)),
                        vec3(0.0, 1.0, 0.0),
                        vec3(-sin(time), 0.0, cos(time))
                      );
    vec3 ro = vec3(0.0, 1.0, cameraDist);
    vec3 rd = normalize( vec3( uv, -2.0) );
    
    float t = -1.0;
    // intersect
    float id = intersect(ro, rd, t);
    
    vec3 light = vec3(0.0, 1.0, 0.0);
    
    // draw black by default
    vec3 col = vec3(0.0);
    
    gl_FragColor = vec4(col,1.0);
}
 
    `,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw();
});
