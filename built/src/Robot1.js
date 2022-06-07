var Robot1 = /** @class */ (function () {
    function Robot1(name, color, type, phrase, options, ceatedDate) {
        this._name = name;
        this._color = color;
        this._type = type;
        this._phrase = phrase;
        this._options = options;
        this._createdDate = ceatedDate;
    }
    Object.defineProperty(Robot1.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Robot1.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Robot1.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Robot1.prototype, "phrase", {
        get: function () {
            return this._phrase;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Robot1.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Robot1.prototype, "createdDate", {
        get: function () {
            return this._createdDate;
        },
        enumerable: false,
        configurable: true
    });
    return Robot1;
}());
export default Robot1;
