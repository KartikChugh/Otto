import React from "react";
import { useEffect } from "react";
import { useState } from "state/State";

import {
  Widget,
  toggleWidget,
  addResponseMessage,
  deleteMessages,
} from "react-chat-widget";
import logo from "art/otto_logo_3.png";

import * as msgs from "conversation/msgs";
import Conversation from "conversation/Conversation";
import { useNNState } from "state/NNState";

const convo = new Conversation(addResponseMessage);

const delay = (msg) => {
  const WPM = 225;
  return (msg.length / 3.5 / WPM) * 60 * 1000;
}

const sayMessages = async (messages) => {
  if (!Array.isArray(messages)) messages = [messages];
  messages = messages.flat(1);
  for (let message of messages) {
      if (message != null) {
          let d = delay(message);
          await new Promise((r) => setTimeout(r, d/2));
          addResponseMessage(message);
          await new Promise((r) => setTimeout(r, d/2));
      }
  }
}

export async function initializeWidget() {
  deleteMessages();
  await new Promise((r) => setTimeout(r, 2500));
  sayMessages(msgs.IntroQuestion());
}

export const handleNext = (state) => {
  deleteMessages();
  const msgs = convo.handleStateAdvance(state);
  sayMessages(msgs);
}

export const handlePrev = (state) => {
  deleteMessages();
}

function WidgetContainer() {
  const { state, dispatch } = useState();
  const { nn_state, nn_dispatch } = useNNState();

  useEffect(() => {
    toggleWidget();
    initializeWidget();
  }, []);

  const handleSubmit = async (userMessage) => {
    const msgs = await convo.handleUserMessage(userMessage, state, dispatch, nn_state, nn_dispatch);
    sayMessages(msgs);
  };

  return (
    <Widget
      handleSubmit={handleSubmit}
      launcher={() => null}
      subtitle=""
      title="Otto"
      titleAvatar={logo}
      showTimeStamp={false}
      //profileAvatar={logo}
    />
  );
}

export default WidgetContainer;
