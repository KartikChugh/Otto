import { StepperState, Tasks, Models, Preprocessors } from "state/StateTypes";
import * as msgs from "conversation/msgs";
import { Actions } from "state/Actions";

export const responseToState = (state) => {
  switch (state.stepper_state) {
    // case StepperState.TASK:
    //     return taskStep(userMessage, wits.task, state, dispatch);
    case StepperState.DATASET:
      return dataStep(state);
    case StepperState.MODEL:
      return modelStep(state);
    case StepperState.PREPROCESSORS:
      return preprocessorsStep(state);
    case StepperState.VISUALIZE:
      return visualizeStep(state);
    default:
      break;
  }
};

const dataStep = (state) => {
  console.log("RESPOND STATE -- DATA STEP");

  const responses = [];
  responses.push(msgs.AdvanceFromTask(state.task));

  const isRecommended =
    state.dataset_category_otto &&
    state.dataset_category_otto === state.dataset_category;
  console.log("isRecommended? ", isRecommended);

  if (isRecommended) {
    responses.push(msgs.DatasetPreRecommendation());
  } else {
    responses.push(msgs.DatasetPreface());
  }

  return responses;
};

const modelStep = (state) => {
  console.log("RESPOND STATE -- MODEL STEP");

  const responses = [];
  responses.push(
    msgs.AdvanceFromDataset(state.dataset_category, state.sample_dataset)
  );

  const isRecommendedSupervised =
    state.task !== Tasks.NATURAL_LANGUAGE &&
    state.model_otto &&
    state.model_otto === state.model;
  const isRecommendedNLP =
    state.task === Tasks.NATURAL_LANGUAGE &&
    state.nlp_models_otto.length > 0 &&
    state.nlp_models_otto.length === state.nlp_models.length;
  console.log("isRecommended? ", isRecommendedSupervised, isRecommendedNLP);

  if (isRecommendedSupervised) {
    responses.push(msgs.ModelPreRecommendation(state.model));
  } else if (isRecommendedNLP) {
    responses.push(msgs.NLPModelInfo());
    responses.push(msgs.ModelPreRecommendation(null, state.nlp_models));
  } else {
    responses.push(msgs.ModelPreface(state.task));
    switch (state.task) {
      case Tasks.CLASSIFICATION:
        responses.push(msgs.ClassificationModelQuestion());
        break;
      case Tasks.REGRESSION:
        responses.push(msgs.RegressionModelQuestion());
        break;
      case Tasks.NATURAL_LANGUAGE:
        responses.push(msgs.NLPModelInfo());
        break;
      default:
        break;
    }
  }
  return responses;
};

const preprocessorsStep = (state) => {
  return [msgs.AdvanceFromModel(state.task), msgs.PreprocessorRecommendation()];
};

/** Note: this is called from the reducer */
export const preprocessorsModifier = (state) => {
  // dispatch({
  //     type: Actions.SET_MODEL,
  //     model: Models.KNN,
  // })
  if (state.task === Tasks.NATURAL_LANGUAGE) {
    state.preprocessors = [Preprocessors.TEXT_CLEANING];
    state.preprocessors_otto = [...state.preprocessors];
    // dispatch({
    //     type: Actions.CLEAR_PREPROCESSORS_INCLUDING_OTTO,
    // });
    // dispatch({
    //     type: Actions.TOGGLE_PREPROCESSOR,
    //     preprocessor: Preprocessors.TEXT_CLEANING,
    // });
    // dispatch({
    //     type: Actions.TOGGLE_PREPROCESSOR_OTTO,
    //     preprocessor: Preprocessors.TEXT_CLEANING,
    // });
  } else {
    switch (state.model) {
      case Models.LINEAR_REGRESSION:
      case Models.POISSON_REGRESSION:
      case Models.ORDINAL_REGRESSION:
        state.preprocessors = [Preprocessors.NORMALIZATION, Preprocessors.PCA];
        break;
      case Models.KNN:
        state.preprocessors = [Preprocessors.NORMALIZATION];
        break;
      case Models.NEURAL_NETWORK_FF:
        state.preprocessors = [Preprocessors.NORMALIZATION, Preprocessors.PCA];
        break;
      default:
        break;
    }
    state.preprocessors_otto = [...state.preprocessors];
  }
  return state;
};

const visualizeStep = (state) => {
  if (state.model === Models.NEURAL_NETWORK_FF) {
    return msgs.NeuralNetworkPreface();
  }
};
