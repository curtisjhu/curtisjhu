const regl = require("regl")();
const camera = require("regl-camera")(regl);


regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw();
});

