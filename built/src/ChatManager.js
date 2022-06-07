var ChatManager = /** @class */ (function () {
    function ChatManager(messages) {
        this._messages = messages;
    }
    Object.defineProperty(ChatManager.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        enumerable: false,
        configurable: true
    });
    ChatManager.prototype.getMessagesHtml = function (robot) {
        var _this = this;
        var finalHtml = "";
        this._messages
            .filter(function (m) { return m.date > robot.createdDate; })
            .sort(function (a, b) { return b.date - a.date; })
            .forEach(function (message) { return (finalHtml += _this.generateMessageHtml(message)); });
        return finalHtml;
    };
    ChatManager.prototype.generateMessageHtml = function (message) {
        if (message.text != "") {
            return "<div><span class=\"message-name-style\" style=\"color:".concat(message.robotColor, "\">").concat(message.robotName, "</span> ").concat(message.time, "</div>\n        <div class=\"message-text-style\">").concat(message.text, "</div>");
        }
        else {
            return "";
        }
    };
    ChatManager.prototype.addNewMessage = function (message) {
        this._messages.push(message);
    };
    ChatManager.prototype.addNewHTMLMessage = function (message, messagesSection) {
        var messageHtml = this.generateMessageHtml(message);
        var currentMessagesHtml = messagesSection.innerHTML;
        messagesSection.innerHTML = messageHtml + currentMessagesHtml;
    };
    ChatManager.prototype.reverseMessages = function () {
        this._messages.reverse();
    };
    return ChatManager;
}());
export default ChatManager;
