const {Wit, log} = require('node-wit');
const token = require('./TOKEN.json');
const State = Object.freeze({
    GET_OBJECTIVE : 1,
});

const TASKS = {
    task_reg: 'regression',
    task_class: 'classification', 
    task_nlp: 'NLP',
};

/**
 * Returns a matched sample dataset name and the relevant keywords
 * @param {string} subject 
 */
function matchSampleDataset(subject) {
    let sampleDataset = null;
    let matchedKeywords = null;
    return [sampleDataset, matchedKeywords];
}

/**
 * Returns most probable task identified, or null if none.
 * @param {Object} witResponse 
 */
function extractTask(witResponse) {
    let intents = witResponse.intents;
    let task = null;
    if (intents.length > 0) {
        let topIntent = intents[0];
        let topIntentName = topIntent.name;
        // If its a valid task, map to its equivalent task name
        if (topIntentName in TASKS) {
            task = TASKS[topIntentName];
        }
    }
    
    return task;
}

/**
 * Returns first subject entity identified, or null if none
 * @param {Object} witResponse 
 */
function extractSubject(witResponse) {
    let entities = witResponse.entities;
    let subject = null;
    if ("subject:subject" in entities) {
        let subjectArray = entities["subject:subject"];
        let subjectObject = subjectArray[0];
        subject = subjectObject["body"];
    }
    return subject;
}

class Conversation {
    wit;
    state = State.GET_OBJECTIVE;

    constructor() {
        this.wit = new Wit({
            accessToken: token.tester,
            logger: new log.Logger(log.DEBUG)
        });
    }

    async getWitResponse(msg) {
        const witResponse = await this.wit.message(msg);
        return witResponse;
    }

    responderMap = {
        [State.GET_OBJECTIVE] : this.attemptGetTask,
    }

    async respondTo(userMsg) {
        let responder = this.responderMap[this.state];
        const response = await responder(userMsg, this);
        return response;
    }

    async attemptGetTask(userMsg, context) {
        const responses = [];
        const witResponse = await context.getWitResponse(userMsg);
        console.log(witResponse);

        const task = extractTask(witResponse);
        const subject = extractSubject(witResponse);
        console.log(task);
        console.log(subject);

        const effectiveSubject = subject ? subject : userMsg;
        const [sampleDataset, matchedKeywords] = matchSampleDataset(effectiveSubject); // scan topic if exists
        console.log(sampleDataset);
        console.log(matchedKeywords);
        
        if (sampleDataset) {
            // OBTAIN CORRESPONDING TASK
            // we know task and dataset (sample) - "regression on boston housing data"
            // return here
            responses.push(`Awesome! We offer a sample dataset regarding ${matchedKeywords} if you'd like to use it.`);
        } else if (subject && task) {
            // we know task and dataset (custom) - "model the number of extinctions"
            responses.push(`Great! Sounds like a ${task} model could help you out with that.`);
        } else if (task) {
            // we know task but not dataset - "regression model"
            responses.push(`I think a ${task} model would help you explore that idea!`);
            responses.push(`Check out a few sample datasets if you'd like, or leave it blank to use your own data.`)
        } else {
            // we know neither task nor dataset - "create something cool"
            responses.push("Nice!");
            responses.push("Here are some pointers to help you figure out what type of machine learning task can help you with that.")
        }

        return responses;
    }

}

export default Conversation;