import { tweets } from "static/datasets/tweets.js";
import { getWitResult } from "conversation/ConversationUtils";
import { titleCase } from "title-case";
import { ModelActions } from "state/ModelActions";
const { Wit } = require("node-wit");
const token = require("TOKEN.json");

const ottoNLP = new Wit({
  accessToken: token.nlp,
});

const rename = (name) => {
  name = name.split(":").pop().split("$").pop();
  name = titleCase(name);
  name = name.replace("Sentiment", "Polarity");
  return name;
};

const labelForSample = (sample, isTrait) => {
  const entityArr = [];
  const keyword = isTrait ? "value" : "body";
  for (const entityName in sample) {
    const matches = sample[entityName];
    const firstMatch = matches[0];
    const value = firstMatch[keyword];
    entityArr.push(rename(entityName) + ": " + value);
  }
  const entityLabel = entityArr.join(", ");
  return entityLabel;
};

/**
 * Generates array of data objects: {data: "string", entities: "string", sentiments: "string"}
 */
export const invokeNLP = async (doEntity, doSentiment, metadata, dispatch) => {
  // const texts = []
  // const entityLabels = []
  // const traitLabels = []
  dispatch({
    type: ModelActions.RUNNING,
  });
  const textData = metadata.data;
  const nlpData = [];
  let correctResults = 0;
  const numQueries = 10;
  for (let i = 0; i < numQueries; i++) {
    const nlpDatapoint = {};
    const text = textData[i][metadata.columns[0]]
      .trim()
      .replace("?|.|!|/|;|:|#|*", "");
    const resp = await getWitResult(ottoNLP, text);

    if (doEntity) {
      const entities = resp["entities"];
      const entityLabel = labelForSample(entities, false);
      //entityLabels.push(entityLabel);
      let entityTypeMap = [];
      if (entityLabel !== "") {
        const entityStrings = entityLabel.split(",");
        entityTypeMap = entityStrings.map((entString) => entString.split(":"));
      }
      nlpDatapoint.entities = entityTypeMap;
    }

    if (doSentiment) {
      const traits = resp["traits"];
      const traitLabel = labelForSample(traits, true);
      //traitLabels.push(traitLabel);
      if (traitLabel.toLowerCase().indexOf("negative") !== -1) {
        if (
          textData[i].hasOwnProperty("sentiment") &&
          textData[i].sentiment.toLowerCase() === "negative"
        ) {
          correctResults += 1;
        }
        nlpDatapoint.sentiments = "Negative";
      } else if (traitLabel.toLowerCase().indexOf("positive") !== -1) {
        if (
          textData[i].hasOwnProperty("sentiment") &&
          textData[i].sentiment.toLowerCase() === "positive"
        ) {
          correctResults += 1;
        }
        nlpDatapoint.sentiments = "Positive";
      } else {
        nlpDatapoint.sentiments = "Neutral";
      }
    }
    nlpDatapoint.data = text;
    nlpData.push(nlpDatapoint);
    //texts.push(text);
  }
  dispatch({
    type: ModelActions.NLP_DONE,
    datas: nlpData,
    results: [correctResults, numQueries],
  });
};
