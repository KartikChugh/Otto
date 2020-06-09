import { Actions } from "state/Actions";
import { StepperState, DatasetCategory, SampleDataset, Tasks, Models } from "state/StateTypes";
import * as msgs from "conversation/msgs";
import { 
    getWitResult, 
    extractTask, 
    extractSubject, 
    extractSampleDataset, 
    extractRegressionModel, 
    extractClassificationModel 
} from "conversation/ConversationUtils";

const responseTo = async (userMessage, wit, state, dispatch) => {
    
    switch (state.stepper_state) {
        case StepperState.TASK:
            return await taskStep(userMessage, wit, state, dispatch);
        // case StepperState.DATASET:
        //     return dataStep(userMessage, wit, state, dispatch);
        case StepperState.MODEL:
            return modelStep(userMessage, wit, state, dispatch);
    }

}

const taskStep = async (userMessage, wit, state, dispatch) => {
    console.log("taskStep");

    // get the wit result
    const witResult = await getWitResult(wit, userMessage);
    console.log(witResult);

    // extract the subject or null
    const subject = extractSubject(witResult);
    console.log(subject);

    // extract the sample dataset or null
    const effectiveSubject = subject ? subject : userMessage;
    const [taskForSampleDataset, modelForSampleDataset, sampleDataset, matchedKeywords] = extractSampleDataset(
        effectiveSubject
    );
    console.log(taskForSampleDataset);
    console.log(sampleDataset);
    console.log(matchedKeywords);

    // define the task or null
    const task = taskForSampleDataset ? taskForSampleDataset : extractTask(witResult);
    console.log(task);
    if (sampleDataset) {
        // update dataset/model state with sample
        dispatch({
            type: Actions.SET_DATASET_CATEGORY,
            task: DatasetCategory.SAMPLE,
        });
        dispatch({
            type: Actions.SET_SAMPLE_DATASET,
            task: sampleDataset,
        });
        dispatch({
            type: Actions.SET_MODEL,
            task: modelForSampleDataset,
        });
    }

    if (task) {
        // update task state
        dispatch({
            type: Actions.SET_TASK,
            task: task,
        });

        return msgs.TaskRecommendation(task);
    }

    return msgs.TaskInfo();

}

const modelStep = (userMessage, wit, state, dispatch) => {
    console.log("modelStep");

    const task = state.task;
    let model = state.model;

    console.log("Task:");
    console.log(task);
    console.log("Model:");
    console.log(model);

    console.log(Tasks.REGRESSION);
    // model not predefined (sample dataset)
    if (!model) {
        switch (state.task) {
            case Tasks.REGRESSION:
                model = extractRegressionModel(userMessage, wit) || 
                    Models.LINEAR_REGRESSION;
                break;
            case Tasks.CLASSIFICATION:
                model = extractClassificationModel(userMessage, wit) ||
                    Models.NEURAL_NETWORK_FF;
                break;
        }
    }

    console.log(model);
    return msgs.ModelRecommendation(model);
    // TODO: appropriate responses here

    return "datastep";
}

// const modelStep = (userMessage, wit, state, dispatch) => {
//     return "modelstep";
// }

export default responseTo;