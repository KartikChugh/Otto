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

export async function initializeWidget(state) {
  deleteMessages();
  await new Promise((r) => setTimeout(r, 2500));
  convo.sayMessages(msgs.IntroQuestion(), state.stepper_state);
}

export const handleNext = (state) => {
  const stepperStateOriginal = state.stepper_state;
  deleteMessages();
  const msgs = convo.handleStateAdvance(state);
  convo.sayMessages(msgs, stepperStateOriginal);
};

export const handlePrev = (state) => {
  deleteMessages();
};

function WidgetContainer() {
  const { state, dispatch } = useState();
  convo.state = state;
  const { nn_state, nn_dispatch } = useNNState();

  useEffect(() => {
    toggleWidget();
    initializeWidget(state);
  }, []);

  const handleSubmit = async (userMessage) => {
    const stepperStateOriginal = state.stepper_state;
    const msgs = await convo.handleUserMessage(
      userMessage,
      state,
      dispatch,
      nn_state,
      nn_dispatch
    );
    convo.sayMessages(msgs, stepperStateOriginal);
  };

  return (
    <Widget
      handleSubmit={handleSubmit}
      subtitle=""
      title="Otto"
      titleAvatar={logo}
      showTimeStamp={false}
      //profileAvatar={logo}
    />
  );
}

export default WidgetContainer;
