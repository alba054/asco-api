export abstract class DBConfig {
  DB_URI: string;

  constructor(DB_URI: string) {
    this.DB_URI = DB_URI;
  }

  abstract load(): void;
}
