import React from "react";
import { Sigma, RandomizeNodePositions, RelativeSize } from "react-sigma";
import { FeedforwardNN } from "nn-architecture/Network";
import { useNNState } from "state/NNState";
import { NNActions } from "state/NNActions";

class UpdateNodeProps extends React.Component {
  componentWillReceiveProps({ sigma, nodes }) {
    sigma.graph.nodes().forEach((n) => {
      const updated = nodes.find((e) => e?.id === n?.id);
      if (updated == null) {
        return;
      }
      const { id, ...others } = updated;
      Object.assign(n, others);
    });
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

// export const getSigma = (data, dispatch) => {
//   console.log(data);
//   return (

//   );
// };

export const toGraph = (network, coloredLayer) => {
  const layers = network.layers;

  let maxNodeCount = getMaxNodeCount(network);

  const nodes = [];
  const edges = [];
  let prevLayerNodes = []; // cache

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const nodeCount = layer.units;

    const x = i * 0.2;
    const color = i === coloredLayer ? "#e63946" : "#007ea7";

    const vgap = 0.15 - nodeCount / 200;
    const renderHeight = (nodeCount - 1) * vgap;
    const initY = (2.0 - renderHeight) / 2;

    const thisLayerNodes = [];

    for (let j = 0; j < nodeCount; j++) {
      let y = initY + j * vgap;
      let id = i + "," + j;
      let size = 1;

      let node = { x, y, size, id, color, writable: true };
      nodes.push(node);
      thisLayerNodes.push(node);
    }

    if (prevLayerNodes.length > 0) {
      // TODO check this??
      connect(prevLayerNodes, thisLayerNodes, edges);
    }

    prevLayerNodes = thisLayerNodes;
  }
  return [nodes, edges];
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
  const nn = new FeedforwardNN(nn_state);
  // nn.loss = Losses.MULTI_CLASS;
  // console.log(networkCode(nn));

  // nn.pushLayer();
  // nn.pushLayer();
  // console.log(networkCode(nn));

  // nn.popLayer();
  // console.log(networkCode(nn));
  console.log(nn_state);
  const [nodes, edges] = toGraph(nn, nn_state.selectedLayerIndex);

  return (
    <Sigma
      graph={{ nodes, edges }}
      style={{
        height: "95%",
        transform: "translate(-50%, -10px)",
      }}
      onClickNode={(event) => onClickNodeFunc(event, nn_dispatch)}
      //onOverNode={this.onOverNodeFunc}
      //onOutNode={this.onOutNodeFunc}
      settings={{
        maxNodeSize: 10,
        maxEdgeSize: 0.3,
        defaultNodeColor: "#ec5148",
        clone: true,
        renderer: "webgl",
        // enableHovering: true,
        // rescaleIgnoreSize: true,
      }}
    >
      <UpdateNodeProps nodes={nodes} />
    </Sigma>
  );

  // return getSigma(g, nn_dispatch);
}
