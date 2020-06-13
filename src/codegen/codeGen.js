import * as importsCode from "codegen/importsCode";
import * as regressionCode from "codegen/regressionCode"
import * as knnCode from "codegen/knnCode";
import * as sharedCode from "codegen/sharedCode";
import {Models, DatasetCategory} from "state/StateTypes";
import { networkCode } from "codegen/networkCode";
import { FeedforwardNN } from "nn-architecture/Network";
const StringBuilder = require("string-builder");

export const codeGen = (state) => {

    const sb = new StringBuilder();
    sb.append(importsCode.standardImportsCode());

    // model-specific imports
    switch(state.model) {
        case Models.KNN:
            sb.appendLine(importsCode.knnImportsCode());
            break;
        case Models.NEURAL_NETWORK_FF:
            sb.appendLine(importsCode.nnImportsCode());
            break;
        case Models.LINEAR_REGRESSION:
            sb.appendLine(importsCode.linearImportsCode());
            break;
        case Models.ORDINAL_REGRESSION:
            sb.appendLine(importsCode.ordinalImportsCode());
            break;
        case Models.POISSON_REGRESSION:
            sb.appendLine(importsCode.poissonImportsCode());
            break;
    } 

    // import sklearn datasets
    switch (state.dataset_category) {
        case DatasetCategory.SAMPLE:
            sb.appendLine(importsCode.datasetsImportCode());
            break;
    }

    // defines loadData function
    switch (state.dataset_category) {
        case DatasetCategory.SAMPLE:
            sb.appendLine(sharedCode.loadSampleDatasetFunctionCode(state.sample_dataset));
            break;
        case DatasetCategory.CUSTOM:
            sb.appendLine(sharedCode.loadDataFunctionCode());
            break;
    }

    // defines model params
    switch (state.model) {
        case Models.KNN:
            sb.appendLine(knnCode.knnParamsCode(7)); // TODO: replace with number of neighbors
            break;
        case Models.LINEAR_REGRESSION:
            sb.appendLine(regressionCode.regressionParamsCode(5)); // TODO: replace with feature column
            break;
    }

    // loads data
    sb.appendLine(sharedCode.loadDataCode());

    // slices data
    switch (state.model) {
        case Models.KNN:
            sb.appendLine(knnCode.knnSliceCode());
            break;
        case Models.ORDINAL_REGRESSION:
        case Models.POISSON_REGRESSION:
        case Models.LINEAR_REGRESSION:
            sb.appendLine(regressionCode.regressionSliceCode());
            break;
    }

    // splits training/testing sets
    sb.appendLine(sharedCode.splitDataCode()); // TODO: exempt nlp

    // fits model
    switch (state.model) {
        case Models.KNN:
            sb.appendLine(knnCode.knnModelCode());
            break;
        case Models.NEURAL_NETWORK_FF:
            sb.appendLine(networkCode.networkCode(new FeedforwardNN())); // TODO: replace with NN
            break;
        case Models.LINEAR_REGRESSION:
            sb.appendLine(regressionCode.linearModelCode());
            break;
        case Models.ORDINAL_REGRESSION:
            sb.appendLine(regressionCode.ordinalModelCode());
            break;
        case Models.POISSON_REGRESSION:
            sb.appendLine(regressionCode.poissonModelCode());
            break;
    }

    return sb.toString();
}

