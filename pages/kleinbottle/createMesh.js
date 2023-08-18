
const nj = require("numjs");

function createMesh(PARAMS) {

	// calculate du, dv, perfectly-squared
	const uInt = PARAMS.u, vInt = PARAMS.v;

	// lengths of edges
	const uL = uInt.y-uInt.x, vL = vInt.y-vInt.x;

	// uL/du * vL/dv = N
	// du = dv
	const du = Math.sqrt((uL * vL) / PARAMS.numPoints);
	const dv = du;

	// number of intervals = total lenL/(length of one interval);
	const nU = uL/du;
	const nV = vL/dv;

	// triangular fan pattern means more counting.
	// each face has three points.
	// faces * 3
	// (N * 4) * 3 ???
	const uvLen = (PARAMS.numPoints * 2 * 2) * 3;
	var uvPlane = nj.arange(uvLen);
	var cells = [];


	// must create a triangular fan pattern.
	var i = 0;
	for (var u = uInt.x; u < uInt.y && i < uvLen; u += du) {
		for (var v = vInt.x; v < vInt.y && i < uvLen; v += dv) {
			var indx = [i];
			uvPlane.set(i++, [u, v]);
			indx.push(i);
			uvPlane.set(i++, [u+du, v]);
			indx.push(i);
			uvPlane.set(i++, [u, v+dv]);
			cells.push(indx);

			indx = [i];
			uvPlane.set(i++, [u+du, v]);
			indx.push(i);
			uvPlane.set(i++, [u, v+dv]);
			indx.push(i);
			uvPlane.set(i++, [u+du, v+dv]);
			cells.push(indx);
		}
	}

	return {
		positions: uvPlane.tolist(),
		cells: cells,
	}
}

module.exports = createMesh;