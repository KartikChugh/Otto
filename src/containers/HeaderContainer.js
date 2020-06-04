import React from "react";
import "App.css";
import Navbar from "react-bootstrap/Navbar";
import logo from "logo.svg";

function HeaderContainer() {
  return (
    <>
      <Navbar style={{ width: "100%" }} bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          React Bootstrap
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default HeaderContainer;
