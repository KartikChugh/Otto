import React from "react";
import {useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-chat-widget/lib/styles.css";
import "App.css";

import { StateProvider } from "state/State";
import ContentContainer from "containers/ContentContainer";
import HeaderContainer from "containers/HeaderContainer";
import WidgetContainer from "containers/WidgetContainer";

function App() {

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <Container className={"vh-100"} fluid>
      <StateProvider>
        <Row className={"headerContainer"}>
          <HeaderContainer />
          <p>The current time is {currentTime}.</p>
        </Row>
        <Row className={"contentContainer"}>
          <ContentContainer />
        </Row>
        <WidgetContainer />
      </StateProvider>
    </Container>
  );
}

export default App;
