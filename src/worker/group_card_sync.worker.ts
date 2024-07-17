import { googlePubSub } from "../config/messaging/GooglePubSub";
import { MessagingInterface } from "../config/messaging/MessagingInterface";

const main = async (messaging: MessagingInterface<any>) => {
  // * change this based on the message broker
  await messaging.subscribe((message: any) => {
    console.log(message.data);
    message.ack();
  });
};

main(googlePubSub);
