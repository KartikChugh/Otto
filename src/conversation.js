const StateEnum = Object.freeze({
    GET_TASK : 1,
    GET_TOPIC : 2,
})

class Conversation {

    state = StateEnum.GET_TASK;

    // constructor() {
    //     state = StateEnum.GET_TASK;
    // }

    respondTo(msg) {

        let response = "";

        switch (this.state) {
            case StateEnum.GET_TASK:
                response = msg;
                break;
            
        }

        return response;
    }

}

export default Conversation;