import { CONFIG_ENV } from "../config/env";
import { kafkaPubSub } from "../config/messaging/KafkaPubSub";
import { MessagingInterface } from "../config/messaging/MessagingInterface";
import { IControlCardPayload } from "../utils/interfaces/schema/IControlCardPayload";
import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";

const main = async (messaging: MessagingInterface<any>) => {
  // * change this based on the message broker
  await messaging.subscribe(
    "cc-group",
    async ({
      topic,
      partition,
      message,
    }: {
      topic: any;
      partition: any;
      message: any;
    }) => {
      const data: IControlCardPayload[] = JSON.parse(message.value.toString());

      var connection = mysql.createConnection({
        host: CONFIG_ENV.DATABASE_HOST!,
        user: CONFIG_ENV.DATABASE_USER!,
        password: CONFIG_ENV.DATABASE_PASSWORD!,
        database: CONFIG_ENV.DATABASE_NAME!,
      });

      connection.connect();

      connection.beginTransaction(function (err) {
        if (err) {
          throw err;
        }

        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].meetings!.length; j++) {
            const firstAssistanceId = uuidv4();
            const secondAssistanceId = uuidv4();

            connection.query(
              {
                sql: "INSERT INTO assistances (id, date) values (?, ?)",
                timeout: 10000,
                values: [firstAssistanceId, 0],
              },
              function (error, results, fields) {
                if (error) {
                  console.log(error);
                  return connection.rollback(function () {
                    throw error;
                  });
                }
                connection.query(
                  {
                    sql: "INSERT INTO assistances (id, date) values (?, ?)",
                    timeout: 10000,
                    values: [secondAssistanceId, 0],
                  },
                  function (error, results, fields) {
                    if (error) {
                      console.log(error);
                      return connection.rollback(function () {
                        throw error;
                      });
                    }
                    connection.query(
                      {
                        sql: "INSERT INTO control_cards (id, profileId, meetingId, practicumId, firstAssistanceId, secondAssistanceId, assistantGroupId) values (?, ?, ?, ?, ?, ?, ?)",
                        timeout: 10000,
                        values: [
                          uuidv4(),
                          data[i].studentId,
                          data[i].meetings?.at(j),
                          data[i].practicumId,
                          firstAssistanceId,
                          secondAssistanceId,
                          data[i].groupId,
                        ],
                      },
                      function (error, results, fields) {
                        if (error) {
                          console.log(error);
                          return connection.rollback(function () {
                            throw error;
                          });
                        }
                      }
                    );
                  }
                );
              }
            );
          }
        }

        connection.commit(function (err) {
          if (err) {
            console.log(err);
            return connection.rollback(function () {
              throw err;
            });
          }
          console.log("success!");
        });
      });
    }
  );
};

main(kafkaPubSub);
