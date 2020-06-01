const State = Object.freeze({
    GET_TASK : 1,
    GET_TOPIC : 2,
})

class Conversation {

    state = State.GET_TASK;

    responderMap = {
        [State.GET_TASK] : this.responderGetTask,
    }

    respondTo(msg) {

        let response = "";
        let responder = this.responderMap[this.state];
        response = responder(msg);

        return response;
    }

    responderGetTask(msg) {
        return msg;
    }

}

export default Conversation;