import React from "react";
import { ResponsiveEmbed } from "react-bootstrap";
import { useState } from "state/State";
import responseTo from "conversation/Respond"
const { Wit, log } = require("node-wit");
const token = require("TOKEN.json");

export default class Conversation /* extends React.Component */  {

    constructor(say) {
        // super();
        this.say = say;
        this.wit = new Wit({
            accessToken: token.tester,
            logger: new log.Logger(log.DEBUG),
        });
    }

    sayMessages = async (messages) => {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        for (let message of messages) {
            if (message != null) {
                await new Promise((r) => setTimeout(r, readWriteDelay(message)));
                this.say(message);
            }
        }
    };
    
    handleUserMessage = async (userMessage, state, dispatch) => {
        document.getElementsByClassName("rcw-sender")[0].message.value = "";
        console.log(`New message incoming! ${userMessage}`);
        console.log(state);

        // const [state, dispatch] = null;
        await this.sayMessages(
            await responseTo(userMessage, this.wit, state, dispatch)
        ); 
    };

    render() {
        return null;
    }

}

function readWriteDelay(msg) {
    const WPM = 500;
    const length = msg.length;
    const timeRead = (length / 3.5 / WPM) * 60 * 1000;
    return timeRead;
}