import { responseToMessage } from "conversation/RespondMessage";
import { responseToState } from "conversation/RespondState";
const { Wit, log } = require("node-wit");
const token = require("TOKEN.json");

export default class Conversation {
  constructor(addResponseMessage) {
    this.addResponseMessage = addResponseMessage;
    this.ottoTask = new Wit({
      accessToken: token.task,
    });
    this.ottoModel = new Wit({
      accessToken: token.model,
    });
    this.ottoNN = new Wit({
      accessToken: token.nn,
    });
    this.wits = {
      task: this.ottoTask,
      model: this.ottoModel,
      nn: this.ottoNN,
    };
  }

  delay = (msg) => {
    const WPM = 420;
    let ms = (msg.length / 3.5 / WPM) * 60 * 1000;
    if (ms < 5000);
    else if (ms < 7000) ms = 5000;
    else ms -= 2000;
    return ms;
  };

  sayMessages = async (messages, stepperStateOriginal) => {
    if (!Array.isArray(messages)) messages = [messages];
    messages = messages.flat(1);
    for (let message of messages) {
      if (message != null) {
        let d = this.delay(message);
        await new Promise((r) => setTimeout(r, d / 2));
        if (
          !stepperStateOriginal ||
          (stepperStateOriginal &&
            stepperStateOriginal === this.state.stepper_state)
        ) {
          if (this.state.stepper_finish) {
            return;
          }
          this.addResponseMessage(message);
          await new Promise((r) => setTimeout(r, d / 2));
        }
      }
    }
  };

  handleUserMessage = async (
    userMessage,
    state,
    dispatch,
    nn_state,
    nn_dispatch
  ) => {
    document.getElementsByClassName("rcw-sender")[0].message.value = "";
    console.log(`handleUserMessage in Conversation: ${userMessage}`);
    console.log("State: ", state);

    return await responseToMessage(
      userMessage,
      this.wits,
      state,
      dispatch,
      nn_state,
      nn_dispatch
    );
  };

  handleStateAdvance = (state) => {
    console.log(`handleStateAdvance in Conversation: ${state}`);

    return responseToState(state);
  };
}
