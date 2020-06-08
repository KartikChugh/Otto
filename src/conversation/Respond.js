import { StepperState } from "state/StateTypes"
import { getWitResult, extractTask, extractSubject, extractSampleDataset } from "conversation/ConversationUtils"

const responseTo = async (userMessage, wit, state, dispatch) => {
    
    switch (state.stepper_state) {
        case StepperState.TASK:
            return await taskStep(userMessage, wit, state, dispatch);
        case StepperState.DATASET:
            return dataStep(userMessage, wit, state, dispatch);
         default:
             break;
    }
    // return "meh";
}

const taskStep = async (userMessage, wit, state, dispatch) => {

    const witResult = await getWitResult(wit, userMessage);
    console.log(witResult);

    const task = extractTask(witResult);
    return task;
    // const subject = extractSubject(witResponse);
    // console.log(task);
    // console.log(subject);

    // const effectiveSubject = subject ? subject : userMsg;
    // const [matchedTask, sampleDataset, matchedKeywords] = matchSampleDataset(
    //   effectiveSubject
    // ); // scan topic if exists

    return "task step!";

    //return responses;
}

function dataStep(userMessage, state, dispatch) {

}

export default responseTo;