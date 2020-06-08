import { Actions } from "state/Actions";
import { StepperState, DatasetCategory, SampleDataset, Tasks, Models } from "state/StateTypes";
import { getWitResult, extractTask, extractSubject, extractSampleDataset } from "conversation/ConversationUtils"
import * as msgs from "conversation/msgs"

const responseTo = async (userMessage, wit, state, dispatch) => {
    
    switch (state.stepper_state) {
        case StepperState.TASK:
            return await taskStep(userMessage, wit, state, dispatch);
        case StepperState.DATASET:
            return dataStep(userMessage, wit, state, dispatch);
        case StepperState.MODEL:
            return modelStep(userMessage, wit, state, dispatch);
         default:
             break;
    }
    // return "meh";
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
    const [taskForSampleDataset, sampleDataset, matchedKeywords] = extractSampleDataset(
        effectiveSubject
    );
    console.log(taskForSampleDataset);
    console.log(sampleDataset);
    console.log(matchedKeywords);

    // define the task or null
    const task = taskForSampleDataset ? taskForSampleDataset : extractTask(witResult);

    if (sampleDataset) {
        // update dataset state with sample
        dispatch({
            type: Actions.SET_DATASET_CATEGORY,
            task: DatasetCategory.SAMPLE,
        });
        dispatch({
            type: Actions.SET_SAMPLE_DATASET,
            task: sampleDataset,
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

const dataStep = (userMessage, wit, state, dispatch) => {
    return "datastep";
}

const modelStep = (userMessage, wit, state, dispatch) => {
    return "modelstep";
}

export default responseTo;