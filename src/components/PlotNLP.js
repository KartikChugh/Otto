import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useModelState } from "state/ModelState";
import CircularProgress from "@material-ui/core/CircularProgress";
import { invoke } from "js-ml/knn";
import { modelLinear } from "codegen/regressionCode";
import { model } from "codegen/knnCode";
import { Typography } from "@material-ui/core";
import LoadingComponent from "components/LoadingComponent";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function () {
  const { model_state } = useModelState();
  const classes = useStyles();

  const getRowNames = () => {
    const point = model_state.nlp_datas[0];
    const names = ["Text"];
    if (point.hasOwnProperty("sentiments")) {
      names.push("Sentiment");
    }
    if (point.hasOwnProperty("entities")) {
      names.push("Entities");
    }
    return names;
  };

  const getRowKeys = () => {
    const point = model_state.nlp_datas[0];
    const names = ["data"];
    if (point.hasOwnProperty("sentiments")) {
      names.push("sentiments");
    }
    if (point.hasOwnProperty("entities")) {
      names.push("entities");
    }
    return names;
  };

  const formatData = (row, key) => {
    if (key !== "entities") {
      return row[key];
    }
    let entities = row[key];
    entities = entities.map((entity) => entity[0] + ": " + entity[1]).join(",");
    return entities;
  };

  return (
    <>
      {!model_state.viz_loading ? (
        <>
          <Typography style={{ fontSize: "24px" }}>
            NLP Results from Wit.ai
          </Typography>
          <TableContainer
            component={Paper}
            style={{ height: "100%", marginLeft: "12px" }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {getRowNames().map((name) => (
                    <TableCell>{name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {model_state.nlp_datas.map((row, index) => (
                  <TableRow key={index}>
                    {getRowKeys().map((key) => (
                      <TableCell component="th" scope="row">
                        {formatData(row, key)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}
