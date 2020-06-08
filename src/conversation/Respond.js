import { StepperState } from "state/StateTypes"

export default async function responseTo(userMessage, state, dispatch) {
    
    switch (state.stepper_state) {
        case StepperState.TASK:
            return taskStep(userMessage, state, dispatch);
        case StepperState.DATASET:
            return dataStep(userMessage, state, dispatch);
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

function dataStep(userMessage, state, dispatch) {
    
}