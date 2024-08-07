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
  GCP_PUB_SUB_PROJECTID: process.env.GCP_PUB_SUB_PROJECTID ?? "",
  GCP_PUB_SUB_TOPICID: process.env.GCP_PUB_SUB_TOPICID ?? "",
  GCP_PUB_SUB_SUBSCRIPTIONID: process.env.GCP_PUB_SUB_SUBSCRIPTIONID ?? "",
  KAFKA_HOST: process.env.KAFKA_HOST ?? "localhost:9092",
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  NODE_ENV: process.env.NODE_ENV
};
