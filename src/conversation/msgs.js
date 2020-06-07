export const Intro = () => {
    return [
        "Hey there!",
        "What would you like to do today?"
    ];
}

export const SampleData = (topic) => {
    return `We have some sample data for ${topic} if you'd like to use that`;
}

export const Task = (task) => {
    return `Sounds like a ${task} model could help you out with that`
}

export const TaskAndSample = (task) => {
    return [
        `I think a ${task} model would help you explore that idea`,
        "Check out a few sample datasets if you'd like, or leave it blank to use your own"
    ]
}

export const TaskInfo = () => {
    return [
        "Here are some pointers to help you figure out what type of machine learning task to select",
        "Regression is used to model numerical variables, such as stock prices or infection rates, while classification predicts categorical outcomes, like whether an image is a cat or a dog or if a candidate will win or not", 
        "Natural language processing can do things like identify structures in text and figure out the tone behind an expression",
        "Whenever you’re ready, pick a task to get started!"

    ]
}