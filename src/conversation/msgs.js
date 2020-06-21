export const IntroQuestion = () => {
    return [
        "Hey there!",
        "My name's Otto, and I'm here to help you do some machine learning",
        "What are you looking to do?"
    ];
}

// export const SampleData = (topic) => {
//     return `We have some sample data for ${topic} if you'd like to use that`;
// }

export const TaskRecommendation = (task) => {
    return [
        `Neat idea!`,
        `I'd recommend a ${task.toLowerCase()} model to help you explore it`
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

export const DatasetPreface = (task) => {
    return [
        `Alright, ${task.toLowerCase()} it is!`,
        "Just letting you know, I have a few sample datasets you can model and visualize right from your browser",
        "Check them out if you'd like, or select Custom to use your own data",
    ];
}

export const DatasetRecommendation = (task) => {
    return [
        `Alright, ${task.toLowerCase()} it is!`,
        "I've preselected a dataset that seems to match what you're looking for",
        "Feel free to check out others, or select Custom you use your own data"
    ];
}

export const ModelPreface = () => {
    return [
        "Now that we have our machine learning task and dataset figured out, the next step is to select an appropriate model",
    ];
}

export const NLPModelInfo = () => {
    return [
        "Entity recognition is useful for extracting key information from text (like phone numbers, album names, and times)",
        "While sentiment analysis classifies expressions by their polarity (positive, negative, or neutral)",
    ]
}

export const RegressionModelQuestion = () => {
    return [
        "Could you describe the dependent variable in more detail?"
    ]
}

export const ClassificationModelQuestion = () => {
    return [
        "Could you describe the dataset in more detail?"
    ]
}

export const ModelRecommendation = (model) => {
    return [
        `In that case, I think a ${model} model would be perfect`
    ]
}

export const PreprocessorRecommendation = () => {
    return [
        "Based on what you've told me, I've gone ahead and setup some data preprocessors to help optimize the learning process"
    ]
}

export const NeuralNetworkPreface = () => {
    return [
        "Finally, we're ready to build and configure our neural network!",
        "I've made a basic feedforward network with 5 hidden layers and standard activations / initializers",
        "You can play with the model and customize it, or tell me what changes to make"
    ]
}

