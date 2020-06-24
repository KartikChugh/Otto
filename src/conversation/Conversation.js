import {responseToMessage} from "conversation/RespondMessage";
import {responseToState} from "conversation/RespondState";
const { Wit, log } = require("node-wit");
const token = require("TOKEN.json");

export default class Conversation {

    constructor(say) {
        this.ottoTask = new Wit({
            accessToken: token.task,
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
    
    handleUserMessage = async (userMessage, state, dispatch, nn_state, nn_dispatch) => {
        document.getElementsByClassName("rcw-sender")[0].message.value = "";
        console.log(`handleUserMessage in Conversation: ${userMessage}`);
        console.log("State: ", state);

        return await responseToMessage(userMessage, this.wits, state, dispatch, nn_state, nn_dispatch);
    };

    handleStateAdvance = (state) => {
        console.log(`handleStateAdvance in Conversation: ${state}`);

        return responseToState(state);
    };

}

