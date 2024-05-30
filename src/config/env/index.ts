import dotenv from "dotenv";
import { constants } from "../../utils";

dotenv.config();

export const CONFIG_ENV = {
  DATABASE_URL: process.env.DATABASE_URL,
  HASH_SALT: process.env.HASH_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  ISSUER: process.env.ISSUER,
  ACCESS_TOKEN_CLAIMS: {
    expiresIn: constants.ACCESS_TOKEN_EXP,
    issuer: process.env.ISSUER,
  },
};
