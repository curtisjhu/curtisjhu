// Done in collaboration with Derrick Pickrel

const { Pane } = require("tweakpane")
const TweakpaneLatexPlugin = require("tweakpane-latex");




const regl = require('regl')()
const camera = require("regl-camera")(regl, {
center: [0, 0, 0],
damping: 0.5,
rotationSpeed: 0.5
});

const pane = new Pane({
	title: "Wormhole (GPU intensive)"
});
pane.registerPlugin(TweakpaneLatexPlugin);

pane.addBlade({
	view: "latex",
	markdown: true,
	content: "There is"
})
  
const setupEnvMap = regl({
	uniforms: {
		envmap1: regl.prop('cube1'),
		envmap2: regl.prop('cube2'),
		iTime: (context) => context.time,
		propRatio: (context, props) => {
		return context.viewportHeight / context.viewportWidth;
		}
	},
	frag: `
	precision mediump float;
	uniform samplerCube envmap1;
	uniform samplerCube envmap2;
	varying vec2 uv;
	varying vec3 reflectDir;
	uniform float iTime;
	uniform float propRatio;

	// CHECK DISTANCE FROM CAMERA TO SPHERE SURFACE
	// RETURNS -1 IF MISSES SPHERE
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

	void main () {
		// RAY TRACING

		vec3 ro = vec3(0.0);
		vec3 rd = normalize(reflectDir);

		// draw cube1 cubemap by default
		vec4 col = textureCube(envmap2, reflectDir);

		float time = 0.3*iTime;
		mat3 rotate = mat3(cos(time), 0.0, sin(time), 
								0.0, 1.0, 0.0,
							-sin(time), 0.0, cos(time));
		
		// SPHERE
		vec4 sphere = vec4(-0.04, 0.0, 0.0, 0.01);
		sphere.xyz *= rotate;

		float t = iSphere(ro, rd, sphere);
		if (t > 0.0) { // INTERSECTS SPHERE
			vec3 pos = ro + t*rd;
			vec3 nSphere = normalize(sphere.xyz - pos);

			float gradient = dot(nSphere, rd);
			col = textureCube(envmap1, reflectDir) * gradient;
		}

		gl_FragColor = col;
	}`,
})

const drawBackground = regl({
	vert: `
	precision mediump float;
	attribute vec2 position;
	uniform mat4 view;
	varying vec3 reflectDir;

	void main() {
		reflectDir = (view * vec4(position, 1, 0)).xyz;
		gl_Position = vec4(position, 0, 1);
	}`,
	attributes: {
		position: [
		-4, -4,
		-4, 4,
		8, 0]
	},
	depth: {
		mask: false,
		enable: false
	},
	count: 3
})
  
require('resl')({
	manifest: {
			posx: {
				type: 'image',
				src: 'assets/gamlastan/posx.jpg'
			},
			negx: {
				type: 'image',
				src: 'assets/gamlastan/negx.jpg'
			},
			posy: {
				type: 'image',
				src: 'assets/gamlastan/posy.jpg'
			},
			negy: {
				type: 'image',
				src: 'assets/gamlastan/negy.jpg'
			},
			posz: {
				type: 'image',
				src: 'assets/gamlastan/posz.jpg'
			},
			negz: {
				type: 'image',
				src: 'assets/gamlastan/negz.jpg'
			},
			posx2: {
				type: 'image',
				src: 'assets/surface2/posx.jpg'
			},
			negx2: {
				type: 'image',
				src: 'assets/surface2/negx.jpg'
			},
			posy2: {
				type: 'image',
				src: 'assets/surface2/posy.jpg'
			},
			negy2: {
				type: 'image',
				src: 'assets/surface2/negy.jpg'
			},
			posz2: {
				type: 'image',
				src: 'assets/surface2/posz.jpg'
			},
			negz2: {
				type: 'image',
				src: 'assets/surface2/negz.jpg'
			}
	},

	onDone: ({ posx, negx, posy, negy, posz, negz, posx2, negx2, posy2, negy2, posz2, negz2 }) => {
		const cube1 = regl.cube(
		posx, negx,
		posy, negy,
		posz, negz)

		const cube2 = regl.cube(
		posx2, negx2,
		posy2, negy2,
		posz2, negz2)

		regl.frame(() => {
		camera((state) => {
			// Performance boost 
			// if (!state.dirty) return;
			
			setupEnvMap({ cube1, cube2 }, () => {
				drawBackground();
			})
		})
		})
	},

	onProgress: (fraction) => {
		const intensity = 1.0 - fraction
		regl.clear({
		color: [intensity, intensity, intensity, 1]
		})
	}
})