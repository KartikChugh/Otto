import React from "react";
import { Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-chat-widget/lib/styles.css";
import "App.css";

import { GlobalStateProvider } from "GlobalState";
import ContentContainer from "containers/ContentContainer";
import HeaderContainer from "containers/HeaderContainer";
import WidgetContainer from "containers/WidgetContainer";

function App() {
  return (
    <Container className={"vh-100"} fluid>
      <GlobalStateProvider>
        <Row className={"outerContainer headerContainer"}>
          <HeaderContainer />
        </Row>
        <Row className={"outerContainer contentContainer"}>
          <ContentContainer />
        </Row>
        <WidgetContainer />
      </GlobalStateProvider>
    </Container>
  );
}

export default App;
