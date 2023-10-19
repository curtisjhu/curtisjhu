
const nj = require("numjs");

function createMesh(PARAMS) {
	console.log(PARAMS)

	// calculate du, dv, perfectly-squared
	const uInt = PARAMS["domain"], vInt = PARAMS["range"];

	// lengths of edges
	const uL = uInt[1]-uInt[0], vL = vInt[1]-vInt[0];

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
	for (var u = uInt[0]; u < uInt[1] && i < uvLen; u += du) {
		for (var v = vInt[0]; v < vInt[1] && i < uvLen; v += dv) {
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