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
        default:
            break;
    }      
}

const dataStep = (state) => {
    console.log("RESPOND STATE -- DATA STEP");

    const isRecommended = state.dataset_category_otto && (state.dataset_category_otto === state.dataset_category);
    console.log("isRecommended? ", isRecommended);
    if (isRecommended) {
        return msgs.DatasetRecommendation(state.task);
    } else {
        return msgs.DatasetPreface(state.task);
    }

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
        default:
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