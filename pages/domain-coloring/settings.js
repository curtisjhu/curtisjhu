export const funcs = {
    functions: `
    uniform float n;
    vec2 f (vec2 z) {
      return cpow(z, n);
    }
    `,
    bob: `
    vec2 f (vec2 z) {
      return z;
    }
    `,
    coma: `
  uniform float t;
  vec2 f (vec2 z) {
    vec2 fz = C_ONE;
    vec2 a0 = cexp(vec2(0.375, -0.125 * t));
    fz = cmul(fz, z - cexp(vec2(0.0, t)));
    fz = cdiv(fz, z - cexp(vec2(0.5, 0.5 * t)));
    fz = cmul(fz, z - cexp(vec2(0.125, -0.625 * t)));
    fz = cdiv(fz, z - cexp(vec2(0.25, -0.25 * t)));
    fz = cmul(fz, csqr(z - a0));
    return fz;
  }
  `,
  boba: `
  vec2 f (vec2 z) {
    z /= 16.0;
    return csin(cinv(z));
  }
  `
};

export var domainColoringParameters = {
  rootDarkening: 0.85,
  poleLightening: 0.85,
  rectangularGridOpacity: 0.5,
  polarGridOpacity: 0.7,
  rootDarkeningSharpness: 1,
  poleLighteningSharpness: 30
}

export var glsl = {
  extensions: [
    "\n    #extension GL_OES_standard_derivatives : enable\n  ",
  ],
  constants: "\n    #define PI 3.141592653589793238\n    #define H….0, 1.0))\n    #define TO_RADIANS 0.01745329251\n  ",
  precision: "\n    precision highp float;\n  ",
  domainColoring: "\n    vec3 domainColoring (\n      vec2 z,\n      vec…h)\n        ),\n        polarGrid\n      );\n    }\n  ",
  hsv2rgb: "\n    vec3 hsv2rgb(vec3 c) {\n      vec4 K = vec4(1.…K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n    }\n  ",
  hypot: "\n    float hypot (vec2 z) {\n      float t;\n      f…/ x;\n      return x * sqrt(1.0 + t * t);\n    }\n  ",
  complex: "\n    float cosh (float x) {\n      return 0.5 * (ex…;\n      return cdiv(ez - emz, ez + emz);\n    }\n  ",
  cubeHelix: "\n    // https://github.com/d3/d3-color\n    vec3 cu…* ts,\n        (0.8 - 0.9 * ts)\n      ));\n    }\n  ",
  wireframe: "\n    // https://github.com/rreusser/glsl-solid-wir…n min(min(min(a4.x, a4.y), a4.z), a4.z);\n    }\n  "
}