import { Pane } from "tweakpane";

function GUI(functions, window, settings) {
    // GUI controls

    var gui = new Pane().addFolder({ title: "3D Grapher"});

	gui.addInput(functions, "x")
	gui.addInput(functions, "y")
	gui.addInput(functions, "z")

    // var xFuncGUI = gui.add(this, "xFunctionText").name("x = f(t) = ");
    // var yFuncGUI = gui.add(this, "yFunctionText").name("y = g(t) = ");
    // var zFuncGUI = gui.add(this, "zFunctionText").name("z = h(t) = ");

    // var folderP = gui.addFolder("Preset Equations");
    // folderP.open();

    // var presetFunc1 = function () {
    //     xFuncGUI.setValue("cos(t)");
    //     yFuncGUI.setValue("sin(t)");
    //     zFuncGUI.setValue("t / 4");
    //     tMinGUI.setValue(-6);
    //     tMaxGUI.setValue(6);
    //     updateGraph();
    // };
    // var preset1GUI = folderP.add(this, "presetFunc1").name("Helix");

    // var presetFunc2 = function () {
    //     xFuncGUI.setValue("t^3 - 3*t");
    //     yFuncGUI.setValue("t^4 - 4*t^2");
    //     zFuncGUI.setValue("(t^5 - 10*t)/5");
    //     tMinGUI.setValue(-2.1);
    //     tMaxGUI.setValue(2.1);
    //     updateGraph();
    // };
    // var preset2GUI = folderP
    //     .add(this, "presetFunc2")
    //     .name("Trefoil&nbsp;Knot&nbsp;(Poly)");

    // var presetFunc3 = function () {
    //     xFuncGUI.setValue("cos(2*t) * (2 + cos(5*t))");
    //     yFuncGUI.setValue("sin(2*t) * (2 + cos(5*t))");
    //     zFuncGUI.setValue("sin(5*t)");
    //     tMinGUI.setValue(0);
    //     tMaxGUI.setValue(6.282);
    //     updateGraph();
    // };
    // var preset3GUI = folderP
    //     .add(this, "presetFunc3")
    //     .name("Trefoil&nbsp;Knot&nbsp;(Torus)");

    // var folder0 = gui.addFolder("Parameters");
    // var aGUI = folder0.add(this, "a").min(0).max(5).step(0.01).name("a = ");
    // var bGUI = folder0.add(this, "b").min(0).max(5).step(0.01).name("b = ");
    // folder0.open();

    // var folder2 = gui.addFolder("Parameter (T) Range");
    // var tMinGUI = folder2.add(this, "tMin").onChange(updateGraphFunc);
    // var tMaxGUI = folder2.add(this, "tMax").onChange(updateGraphFunc);
    // folder2.open();

    // var folder1 = gui.addFolder("Window (X,Y,Z) Range");
    // var xMinGUI = folder1.add(this, "xMin").name("x Min");
    // var xMaxGUI = folder1.add(this, "xMax").name("x Max");
    // var zMinGUI = folder1.add(this, "zMin").name("y Min");
    // var zMaxGUI = folder1.add(this, "zMax").name("y Max");
    // var yMinGUI = folder1.add(this, "yMin").name("z Min");
    // var yMaxGUI = folder1.add(this, "yMax").name("z Max");
    // folder1.close();

    // var folderA = gui.addFolder("Appearance");

    // folderA
    //     .add(this, "tubeRadius")
    //     .min(0.01)
    //     .max(0.51)
    //     .step(0.01)
    //     .name("Tube Radius");

    // var graphColorStyle = "Rainbow Along T";
    // var graphColorStyleList = ["Solid Blue", "Rainbow Along T"];
    // var graphColorGUI = folderA
    //     .add(this, "graphColorStyle", graphColorStyleList)
    //     .name("Graph style")
    //     .onChange(updateGraphFunc);

    // folderA.open();

    // gui.add(this, "updateGraph").name("Update Graph");

    // gui.open();
}

export default GUI;
