var Message = /** @class */ (function () {
    function Message(text, time, date, robotName, robotColor) {
        this._text = text;
        this._time = time;
        this._date = date;
        this._robotName = robotName;
        this._robotColor = robotColor;
    }
    Object.defineProperty(Message.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "time", {
        get: function () {
            return this._time;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "robotName", {
        get: function () {
            return this._robotName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "robotColor", {
        get: function () {
            return this._robotColor;
        },
        enumerable: false,
        configurable: true
    });
    return Message;
}());
export default Message;
