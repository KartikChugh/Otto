import { StepperState } from "state/StateTypes"

export default function responseTo(userMessage, state, dispatch) {
    
    switch (state.stepper_state) {
         case StepperState.TASK:
             return taskStep(userMessage, state, dispatch);
             break;
         default:
             break;
    }

}

function taskStep(userMessage, state, dispatch) {
    const responses = [];

    

    return responses;
}