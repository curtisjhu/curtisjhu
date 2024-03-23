
 
var net; // declared outside -> global variable in window scope
function start() {
  net = new convnetjs.Net();
  layer_defs = [];
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:2});
  layer_defs.push({type:'fc', num_neurons:6, activation: 'tanh'});
  layer_defs.push({type:'fc', num_neurons:2, activation: 'tanh'});
  layer_defs.push({type:'softmax', num_classes:2});

  net = new convnetjs.Net();
  net.makeLayers(layer_defs);

  trainer = new convnetjs.SGDTrainer(net, {learning_rate:0.01, momentum:0.1, batch_size:10, l2_decay:0.001});


	// DATA 
	var d = [1, 2, 3, 4, 5]
	var x = new convnetjs.Vol(1,1,d);
	x.w[0] = 1; // set first feature to 1. example

	var stats = trainer.train(x, [0.7, 0.1, 0.3]);
	console.log(stats);
	var stats = trainer.train(x, [0.7, 0.1, 0.3]);
	console.log(stats);
	var stats = trainer.train(x, [0.7, 0.1, 0.3]);
	console.log(stats);
	var stats = trainer.train(x, [0.7, 0.1, 0.3]);
	console.log(stats);


}

start();