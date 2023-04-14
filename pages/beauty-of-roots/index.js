const regl = require("regl")({
    extensions: ["OES_texture_float", "oes_standard_derivatives"],
    onDone: (err, regl) => {
        if (err) return require("fail-nicely")(err);
        document
            .querySelector("canvas")
            .addEventListener("mousewheel", (e) => e.preventDefault());
        run(regl);
    },
});

function run(regl) {
    const findRoots = require("./roots");
    const glslify = require("glslify");
    var settings = {
        batchSize: 100,
        degree: 4,
        realRange: 2,
        imagRange: 4,
        useSymmetry: false,
        gaussianRandom: true,
        x0: 0,
        y0: 0,
        zoom: 2,
        colormap: "cdom",
    };
    settings.n = settings.degree + 1;

    function randn() {
        // The Marsaglia Polar method
        var s;
        var u;
        var v;
        var norm;
        var mean = 0;
        var dev = 1;

        do {
            // U and V are from the uniform distribution on (-1, 1)
            u = Math.random() * 2 - 1;
            v = Math.random() * 2 - 1;

            s = u * u + v * v;
        } while (s >= 1);

        // Compute the standard normal variate
        norm = u * Math.sqrt((-2 * Math.log(s)) / s);

        // Shape and scale
        return dev * norm + mean;
    }

    function clear() {
        fbo.use(() => {
            regl.clear({ color: [0, 0, 0, 1] });
        })
        batchCnt = 0;
    }

    var buf = new Float32Array(settings.n * 2 * settings.batchSize);
    var points = regl.buffer(buf);
    var coeffs = [[], []];

    function compute() {
        for (var j = 0; j < settings.batchSize; j++) {
            if (settings.gaussianRandom) {
                for (var i = 1; i < settings.n; i++) {
                    coeffs[0][i] = settings.realRange
                        ? Math.round(randn() * settings.realRange)
                        : 0;
                    coeffs[1][i] = settings.imagRange
                        ? Math.round(randn() * settings.imagRange)
                        : 0;
                }
            } else {
                for (var i = 1; i < settings.n; i++) {
                    coeffs[0][i] = settings.realRange
                        ? Math.floor(
                              Math.random() * (settings.realRange * 2 + 1)
                          ) - settings.realRange
                        : 0;
                    coeffs[1][i] = settings.imagRange
                        ? Math.floor(
                              Math.random() * (settings.imagRange * 2 + 1)
                          ) - settings.imagRange
                        : 0;
                }
            }
            coeffs[0][0] = 1;
            coeffs[1][0] = 0;
            var zeros = findRoots(coeffs[0], coeffs[1]);
            for (var i = 0; i < settings.n; i++) {
                buf[j * settings.n * 2 + 2 * i] = zeros[0][i];
                buf[j * settings.n * 2 + 2 * i + 1] = zeros[1][i];
            }
        }
        points(buf);
        batchCnt +=
            (settings.useSymmetry ? 4 : 1) * (settings.batchSize * settings.n);
    }

    const dat = require("dat.gui");
    const gui = new dat.GUI({
        name: "Beauty of Roots",
        autoPlace: true,
    });

    gui.add(settings, "degree", 1, 5, 1).onFinishChange((val) => {
        clear();
        buf = new Float32Array(settings.n * 2 * settings.batchSize);
        coeffs = [[], []];
        settings.n = settings.degree + 1;
    });
    gui.add(settings, "batchSize", 100, 1000, 10).onFinishChange((val) => {
        buf = new Float32Array(settings.n * 2 * settings.batchSize);
        coeffs = [[], []];
    });

    var fbo = regl.framebuffer({
        width: regl._gl.canvas.width,
        height: regl._gl.canvas.height,
        depth: false,
        colorType: "float",
    });

    var byColormap = {
        cdom: glslify(`
      precision mediump float;
      #pragma glslify: colormap = require(glsl-colormap/cdom)
      uniform sampler2D src;
      uniform float alf, alpha, gamma;
      varying vec2 uv;
      void main () {
        float dens = texture2D(src, uv).x;
        float r = length(dens);
        float intens = max(0.0, min(1.0, dens / r * alpha * pow(r * alf, gamma)));
        vec4 color = colormap(intens);
        gl_FragColor = vec4(color.xyz * color.w, 1);
      }
    `),
    };

    const drawToScreen = regl({
        vert: `
      precision mediump float;
      attribute vec2 xy;
      varying vec2 uv;
      void main () {
        uv = 0.5 * (1.0 + xy);
        gl_Position = vec4(xy, 0, 1);
      }
    `,
        frag: (ctx, props) => byColormap[settings.colormap],
        attributes: {
            xy: [
                [-4, -4],
                [0, 4],
                [4, -4],
            ],
        },
        uniforms: {
            src: fbo,
            alf: (ctx, props) =>
                props.alf /
                Math.pow(ctx.framebufferWidth * ctx.framebufferHeight, 0.25),
        },
        depth: { enable: false },
        count: 3,
    });

    const drawPoints = regl({
        vert: `
      precision mediump float;
      attribute vec2 xy;
      uniform vec2 ar, scale;
      uniform float x0, y0, zoom;
      void main () {
        gl_Position = vec4((xy * scale - vec2(x0, y0)) * zoom * ar * 0.5, 0.0, 1.0);
        gl_PointSize = 1.0;
      }
    `,
        frag: `
      precision mediump float;
      void main () {
        gl_FragColor = vec4(vec3(1.0), 0.5);
      }
    `,
        uniforms: { scale: regl.prop("scale") },
        depth: { enable: true },
        blend: {
            enable: true,
            func: { srcRGB: "src alpha", srcAlpha: 1, dstRGB: 1, dstAlpha: 1 },
            equation: { rgb: "add", alpha: "add" },
        },
        attributes: { xy: points },
        primitive: "points",
        count: () => settings.n * settings.batchSize,
    });

    var setParams = regl({
        uniforms: {
            ar: (ctx) => [ctx.framebufferHeight / ctx.framebufferWidth, 1.0],
            alpha: (ctx, props) =>
                (props.alpha *
                    Math.pow(Math.exp(props.zoom), 1.5) *
                    ctx.framebufferWidth *
                    ctx.framebufferHeight) /
                1000 /
                1000,
            gamma: (ctx, props) => 1.0 / props.gamma,
            x0: regl.prop("x0"),
            y0: regl.prop("y0"),
            gridAlpha: regl.prop("grid"),
            zoom: (ctx, props) => Math.exp(props.zoom),
        },
    });

    var single = [{ scale: [1, 1] }];
    var reflected = [
        { scale: [1, 1] },
        { scale: [-1, 1] },
        { scale: [1, -1] },
        { scale: [-1, -1] },
    ];

    var batchCnt = 0;
    clear();

    const loop = regl.frame(({ time }) => {
        compute();
        setParams(settings, () => {
            fbo.use(() => {
                drawPoints(settings.useSymmetry ? reflected : single);
            });
            drawToScreen({ alf: 1e3 / batchCnt });
        });
    });
}
