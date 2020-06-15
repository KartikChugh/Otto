import { Tasks, Models } from "state/StateTypes"

// TODO: refactor elsewhere?

const intentToTask = {
    task_reg: Tasks.REGRESSION,
    task_class: Tasks.CLASSIFICATION,
    task_nlp: Tasks.NATURAL_LANGUAGE,
}

const regressionEntityToModel = {
    "poisson:poisson": Models.POISSON_REGRESSION,
    "ordinal:ordinal": Models.ORDINAL_REGRESSION,
}

const classificationEntityToModel = {
    "knn:knn": Models.KNN,
}

// const regressionModelToKeywords = {
//     [Models.POISSON_REGRESSION]: ["count", "number", "event", "occurrence"],
//     [Models.ORDINAL_REGRESSION]: ["rank", "order"],
// }; 

// const classificationModelToKeywords = {
//     [Models.KNN]: ["few", "small", "simple", "tiny"]
// } 



export const getWitResult = async (wit, utterance) => {
    return await wit.message(utterance);
}

export const extractSampleDataset = (statement) => {
    let sampleDataset = null;
    let matchedKeywords = null;
    let matchedTask = null;
    let matchedModel = null;
    return [matchedTask, matchedModel, sampleDataset, matchedKeywords];
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

export const extractRegressionModel = async (statement, wit) => {
    const witResponse = await getWitResult(wit, statement);
    let entities = Object.keys(witResponse.entities); // note that this counts matches equally
    let models = entities.map(entity => regressionEntityToModel[entity]);
    if (models.length == 0) {
        return Models.LINEAR_REGRESSION;
    }
    return models[0]; // returns first match

    // let regressionModel = null;
    // const kvp = Object.entries(regressionModelToKeywords);
    // for (const [model, keywords] of kvp) {
    //     for (const keyword of keywords) {
    //         if (statement.includes(keyword)) {
    //             regressionModel = model;
    //         }
    //     }
    // }
    // return regressionModel;
}

export const extractClassificationModel = async (statement, wit) => {
    const witResponse = await getWitResult(wit, statement);
    let entities = Object.keys(witResponse.entities); // note that this counts matches equally
    let models = entities.map(entity => classificationEntityToModel[entity]);
    if (models.length == 0) {
        return Models.NEURAL_NETWORK_FF;
    }
    return models[0]; // returns first match
    
    // let classificationModel = null;
    // const kvp = Object.entries(classificationModelToKeywords);
    // for (const [model, keywords] of kvp) {
    //     for (const keyword of keywords) {
    //         if (statement.includes(keyword)) {
    //             classificationModel = model;
    //         }
    //     }
    // }
    // return classificationModel;
}

export const extractArchitectureChange = (witResponse) => {
    // let architectureChange = {};
    // const intent = witResponse.intent;
    // architectureChange.intent = intent;
}

// const getOrDefault = (obj, key, defaultValue) => {

// }