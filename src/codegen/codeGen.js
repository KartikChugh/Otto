import * as importsCode from "codegen/importsCode";
import * as regressionCode from "codegen/regressionCode"
import * as knnCode from "codegen/knnCode";
import * as sharedCode from "codegen/sharedCode";
import {Models} from "state/StateTypes";
const StringBuilder = require("string-builder");

const codeGen = (state) => {

    const sb = new StringBuilder();
    sb.appendLine(importsCode.standardImportsCode());

}