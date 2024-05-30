import { PrismaClient } from "@prisma/client";
import { DBConfig } from "./DBConfig";
import { CONFIG_ENV } from "../env";

class PrismaORMDBConfig extends DBConfig {
  db: PrismaClient | null;

  constructor() {
    super(CONFIG_ENV.DATABASE_URL ?? "");
    this.db = this.db = new PrismaClient();
  }

  load(): void {
    this.db = new PrismaClient();
  }
}

export const prismaDb = new PrismaORMDBConfig();
