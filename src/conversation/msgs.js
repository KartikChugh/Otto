export const IntroQuestion = () => {
    return [
        "Hey there!",
        "What would you like to do today?"
    ];
}

// export const SampleData = (topic) => {
//     return `We have some sample data for ${topic} if you'd like to use that`;
// }

export const TaskRecommendation = (task) => {
    return [
        `Sounds cool!`,
        `I'd recommend a ${task} model to help you explore that idea`
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
        "Here are some pointers to help you figure out what type of machine learning task to select",
        "Regression is used to model numerical variables, such as stock prices or infection rates, while classification predicts categorical outcomes, like whether an image is a cat or a dog or if a candidate will win or not", 
        "Natural language processing can do things like identify structures in text and figure out the tone behind an expression",
        "Whenever you’re ready, pick the task that seems like the best fit"
    ];
}

// TODO: use 
export const ModelPreface = () => {
    return [
        "Now that we have our machine learning task and dataset figured out, the next step is to select an appropriate model",
    ];
}

// TODO: use
export const NLPModelInfo = () => {
    return [
        "Entity recognition is useful for extracting key information from text (like phone numbers, album names, and times)",
        "While sentiment analysis classifies expressions by their polarity (positive, negative, or neutral)",
    ]
}

// TODO: use
export const RegressionModelQuestion = () => {
    return [
        "Could you describe the dependent variable in more detail?"
    ]
}
// TODO: use
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

// TODO: use
export const PreprocessorRecommendation = (preprocessors) => {
    return [
        "I've gone ahead and setup some data preprocessors to help optimize the learning process."
    ]
}

// TODO: use
export const NeuralNetworkPreface = () => {
    return [
        "Finally, we're ready to build and configure our neural network!",
        "I've made a basic classifier to start with, but you can adjust it to your needs"
    ]
}