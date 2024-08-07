import { CONFIG_ENV } from "../env";
import { googlePubSub } from "./GooglePubSub";
import { kafkaPubSub } from "./KafkaPubSub";

export const publisher =
  CONFIG_ENV.NODE_ENV! === "sandbox" ? googlePubSub : kafkaPubSub;
