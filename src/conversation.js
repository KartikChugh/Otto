const {Wit, log} = require('node-wit');
const token = require('./TOKEN.json');
const State = Object.freeze({
    GET_TASK : 1,
    GET_TOPIC : 2,
})

class Conversation {
    wit;
    state = State.GET_TASK;

    constructor() {
        this.wit = new Wit({
            accessToken: token.tester,
            logger: new log.Logger(log.DEBUG)
        });
    }

    async getWitResponse(msg) {
        const witResponse = await this.wit.message(msg);
        return JSON.stringify(witResponse);
    }

    responderMap = {
        [State.GET_TASK] : this.attemptGetTask,
    }

    async respondTo(userMsg) {
        let responder = this.responderMap[this.state];
        const response = await responder(userMsg, this);
        return response;
    }

    async attemptGetTask(userMsg, context) {
        const responses = [];
        const witResponse = await context.getWitResponse();
        responses.push(witResponse);
        return responses;
        //thiz.getWitResponse("hey");

        // thiz.getWitResponse(userMsg)
        // .then((witResponse) => {
        //     responses.push(witResponse);
        //     return responses;
        // });
        
        // let task = null; //witResponse.getTask();
        // let topic = null; // witResponse.getTopic();
        // let sampleDataset = false; //matchSampleDataset(topic ? topic : userMsg); // scan topic if exists
        // if (sampleDataset) {
        //     // OBTAIN CORRESPONDING TASK
        //     // we know task and dataset (sample)
        //     // return here
        // }

        // if (topic && task) {
        //     // we know task and dataset (custom)
        //     responses.push(`Great! Sounds like a ${task} model could help you out with that.`);
        // } else if (task) {
        //     // we know task but not dataset
        //     responses.push(`I think a ${task} model would help you explore that idea!`);
        //     responses.push(`Check out a few sample datasets if you'd like, or leave it blank to use your own data.`)
        // } else {
        //     // we know neither task nor dataset
        //     responses.push("Nice!");
        //     responses.push("Here are some pointers to help you figure out what type of machine learning task can help you with that.")
        // }
    }

}

export default Conversation;