const drawPlane = regl({
    uniforms: {
        color: [0.3, 0.3, 0.3, 0.4],
    },
    attributes: {
        position: regl.prop("domain"),
    },
    count: 6,
    vert: `
    precision mediump float;
    attribute vec3 position;
	uniform mat4 projection, view;

    void main() {
    	gl_Position = projection*view*vec4(position, 1);
    }`,
    frag: `
    precision mediump float;
	uniform vec4 color;

    void main() {
      	gl_FragColor = color;
    }`,
});

const drawAxis = regl({
    uniforms: {
        color: [0.2, 0.2, 0.2, 0.4],
    },
    attributes: {
        position: regl.prop("domain"),
    },
    count: 2,
    primitive: "line strip",
    vert: `
    precision mediump float;
    attribute vec3 position;
	uniform mat4 projection, view;

    void main() {
    	gl_Position = projection*view*vec4(position, 1);
    }`,
    frag: `
    precision mediump float;
	uniform vec4 color;

    void main() {
      	gl_FragColor = color;
    }`,
});
