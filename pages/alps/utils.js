export const utils = `

#define PI 3.14159256
#define E 2.71828182

float noise(in vec2 pos) {
	vec2 i = floor(pos);
	vec2 f = fract(pos);

	float a = rand(i);
	float b = rand(i + vec2(1.0, 0.0));
	float c = rand(i + vec2(0.0, 1.0));
	float d = rand(i + vec2(1.0, 1.0));

	vec2 u = smoothstep(0.,1.,f);

	return mix(a, b, u.x) +
		(c - a)* u.y * (1.0 - u.x) +
		(d - b) * u.x * u.y;
}

float fbm(in vec2 pos) {
	float value = noise(pos);
	float amplitude = 0.2;
	float frequency = 1.0;
	float angle = 10.0;
	mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

	const int octaves = 8;

	// analogous to fourier series
	for (int i = 0; i < octaves; i++) {
	 	pos = pos * rotationMatrix;

		value += amplitude * noise(frequency * pos);
		frequency *= 2.0;
		amplitude *= 0.6;
	}

	return value;
}


`;