const findRoots = require("./roots");

var coeffs;

function getPoints(buf, params) {
    coeffs = [[], []];
    for (var j = 0; j < params.batchSize; j++) {
        if (params.gaussianRandom) {
            for (var i = 1; i < params.n; i++) {
                coeffs[0][i] = params.realRange
                    ? Math.round(randn() * params.realRange)
                    : 0;
                coeffs[1][i] = params.imagRange
                    ? Math.round(randn() * params.imagRange)
                    : 0;
            }
        } else {
            for (var i = 1; i < params.n; i++) {
                coeffs[0][i] = params.realRange
                    ? Math.floor(Math.random() * (params.realRange * 2 + 1)) -
                      params.realRange
                    : 0;
                coeffs[1][i] = params.imagRange
                    ? Math.floor(Math.random() * (params.imagRange * 2 + 1)) -
                      params.imagRange
                    : 0;
            }
        }
        coeffs[0][0] = 1;
        coeffs[1][0] = 0;
        var zeros = findRoots(coeffs[0], coeffs[1]);
        for (var i = 0; i < params.n; i++) {
            buf[j * params.n * 2 + 2 * i] = zeros[0][i];
            buf[j * params.n * 2 + 2 * i + 1] = zeros[1][i];
        }
    }
}

module.exports = getPoints;
