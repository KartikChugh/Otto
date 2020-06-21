const { Wit, log } = require("node-wit");
const token = require("TOKEN.json");
import { tweets } from "/static/datasets/tweets.js"

this.ottoNLP = new Wit({
    accessToken: token.nlp,
});

export const invokeNLP = (doEntity, doSentiment) => {
    alert(tweets.length);
} 