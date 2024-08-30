

/**
 * DATA
 *  - data for training
 *  - data for graph generation.
 */
const LogicGates = {
    "XOR": {
        data: [
          [1, 0, 1],
          [0, 0, 0],
          [1, 1, 0],
          [0, 1, 1],
        ],
        values: {
          bias: 0,
          A: 0, // in
          B: 0,
          x: Math.random(),
          out: 0
        },
        nodes: new vis.DataSet([
            { id: "bias", label: "*bias*", font: { multi: "md" } },
            { id: "A", label: "*A*", font: { multi: "md" } },
            { id: "B", label: "*B*", font: { multi: "md" } },
            { id: "x", label: "*XOR*", font: { multi: "md" } },
            { id: "out", label: "*out*", font: { multi: "md" } },
        ]),
        edges: new vis.DataSet([
            { from: "bias", to: "x" },
            { from: "A", to: "x" },
            { from: "B", to: "x" },
            { from: "x", to: "out" },
        ]),
    },
    "AND": {
        data: [
          [1, 1, 1],
          [0, 1, 0],
          [1, 0, 0],
          [0, 0, 0]
        ],
        values: {
          bias: 0,
          A: 0,
          B: 0,
          x: Math.random(),
          out: 0
        },
        nodes: new vis.DataSet([
            { id: "bias", label: "*bias*", font: { multi: "md" } },
            { id: "A", label: "*A*", font: { multi: "md" } },
            { id: "B", label: "*B*", font: { multi: "md" } },
            { id: "x", label: "*AND*", font: { multi: "md" } },
            { id: "out", label: "*out*", font: { multi: "md" } },
        ]),
        edges: new vis.DataSet([
            { from: "bias", to: "x" },
            { from: "A", to: "x" },
            { from: "B", to: "x" },
            { from: "x", to: "out" },
        ]),
    },
    "OR": {
        data: [
          [1, 1, 1],
          [0, 1, 1],
          [1, 0, 1],
          [0, 0, 0],
        ],
        values: {
          bias: 0,
          A: 0,
          B: 0,
          x: Math.random(),
          out: 0
        },
        nodes: new vis.DataSet([
            { id: "bias", label: "*bias*", font: { multi: "md" } },
            { id: "A", label: "*A*", font: { multi: "md" } },
            { id: "B", label: "*B*", font: { multi: "md" } },
            { id: "x", label: "*OR*", font: { multi: "md" } },
            { id: "out", label: "*out*", font: { multi: "md" } },
        ]),
        edges: new vis.DataSet([
            { from: "bias", to: "x" },
            { from: "A", to: "x" },
            { from: "B", to: "x" },
            { from: "x", to: "out" },
        ]),
    },
  };

/**
 * GUI GENERATION
 */
const gui = new dat.GUI({ name: "Logic Gates with NN" });

const node = document.createElement("div");
node.style = "background: rgb(0, 0, 0); padding: 6px;"
node.innerHTML = `
<h1>Logic Gates with NN</h1>
<p>
Neural networks are capable of learning basic patterns such as OR, AND, or XOR, etc.
This makes them extremely powerful as they can learn anything a computer can logically execute.
</p>
`;

gui.domElement.prepend(node);

const PARAMS = {
  gate: "AND",
  frequency: 100,
  error: 0
};

gui.add(PARAMS, 'frequency', 10, 2000, 5).onChange((val) => {
  startProcess();
});
gui.add(PARAMS, 'gate', Object.keys(LogicGates))
  .onFinishChange((val) => {
    network.setData(LogicGates[val]);
  });
gui.add(PARAMS, 'error').listen();


// create a network
var container = document.getElementById("app");
var options = {
  layout: {
      hierarchical: {
        direction: "LR",
        sortMethod: "directed",
      },
  },
  nodes: {
      shape: "dot",
      scaling: {
        min: 10,
        max: 30,
      },
      font: {
        size: 12,
        bold: { color: "#000000" },
        face: "Tahoma",
      },
  },
  edges: {
    color: { inherit: true },
    width: 2.0,
    smooth: {
      type: "continuous",
    },
  },
};
var network = new vis.Network(container, LogicGates[PARAMS.gate], options);

// w_1 * A + w_2 * B + b = y  
// k = sigma(y)
// weights

function startProcess() {

setInterval(() => {
  var logicGate = LogicGates[PARAMS.gate];
  var sampleIndex = Math.floor(Math.random() * logicGate.data.length);

  var sample = logicGate.data[sampleIndex];

  logicGate.values.A = sample[0]
  logicGate.values.B = sample[1]

  var s = 0;

  logicGate.values.x = s;

  // sigmoid
  s = 1/(1+Math.exp(-s));

  logicGate.values.out = s;

  // backprop


  logicGate.values.out = sample[1]

  // nodes.update()
}, PARAMS.frequency)

}

startProcess();