exports.functions = [
	{
		"f": [
		`
			z = z;
		`
		],
		"text": "f(z)=z"
	},
	{
		"f": [
		`
			z = clog(z);
		`],
		"text": "f(z)=log(z)"
	},
	{
		"f": [
		`
			z = cdiv(vec2(1.0, 0.0) - z, vec2(1.0, 0.0) + z);
		`],
		"text": "f(z)=(1-z)/(1+z)"
	},
	{
		"f": [
		`
			const float max = 100.0;
			vec2 sum = vec2(0.0);
			for (float n = 1.0; n < max; n+=1.0 ) {
				sum = sum + cinv(cpow(vec2(n, 0.0), z));
			}
			z = sum;
		`,
		],
		"text": "riemann_zeta(z)"
	},
	{
		"f": [
		`
			z = cexp(cinv(z));
		`],
		"text": "f(z)=e^(1/z)"
	},
	{
		"f": [
		`
			z = cexp(z);
		`],
		"text": "f(z)=e^z"
	},
	{
		"f": [
		`
			z = cpow(z, 0.5);
		`,
		`
			z = -cpow(z, 0.5);
		`
		],
		"text": "f(z)=z^0.5"
	},
	{
		"f": [
		`
			z = cpow(z, 1.0/3.0);
		`,
		`
			vec2 polar = cpolar(z).gr;
			float r = pow(polar.r, 1.0/3.0);
			float real = cos((polar.g + 2.0*PI) /3.0);
			float imag = sin((polar.g + 2.0*PI) / 3.0);
			z = r*vec2(real, imag);
		`,
		`
			vec2 polar = cpolar(z).gr;
			float r = pow(polar.r, 1.0/3.0);
			float real = cos((polar.g + 4.0*PI) /3.0);
			float imag = sin((polar.g + 4.0*PI) / 3.0);
			z = r*vec2(real, imag);
		`,
		],
		"text": "f(z)=z^(1/3)"
	},
	{
		"f": [
		`
			z = cpow(z, 0.25);
		`,
		`
			z = cmul(vec2(0.0, 1.0), cpow(z, 0.25));
		`,
		`
			z = -cmul(vec2(0.0, 1.0), cpow(z, 0.25));
		`,
		`
			z = -cpow(z, 0.25);
		`
		],
		"text": "f(z)=z^(1/4)"
	},
	{
		"f": [
		`
			z = z + cinv(z);
		`],
		"text": "f(z)=z + 1/z"
	},
	{
		"f": [
		`
			z = csin(z);
		`],
		"text": "f(z)=sin(z)"
	},
	{
		"f": [
		`
			z = casin(z);
		`],
		"text": "f(z)=asin(z)"
	},
	{
		"f": [
		`
			z = csinh(z);
		`],
		"text": "f(z)=sinh(z)"
	},
	{
		"f": [
		`
			z = casinh(z);
		`],
		"text": "f(z)=asinh(z)"
	},
	{
		"f": [
		`
			z = ccsc(z);
		`],
		"text": "f(z)=csc(z)"
	},
	{
		"f": [
		`
			z = ccsch(z);
		`],
		"text": "f(z)=csch(z)"
	},
	{
		"f": [
		`
			z = cacsch(z);
		`],
		"text": "f(z)=acsch(z)"
	},
	{
		"f": [
		`
			z = csinh(z);
		`],
		"text": "f(z)=sinh(z)"
	},
	{
		"f": [
		`
			z = casinh(z);
		`],
		"text": "f(z)=asinh(z)"
	},
	{
		"f": [
		`
			z = ccos(z);
		`],
		"text": "f(z)=cos(z)"
	},
	{
		"f": [
		`
			z = cacos(z);
		`],
		"text": "f(z)=acos(z)"
	},
	{
		"f": [
		`
			z = ccosh(z);
		`],
		"text": "f(z)=cosh(z)"
	},
	{
		"f": [
		`
			z = cacosh(z);
		`],
		"text": "f(z)=acosh(z)"
	},
	{
		"f": [
		`
			z = csec(z);
		`],
		"text": "f(z)=sec(z)"
	},
	{
		"f": [
		`
			z = casec(z);
		`],
		"text": "f(z)=asec(z)"
	},
	{
		"f": [
		`
			z = csech(z);
		`],
		"text": "f(z)=sech(z)"
	},
	{
		"f": [
		`
			z = casech(z);
		`],
		"text": "f(z)=asech(z)"
	},
	{
		"f": [
		`
			z = ctan(z);
		`],
		"text": "f(z)=tan(z)"
	},
	{
		"f": [
		`
			z = catan(z);
		`],
		"text": "f(z)=atan(z)"
	},
	{
		"f": [
		`
			z = ctanh(z);
		`],
		"text": "f(z)=tanh(z)"
	},
	{
		"f": [
		`
			z = catanh(z);
		`],
		"text": "f(z)=atanh(z)"
	},
	{
		"f": [
		`
			z = ccot(z);
		`],
		"text": "f(z)=cot(z)"
	},
	{
		"f": [
		`
			z = cacot(z);
		`],
		"text": "f(z)=acot(z)"
	},
	{
		"f": [
		`
			z = ccoth(z);
		`],
		"text": "f(z)=coth(z)"
	},
	{
		"f": [
		`
			z = cacoth(z);
		`],
		"text": "f(z)=acoth(z)"
	},
]
//https://demonstrations.wolfram.com/DomainColoringForCommonFunctionsInComplexAnalysis/
//https://www.geogebra.org/m/K6V72GpC