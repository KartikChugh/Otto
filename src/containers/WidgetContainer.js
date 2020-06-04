import React from "react";
import { useEffect } from "react";

import {
  Widget,
  toggleWidget,
  addResponseMessage,
  addUserMessage,
} from "react-chat-widget";
import logo from "logo.svg";

import Conversation from "conversation";

function WidgetContainer() {
  const convo = new Conversation();

  useEffect(() => {
    toggleWidget();
    addResponseMessage("Welcome! What would you like to do today?");
  }, []);

  const handleNewUserMessage = (userMessage) => {
    addUserMessage(userMessage);
    document.getElementsByClassName("rcw-sender")[0].message.value = "";
    console.log(`New message incoming! ${userMessage}`);

    performResponse(userMessage);
  };

  async function performResponse(userMessage) {
    const responses = await convo.respondTo(userMessage);
    for (const i in responses) {
      const response = responses[i];
      addResponseMessage(response);
    }
  }

  return (
    <Widget
      handleSubmit={handleNewUserMessage}
      launcher={() => null}
      subtitle=""
      title="Otto"
      titleAvatar={logo}
    />
  );
}

export default WidgetContainer;
