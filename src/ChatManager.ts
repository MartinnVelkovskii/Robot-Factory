import Message from "./Message"
import IChatManager from "../interfaces/IChatManager"
import Robot from "./Robot";

class ChatManager implements IChatManager {

    private _messages : Message[];
    private _showNewestMessegesFirst : boolean = true;

    constructor( messages : Message[]){

        this._messages = messages
    }

    get messages(): Message[] {
        return this._messages
    }

    getMessagesHtml(robot: Robot): string {
        let finalHtml : string = "";
        this._messages
          .filter((m) => m.date > robot.createdDate)
          .sort((a, b) => this._showNewestMessegesFirst ? b.date - a.date : a.date - b.date)
          .forEach((message) => (finalHtml += this.generateMessageHtml(message)));
      
        return finalHtml;
    }
      
    generateMessageHtml(message: Message): string {
        if (message.text != "") {
          return `<div><span class="message-name-style" style="color:${message.robotColor}">${message.robotName}</span> ${message.time}</div>
        <div class="message-text-style">${message.text}</div>`;
        } else {
          return "";
        }
    }


    addNewMessage(message: Message) {
        this._messages.push(message);
    }

    addNewHTMLMessage(message: Message, messagesSection : any): void {
        let messageHtml : string = this.generateMessageHtml(message);
        let currentMessagesHtml : string = messagesSection.innerHTML;
        messagesSection.innerHTML = messageHtml + currentMessagesHtml;
    }

    reverseMessages(robot : Robot) : void{
        this._showNewestMessegesFirst = !this._showNewestMessegesFirst
        const MSGSection = document.querySelector("#messagesSection")
        MSGSection.innerHTML = this.getMessagesHtml(robot);
    }

    saveToLocalStorage(message : Message) : void{
        
        const jsonMessages: any = JSON.parse(localStorage.getItem("messages"));
        let messages: Message[] = <Message[]>jsonMessages || [];
        messages.push(message)
        const messageJSON = messages.map(message=>message.toJsonString)
        localStorage.setItem("messages", "[" + messageJSON.toString() + "]");
    }

    static getLocalStorageMessages() : Message[] {
        const jsonMessages: any = JSON.parse(localStorage.getItem("messages"));
        let messages: Message[] = <Message[]>jsonMessages || [];
        return messages;
    }
}

export default ChatManager;