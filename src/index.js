import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContainer from "containers/AppContainer";
import * as serviceWorker from "serviceWorker";
import "fontsource-roboto";

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
