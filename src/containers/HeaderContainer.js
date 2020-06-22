import React from "react";
import "App.css";
import Navbar from "react-bootstrap/Navbar";
import logo from "otto_logo_clear.png";

function HeaderContainer() {
  return (
    <>
      <Navbar style={{ width: "100%", backgroundColor: "#382B73" }} variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          OttoML
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default HeaderContainer;
