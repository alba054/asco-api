import { USER_ROLE } from "@prisma/client";
import { bcryptHash } from "../config/crypto/BcryptImpl";
import { prismaDb } from "../config/database/PrismaORMDBConfig";

const main = async () => {
  const password = await bcryptHash.hash("randompassword");

  await prismaDb.db?.user.create({
    data: {
      password,
      role: USER_ROLE.ADMIN,
      username: "admin",
      profile: {
        create: {
          classOf: "0000",
          fullname: "admin asco",
          nickname: "admin",
          username: "admin",
        },
      },
    },
  });
};

main();
