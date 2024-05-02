exports.utils = `

float rand (in vec2 st) {
	return fract(sin(dot(st.xy,
						vec2(12.9898 + SEED, 78.233 + SEED)))
				* 43758.5453123 * SEED);
}

float rand (in float x) {
	return fract(sin(x * SEED)
				* 43758.5453123);
}

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


float fbm( vec2 p )
{
	float res = 0.0;
	float a = 1.;
	float f = 11.0;
	float aTot = 0.0;

	mat2 m = mat2( rand(SEED), rand(SEED + 100.),
                    rand(SEED + 200.),  rand(SEED + 300.) );
	for (int i = 0; i < 10; i++) {
		res += a * noise(f*p);
		aTot += a;
		a *= 0.5;
		f *= 1.2;
		p = m*p;
	}
	return res / aTot;
}
`;