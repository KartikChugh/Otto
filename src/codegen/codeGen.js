import * as importsCode from "codegen/importsCode";
import * as regressionCode from "codegen/regressionCode"
import * as knnCode from "codegen/knnCode";
import * as sharedCode from "codegen/sharedCode";
import * as preprocessCode from "codegen/preprocessCode";
import {Models, DatasetCategory, Preprocessors} from "state/StateTypes";
import * as networkCode from "codegen/networkCode";
import { FeedforwardNN } from "nn-architecture/Network";
const StringBuilder = require("string-builder");

export const codeGen = (state) => {

    const sb = new StringBuilder();
    sb.append(importsCode.universal());

    // model-specific imports
    switch(state.model) {
        case Models.KNN:
            sb.appendLine(importsCode.knn());
            break;
        case Models.NEURAL_NETWORK_FF:
            sb.appendLine(importsCode.nn());
            break;
        case Models.LINEAR_REGRESSION:
            sb.appendLine(importsCode.linear());
            break;
        case Models.ORDINAL_REGRESSION:
            sb.appendLine(importsCode.ordinal());
            break;
        case Models.POISSON_REGRESSION:
            sb.appendLine(importsCode.poisson());
            break;
    } 

    // preprocessor imports
    if (state.preprocessors.includes(Preprocessors.NORMALIZATION)) {
        sb.appendLine(importsCode.normalization());
    }
    if (state.preprocessors.includes(Preprocessors.PCA)) {
        sb.appendLine(importsCode.pca());
    }

    // import sklearn datasets
    switch (state.dataset_category) {
        case DatasetCategory.SAMPLE:
            sb.appendLine(importsCode.sklearnDatasets());
            break;
    }

    sb.appendLine();

    // defines loadData function
    switch (state.dataset_category) {
        case DatasetCategory.SAMPLE:
            sb.appendLine(sharedCode.defineLoadDataset(state.sample_dataset));
            break;
        case DatasetCategory.CUSTOM:
            sb.appendLine(sharedCode.defineLoadUnspecified());
            break;
    }

    sb.appendLine();

    // defines params
    sb.appendLine(params(state));

    sb.appendLine();

    // loads data
    sb.appendLine(sharedCode.load());

    // scales data
    if (state.preprocessors.includes(Preprocessors.NORMALIZATION)) {
        sb.appendLine(preprocessCode.normalization());
    }

    // slices data (feature selection OR pca)
    sb.appendLine(sliceData(state));

    // splits training/testing sets
    sb.appendLine(sharedCode.split()); // TODO: exempt nlp

    sb.appendLine();

    // fits model
    switch (state.model) {
        case Models.KNN:
            sb.appendLine(knnCode.model());
            break;
        case Models.NEURAL_NETWORK_FF:
            sb.appendLine(networkCode.model(new FeedforwardNN())); // TODO: replace with NN
            break;
        case Models.LINEAR_REGRESSION:
            sb.appendLine(regressionCode.modelLinear());
            break;
        case Models.ORDINAL_REGRESSION:
            sb.appendLine(regressionCode.modelOrdinal());
            break;
        case Models.POISSON_REGRESSION:
            sb.appendLine(regressionCode.modelPoisson());
            break;
    }

    return sb.toString();
}

const componentsForModel = (model) => {
    switch (model) {
        case Models.KNN:
            return 2;
        case Models.NEURAL_NETWORK_FF:
            return "None";
        case Models.ORDINAL_REGRESSION:
        case Models.POISSON_REGRESSION:
        case Models.LINEAR_REGRESSION:
            return 1;
    }
}

const params = (state) => {

    if (state.preprocessors.includes(Preprocessors.PCA)) {
        const components = componentsForModel(state.model);
        return preprocessCode.paramsPca(components);
    }

    switch (state.model) {
        case Models.KNN:
            return knnCode.params(7); // TODO: replace with number of neighbors
        case Models.LINEAR_REGRESSION:
            return regressionCode.params(5); // TODO: replace with feature column
    }
    
}

const sliceData = (state) => {

    if (state.preprocessors.includes(Preprocessors.PCA)) {
        return preprocessCode.pca();
    }

    switch (state.model) {
        case Models.KNN:
            return knnCode.slice();
        case Models.ORDINAL_REGRESSION:
        case Models.POISSON_REGRESSION:
        case Models.LINEAR_REGRESSION:
            return regressionCode.slice();
    }
    
}

// const normalizationWithoutPCA = (preprocessors) => {
//     return (preprocessors.includes(Preprocessors.NORMALIZATION) &&
//         !preprocessors.includes(Preprocessors.PCA)
//     );
// }

