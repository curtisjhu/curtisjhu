const { mathBox } = require("mathbox");




const options = {
  element: document.body,
  plugins: ['core', 'controls', 'cursor', 'mathbox'],
  controls: {
    klass: mathBox.three.OrbitControls
  },
};

const mathbox = MathBox.mathBox(options);

if (mathbox.fallback) throw "WebGL not supported"

mathbox.three.camera.position.set(1, 1, 2);
mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0);


