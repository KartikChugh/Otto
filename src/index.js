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

// "Responsive web design"
try {
  if (window.screen.availWidth <= 1280) {
    document.body.style.zoom = 0.85;
  } 
} catch (error) {
  console.error(error);
  console.log("Could not perform auto-resize");
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
