exports.functions = [
	{
		"f": `
			vec2 fz = vec2(1.0, 0.0);
			vec2 a0 = cexp(vec2(0.375, -0.125 * t));
			fz = cmul(fz, z - cexp(vec2(0.0, t)));
			fz = cdiv(fz, z - cexp(vec2(0.5, 0.5 * t)));
			fz = cmul(fz, z - cexp(vec2(0.125, -0.625 * t)));
			fz = cdiv(fz, z - cexp(vec2(0.25, -0.25 * t)));
			fz = cmul(fz, csqr(z - a0));
			return fz;
		`,
		"text": "dynamic"
	},
	{
		"f": `
			return z;
		`,
		"text": "f(z)=z"
	},
	{
		"f": `
			z /= 16.0;
			return csin(cinv(z));
		`,
		"text": "f(z)=sin(1/z)"
	},
	{
		"f": `
			return cpow(z, 2.0);
		`,
		"text": "f(z)=z^2"
	},
	{
		"f": `
			return cpow(z, 3.0);
		`,
		"text": "f(z)=z^3"
	},
	{
		"f": `
			return cdiv(cmul(csqr(z) - vec2(1, 0), csqr(z - vec2(2, 1))), csqr(z) + vec2(2, 2));
		`,
		"text": "f(z)=..."
	},
	{
		"f": `
			return z + cinv(z);
		`,
		"text": "f(z)=z.1/z"
	}
]