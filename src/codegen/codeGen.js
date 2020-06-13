import * as importsCode from "codegen/importsCode";
import * as regressionCode from "codegen/regressionCode"
import * as knnCode from "codegen/knnCode";
import * as sharedCode from "codegen/sharedCode";
import {Models, DatasetCategory} from "state/StateTypes";
const StringBuilder = require("string-builder");

const codeGen = (state) => {

    const sb = new StringBuilder();
    sb.appendLine(importsCode.standardImportsCode());

    switch(state.model) {
        case Models.KNN:
            sb.appendLine(importsCode.knnImportsCode());
        case Models.NEURAL_NETWORK_FF:
            sb.appendLine(importsCode.nnImportsCode());
        case Models.LINEAR_REGRESSION:
            sb.appendLine(importsCode.linearImportsCode());
        case Models.ORDINAL_REGRESSION:
            sb.appendLine(importsCode.ordinalImportsCode());
        case Models.POISSON_REGRESSION:
            sb.appendLine(importsCode.poissonImportsCode());
    } 



}

