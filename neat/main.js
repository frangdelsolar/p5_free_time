var node = neataptic.Node;
var neat = neataptic.Neat;
var network = neataptic.Network;
var methods = neataptic.methods;
var architect = neataptic.architect;
var Trainer = neataptic.Trainer;


var network = architect.Perceptron(2, 10, 20, 2);

// More diverse node types
for(node in network.nodes){
  var node = network.nodes[node];
  node.mutate(methods.mutation.MOD_ACTIVATION)
}

network.activate([0,1]);
drawGraph(network.graph(400, 400), '.draw', false);