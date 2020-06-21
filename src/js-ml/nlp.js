import { tweets } from "static/datasets/tweets.js";
import { getWitResult} from "conversation/ConversationUtils";
import { titleCase } from "title-case";
const { Wit, log } = require("node-wit");
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
    const keyword = isTrait ? "value" : body;
    for (const entityName of sample) {
        const matches = entities[entityName];
        const firstMatch = matches[0];
        const value = firstMatch[keyword];
        entityArr.push(rename(entityName) + ": " + value);
    }
    const entityLabel = entityArr.join(", ");
    return entityLabel;
}

export const invokeNLP = async (doEntity, doSentiment) => {
    const texts = []
    const entityLabels = []
    const traitLabels = []

    tweets.forEach(async tweetData => {
        const text = tweetData["SentimentText"].trim().replace("\?|\.|\!|\/|\;|\:|\#|\*", "");
        //const resp = await getWitResult(text);

        // if (doEntity) {
        //     const entities = resp["entities"];
        //     const entityLabel = labelForSample(entities, false);
        //     entityLabels.push(entityLabel);
        // }

        // if (doSentiment) {
        //     const traits = resp["traits"];
        //     const traitLabel = labelForSample(traits, true);
        //     traitLabels.push(traitLabel);
        // }
        await new Promise(res => setTimeout(res, 25));
        texts.push(text)
    });
    console.log(texts);
    console.log(entityLabels);
    console.log(traitLabels);
} 