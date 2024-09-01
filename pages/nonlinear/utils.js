const { PARAMS } = require("./index.js");

function f_x(x, y, z) {
	return y;
}

function f_y(x, y, z) {
	return PARAMS.mu * (1 - x*x) * y - x + PARAMS.beta * x*x*x - PARAMS.k*z;
}

function f_z(x, y, z) {
	return y - z;
}

const h = 0.05;

exports.rungeKutta4 = function(point) {
	var x = point[0];
	var y = point[1];
	var z = point[2];

	var k_1x = f_x(x, y, z);
	var k_1y = f_y(x, y, z);
	var k_1z = f_z(x, y, z);

	var k_2x = f_x(x + 0.5 * h * k_1x, y + 0.5 * h * k_1y, z + 0.5 * h * k_1z);
	var k_2y = f_y(x + 0.5 * h * k_1x, y + 0.5 * h * k_1y, z + 0.5 * h * k_1z);
	var k_2z = f_z(x + 0.5 * h * k_1x, y + 0.5 * h * k_1y, z + 0.5 * h * k_1z);

	var k_3x = f_x(x + 0.5 * h * k_2x, y + 0.5 * h * k_2y, z + 0.5 * h * k_2z);
	var k_3y = f_y(x + 0.5 * h * k_2x, y + 0.5 * h * k_2y, z + 0.5 * h * k_2z);
	var k_3z = f_z(x + 0.5 * h * k_2x, y + 0.5 * h * k_2y, z + 0.5 * h * k_2z);

	var k_4x = f_x(x + h * k_3x, y + h * k_3y, z + h * k_3z);
	var k_4y = f_y(x + h * k_3x, y + h * k_3y, z + h * k_3z);
	var k_4z = f_z(x + h * k_3x, y + h * k_3y, z + h * k_3z);

	x = x + (h/6) * (k_1x + 2*k_2x + 2*k_3x + k_4x);
	y = y + (h/6) * (k_1y + 2*k_2y + 2*k_3y + k_4y);
	z = z + (h/6) * (k_1z + 2*k_2z + 2*k_3z + k_4z);

	return [x, y, z]
}