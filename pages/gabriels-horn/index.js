const regl = require("regl")();

const { Pane } = require("tweakpane");
const InfoDump = require("tweakpane-plugin-infodump");

const pane = new Pane({
	title: "Gabriel's Horn / Painter's Paradox",
	
});
pane.registerPlugin(InfoDump);
pane.addBlade({
	view: "infodump",
	content: "This ray tracing example was overly complicated. The result was not fantastic. But it was from a long time ago and was part of a learning curve."
})
pane.addBlade({
	view: "infodump",
	content: `
		The 3D surface is defined by:
		- z^2 + y^2 = 1/x
		- x^2 + y^2 + z^2 = (x^3 + 1)/x
		- |xyz| = (x^3 + 1)/x

		this is nice for us to find the exact intersection with ray tracing.
		
		- |ro + t*rd| = |xyz| = (x^3 + 1)/x
		- x = ro.x + t*rd.x
		
		We solve for t which I (painfully) factored it out.

		This is ultimately a cubic function in the form: 
		- at^3 + bt^2 + ct + d = 0

		I proceed with using Newton's Method to find the roots for t.
		(It gets too long to put here. Read the code on github)

		
	`,
	markdown: true
})

const draw = regl({
    frag: `
	precision mediump float;
	varying vec2 fragCoord;
	uniform float ratio;
	uniform float iTime;

	#define PI 3.14159265
	#define dt 0.001

	float polynomial(float x, float a, float b, float c, float d)
	{
		return a*x*x*x + b*x*x + c*x + d;
	}

	float df(float x, float a, float b, float c, float d)
	{
		return ( polynomial(x + dt, a, b, c, d) - polynomial(x - dt, a, b, c, d) ) / (2.0 * dt);
	}

	float iHorn(in vec3 ro, in vec3 rd)
	{
		// The 3D surface is defined by:
		// z^2 + y^2 = 1/x
		// x^2 + y^2 + z^2 = (x^3 + 1)/x
		// |xyz| = (x^3 + 1)/x
		
		// this is nice for us to find the exact intersection with ray tracing.
		
		// |ro + t*rd| = (x^3 + 1)/x
		// x = ro.x + t*rd.x
		
		// basically we solve for t which is painful when I factored it out.
		// if you find a better trick please let me know.
		
		// my factored out result is a mess:
		// 
		
		// this is ultimately a cubic function
		// we can use the cubic formula to solve for t but this would be hell.
		// We can try to factor out a t somehow to reduce it into a quadratic
		// we can try to use Newton's Method
		
		// ax^3 + bx^2 + cx + d = 0
		float a = pow(rd.x, 3.0) + rd.x*rd.y*rd.y + rd.x*rd.z*rd.z
				- pow(rd.x, 3.0);
		float b = ro.x*rd.x*rd.x + ro.x*rd.y*rd.y + ro.x*rd.z*rd.z
				+ 2.0*rd.x*rd.x*ro.x + 2.0* rd.x*ro.y*rd.y + 2.0*rd.x*ro.z*rd.z
				- 3.0*ro.x*rd.x*rd.x;
		float c = 2.0*ro.x*ro.x*rd.x + 2.0*ro.y*ro.x*rd.z + 2.0*ro.z*ro.x*rd.z
				+ rd.x*ro.x*ro.x + rd.x*ro.y*ro.y + rd.x*ro.z*ro.z
				- 3.0*ro.x*ro.x*rd.x;
		float d = pow(ro.x, 3.0) + ro.y*ro.y*ro.x + ro.z*ro.z*ro.x - pow(ro.x, 3.0) - 1.0;
		
		float discriminant = 18.0*a*b*c*d - 27.0*a*a*d*d
							-4.0*b*b*b*d - 4.0*a*c*c*c
							+ b*b*c*c;
		
		if (discriminant < 0.0) return -1.0;
		
		// computing roots via Newton's Method
		
		
		float x = 2.0;
		const int MAX_ITER = 100;
		float epsilon = 1e-1;
		for (int i = 0; i < MAX_ITER; i++) {
			float curr = polynomial(x, a, b, c, d);
			
			if (abs(curr) < epsilon) break;
			
			float deriv = df(x, a, b, c, d); 
			x = x - curr / deriv;
		}
		
		
		return x;
	}

	float dHorn(float x)
	{
		return (1.0/(x+dt) - 1.0/(x-dt)) / (2.0*dt);
	}

	vec3 nHorn(in vec3 pos)
	{
		// pos is current position on the Horn
		
		// tangent f(x) = 1/x;
		float df = dHorn(pos.x)*dt;
		vec3 delta_1 = normalize( vec3(dt, df, pos.z));
		
		// tangent around the circle
		// probably a better way of doing this with derivatives??
		mat2 rotate90 = mat2( vec2(cos(PI/2.0), sin(PI/2.0)),
							vec2(-sin(PI/2.0), cos(PI/2.0))
							);
		vec3 delta_2 = normalize(vec3(pos.x, pos.yz*rotate90));
		
		vec3 normal = cross(delta_1, delta_2);
		return normal;
	}

	float intersect(in vec3 ro, in vec3 rd)
	{ 
		float tHorn = iHorn(ro, rd); 
		return tHorn;
	}

	void main()
	{
		vec2 uv = fragCoord*ratio;
		
		float cameraDist = 10.0;
		float time = 0.5 * iTime;
		float WINDOW_SIZE = 10.0;
		
		float amp = WINDOW_SIZE/2.0;
		vec3 ro = vec3( amp + 1.0 + cos(time)*amp, 0.0, cameraDist);
		vec3 rd = normalize( vec3( uv, -2.0) );
		

		float t = intersect(ro, rd);
		
		vec3 col = vec3(0.0);
		vec3 light = vec3(1.0, 1.0, 1.0);
		
		if (t > 0.0) {
			vec3 pos = ro + t*rd;
			vec3 norm = nHorn(pos);
			float intensity = 2.0*dot(light, norm);
			col = mix(vec3(0.5, 0.08, 0.1), vec3(0.1, 0.1, 0.6), (pos.x - 1.0) / WINDOW_SIZE) * intensity;
		}
		
		
		gl_FragColor = vec4(col,1.0);
    }`,

    vert: `
    precision mediump float;
    attribute vec2 position;
	varying vec2 fragCoord;

    void main() {
		fragCoord = position;
    	gl_Position = vec4(position, 0, 1);
    }`,

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

    uniforms: {
        iTime: (ctx) => ctx.time,
		ratio: (ctx) => ctx.viewportWidth/ctx.viewportHeight
    },

    count: 6,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw({});
});
