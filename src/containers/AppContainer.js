import React from "react";
import { Container, Row } from "react-bootstrap";
import {
  Widget,
  toggleWidget,
  addResponseMessage,
  addUserMessage,
} from "react-chat-widget";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-chat-widget/lib/styles.css";
import "App.css";
import logo from "logo.svg";

import HeaderContainer from "containers/HeaderContainer";
import ContentContainer from "containers/ContentContainer";
import Conversation from "conversation";

function App() {

  const convo = new Conversation();

  React.useEffect(() => {
    toggleWidget();
    addResponseMessage("Welcome! What would you like to do today?");
  }, []);

  const handleNewUserMessage = (userMsg) => {
    addUserMessage(userMsg);
    document.getElementsByClassName("rcw-sender")[0].message.value = "";
    console.log(`New message incoming! ${userMsg}`);

    const response = convo.respondTo(userMsg);

    addResponseMessage(response);
  };

  return (
    <Container className={"vh-100"} fluid>
      <Row className={"outerContainer headerContainer"}>
        <HeaderContainer />
      </Row>
      <Row className={"outerContainer contentContainer"}>
        <ContentContainer />
      </Row>
      <Widget
        handleSubmit={handleNewUserMessage}
        launcher={() => null}
        subtitle=""
        title="Otto"
        titleAvatar={logo}
      />
    </Container>
  );
}

export default App;
