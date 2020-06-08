import { StepperState } from "state/StateTypes"

export default async function responseTo(userMessage, state, dispatch) {
    
    switch (state.stepper_state) {
         case StepperState.TASK:
             return taskStep(userMessage, state, dispatch);
             break;
         default:
             break;
    }
    // return "meh";
}

function taskStep(userMessage, state, dispatch) {
    const responses = [];

    return "task step!";

    return responses;
}