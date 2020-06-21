import { Actions } from "state/Actions";
import { StepperState, DatasetCategory, SampleDataset, Tasks, Models } from "state/StateTypes";
import * as msgs from "conversation/msgs";
import { 
    getWitResult, 
    extractTask, 
    extractSubject, 
    extractSampleDataset, 
    extractRegressionModel, 
    extractClassificationModel, 
    extractArchitectureChange
} from "conversation/ConversationUtils";

export const responseToMessage = async (userMessage, wits, state, dispatch, nn_state, nn_dispatch) => {
    switch (state.stepper_state) {
        case StepperState.TASK:
            return await taskStep(userMessage, wits.task, state, dispatch);
        // case StepperState.DATASET:
        //     return dataStep(userMessage, wit, state, dispatch);
        case StepperState.MODEL:
            return modelStep(userMessage, wits.model, state, dispatch);
        case StepperState.VISUALIZE:
            if (state.model === Models.NEURAL_NETWORK_FF) {
                return architectureStep(userMessage, wits.nn, nn_state, nn_dispatch);
            }
            break;
        default:
            break;
    }

}

const taskStep = async (userMessage, wit, state, dispatch) => {
    console.log("TASK STEP");

    // get the wit result
    const witResult = await getWitResult(wit, userMessage);
    console.log("Wit result: ", witResult);

    // extract the subject or null
    const subject = extractSubject(witResult);
    console.log("Subject: ", subject);

    let extractedTask = extractTask(witResult);
    console.log("Extracted task: ", extractedTask);

    // extract the sample dataset or null
    const effectiveSubject = (subject  && extractedTask) ? subject : userMessage;
    const [taskForSampleDataset, modelForSampleDataset, sampleDataset, matchedKeyword] = extractSampleDataset(
        effectiveSubject
    );
    console.log("Sample data matches: ");
    console.log(taskForSampleDataset);
    console.log(modelForSampleDataset);
    console.log(sampleDataset);
    console.log(matchedKeyword);

    // define the task or null
    const task = taskForSampleDataset ?? extractedTask;
    console.log("Final task decision: ", task);

    if (sampleDataset) {
        // update dataset type
        dispatch({
            type: Actions.SET_DATASET_CATEGORY,
            dataset_category: DatasetCategory.SAMPLE,
        });
        dispatch({
            type: Actions.SET_DATASET_CATEGORY_OTTO,
            dataset_category: DatasetCategory.SAMPLE,
        });
        // update sample dataset
        dispatch({
            type: Actions.SET_SAMPLE_DATASET,
            sample_dataset: sampleDataset,
        });
        dispatch({
            type: Actions.SET_SAMPLE_DATASET_OTTO,
            sample_dataset: sampleDataset,
        });
        // update model
        if (task === Tasks.NATURAL_LANGUAGE) {
            for (const nlpModel of modelForSampleDataset) {
                dispatch({
                    type: Actions.TOGGLE_NLP_MODEL,
                    model: nlpModel
                });
                dispatch({
                    type: Actions.TOGGLE_NLP_MODEL_OTTO,
                    model: nlpModel
                });
            }
        } else {
            dispatch({
                type: Actions.SET_MODEL,
                model: modelForSampleDataset,
            });
            dispatch({
                type: Actions.SET_MODEL_OTTO,
                model: modelForSampleDataset,
            });
        }
    }

    if (task) {
        // update task state
        dispatch({
            type: Actions.SET_TASK,
            task: task,
        });
        dispatch({
            type: Actions.SET_TASK_OTTO,
            task: task,
        });

        return msgs.TaskRecommendation(task);
    }

    return msgs.TaskInfo();

}

const modelStep = async (userMessage, wit, state, dispatch) => {
    console.log("modelStep");

    const task = state.task;
    let model = state.model;

    console.log("Task: \n", task);
    console.log("Model: \n", model);

    // model not predefined (custom dataset)
    // FIXME: use recommended
    if (!model) {
        switch (task) {
            case Tasks.REGRESSION:
                model = await extractRegressionModel(userMessage, wit);
                break;
            case Tasks.CLASSIFICATION:
                model = await extractClassificationModel(userMessage, wit) ||
                    Models.NEURAL_NETWORK_FF;
                break;
            default:
                break;
        }

        dispatch({
            type: Actions.SET_MODEL,
            model: model,
        });
        dispatch({
            type: Actions.SET_MODEL_OTTO,
            model: model,
        });

    }

    return msgs.ModelRecommendation(model);

}

/** Model building via Otto */
const architectureStep = async (userMessage, wit, nn_state, nn_dispatch) => {

    console.log("Architecture step: ", nn_state);

    const witResult = await getWitResult(wit, userMessage); 

    const architectureChange = extractArchitectureChange(witResult, nn_state);
    if (architectureChange) {
        nn_dispatch(architectureChange);
    }
    //return JSON.stringify(architectureChange);
    //return JSON.stringify(witResult);

}