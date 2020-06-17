import React from "react";
import { useEffect } from "react";
import { useState } from "state/State";

import {
  Widget,
  toggleWidget,
  addResponseMessage,
  deleteMessages,
} from "react-chat-widget";
import logo from "otto.jpeg";

import * as msgs from "conversation/msgs";
import Conversation from "conversation/Conversation";
import { useNNState } from "state/NNState";

const convo = new Conversation(addResponseMessage);

export function initializeWidget() {
  deleteMessages();
  convo.sayMessages(msgs.IntroQuestion());
}

export const handleNext = (state) => {
  convo.handleStateAdvance(state);
}

function WidgetContainer() {
  const { state, dispatch } = useState();
  const { nn_state, nn_dispatch } = useNNState();

  useEffect(() => {
    toggleWidget();
    initializeWidget();
  }, []);

  const handleSubmit = (userMessage) => {
    convo.handleUserMessage(userMessage, state, dispatch, nn_state, nn_dispatch);
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
