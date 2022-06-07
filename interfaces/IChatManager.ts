import Robot1 from "../src/Robot";
import Message from "../src/Message";
interface IChatManager {
  getMessagesHtml(robot: Robot1): string;
  generateMessageHtml(message: Message): string;
  addNewHTMLMessage(message: Message, messagesSection: any): void;
}

export default IChatManager;
