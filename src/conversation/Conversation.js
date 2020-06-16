import {responseToMessage, responseToState} from "conversation/Respond";
const { Wit, log } = require("node-wit");
const token = require("TOKEN.json");

export default class Conversation /* extends React.Component */  {

    constructor(say) {
        // super();
        this.say = say;
        this.ottoTask = new Wit({
            accessToken: token.task_tester,
        });
        this.ottoModel = new Wit({
            accessToken: token.model,
        });
        this.ottoNN = new Wit({
            accessToken: token.nn,
        });
        this.wits = {
            task: this.ottoTask,
            model: this.ottoModel,
            nn: this.ottoNN,
        };
    }

    sayMessages = async (messages) => {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        for (let message of messages) {
            if (message != null) {
                await new Promise((r) => setTimeout(r, writeDelay(message)));
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
            await responseToMessage(userMessage, this.wits, state, dispatch)
        ); 
    };

    handleStateAdvance = (state) => {
        console.log(`State has been advanced!`);
        console.log(state);

        this.sayMessages(
            responseToState(state)
        );
    };

    render() {
        return null;
    }

}

function writeDelay(msg) {
    const WPM = 300;
    const length = msg.length;
    const timeRead = (length / 3.5 / WPM) * 60 * 1000;
    return timeRead < 2500 ? timeRead : 2500;
}