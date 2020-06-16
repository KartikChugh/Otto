import { StepperState, Tasks, Models } from "state/StateTypes";
import * as msgs from "conversation/msgs"

export const responseToState = (state) => {
    switch (state.stepper_state) {
        // case StepperState.TASK:
        //     return taskStep(userMessage, wits.task, state, dispatch);
        case StepperState.DATASET:
            return dataStep(state);
        case StepperState.MODEL:
            return modelStep(state);
        case StepperState.PREPROCESSORS:
            return preprocessorsStep(state);
        case StepperState.VISUALIZE:
            return visualizeStep(state);
    }      
}

const dataStep = (state) => {

}

const modelStep = (state) => {
    const responses = [];
    responses.push(msgs.ModelPreface());
    switch (state.task) {
        case Tasks.CLASSIFICATION:
            responses.push(msgs.ClassificationModelQuestion());
            break;
        case Tasks.REGRESSION:
            responses.push(msgs.RegressionModelQuestion());
            break;
        case Tasks.NATURAL_LANGUAGE:
            responses.push(msgs.NLPModelInfo());
            break;
    }
    return responses;
}

const preprocessorsStep = (state) => {
    return msgs.PreprocessorRecommendation();
}

const visualizeStep = (state) => {
    if (state.model === Models.NEURAL_NETWORK_FF) {
        return msgs.NeuralNetworkPreface();
    }
}