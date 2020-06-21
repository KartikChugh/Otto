import { tweets } from "static/datasets/tweets.js";
import { getWitResult} from "conversation/ConversationUtils";
import { titleCase } from "title-case";
const { Wit } = require("node-wit");
const token = require("TOKEN.json");

const ottoNLP = new Wit({
    accessToken: token.nlp,
});

const rename = (name) => {
    name = name.split(":").pop().split("$").pop();
    name = titleCase(name);
    name = name.replace("Sentiment", "Polarity")
    return name;
}

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
}

/**
 * Generates array of data objects: {data: "string", entities: "string", sentiments: "string"}
 */
export const invokeNLP = async (doEntity, doSentiment) => {
    // const texts = []
    // const entityLabels = []
    // const traitLabels = []

    const nlpData = []

    for (let i = 0; i < 15; i++) {
        const nlpDatapoint = {};
        const tweetData = tweets[i];
        const text = tweetData["SentimentText"].trim().replace("\?|\.|\!|\/|\;|\:|\#|\*", "");
        const resp = await getWitResult(ottoNLP, text);

        if (doEntity) {
            const entities = resp["entities"];
            const entityLabel = labelForSample(entities, false);
            //entityLabels.push(entityLabel);
            nlpDatapoint.entities = entityLabel;
        }

        if (doSentiment) {
            const traits = resp["traits"];
            const traitLabel = labelForSample(traits, true);
            //traitLabels.push(traitLabel);
            nlpDatapoint.sentiments = traitLabel;
        }
        nlpDatapoint.data = text;
        nlpData.push(nlpDatapoint);
        //texts.push(text);

    }
    
}  