import React from "react";
import { Sigma, RandomizeNodePositions, RelativeSize } from "react-sigma";
import { FeedforwardNN } from "nn-architecture/Network";
import { useNNState } from "state/NNState";

export const getSigma = (data) => (
  <Sigma
    graph={data}
    style={{
      height: "95%",
      transform: "translate(-50%, -10px)",
    }}
    // onClickNode={onClickNodeFunc}
    //onOverNode={this.onOverNodeFunc}
    //onOutNode={this.onOutNodeFunc}
    settings={{
      maxNodeSize: 10,
      maxEdgeSize: 0.3,
      defaultNodeColor: "#ec5148",
      clone: false,
      enableHovering: true,
      rescaleIgnoreSize: true, // TODO change?
    }}
  />
);

export const toGraph = (network, coloredLayer) => {
  const layers = network.layers;

  let maxNodeCount = getMaxNodeCount(network);

  let graph = {};
  let nodes = [];
  let edges = [];
  let prevLayerNodes = []; // cache

  for (let i = 0; i < layers.length; i++) {
    let layer = layers[i];
    let nodeCount = layer.units;

    let x = i * 0.2;
    let color = i === coloredLayer ? "#add8e6" : "#fff";

    let vgap = 0.15 - nodeCount / 200;
    let renderHeight = (nodeCount - 1) * vgap;
    let initY = (2.0 - renderHeight) / 2;

    let thisLayerNodes = [];

    for (let j = 0; j < nodeCount; j++) {
      let y = initY + j * vgap;
      let id = i + "," + j;
      let size = 1;

      let node = { x: x, y: y, size: size, id: id /*color: color*/ };
      nodes.push(node);
      thisLayerNodes.push(node);
    }

    if (prevLayerNodes.length > 0) {
      // TODO check this??
      connect(prevLayerNodes, thisLayerNodes, edges);
    }

    prevLayerNodes = thisLayerNodes;
  }

  graph.nodes = nodes;
  graph.edges = edges;
  return graph;
};

const connect = (prevLayerNodes, thisLayerNodes, edges) => {
  for (let i = 0; i < prevLayerNodes.length; i++) {
    let prevNode = prevLayerNodes[i];
    let source = prevNode.id;

    for (let j = 0; j < thisLayerNodes.length; j++) {
      let thisNode = thisLayerNodes[j];

      let id = "e_" + prevNode.id + "," + thisNode.id;
      let target = thisNode.id;
      let size = 1 - (prevLayerNodes.length * thisLayerNodes.length) / 100;

      let edge = { id: id, source: source, target: target, size: size };
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
  let nn = new FeedforwardNN(nn_state);
  // nn.loss = Losses.MULTI_CLASS;
  // console.log(networkCode(nn));

  // nn.pushLayer();
  // nn.pushLayer();
  // console.log(networkCode(nn));

  // nn.popLayer();
  // console.log(networkCode(nn));

  let g = toGraph(nn);

  return getSigma(g);
}
