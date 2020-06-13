import * as importsCode from "codegen/importsCode";
import * as regressionCode from "codegen/regressionCode"
import * as knnCode from "codegen/knnCode";
import * as sharedCode from "codegen/sharedCode";
import {Models, DatasetCategory} from "state/StateTypes";
import { networkCode } from "nn-architecture/networkCode";
import { FeedforwardNN } from "nn-architecture/Network";
const StringBuilder = require("string-builder");

const codeGen = (state) => {

    const sb = new StringBuilder();
    sb.appendLine(importsCode.standardImportsCode());

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

    switch (state.dataset_category) {
        case DatasetCategory.SAMPLE:
            sb.appendLine(importsCode.datasetsImportCode());
            break;
    }

    sb.appendLine();
    sb.appendLine();

    switch (state.dataset_category) {
        case DatasetCategory.SAMPLE:
            sb.appendLine(sharedCode.loadSampleDatasetFunctionCode(state.sample_dataset));
            break;
        case DatasetCategory.CUSTOM:
            sb.appendLine(sharedCode.loadDataFunctionCode());
            break;
    }
    }


}

