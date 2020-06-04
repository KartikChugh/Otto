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

  const convo = new Conversation();

  React.useEffect(() => {
    toggleWidget();
    addResponseMessage("Welcome! What would you like to do today?");
  }, []);

  const handleNewUserMessage = (userMsg) => {
    addUserMessage(userMsg);
    document.getElementsByClassName("rcw-sender")[0].message.value = "";
    console.log(`New message incoming! ${userMsg}`);

    const responses = convo.respondTo(userMsg);
    responses.forEach(response => {
      addResponseMessage(response);
    });
    
  };

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
