const d3 = require("../d3.min.js");

const colorList = [
  [0.2, 0.2, 0.2],
  [219/255,68/255,55/255],
  [244/255,180/255,0],
  [14/255,157/255,88/255],
  [88/255, 81/255, 216/255],
  [192/255, 53/255, 132/255],
  [255/255, 48/255, 108/255],
  [88/255, 81/255, 216/255],
  [255/255, 220/255, 128/255],
  [137/255, 211/255, 223/255],
  [99/255, 193/255, 160/255],
  [255/255, 153/255, 0],
  [66/255,133/255,244/255],
  [0, 0, 0],
  [248/255, 0, 0]
]
exports.colorList = colorList;

exports.funcs = {
	"clusters": (settings) => {
		var rng = d3.randomNormal(0, settings.std);
		var xy = [];
		var cols = [];

		for (var i = 0; i < settings.n / settings.groups; i++) {
			// not perfectly uniform in entire area.
			// Also not exactly N, but I don't care about the details.
			var x = Math.random() *2 - 1,
				y = Math.random() *2 - 1;
			for (var j = 0; j < settings.groups; j++) {

				// weird implementation.
				var l = rng();
				var ang = Math.random()*2*Math.PI;
				var nx = l * Math.cos(ang);
				var ny = l * Math.sin(ang);


				xy.push([nx + x, ny + y]);
				cols.push(colorList[0]);
			}
		}
		return { xy: xy, cols: cols };
	},
	"spiral": (settings) => {
		var R = 2*Math.PI;
		var xy = [];
		var cols = [];

		for (var i = 0; i < settings.n/2; i++) {
			var r = Math.random() * R + 2;
			var x = r*Math.cos(r)/10;
			var y = r*Math.sin(r)/10;

			var dx = Math.random() *0.1;
			var dy = Math.random() *0.1;

			xy.push([dx +x, dy+y]);
			cols.push(colorList[0]);
		}

		for (var i = 0; i < settings.n/2; i++) {
			var r = Math.random() * R + 2;
			var x = r*Math.cos(r+Math.PI)/8;
			var y = r*Math.sin(r+Math.PI)/8;

			var dx = Math.random() *0.1;
			var dy = Math.random() *0.1;

			xy.push([dx+x, dy+y]);
			cols.push(colorList[0]);
		}

		return { xy: xy, cols: cols };
	},
	"uniform": (settings) => {
		var xy = [];
		var cols = [];
		for (var i = 0; i < settings.n; i++) {
			var x = Math.random() *2 - 1,
				y = Math.random() *2 - 1;

			xy.push([x, y]);
			cols.push(colorList[0]);
		}

		return {xy: xy, cols: cols};
	},
	"circles": (settings) => {
		var xy = [];
		var cols = [];

		var smallCircleRadius = 0.2;
		for (var i = 0; i < Math.floor(settings.n * 1/4); i++) {
			var randR = Math.random() * smallCircleRadius;
			var randTheta = Math.random() * Math.PI * 2;

			var x = randR * Math.cos(randTheta);
			var y = randR * Math.sin(randTheta);

			xy.push([x, y]);
			cols.push(colorList[0]);
		}

		var bigCircleRadius = 1;
		var gap = 0.5;
		for (var i = 0; i < Math.floor(settings.n * 3/4); i++) {
			var randR = Math.random() * (bigCircleRadius - gap - smallCircleRadius) + gap;
			var randTheta = Math.random() * Math.PI * 2;

			var x = randR * Math.cos(randTheta);
			var y = randR * Math.sin(randTheta);

			xy.push([x, y]);
			cols.push(colorList[0]);
		}

		return {xy: xy, cols: cols};
	},
	"Us": (settings) => {
		var xy = [];
		var cols = [];

		// cosx
		for (var i = 0; i < 50; i++) {
			var x = Math.random() * Math.PI - Math.PI/2;
			var y = Math.cos(x) + Math.random()*0.3;

			x = x/Math.PI;

			xy.push([x, y]);
			cols.push(colorList[0]);
		}

		// sinx
		for (var i = 0; i < 50; i++) {
			var x = Math.random() * Math.PI;
			var y = -Math.sin(x) + Math.random()*0.3;

			x = x / Math.PI

			xy.push([x, y]);
			cols.push(colorList[0]);
		}

		return {xy: xy, cols: cols};
	}
}