
const gui = new dat.GUI({
	name: "Search Algorithms",
	width: 300
});

const node = document.createElement("div");
node.style = "background: rgb(0, 0, 0); padding: 6px;"
node.innerHTML = `
<h1>Search Algorithms</h1>
<p>
As part of CS188

</p>
`;

gui.domElement.prepend(node);

var algs = ["Depth First Search", "Breadth First Search", "Uniform Cost Search", "Greedy", "A* Search"]
var options = ["navigate", "drawing walls", "selecting goal state", "selecting start state"]
var view = ["grid", "maps"]
var PARAMS = {
	"search": algs[4],
	"cursor": options[0],
	"view": view[0]
}

gui.add(PARAMS, 'view', view);
gui.add(PARAMS, 'search', algs);
gui.add(PARAMS, 'cursor', options);

var obj = { home:function(){ perspective(1, width / height, 0.1*800, 10*800); }};
gui.add(obj,'home');




function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	background(240);
	orbitControl(0.8, 0.8, 0.8);

	fill(255, 100)
	square(0, 0, 50);

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}