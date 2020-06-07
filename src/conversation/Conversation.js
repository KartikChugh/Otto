export default class Conversation {

    constructor(respond) {
        this.respond = respond;
    }

    say = (...messages) => {
        messages.forEach(message =>
            console.log(message) // TODO: fix
        );
    };
    
    handleUserMessage = (userMessage) => {
        document.getElementsByClassName("rcw-sender")[0].message.value = "";
        console.log(`New message incoming! ${userMessage}`);
        
        
    };

}