function butterfly(t) {
	return {
		x: Math.sin(t)*(Math.exp(Math.cos(t)) - 2*Math.cos(4*t)-Math.pow(Math.sin(t/12), 5)),
		y: Math.cos(t)*(Math.exp(Math.cos(t)) - 2*Math.cos(4*t) - Math.pow(Math.sin(t/12), 5)),
		z: 0,
		color: [0, 0.7, 0],
		interval: [0, 12*Math.PI]
	};
}

function astroid(t) {
	const a = 2;
	return {
		x: a*Math.pow(Math.cos(t), 3),
		y: a*Math.pow(Math.sin(t), 3),
		z: 0,
		color: [0.5, 0, 0, 1]
	}
}

function cardioid(t) {
	const a = 2;
	return {
		x: a*(2*Math.cos(t) - Math.cos(2*t)),
		y: a*(2*Math.sin(t) - Math.sin(2*t)),
		z: 0,
		color: [0.5, 0, 0, 1]
	}
}

function catenary(t) {
	// cosh
	// models a string supported by at two points
	return {
		x: t,
		y: (Math.exp(t)+Math.exp(-t))/2,
		z: 0,
		color: [0.5, 0, 0, 1],
	}
}

function foliumOfDescartes(t) {
	const a = 1;
	return {
		x: 3*a*t/(1+t*t*t),
		y: 3*a*t*t/(1+t*t*t),
		z: 0,
		color: [0.5, 0, 0, 1],
	}
}

function lissajous(t) {
	const a = 3, n = 10, c = 1, b = 2;
	return {
		x: a*Math.sin(n*t + c),
		y: b*Math.sin(t),
		z: 0,
		color: [0.5, 0, 0, 1],
	}
}

function involuteCircle(t) {
	const a = 3;
	return {
		x: a*(Math.cos(t) + t * Math.sin(t)),
		y: a*(Math.sin(t) - t * Math.cos(t)),
		z: 0,
		color: [0.5, 0, 0, 1],
	}
}

function hypocycloid(t) {
	const a = 5, b = 3;
	return {
		x: (a-b)*Math.cos(t) + b*Math.cos((a/b-1)*t),
		y: (a-b)*Math.sin(t) - b*Math.sin((a/b-1)*t),
		z: 0,
		color: [0.5, 0, 0, 1],
	}
}

function hypotrochoid(t) {
	const a =10, b =6, c=1;
	return {
		x: (a-b)*Math.cos(t) + c*Math.cos((a/b-1)*t),
		y: (a-b)*Math.sin(t) - c*Math.sin((a/b-1)*t),
		z: 0,
		color: [0.5, 0, 0, 1],
	}
}

function brachistochrone(t) {
	// theta = sqrt(g/R)*t
	const r = 3;
	const theta = t;
	return {
		x: r*(theta - Math.sin(theta)),
		y: -r*(1 - Math.cos(theta)),
		z: 0,
		color: [0, 0.3, 0],
	}
}

function tractrix(t) {
	return {
		x: 1/Math.cosh(t),
		y: t - Math.tanh(t),
		z: 0,
		color: [0, 0.3, 0],
	}
}

function tricuspoid(t) {
	const a = 2;
	return {
		x: a*(2*Math.cos(t) + Math.cos(2*t)),
		y: a*(2*Math.sin(t) - Math.sin(2*t)),
		z: 0,
		color: [0, 0.3, 0],
	}
}

function witchOfAgnesi(t) {
	const a = 2;
	return {
		x: a*t,
		y: a/(1+t*t),
		z: 0,
		color: [0, 0.3, 0],
	}
}

module.exports = {
	"butterfly":  {
		f: butterfly,
		interval: { x: 0, y: 12*Math.PI }
	},
	"brachistochrone": {
		f: brachistochrone,
		interval: { x: 0, y: 4*Math.PI/3 }
	},
	"astroid": {
		f: astroid,
		interval: { x: 0, y: 2*Math.PI }
	},
	"cardioid": {
		f: cardioid,
		interval: { x: 0, y: 2*Math.PI }
	},
	"catenary": {
		f: catenary,
		interval: { x: -3, y: 3 }
	},
	"lissajous": {
		f: lissajous,
		interval: { x: 0, y: 2*Math.PI }
	},
	"involuteCircle": {
		f: involuteCircle,
		interval: { x: 0, y: 2*Math.PI }
	},
	"hypocycloid": {
		f: hypocycloid,
		interval: { x: 0, y: 8*Math.PI }
	},
	"tractrix": {
		f: tractrix,
		interval: { x: -5, y: 5 }
	},
	"tricuspoid": {
		f: tricuspoid,
		interval: { x: 0, y: 2*Math.PI }
	}, 
	"witchOfAgnesi": {
		f: witchOfAgnesi,
		interval: { x: -10, y: 10 }
	}
}