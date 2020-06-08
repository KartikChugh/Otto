import React from "react";
import { ResponsiveEmbed } from "react-bootstrap";
import { useState } from "state/State";
import responseTo from "conversation/Respond"

export default class Conversation extends React.Component  {

    constructor(say) {
        super();
        this.say = say;
    }

    sayMessages = async (messages) => {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        for (const message of messages) {
            await new Promise((r) => setTimeout(r, readWriteDelay(message)));
            this.say(message);
        }
    };
    
    handleUserMessage = async (userMessage) => {
        document.getElementsByClassName("rcw-sender")[0].message.value = "";
        console.log(`New message incoming! ${userMessage}`);

        const [state, dispatch] = null;
        await this.say(responseTo(userMessage, state, dispatch)); // responseTo is async function in another file
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