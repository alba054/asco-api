import { DBConfig } from "./DBConfig";

function connectDatabase(db: DBConfig) {
  db.load();
}

export default connectDatabase;
