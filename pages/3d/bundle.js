(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // pages/3d/main.js
  var require_main = __commonJS({
    "pages/3d/main.js"() {
      var options = {
        element: document.body,
        plugins: ["core", "controls", "cursor", "mathbox"],
        controls: {
          klass: THREE.OrbitControls
        }
      };
      var mathbox = MathBox.mathBox(options);
      if (mathbox.fallback)
        throw "WebGL not supported";
      mathbox.three.camera.position.set(1, 1, 2);
      mathbox.three.renderer.setClearColor(new Color(16777215), 1);
    }
  });
  require_main();
})();
