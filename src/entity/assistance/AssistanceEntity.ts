import { ControlCardEntity } from "../controlCard/ControlCardEntity";

export class AssistanceEntity {
  private _id?: string | undefined;
  private _status: boolean;
  private _date?: number | undefined;
  private _note?: string | undefined;
  private _controlCard?: ControlCardEntity | undefined;

  constructor(
    status: boolean,
    args?: {
      id?: string;
      date?: number;
      note?: string;
      CC?: ControlCardEntity;
    }
  ) {
    this._status = status;
    this.id = args?.id;
    this.date = args?.date;
    this.note = args?.note;
    this.controlCard = args?.CC;
  }

  public get controlCard(): ControlCardEntity | undefined {
    return this._controlCard;
  }
  public set controlCard(value: ControlCardEntity | undefined) {
    this._controlCard = value;
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
