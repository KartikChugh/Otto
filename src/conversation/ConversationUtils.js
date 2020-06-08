import { Tasks, Models } from "state/StateTypes"

const intentToTask = {
    task_reg: [Tasks.REGRESSION],
    task_class: [Tasks.CLASSIFICATION],
    task_nlp: [Tasks.NATURAL_LANGUAGE],
}

const regressionModelToKeywords = {
    [Models.POISSON_REGRESSION]: ["count", "number", "event"],
    [Models.ORDINAL_REGRESSION]: ["rank", "order"],
}; 

const classificationModelToKeywords = {
    [Models.KNN]: ["few", "small", "simple", "tiny"]
}

export const getWitResult = async (wit, utterance) => {
    return await wit.message(utterance);
}

export const extractSampleDataset = (statement) => {
    let sampleDataset = null;
    let matchedKeywords = null;
    let matchedTask = null;
    return [matchedTask, sampleDataset, matchedKeywords];
} 

export const extractTask = (witResponse) => { // TODO: threshold
    let intents = witResponse.intents;
    let task = null;
    if (intents.length > 0) {
        let topIntent = intents[0];
        let topIntentName = topIntent.name;
        task = intentToTask[topIntentName];
    }
    return task;
}

export const extractSubject = (witResponse) => {
    let entities = witResponse.entities;
    let subject = null;
    if ("subject:subject" in entities) {
      let subjectArray = entities["subject:subject"];
      let subjectObject = subjectArray[0];
      subject = subjectObject["body"];
    }
    return subject;
}

export const extractRegressionModel = (statement, wit) => {
    let regressionModel = null;
    const kvp = Object.entries(regressionModelToKeywords);
    for (const [model, keywords] of kvp) {
        for (const keyword of keywords) {
            if (statement.includes(keyword)) {
                regressionModel = model;
            }
        }
    }
    return regressionModel;
}

export const extractClassificationModel = (statement, wit) => {
    let classificationModel = null;
    const kvp = Object.entries(classificationModelToKeywords);
    for (const [model, keywords] of kvp) {
        for (const keyword of keywords) {
            if (statement.includes(keyword)) {
                classificationModel = model;
            }
        }
    }
    return classificationModel;
}