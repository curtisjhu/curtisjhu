const regl = require("regl")();

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
        iResolution: (ctx) => {
            if (ctx.viewportWidth > ctx.viewportHeight) {
                return [ctx.viewportHeight/ctx.viewportWidth, 1]
            }
            return [1, ctx.viewportWidth/ctx.viewportHeight];
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
	varying vec2 uv;
    void main() {
		uv = position;
    	gl_Position = vec4(position, 0, 1);
    }`,
    frag: `
    precision mediump float;
    varying vec2 uv;
	uniform float iTime;
    uniform vec2 iResolution;

    #define E 2.71828

    float f(float x) {
        return 0.6*pow(x-0.4, 3.0) + pow(x-0.4, 2.0) + 0.5;
    }

    // from a to b using rects of width w
    float RiemannSums(float a, float b, float w, vec2 pos) {

        // miss
        if (pos.x > b || pos.x < a) return -1.0;

        float i = floor((pos.x - a) / w);
        float y = f(a+i*w);
        
        if ( pos.y <= y && pos.y >= 0.0 || pos.y >= y && pos.y <= 0.0) {
            return i/((b-a)/w);
        }
        
        return -1.0;
    }

    void main()
    {
        vec2 st = uv.xy / iResolution.xy;
        
        vec3 col = vec3(0.0);
    
        // GRID LINES
        if (abs(uv.x) < 0.01 || abs(uv.y) < 0.01)
            col = vec3(0.2, 0.4, 0.5);
            
        // RECTS
        float TotalAnimationLength = 3.0;
        float time = mod(iTime, TotalAnimationLength);
        
        // using f(x) = e^-x^2 (gaussian bell)
        float w = 0.2 * pow(E, - pow(time, 2.0) );
        float shade = RiemannSums(-0.6, 0.6, w, uv);
        if (shade >= 0.0)
            col = mix(vec3(0.9, 0.9, 0.12), vec3(0.9, 0.72, 0.1), shade);
        
        // PLOT FUNC
        col += smoothstep(vec3(0.7, 0.3, 0.3), vec3(0.0), vec3(clamp(10000.0*pow(f(uv.x)-uv.y, 2.0), 0.0, 1.0)));
        

        gl_FragColor = vec4(col,1.0);
    }`,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw();
});
