import React from "react";
import { useEffect } from "react";
import { useState } from "state/State";
import { Actions } from "state/Actions";
import { FeedforwardNN} from "nn-architecture/Network"
import { Layer } from "nn-architecture/Layer"
import { Optimizers, Losses, Activations, Initializers } from "nn-architecture/hyperparams" 
import { networkCode } from "nn-architecture/networkCode"

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


// TODO: remove
// let nn = new FeedforwardNN();
// nn.loss = Losses.MULTI_CLASS;
// console.log(networkCode(nn));

// nn.pushLayer();
// nn.pushLayer();
// console.log(networkCode(nn));

// nn.popLayer();
// console.log(networkCode(nn));


export default WidgetContainer;
