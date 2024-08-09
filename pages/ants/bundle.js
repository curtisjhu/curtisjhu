

function setup() {
	createCanvas(windowWidth, windowHeight);
}

/**
 * BELLMAN EQUATION
 * Q_{k+1} :=  sum_{s'} T(s, a, s')[R(s, a, s') + gamma * max_a Q_k(s')]
 * 
 * I'm demonstrating the effect of ants on hill trying to reach the honey.
 * 
 * State: (x,y)
 * Actions: [0-179] degree in discrete
 * Transition: (v + L * <cos(a), sin(a)>)
 * Reward: Heurisitc (smell) and cost of the hill.
 * Gamma: 0.7
 * 
 */
function updateQ() {
	function reward() {

	}
	function transition() {

	}
}

function draw() {
	background(0);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}