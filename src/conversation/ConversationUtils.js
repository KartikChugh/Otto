import { Tasks, Models } from "state/StateTypes"
import { NNActions } from "state/NNActions"

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
}

export const extractClassificationModel = async (statement, wit) => {
    const witResponse = await getWitResult(wit, statement);
    let entities = Object.keys(witResponse.entities); // note that this counts matches equally
    let models = entities.map(entity => classificationEntityToModel[entity]);
    if (models.length == 0) {
        return Models.NEURAL_NETWORK_FF;
    }
    return models[0]; // returns first match
}

export const extractArchitectureChange = (witResponse, nn_state) => {
    let intents = witResponse.intents;
    let entities = witResponse.entities;
    let intent = intents?.[0].name;
    let count;
    
    switch(intent) {
        case "reset":
            return {type: NNActions.RESET}
        case "activation":
            let activation = entities?.["type:type"][0].value;
            return activation ? {type: NNActions.SET_HIDDEN_ACTIVATIONS, activation: activation} : null;
        case "initializer":
            let initializer = entities?.["type:type"][0].value;
            return initializer ? {type: NNActions.SET_ALL_INITIALIZERS, initializer: initializer} : null;
        case "dimension":
            count = entities?.["wit$number:number"][0].value;
            let target = entities?.["target:target"][0].value; 
            switch (target) {
                case "inputs": 
                    return count ? {type: NNActions.SET_NODES, layer: 0, nodes: count} : null;
                case "outputs":
                    return count ? {type: NNActions.SET_NODES, layer: nn_state.layers.length - 1, nodes: count} : null;
                case "nodes":
                    return count ? {type: NNActions.SET_HIDDEN_NODES, nodes: count} : null;                
            }
        case "layers":
            let instruction = entities?.["instruction:instruction"][0].value;
            let order = entities?.["order:order"][0].value ?? "last";
            count = entities?.["wit$number:number"][0].value;
            switch (instruction) {
                case "use":
                    return count ? {type: NNActions.SET_HIDDEN_LAYERS, layers: count} : null;
                case "add":
                    count = count ?? 1;
                    return {type: NNActions.ADD_LAYERS, layers: count};
                case "remove":
                    count = count ?? 1;
                    return {type: NNActions.REMOVE_LAYERS, layers: count, fromEnd: order === "last"}

            }
    }
    

    // let architectureChange = {};
    // const intent = witResponse.intent;
    // architectureChange.intent = intent;
}

// const getOrDefault = (obj, key, defaultValue) => {

// }