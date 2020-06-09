import React from "react";
import { useEffect } from "react";
import { useState } from "state/State";
import { Actions } from "state/Actions";

import {
  Widget,
  toggleWidget,
  addResponseMessage,
  deleteMessages,
} from "react-chat-widget";
import logo from "logo.svg";

import * as msgs from "conversation/msgs";

//import Conversation from "conversation";
import Conversation from "conversation/Conversation";
import { Tasks } from "state/StateTypes";

const convo = new Conversation(addResponseMessage);

export function initializeWidget() {
  deleteMessages();
  convo.sayMessages(msgs.IntroQuestion());
}

function WidgetContainer() {
  const [state, dispatch] = useState();

  useEffect(() => {
    toggleWidget();
    initializeWidget();
    dispatch({
      type: Actions.SET_TASK_OTTO,
      task: Tasks.NATURAL_LANGUAGE,
    });
  }, []);

  const handleSubmit = (userMessage) => {
    convo.handleUserMessage(userMessage, state, dispatch);
  };

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
