exports.funcs = {
	"eggwave": {
		"name": "eggwave",
		"function": `
			// float z = exp(-(x*x + y*y) * 0.8*(sin(150.0*x) + cos(150.0*y)));
			float z = 8.0*exp(-(x*x + y*y)/40.0) * 1.0 * (cos(150.0 *x) + cos(150.0*y));
			amplitude = 8.0;
		`,
		"domain": [ -10, 10 ],
		"range": [ -10, 10 ],
		"numPoints": 1000
	},
	"eggholder": {
		"name": "eggholder",
		"function": `
			float z = -(y+47.0) * sin(sqrt(abs(y + 0.5*x + 47.0))) - x * sin(sqrt(abs(x - (y-47.0))));
			z = z/500.0;
			x = x/206.0;
			y = y/206.0;
		`,
		"domain": [ -512, 512 ],
		"range": [ -512, 512 ],
		"numPoints": 1000
	},
	"bukin": {
		"name": "bukin",
		"function": `
			float z = 100.0 * sqrt(abs(y - 0.01 * x*x)) + 0.01 * abs(x + 10.0);
			amplitude = 200.0;
			z = z / 30.0;
		`,
		"domain": [ -15, -5 ],
		"range": [ -3, 3 ],
		"numPoints": 1000
	},
	"ackley": {
		"name": "ackley",
		"function": `
			float temp1 = pow(E, -0.2*sqrt(0.5*(x*x + y*y)) );
			float temp2 = pow( E, 0.5*(cos(2.0*PI*x) + cos(2.0*PI*y)) );
			float z = -20.0*temp1 - temp2 + E + 20.0;
			amplitude = 25.0;
		`,
		"domain": [ -10, 10 ],
		"range": [ -10, 10 ],
		"numPoints": 7000,
	},
	"rastrigin": {
		"name": "rastrigin",
		"function": `
			float z = 0.1*(x*x - 10.0 * cos(2.0 * PI * x)) + 0.1*(y*y - 10.0 * cos(2.0*PI*y));
			amplitude = 8.0;
		`,
		"domain": [ -10, 10 ],
		"range": [ -10, 10 ],
		"numPoints": 7000,
	},
}