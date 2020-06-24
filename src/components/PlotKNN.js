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
  ResponsiveContainer,
} from "recharts";
import { useModelState } from "state/ModelState";
import CircularProgress from "@material-ui/core/CircularProgress";
import { invoke } from "js-ml/knn";
import { modelLinear } from "codegen/regressionCode";
import { model } from "codegen/knnCode";
import LoadingComponent from "./LoadingComponent";

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
  const columns = model_state.knn_columns;
  const columnMap = model_state.knn_columns_map;
  const xAxisColumn = columnMap[columns[model_state.knn_column1_index]];
  const yAxisColumn = columnMap[columns[model_state.knn_column2_index]];

  return (
    <>
      {!model_state.viz_loading ? (
        <ResponsiveContainer
          className="graph-wrapper"
          width="100%"
          height="100%"
        >
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              name={xAxisColumn}
              unit={
                model_state.knn_column_units
                  ? model_state.knn_column_units[model_state.knn_column1_index]
                  : ""
              }
            >
              <Label value={xAxisColumn} position="insideBottom" offset={-12} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              name={yAxisColumn}
              unit={
                model_state.knn_column_units
                  ? model_state.knn_column_units[model_state.knn_column2_index]
                  : ""
              }
            >
              <Label value={yAxisColumn} angle={-90} position="insideLeft" />
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
        </ResponsiveContainer>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}
