import { DatasetCategory, Tasks } from "state/StateTypes";
import { titleCase } from "title-case";
import * as msgsExample from "conversation/msgsExample";

export const IntroQuestion = () => {
    return [
        "Hey there!",
        "My name's Otto, and I'm here to help you with machine learning",
        "What are you looking to do today?",
        `${msgsExample.Task}`
    ];
}

// export const SampleData = (topic) => {
//     return `We have some sample data for ${topic} if you'd like to use that`;
// }

export const TaskRecommendation = (task) => {
    return [
        `Neat idea!`,
        `I recommend a ${task.toLowerCase()} model to help you explore it`
    ];
}

// export const TaskAndSample = (task) => {
//     return [
//         `I think a ${task} model would help you explore that idea`,
//         "Check out a few sample datasets if you'd like, or leave it blank to use your own"
//     ]
// }

export const TaskInfo = () => {
    return [
        "Hmm..so there's more than one way to model that. But I can definitely help you narrow it down!",
        "Regression is used to model numerical variables, like stock prices or infection rates",
        "while classification predicts categorical outcomes, (if an image is a cat or a dog, whether a candidate will win or not, and so on)", 
        "Natural language processing can do things like identify structures in text and figure out the tone behind an expression",
        "Whenever you’re ready, pick the task that seems like the best fit!"
    ];
}

export const AdvanceFromTask = (task) => {
    return `Alright, ${task.toLowerCase()} it is!`
}

export const DatasetPreface = () => {
    return [
        "Just letting you know, I have a few sample datasets you can model and visualize right from your browser",
        "Check them out if you'd like, or select “Custom” to use your own data",
    ];
}

export const DatasetPreRecommendation = () => {
    return [
        "I've preselected a dataset that seems to match what you're looking for",
        "Feel free to check out other sample datasets, or select “Custom” to use your own"
    ];
}

export const AdvanceFromDataset = (datasetCategory, sampleDataset) => {
    const isCustom = (datasetCategory === DatasetCategory.CUSTOM);
    let str = isCustom ? `Going with custom data, then!` : `Going with the ${titleCase(sampleDataset)} dataset, then!`;
    return `${str}`
}

export const ModelPreface = (task) => {
    let str = task === Tasks.NATURAL_LANGUAGE ? "the appropriate models" : "an appropriate model";
    return [
        `Now that we have our ML task and dataset sorted out, the next step is to select ${str}`,
    ];
}

export const ModelPreRecommendation = (model, nlp_models) => {
    if (nlp_models) {
        let str = (nlp_models.length === 2) ? "combining both analyses" : `${nlp_models[0].toLowerCase()}`
        return `I think ${str} is the way to go`
    }
    return `I think a ${model.toLowerCase()} algorithm is the way to go`
}

export const NLPModelInfo = () => {
    return [
        "Entity recognition is useful for extracting key information from text (celebrity names, album titles, and times)",
        "while sentiment analysis can pick up on implied information, like expressions of thanks or how positive/negative a statement is",
        "You can combine both for a comprehensive analysis too!"
    ]
}

export const RegressionModelQuestion = () => {
    return [
        "What can you tell me about the dependent variable you're trying to model?",
        `${msgsExample.ModelRegression}`
    ]
}

export const ClassificationModelQuestion = () => {
    return [
        "What can you tell me about the dataset you're trying to model?",
        `${msgsExample.ModelClassification}`
    ]
}

export const ModelRecommendation = (model) => {
    return [
        `In that case, I think a ${model.toLowerCase()} model would be perfect`
    ]
}

export const AdvanceFromModel = (task) => {
    return [
        `Okay, we've got our ${task.toLowerCase()} model figured out`,
    ]
}

export const PreprocessorRecommendation = () => {
    return [
        "Based on everything you've told me so far, I've gone ahead and setup some data preprocessors to help optimize the learning process",
        "(As always, you can tweak them if you know what you're doing!)"
    ]
}

export const NeuralNetworkPreface = () => {
    return [
        "Finally, we're ready to design our neural network!",
        "I've setup a basic feedforward NN for classification",
        "You can play with the model and customize it, or tell me what changes to make",
        msgsExample.NeuralNetworkArch,
        msgsExample.NeuralNetworkHyper,
        msgsExample.NeuralNetworkReset
    ]
}

