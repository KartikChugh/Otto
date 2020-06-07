import React from "react";

export default class Conversation extends React.Component {

    constructor(sayer) {
        super();
        this.say = sayer;
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
    
    handleUserMessage = (userMessage) => {
        document.getElementsByClassName("rcw-sender")[0].message.value = "";
        console.log(`New message incoming! ${userMessage}`);
        
        alert(userMessage);
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