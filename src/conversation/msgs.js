import { DatasetCategory, Tasks } from "state/StateTypes";
import { titleCase } from "title-case";
import * as msgsExample from "conversation/msgsExample";

export const IntroQuestion = () => {
  return [
    "Hey there!",
    "My name's Otto, and I'm here to help you with machine learning",
    `${msgsExample.Task}`,
    "What are you looking to do today?",
  ];
};

// export const SampleData = (topic) => {
//     return `We have some sample data for ${topic} if you'd like to use that`;
// }

export const TaskRecommendation = (task) => {
  return [
    `Neat idea! I recommend a ${task.toLowerCase()} model to help you explore it`,
  ];
};

// export const TaskAndSample = (task) => {
//     return [
//         `I think a ${task} model would help you explore that idea`,
//         "Check out a few sample datasets if you'd like, or leave it blank to use your own"
//     ]
// }

export const TaskInfo = () => {
  return [
    "Hmm..there may be more than one way to model that. Let's narrow it down.",
    "Regression is used to model numerical variables, like stock prices or infection rates",
    "Classification predicts categorical outcomes, (if an image is a cat or a dog, whether a candidate will win or not)",
    "Natural language processing can identify structure in text and figure out the tone behind an expression",
    "Pick the task that seems like the best fit!",
  ];
};

export const AdvanceFromTask = (task) => {
  return `Alright, ${task.toLowerCase()} it is!`;
};

export const DatasetPreface = () => {
  return [
    "I have some sample datasets you can visualize in-browser",
    "Check them out, or select “Custom” to use your own data",
  ];
};

export const DatasetPreRecommendation = () => {
  return [
    "I have selected a dataset that best matches your need",
    "Feel free to check out other datasets, or select “Custom” to use your own",
  ];
};

export const AdvanceFromDataset = (datasetCategory, sampleDataset) => {
  const isCustom = datasetCategory === DatasetCategory.CUSTOM;
  let str = isCustom
    ? `Going with custom data, then!`
    : `Going with the ${titleCase(sampleDataset)} dataset, then!`;
  return `${str}`;
};

export const ModelPreface = (task) => {
  let str =
    task === Tasks.NATURAL_LANGUAGE
      ? "the appropriate models"
      : "an appropriate model";
  return [`Now, let's select ${str}`];
};

export const ModelPreRecommendation = (model, nlp_models) => {
  if (nlp_models) {
    let str =
      nlp_models.length === 2
        ? "combining both analyses"
        : `${nlp_models[0].toLowerCase()}`;
    return `Now let's select an appropriate model - I think ${str} is the way to go`;
  }
  return `Now let's select an appropriate model - I think a ${model.toLowerCase()} algorithm is the way to go`;
};

export const NLPModelInfo = () => {
  return [
    "Entity recognition is useful for extracting key information from text (celebrity names, album titles, and times)",
    "Sentiment analysis can pick up on implied information, like expressions of thanks or how positive/negative a statement is",
    "You can combine both for a comprehensive analysis too!",
  ];
};

export const RegressionModelQuestion = () => {
  return [
    "What can you tell me about your dependent variable?",
    msgsExample.ModelRegression,
  ];
};

export const ClassificationModelQuestion = () => {
  return [
    "What can you tell me about your dataset?",
    msgsExample.ModelClassification,
  ];
};

export const ModelRecommendation = (model) => {
  return [`A ${model.toLowerCase()} model fits well here`];
};

export const AdvanceFromModel = (model) => {
  return [`Okay, we've got our ${model.toLowerCase()} model figured out`];
};

export const PreprocessorRecommendation = () => {
  return [
    "I've Otto-matically setup some data preprocessors to optimize learning, but feel free to adjust them",
  ];
};

export const NeuralNetworkPreface = () => {
  return [
    "Ready to design your neural network? Here's a basic model for classification",
    "You can play with the model and customize it, or tell me what changes to make",
    msgsExample.NeuralNetworkArch,
    msgsExample.NeuralNetworkHyper,
    msgsExample.NeuralNetworkReset,
  ];
};
