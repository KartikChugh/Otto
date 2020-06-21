import { tweets } from "static/datasets/tweets.js";

const { Wit, log } = require("node-wit");
const token = require("TOKEN.json");

const ottoNLP = new Wit({
  accessToken: token.nlp,
});

export const invokeNLP = (doEntity, doSentiment) => {
  alert(tweets.length);
};
