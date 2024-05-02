const regl = require("regl")();
const {utils} = require("util");

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
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
	varying vec2 uv;
    void main() {
		uv = position;
    	gl_Position = vec4(position, 0, 1);
    }`,
    frag: `
precision mediump float;
attribute vec2 position;

${utils}

vec3 surfaceNormal(vec3 pos)
{
 	vec3 delta = vec3(0.01, 0.0, 0.0);
    vec3 normal;
    normal.x = map(pos + delta.xyz,0.0) - map(pos - delta.xyz,0.0);
    normal.y = map(pos + delta.yxz,0.0) - map(pos - delta.yxz,0.0);
    normal.z = map(pos + delta.zyx,0.0) - map(pos - delta.zyx,0.0);
    return normalize(normal);
}

float trace(vec3 o, vec3 r, float q)
{
	float t = 0.0;
    float ta = 0.0;
    for (int i = 0; i < 8; ++i) {
        float d = map(o + r * t, q);
        t += d * 1.0;
    }
    return t;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    
    vec3 r = normalize(vec3(uv, 1.0));
    float tn = texture(iChannel0,vec2(iTime*0.1,0.0)).x;
    tn = tn * 2.0 - 1.0;
    r *= zrot(sin(tn)*0.2) * xrot(-pi*0.05+sin(tn)*0.1);
    
    vec3 o = vec3(0.0, 0.15, -0.5);
    
    float t = trace(o, r, 0.0);
    vec3 world = o + r * t;
    vec3 sn = surfaceNormal(world);
    
    vec3 vol = vec3(0.0);
    
    for (int i = 0; i < 3; ++i) {
        float rad = 0.2+float(1+i)/3.0;
        float tt = trace(o,r,rad);
        vec3 wa = o + r * tt;
        float atlu = atan(wa.x,wa.z) - tt * 4.0 + iTime;
        float atlv = acos(wa.y/length(wa)) + tt * 4.0;
        vec3 at = texture(iChannel0, vec2(atlu,atlv)).xxx;
        vol += at / 3.0;
    }
    
    float prod = max(dot(sn, -r), 0.0);
    
    float fd = map(world, 0.0);
    float fog = 1.0 / (1.0 + t * t * 0.1 + fd * 10.0);
    
    vec3 sky = vec3(148.0,123.0,120.0) / 255.0;
    
    vec3 fgf = vec3(210.0,180.0,140.0) / 255.0;
    vec3 fgb = vec3(139.0,69.0,19.0) / 255.0;
    vec3 fg = mix(fgb, fgf, prod);
    
    vec3 back = mix(fg, sky, 1.0-fog);
    
    vec3 mmb = mix(vol, back, 0.8);
    
    vec3 fc = mmb * vec3(1.0);
    
	fragColor = vec4(fc, 1.0);

    }`,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw();
});
