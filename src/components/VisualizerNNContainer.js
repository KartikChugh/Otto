import React from "react";
import { Sigma, RandomizeNodePositions, RelativeSize } from "react-sigma";
import { FeedforwardNN } from "nn-architecture/Network";
import { useNNState } from "state/NNState";
import { NNActions } from "state/NNActions";
import { Activations, Initializers } from "nn-architecture/hyperparams";

class UpdateNodeProps extends React.Component {
  componentWillReceiveProps({ sigma, nodes, edges }) {
    sigma.graph.clear();
    sigma.graph.read({ nodes, edges });
    sigma.refresh();
  }

  render = () => null;
}

const onClickNodeFunc = (event, dispatch) => {
  const layer = Number(event.data.node.id.split(",")[0]);
  dispatch({
    type: NNActions.SET_SELECTED_LAYER,
    layer,
  });
};

const activationToColorMap = Object.freeze({
  [Activations.RELU]: "#3493fa",
  [Activations.SIGMOID]: "#844864",
  [Activations.TANH]: "#5D5DE1",
  [Activations.SOFTMAX]: "#e06aa6",
  [Activations.LINEAR]: "#f3bb43",
});

const initializerToColorMap = Object.freeze({
  [Initializers.GLOROT]: "#999",
  [Initializers.RANDOM]: "#dd55cc",
  [Initializers.HE]: "#dd9955",
  [Initializers.LECUN]: "#55bb55"
});


const determineLayerColor = (layer) => {
  let color = activationToColorMap?.[layer.activation] ?? "#777";
  return color;
}

const determineEdgeColor = (layer) => {
  let color = initializerToColorMap?.[layer.initializer] ?? determineLayerColor(layer);
  return color;
}

const toGraph = (network, selectedLayer) => {
  const layers = network.layers;

  let maxNodeCount = getMaxNodeCount(network);

  const nodes = [];
  const edges = [];
  let prevLayerNodes = []; // cache

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const nodeCount = layer.units;

    const x = i * 0.2;
    //const color = i === selectedLayer ? "#e63946" : "#007ea7";
    const size = i === selectedLayer ? 130 : 100;
    const color = determineLayerColor(layer);
    const edgeColor = determineEdgeColor(layer);

    const vgap = 0.15 - nodeCount / 200;
    const renderHeight = (nodeCount - 1) * vgap;
    const initY = (2.0 - renderHeight) / 2;

    const thisLayerNodes = [];

    for (let j = 0; j < nodeCount; j++) {
      let y = initY + j * vgap;
      let id = i + "," + j;
      
      let node = { x, y, size, id, color, writable: true };
      nodes.push(node);
      thisLayerNodes.push(node);
    }

    if (prevLayerNodes.length > 0) {
      connect(prevLayerNodes, thisLayerNodes, edges, edgeColor);
    }

    prevLayerNodes = thisLayerNodes;
  }
  return [nodes, edges];
};

const connect = (prevLayerNodes, thisLayerNodes, edges, edgeColor) => {
  for (let i = 0; i < prevLayerNodes.length; i++) {
    let prevNode = prevLayerNodes[i];
    let source = prevNode.id;

    for (let j = 0; j < thisLayerNodes.length; j++) {
      let thisNode = thisLayerNodes[j];

      let id = "e_" + prevNode.id + ";" + thisNode.id;
      let target = thisNode.id;
      //let size = 1 - (prevLayerNodes.length * thisLayerNodes.length)/50;
      let size = 1;

      let edge = { id: id, source: source, target: target, size: size, color: edgeColor };
      edges.push(edge);
    }
  }
};

const getMaxNodeCount = (network) => {
  const layers = network.layers;
  let max = 0;
  for (let layer of layers) {
    let nodeCount = layer.numNodes;
    if (nodeCount > max) max = nodeCount;
  }
  return max;
};

export default function VisualizerNNContainer() {
  const { nn_state, nn_dispatch } = useNNState();
  const nn = new FeedforwardNN(nn_state);
  const [nodes, edges] = toGraph(nn, nn_state.selectedLayerIndex);
  return (
    <Sigma
      graph={{ nodes, edges }}
      style={{
        height: "100%",
        transform: "translate(-50%, -10px)",
      }}
      onClickNode={(event) => onClickNodeFunc(event, nn_dispatch)}
      //onOverNode={this.onOverNodeFunc}
      //onOutNode={this.onOutNodeFunc}
      settings={{
        maxNodeSize: 15,
        maxEdgeSize: 0.3,
        defaultNodeColor: "#777",
        clone: true,
      }}
    >
      <UpdateNodeProps nodes={nodes} edges={edges} />
    </Sigma>
  );

  // return getSigma(g, nn_dispatch);
}
