class Robot {
  private _name: string;
  private _color: string;
  private _type: any;
  private _phrase: string;
  private _options: {
    option1 : false;
    option2 : false;
    option3 : false;
  };
  private _createdDate: number;

  constructor(
    name: string,
    color: string,
    type: any,
    phrase: string,
    options : any,
    ceatedDate: number
  ) {
    this._name = name;
    this._color = color;
    this._type = type;
    this._phrase = phrase;
    this._options = options;
    this._createdDate = ceatedDate;
  }

  get name(): string {
    return this._name;
  }

  get color(): string {
    return this._color;
  }
  get type(): any {
    return this._type;
  }
  get phrase(): string {
    return this._phrase;
  }
  get options(): any {
    return this._options;
  }
  get createdDate(): number {
    return this._createdDate;
  }

  toJsonString(): string {
    let json = JSON.stringify(this);
    Object.keys(this).filter(key => key[0] === "_").forEach(key => {
        json = json.replace(key, key.substring(1));
    });

    return json;
}

}
export default Robot;
