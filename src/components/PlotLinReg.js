import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  ComposedChart,
  Line,
  ResponsiveContainer,
} from "recharts";

import { useModelState } from "state/ModelState";
import LoadingComponent from "./LoadingComponent";

function compareX(a, b) {
  return a.x - b.x;
}

export default function PlotLinReg() {
  const { model_state } = useModelState();
  const { linreg_test_result, linreg_test_set } = model_state;

  const data = [];
  linreg_test_set.map((point, index) => {
    if (linreg_test_result[index][1] >= 0) {
      data.push({
        x: point[0],
        scatter: point[1],
        line: linreg_test_result[index][1],
      });
    }
  });
  data.sort(compareX);

  return (
    <>
      {!model_state.viz_loading ? (
        <ResponsiveContainer
          className="graph-wrapper"
          width="100%"
          height="100%"
        >
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="x" name={model_state.linreg_x_name} type="number">
              <Label
                value={model_state.linreg_x_name}
                position="insideBottom"
                offset={-12}
              />
            </XAxis>
            <YAxis unit="k$" name={model_state.linreg_y_name} type="number">
              <Label
                value={model_state.linreg_y_name}
                angle={-90}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend verticalAlign="top" height={36} />
            <Scatter name="Test Data" dataKey="scatter" fill="#e06aa6" />
            <Line
              dataKey="line"
              name="Line of Best Fit (Train Data)"
              stroke="#5D5DE1"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}
