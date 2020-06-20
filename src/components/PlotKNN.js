import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { useModelState } from "state/ModelState";
import CircularProgress from "@material-ui/core/CircularProgress";
import { invoke } from "js-ml/knn";
import { modelLinear } from "codegen/regressionCode";
import { model } from "codegen/knnCode";

const fillColors = ["#E76F51", "#2A9D8F", "#264653"];
const shapeTypes = ["star", "circle", "triangle"];

const createPlotData = (state) => {
  const {
    knn_column1_index,
    knn_column2_index,
    knn_test_data,
    knn_result_labels,
  } = state;
  const data = {};
  knn_test_data.forEach((dataRow, index) => {
    const result_category = knn_result_labels[index];
    if (!data.hasOwnProperty(result_category)) {
      data[result_category] = [];
    }
    data[result_category].push({
      x: dataRow[knn_column1_index],
      y: dataRow[knn_column2_index],
    });
  });
  return data;
};

export default function PlotKNN() {
  const { model_state } = useModelState();
  const data = createPlotData(model_state);
  // invoke(model_state.knn_k);
  console.log(model_state.knn_labels);
  return (
    <>
      {!model_state.viz_loading ? (
        <ScatterChart
          width={800}
          height={600}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name={"name"} unit="cm">
            <Label
              value={model_state.knn_columns[model_state.knn_column1_index]}
              position="insideBottom"
              offset={-12}
            />
          </XAxis>
          <YAxis type="number" dataKey="y" name="weight" unit="kg">
            <Label
              value={model_state.knn_columns[model_state.knn_column2_index]}
              angle={-90}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend verticalAlign="top" height={36} />
          {model_state.knn_labels.map((label, index) => (
            <Scatter
              name={label}
              data={data[index]}
              fill={fillColors[index]}
              shape={shapeTypes[index]}
              key={index}
            />
          ))}
        </ScatterChart>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
}
