import { PubSub } from "@google-cloud/pubsub";
import { MessagingInterface } from "./MessagingInterface";
import { CONFIG_ENV } from "../env";

class GooglePubSub<T> extends MessagingInterface<T> {
  private pubSubClient: PubSub;
  private topicId: string;
  private subscriptionId?: string;

  constructor(projectId: string, topicId: string, subscriptionId?: string) {
    super();
    this.pubSubClient = new PubSub({ projectId });
    this.topicId = topicId;
    this.subscriptionId = subscriptionId;
  }

  async publish(data: T): Promise<void> {
    const dataBuffer = Buffer.from(JSON.stringify(data));

    try {
      const messageId = await this.pubSubClient
        .topic(this.topicId)
        .publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.log("error publish message to pub/sub");
      console.log(error);
      throw error;
    }
  }

  async subscribe(messageHandler: any): Promise<T | void> {
    const subscription = this.pubSubClient.subscription(
      this.subscriptionId ?? ""
    );

    subscription.on("message", messageHandler);
    subscription.on("error", (error) => {
      console.error(`Received error: ${error}`);
      process.exit(1);
    });

    setTimeout(() => {
      subscription.removeListener("message", messageHandler);
    }, 5 * 1000);
  }
}

export const googlePubSub = new GooglePubSub<any>(
  CONFIG_ENV.GCP_PUB_SUB_PROJECTID,
  CONFIG_ENV.GCP_PUB_SUB_TOPICID,
  CONFIG_ENV.GCP_PUB_SUB_SUBSCRIPTIONID
);
