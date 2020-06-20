import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  header: {
    display: "inline-block",
    position: "absolute",
    width: 230,
    marginTop: -16,
  },
  tab: {
    outline: "none !important",
    // minWidth: "33%",
  },
  actionTitles: {
    marginBottom: 4,
  },
  floatLeft: {
    float: "left",
    fontWeight: 300,
    fontSize: 20,
  },
  floatRight: {
    float: "right",
    color: "#3f51b5",
    fontWeight: 400,
    fontSize: 16,
    marginTop: 4,
  },
  actionWidth: {
    width: 260,
  },
  sliderWidth: {
    width: 200,
  },
  layerInputItem: {
    marginBottom: 8,
  },
  layerInput: {
    width: 60,
    height: 36,
    borderRadius: "4px !important",
    textAlign: "center",
  },
  nodesLabel: {
    marginRight: 8,
  },
  nodesItem: {
    marginTop: 24,
    marginBottom: -8,
  },
  actionItem: {
    marginTop: 16,
  },
  button: {
    width: 260,
    marginBottom: 8,
    outline: "none !important",
  },
}));
