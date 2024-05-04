#ifdef GL_ES
precision mediump float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float propRatio;
uniform vec2 resolution;
uniform int kernel;
uniform vec2 mouse;


// THE FOLLOWING IS MODIFIED FROM WIkIPEDIA
// https://en.wikipedia.org/wiki/Kernel_(image_processing)

#define identity mat3(0, 0, 0, 0, 1, 0, 0, 0, 0)
#define edge0 mat3(1, 0, -1, 0, 0, 0, -1, 0, 1)
#define edge1 mat3(0, 1, 0, 1, -4, 1, 0, 1, 0)
#define edge2 mat3(-1, -1, -1, -1, 8, -1, -1, -1, -1)
#define sharpen mat3(0, -1, 0, -1, 5, -1, 0, -1, 0)
#define box_blur mat3(1, 1, 1, 1, 1, 1, 1, 1, 1) * 0.1111
#define gaussian_blur mat3(1, 2, 1, 2, 4, 2, 1, 2, 1) * 0.0625
#define emboss mat3(-2, -1, 0, -1, 1, 1, 0, 1, 2)
#define sobel_x mat3(-1, 0, 1, -2, 0, 2, -1, 0, 1)
#define sobel_y mat3(-1, -2, -1, 0, 0, 0, 1, 2, 1)
#define prewitt_x mat3(-1, 0, 1, -1, 0, 1, -1, 0, 1)
#define prewitt_y mat3(-1, -1, -1, 0, 0, 0, 1, 1, 1)

// Extract region of dimension 3x3 from sampler centered in uv
// sampler : texture sampler
// uv : current coordinates on sampler
// return : an array of mat3, each index corresponding with a color channel
mat3 region3x3(sampler2D sampler, vec2 uv, int channel)
{
	mat3 region;
	for (int i = -1; i <= 1; i++)
	for (int j = -1; j <= 1; j++) {
		vec4 c =  texture2D( sampler, uv + vec2(float(i), float(j) ) / resolution.xy );

		if (channel == 0)
			region[i+1][j+1] = c.r; 
		else if (channel == 1)
			region[i+1][j+1] = c.b; 
		else
			region[i+1][j+1] = c.g;
	}

    return region;
}

mat3 convolve(mat3 kernel, sampler2D sampler, vec2 uv, int channel) {
	mat3 region = region3x3(sampler, uv, channel);
	
	// component wise multiplication
	mat3 c = matrixCompMult(kernel, region);

	return c;
}

// Convolve a texture with kernel
// kernel : kernel used for convolution
// sampler : texture sampler
// uv : current coordinates on sampler
vec3 convolution(mat3 kernel, sampler2D sampler, vec2 uv)
{
    vec3 fragment;
    
	for (int i = 0; i < 3; i++) {
		mat3 c = convolve(kernel, sampler, uv, i);

		// add each component of matrix
		float result = float(c[0][0] + c[1][0] + c[2][0]
				+ c[0][1] + c[1][1] + c[2][1]
				+ c[0][2] + c[1][2] + c[2][2]);
			
		// for fragment at channel i, set result
		fragment[i] = result;
	}
    
    return fragment;    
}

// https://en.wikipedia.org/wiki/Prewitt_operator
vec3 gradMagnitude(mat3 kernel1, mat3 kernel2, sampler2D sampler, vec2 uv) {
	vec3 G_x = convolution(kernel1, sampler, uv);
	vec3 G_y = convolution(kernel2, sampler, uv);

	vec3 G = sqrt(G_x*G_x + G_y*G_y);
	return G;
}

float max(mat3 m) {
	// messy but will do the trick
	float r1 = max(max(m[0].r, m[0].b), m[0].g);
	float r2 = max(max(m[1].r, m[1].b), m[1].g);
	float r3 = max(max(m[2].r, m[2].b), m[2].g);
	return max(r1, max(r2, r3));
}


void main() {
  vec2 uv = vTexCoord;
  vec2 ms = uv / mouse;
  uv.y = uv.y * propRatio;
  
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  vec3 col = vec3(0.0);
  mat3 m = identity;
  if (kernel == 0) {
  	col = convolution(identity, tex0, uv);
	m = identity;
  }
  else if (kernel == 1) {
  	col = convolution(edge0, tex0, uv);
	m = edge0;
  }
  else if (kernel == 2) {
  	col = convolution(edge1, tex0, uv);
	m = edge1;
  }
  else if (kernel == 3) {
  	col = convolution(edge2, tex0, uv);
	m = edge2;
  }
  else if (kernel == 4) {
  	col = convolution(sharpen, tex0, uv);
	m = sharpen;
  }
  else if (kernel == 5) {
  	col = convolution(box_blur, tex0, uv);
	m = box_blur;
  }
  else if (kernel == 6) {
  	col = convolution(gaussian_blur, tex0, uv);
	m = gaussian_blur;
  }
  else if (kernel == 7) {
  	col = convolution(emboss, tex0, uv);
	m = emboss;
  }
  else if (kernel == 8) {
  	col = gradMagnitude(sobel_x, sobel_y, tex0, uv);
	m = sobel_x;
  }
  else if (kernel == 9) {
  	col = gradMagnitude(prewitt_x, prewitt_y, tex0, uv);
	m = prewitt_x;
  }
  else
  	col = convolution(identity, tex0, uv);

  float size = 0.05, padding = 0.01;
  vec2 offset = vec2(0.0, 1.0 - 3.*(size + padding));
  uv -= offset;
  float maxScale = max(m);

for (int i = 0; i < 3; i++)
for (int j = 0; j < 3; j++)
  if ( float(i)*size + padding < uv.x && uv.x < float(i+1)*size &&
		float(j)*size + padding < uv.y && uv.y < float(j+1)*size ) {
		col = mix(vec3(1.0), vec3(0.), m[i][j]/maxScale);
		col = mix(col, vec3(0., 0., 1.0), -m[i][j]/maxScale);
  }

  gl_FragColor = vec4(col, 1.0);
}