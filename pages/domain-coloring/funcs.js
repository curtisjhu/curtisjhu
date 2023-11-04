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
		"f":
		`
			const float max = 100.0;
			vec2 sum = vec2(0.0);
			for (float n = 1.0; n < max; n+=1.0 ) {
				sum = sum + cinv(cpow(vec2(n, 0.0), z));
			}
			z = sum;
		`,
		"text": "riemann_zeta(z)"
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
			return cpow(z, 0.5);
		`,
		"text": "f(z)=z^0.5"
	},
	{
		"f": `
			return cpow(z, 2.0);
		`,
		"text": "f(z)=z^2"
	},
	{
		"f": `
			return cpow(z, z);
		`,
		"text": "f(z)=z^z"
	},
	{
		"f": `
			return csqrt(z);
		`,
		"text": "f(z)=sqrt(z)"
	},
	{
		"f": `
			return z + cinv(z);
		`,
		"text": "f(z)=z+1/z"
	},
	{
		"f": `
			return clog(z);
		`,
		"text": "f(z)=log(z)"
	},
	{
		"f": `
			return cdiv(z-1.0, z+1.0);
		`,
		"text": "f(z)=(z-1)/(z+1)"
	},
	{
		"f": `
			return cexp(z);
		`,
		"text": "f(z)=exp(z)"
	},
	{
		"f": `
			return cexp(cinv(z));
		`,
		"text": "f(z)=exp(1/z)"
	},
	{
		"f": `
			return csin(z);
		`,
		"text": "f(z)=sin(z)"
	},
	{
		"f": `
			return ccos(z);
		`,
		"text": "f(z)=cos(z)"
	},
	{
		"f": `
			return ctan(z);
		`,
		"text": "f(z)=tan(z)"
	},
	{
		"f": `
			return ccsc(z);
		`,
		"text": "f(z)=csc(z)"
	},
	{
		"f": `
			return csec(z);
		`,
		"text": "f(z)=sec(z)"
	},
	{
		"f": `
			return ccot(z);
		`,
		"text": "f(z)=cot(z)"
	},
	{
		"f": `
			return casin(z);
		`,
		"text": "f(z)=asin(z)"
	},
	{
		"f": `
			return cacos(z);
		`,
		"text": "f(z)=acos(z)"
	},
	{
		"f": `
			return catan(z);
		`,
		"text": "f(z)=atan(z)"
	},
	{
		"f": `
			return csinh(z);
		`,
		"text": "f(z)=sinh(z)"
	},
	{
		"f": `
			return ccosh(z);
		`,
		"text": "f(z)=cosh(z)"
	},
	{
		"f": `
			return ctanh(z);
		`,
		"text": "f(z)=tanh(z)"
	},
	{
		"f": `
			return casinh(z);
		`,
		"text": "f(z)=asinh(z)"
	},
	{
		"f": `
			return cacosh(z);
		`,
		"text": "f(z)=acosh(z)"
	},
	{
		"f": `
			return catanh(z);
		`,
		"text": "f(z)=atanh(z)"
	},
]