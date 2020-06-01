const State = Object.freeze({
    GET_TASK : 1,
    GET_TOPIC : 2,
})

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
        let response = "";

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
            response = `Great! Sounds like a ${task} model could help you out with that.`
        } else if (task) {
            // we know task but not dataset
            response = `I think a ${task} model would help you explore that idea!`
        } else {
            // we know neither task nor dataset
            response = "Hmm... I couldn't identify a specific machine learning task to help you.";
        }

        //     if (topic) {
        //         let sampleDataset = matchSampleDataset(userMsg);
        //         if (sampleDataset) {
        //             // TODO task = get task for sample
        //             // we know task and dataset (sample)
                    
        //         } else {
        //             // we know task and dataset (custom)
                    
        //         }
        //     } else {
        //         // we know task but NOT dataset
        //         response = "Great! We offer sample datasets to help you get started with. \
        //             Pick one if you'd like, or leave it blank to use your own data.";
        //     }
        // } else {
        //     let sampleDataset = matchSampleDataset(userMsg);
        //     if (sampleDataset) {
        //         // task = get task for sample
        //         // we know task and dataset (sample)

        //     } else {
        //         // we know NEITHER task nor dataset
        //         response = "Tf bro?"
        //     }
        // }

        return response;
    }

}

export default Conversation;