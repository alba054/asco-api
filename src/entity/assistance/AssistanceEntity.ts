export class AssistanceEntity {
  private _id?: string | undefined;
  private _status: boolean;
  private _date?: number | undefined;
  private _note?: string | undefined;

  constructor(
    status: boolean,
    args?: {
      id?: string;
      date?: number;
      note?: string;
    }
  ) {
    this._status = status;
    this.id = args?.id;
    this.date = args?.date;
    this.note = args?.note;
  }

  public get note(): string | undefined {
    return this._note;
  }
  public set note(value: string | undefined) {
    this._note = value;
  }

  public get date(): number | undefined {
    return this._date;
  }
  public set date(value: number | undefined) {
    this._date = value;
  }

  public get status(): boolean {
    return this._status;
  }
  public set status(value: boolean) {
    this._status = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
