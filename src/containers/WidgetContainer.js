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

import Conversation from "conversation";

export function initializeWidget() {
  deleteMessages();
  addResponseMessage("Hey there! What would you like to do today?");
}

function WidgetContainer() {
  const convo = new Conversation();

  useEffect(() => {
    toggleWidget();
    initializeWidget();
  }, []);

  const handleNewUserMessage = (userMessage) => {
    document.getElementsByClassName("rcw-sender")[0].message.value = "";
    console.log(`New message incoming! ${userMessage}`);

    performResponse(userMessage);
  };

  /**
   * Returns time in ms for how long Otto takes to read/write a message
   * @param {string} msg
   */
  function readWriteDelay(msg) {
    const WPM = 500;
    const length = msg.length;
    const timeRead = (length / 3.5 / WPM) * 60 * 1000;
    return timeRead;
  }

  async function performResponse(userMessage) {
    const responses = await convo.respondTo(userMessage);
    await new Promise((r) => setTimeout(r, readWriteDelay(userMessage)));
    for (const i in responses) {
      const response = responses[i];
      await new Promise((r) => setTimeout(r, readWriteDelay(response)));
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
