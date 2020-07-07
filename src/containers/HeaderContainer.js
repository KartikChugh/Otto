import React from "react";
import "App.css";
import Navbar from "react-bootstrap/Navbar";
import logo from "art/otto_logo_clear.png";
import Typography from "@material-ui/core/Typography";

function HeaderContainer() {
  return (
    <>
      <Navbar
        style={{
          width: "100%",
          backgroundColor: "#3D3D3D",
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: "8px",
        }}
        variant="dark"
      >
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{" "}
          <span className="appLogo">OttoML</span>
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default HeaderContainer;
