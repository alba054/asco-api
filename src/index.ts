import { PracticumHandlerImpl } from "./api/practicum/handler/PracticumHandlerImpl";
import { PracticumRouterImpl } from "./api/practicum/router/PracticumRouterImpl";
import { UserHandlerImpl } from "./api/user/handler/UserHandlerImpl";
import { UserRouterImpl } from "./api/user/router/UserRouterImpl";
import { hashImpl } from "./config/crypto";
import connectDatabase from "./config/database";
import { prismaDb } from "./config/database/PrismaORMDBConfig";
import { startServer } from "./config/express";
import { AuthorizationBearer } from "./middleware/auth/AuthorizationBearer";
import { BasicAuthMiddleware } from "./middleware/auth/BasicAuth";
import { PracticumClassroomsAndAssistantsPrismaRepository } from "./repository/facade/practicumClassroomsAndAssistantsRepository/PracticumClassroomsAndAssistantsPrismaRepository";
import { PracticumPrismaRepositoryImpl } from "./repository/practicum/PracticumPrismaRepositoryImpl";
import { ProfilePrismaRepositoryImpl } from "./repository/profile/ProfilePrismaRepositoryImpl";
import { UserPrismaRepositoryImpl } from "./repository/user/UserPrismaRepositoryImpl";
import { AuthServiceImpl } from "./services/auth/AuthServiceImpl";
import { PracticumClassroomsAndAssistantsServiceImpl } from "./services/facade/practicumClassroomsAndAssistantsService/PracticumClassroomsAndAssistantsServiceImpl";
import { PracticumServiceImpl } from "./services/practicum/PracticumServiceImpl";
import { ProfileServiceImpl } from "./services/profile/ProfileServiceImpl";
import { UserServiceImpl } from "./services/user/UserServiceImpl";
import { JoiValidatorImpl } from "./utils/validator/JoiValidatorImpl";

// * repositories
const userRepository = new UserPrismaRepositoryImpl();
const profileRepository = new ProfilePrismaRepositoryImpl();
const practicumRepository = new PracticumPrismaRepositoryImpl();
const practicumClassroomsAndAssistantsRepository =
  new PracticumClassroomsAndAssistantsPrismaRepository();
// * services
const userService = new UserServiceImpl({ userRepository });
const authService = new AuthServiceImpl();
const profileService = new ProfileServiceImpl({ profileRepository });
const practicumService = new PracticumServiceImpl({ practicumRepository });
const practicumClassroomsAndAssistantsService =
  new PracticumClassroomsAndAssistantsServiceImpl({
    practicumRepository,
    userRepository,
    practicumClassroomsAndAssistantsRepository,
  });
// * validators
const schemaValidator = new JoiValidatorImpl();
// * handlers
const userHandler = new UserHandlerImpl(
  { authService, userService, profileService },
  schemaValidator
);
const practicumHandler = new PracticumHandlerImpl(
  { practicumService, practicumClassroomsAndAssistantsService },
  schemaValidator
);
// * middleware
const basicAuthMiddleware = new BasicAuthMiddleware(userService, hashImpl);
const authorizationMiddleware = new AuthorizationBearer(userService);
// * routers
const userRouter = new UserRouterImpl(
  userHandler,
  basicAuthMiddleware,
  authorizationMiddleware
);
const practicumRouter = new PracticumRouterImpl(
  practicumHandler,
  basicAuthMiddleware,
  authorizationMiddleware
);

connectDatabase(prismaDb);

startServer([userRouter, practicumRouter]).start();
