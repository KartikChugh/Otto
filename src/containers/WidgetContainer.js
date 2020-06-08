import React from "react";
import { useEffect } from "react";
import { useState } from "state/State";

import {
  Widget,
  toggleWidget,
  addResponseMessage,
  deleteMessages,
} from "react-chat-widget";
import logo from "logo.svg";

import * as msgs from "conversation/msgs";

//import Conversation from "conversation";
import Conversation from "conversation/Conversation"

const convo = new Conversation(addResponseMessage);

export function initializeWidget() {
  deleteMessages();
  convo.sayMessages(msgs.Intro());
}

function WidgetContainer() {

  const [state, dispatch] = useState();

  useEffect(() => {
    toggleWidget();
    initializeWidget();
  }, []);

  const handleSubmit = (userMessage) => {
    convo.handleUserMessage(userMessage, state, dispatch)
  }

  // async function performResponse(userMessage) {
  //   const responses = await convo.respondTo(userMessage);
  //   await new Promise((r) => setTimeout(r, readWriteDelay(userMessage)));
  //   for (const i in responses) {
  //     const response = responses[i];
  //     await new Promise((r) => setTimeout(r, readWriteDelay(response)));
  //     addResponseMessage(response);
  //   }
  // }

  return (
    <Widget
      handleSubmit={handleSubmit}
      launcher={() => null}
      subtitle=""
      title="Otto"
      titleAvatar={logo}
    />
  );
}

export default WidgetContainer;
