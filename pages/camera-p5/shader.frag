#ifdef GL_ES
precision mediump float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float propRatio;
uniform vec2 resolution ;

void main() {
  vec2 uv = vTexCoord;
  uv.y = uv.y * propRatio;
  
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  vec4 col = texture2D(tex0, uv);

  gl_FragColor = vec4(col.rgb, 1.0);
}