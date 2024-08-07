import { Kafka, Partitioners } from "kafkajs";
import { MessagingInterface } from "./MessagingInterface";
import { CONFIG_ENV } from "../env";

class KafkaPubSub<T> extends MessagingInterface<T> {
  private topicId: string;
  private clientId?: string;
  private brokers: [string];
  private kafka: Kafka;

  constructor(topicId: string, brokers: [string], clientId?: string) {
    super();
    this.topicId = topicId;
    this.clientId = clientId;
    this.brokers = brokers;
    this.kafka = new Kafka({
      brokers: brokers,
      clientId,
    });

    this.createTopic();
  }

  private async createTopic() {
    const admin = this.kafka.admin();

    try {
      await admin.connect();

      await admin.createTopics({
        topics: [{ topic: this.topicId, numPartitions: 2 }],
      });

      await admin.disconnect();
    } catch (error) {
      throw error;
    }
  }

  async publish(data: T): Promise<void> {
    try {
      const producer = this.kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner,
      });

      await producer.connect();

      await producer.send({
        topic: this.topicId,
        messages: [
          {
            key: String(Math.floor(new Date().getTime() / 1000)),
            value: JSON.stringify(data),
          },
        ],
      });

      await producer.disconnect();
    } catch (error) {
      throw error;
    }
  }
  async subscribe(...args: any): Promise<void | T> {
    const consumer = this.kafka.consumer({ groupId: args[0] });

    try {
      await consumer.subscribe({
        fromBeginning: true,
        topic: this.topicId,
      });

      await consumer.connect();
      await consumer.run({
        eachMessage: args[1],
      });
    } catch (error) {
      throw error;
    }
  }
}

export const kafkaPubSub = new KafkaPubSub<any>(
  CONFIG_ENV.GCP_PUB_SUB_TOPICID!,
  [CONFIG_ENV.KAFKA_HOST!],
  "asco-api"
);
