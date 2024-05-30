import bcryptjs from "bcryptjs";
import { CONFIG_ENV } from "../env";
import { HashAbstract } from "./HashAbstract";

class BcryptImpl extends HashAbstract {
  private salt: string | number;

  constructor(salt: number) {
    super();
    this.salt = bcryptjs.genSaltSync(salt);
  }

  async compare(s1: string, s2: string): Promise<boolean> {
    return bcryptjs.compare(s1, s2);
  }

  compareSync(s1: string, s2: string): boolean {
    return bcryptjs.compareSync(s1, s2);
  }

  async hash(s: string): Promise<string> {
    return bcryptjs.hash(s, this.salt);
  }

  hashSync(s: string): string {
    return bcryptjs.hashSync(s, this.salt);
  }
}

export const bcryptHash = new BcryptImpl(
  parseInt(CONFIG_ENV.HASH_SALT ?? "10")
);
