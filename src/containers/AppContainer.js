import React from "react";
import { Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
// import "react-chat-widget/lib/styles.css";
import "chat.css";
import "App.css";

import { StateProvider } from "state/State";
import ContentContainer from "containers/ContentContainer";
import HeaderContainer from "containers/HeaderContainer";
import WidgetContainer from "containers/WidgetContainer";
import { NNStateProvider } from "state/NNState";
import { ModelStateProvider } from "state/ModelState";

function App() {
  return (
    <Container className={"vh-100"} fluid>
      <StateProvider>
        <NNStateProvider>
          <ModelStateProvider>
            {/* <Row className={"headerContainer"}>
          <HeaderContainer />
        </Row> */}
            <Row className={"contentContainer"}>
              <ContentContainer />
            </Row>
            <WidgetContainer />
          </ModelStateProvider>
        </NNStateProvider>
      </StateProvider>
    </Container>
  );
}

export default App;
