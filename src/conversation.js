const State = Object.freeze({
    GET_TASK : 1,
    GET_TOPIC : 2,
})

function getWitResponse(msg) {
    return {task: 0, subject: 1};
}

class Conversation {

    state = State.GET_TASK;

    responderMap = {
        [State.GET_TASK] : this.attemptGetTask,
    }

    respondTo(userMsg) {
        let response = "";
        let responder = this.responderMap[this.state];
        response = responder(userMsg);
        return response;
    }

    attemptGetTask(userMsg) {
        const responses = [];

        let witResponse = {};
        let task = null; //witResponse.getTask();
        let topic = null; // witResponse.getTopic();
        let sampleDataset = false; //matchSampleDataset(topic ? topic : userMsg); // scan topic if exists
        if (sampleDataset) {
            // OBTAIN CORRESPONDING TASK
            // we know task and dataset (sample)
            // return here
        }

        if (topic && task) {
            // we know task and dataset (custom)
            responses.push(`Great! Sounds like a ${task} model could help you out with that.`);
        } else if (task) {
            // we know task but not dataset
            responses.push(`I think a ${task} model would help you explore that idea!`);
            responses.push(`Check out a few sample datasets if you'd like, or leave it blank to use your own data.`)
        } else {
            // we know neither task nor dataset
            responses.push("Nice!");
            responses.push("Here are some pointers to help you figure out what type of machine learning task can help you with that.")
        }

        return responses;
    }

}

export default Conversation;