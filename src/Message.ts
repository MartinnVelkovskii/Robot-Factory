class Message {
  private _text: string;
  private _time: string;
  private _date: number;
  private _robotName: string;
  private _robotColor: string;

  constructor(
    text: string,
    time: string,
    date: number,
    robotName: string,
    robotColor: string
  ) {
    this._text = text;
    this._time = time;
    this._date = date;
    this._robotName = robotName;
    this._robotColor = robotColor;
  }

  get text(): string {
    return this._text;
  }

  get time(): string {
    return this._time;
  }

  get date(): number {
    return this._date;
  }

  get robotName(): string {
    return this._robotName;
  }

  get robotColor(): string {
    return this._robotColor;
  }

  toJsonString(): string {
    let json = JSON.stringify(this);
    Object.keys(this).filter(key => key[0] === "_").forEach(key => {
        json = json.replace(key, key.substring(1));
    });

    return json;
  }

}

export default Message;
