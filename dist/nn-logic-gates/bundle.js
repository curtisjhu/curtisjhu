import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.0/dist/tweakpane.min.js";

const pane = new Pane({
    title: "Logic Gates using Perceptrons",
});
const PARAMS = {
  gate: 1,
  learningSpeed: 1
};

pane.addBinding(PARAMS, 'gate', {
  options: {
    "AND": 1,
    "OR": 2,
    "NOT": 0,
  },
}).on("change", (ev) => {
  network.setData(LogicGates[ev.value]);
})

const LogicData = {
  "AND": [
    [1, 1, 1],
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
  ],
  "OR": [
    [1, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
    [0, 0, 0],
  ],
  "NOT": [
    [1, 0],
    [0, 1]
  ]
}

const LogicGates = [
    {
        nodes: new vis.DataSet([
            { id: "b", label: "b" },
            { id: "in", label: "in" },
            { id: "x", label: "NOT" },
            { id: "out", label: "out" },
        ]),
        edges: new vis.DataSet([
            { from: "b", to: "x", arrows: { from: { enabled: true, type: "inv_triangle"}} },
            { from: "in", to: "x", arrows: { from: { enabled: true, type: "inv_triangle"}}, label: "w" },
            { from: "x", to: "out", arrows: { from: { enabled: true, type: "inv_triangle"}} },
        ]),
    },
    {
        nodes: new vis.DataSet([
            { id: "b", label: "b" },
            { id: "A", label: "A" },
            { id: "B", label: "B" },
            { id: "x", label: "AND" },
            { id: "out", label: "out" },
        ]),
        edges: new vis.DataSet([
            { from: "b", to: "x", arrows: { from: { enabled: true, type: "inv_triangle"}} },
            { from: "A", to: "x", arrows: { from: { enabled: true, type: "inv_triangle"}} },
            { from: "B", to: "x", arrows: { from: { enabled: true, type: "inv_triangle"}} },
            { from: "x", to: "out", arrows: { from: { enabled: true, type: "inv_triangle"}} },
        ]),
    },
    {
        nodes: new vis.DataSet([
            { id: "b", label: "b" },
            { id: "A", label: "A" },
            { id: "B", label: "B" },
            { id: "x", label: "OR" },
            { id: "out", label: "out" },
        ]),
        edges: new vis.DataSet([
            { from: "b", to: "x", arrows: { from: { enabled: true, type: "inv_triangle"}} },
            { from: "A", to: "x", arrows: { from: { enabled: true, type: "inv_triangle"}} },
            { from: "B", to: "x", arrows: { from: { enabled: true, type: "inv_triangle"}} },
            { from: "x", to: "out", arrows: { from: { enabled: true, type: "inv_triangle"}} },
        ]),
    },
];

// create a network
var container = document.getElementById("app");
var options = {
  nodes: {
      shape: "dot",
    },
    layout: {
    hierarchical: {
      direction: "LR",
      sortMethod: "directed",
    },
  },
  edges: {
  },
};
var network = new vis.Network(container, LogicGates[PARAMS.gate], options);
