import React from "react";
import { useEffect } from "react";

import {
  Widget,
  toggleWidget,
  addResponseMessage,
  addUserMessage,
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
  

  useEffect(() => {
    toggleWidget();
    initializeWidget();
  }, []);

  function readWriteDelay(msg) {
    const WPM = 500;
    const length = msg.length;
    const timeRead = (length / 3.5 / WPM) * 60 * 1000;
    return timeRead;
  }

  async function performResponse(userMessage) {
    // const responses = await convo.respondTo(userMessage);
    // await new Promise((r) => setTimeout(r, readWriteDelay(userMessage)));
    // for (const i in responses) {
    //   const response = responses[i];
    //   await new Promise((r) => setTimeout(r, readWriteDelay(response)));
    //   addResponseMessage(response);
    // }
  }

  return (
    <Widget
      handleSubmit={convo.handleUserMessage}
      launcher={() => null}
      subtitle=""
      title="Otto"
      titleAvatar={logo}
    />
  );
}

export default WidgetContainer;
