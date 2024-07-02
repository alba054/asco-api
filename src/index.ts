import { AssistanceGroupHandlerImpl } from "./api/assistanceGroup/handler/AssistanceGroupHandlerImpl";
import { AssistanceGroupRouterImpl } from "./api/assistanceGroup/router/AssistanceGroupRouter";
import { ClassroomHandlerImpl } from "./api/classroom/handler/ClassroomHandlerImpl";
import { ClassroomRouter } from "./api/classroom/router/ClassroomRouterImpl";
import { MeetingHandlerImpl } from "./api/meeting/handler/MeetingHandlerImpl";
import { MeetingRouter } from "./api/meeting/router/MeetingRouterImpl";
import { PracticumHandlerImpl } from "./api/practicum/handler/PracticumHandlerImpl";
import { PracticumRouterImpl } from "./api/practicum/router/PracticumRouterImpl";
import { UserHandlerImpl } from "./api/user/handler/UserHandlerImpl";
import { UserRouterImpl } from "./api/user/router/UserRouterImpl";
import { hashImpl } from "./config/crypto";
import connectDatabase from "./config/database";
import { prismaDb } from "./config/database/PrismaORMDBConfig";
import { startServer } from "./config/express";
import { GetMeetingMiddleware } from "./middleware/api/GetMeetingMiddleware";
import { GetPracticumAssistanceGroupMiddleware } from "./middleware/api/GetPracticumAssistanceGroupMiddleware";
import { GetPracticumMeetingsMiddleware } from "./middleware/api/GetPracticumMeetingMiddleware";
import { AuthorizationBearer } from "./middleware/auth/AuthorizationBearer";
import { BasicAuthMiddleware } from "./middleware/auth/BasicAuth";
import { AssistanceGroupPrismaRepositoryImpl } from "./repository/assistanceGroup/AssistanceGroupPrismaRepositoryImpl";
import { ClassroomPrismaRepositoryImpl } from "./repository/classroom/ClassroomPrismaRepositoryImpl";
import { PracticumClassroomsAndAssistantsPrismaRepository } from "./repository/facade/practicumClassroomsAndAssistantsRepository/PracticumClassroomsAndAssistantsPrismaRepository";
import { MeetingPrismaRepositoryImpl } from "./repository/meeting/MeetingPrismaRepositoryImpl";
import { PracticumPrismaRepositoryImpl } from "./repository/practicum/PracticumPrismaRepositoryImpl";
import { ProfilePrismaRepositoryImpl } from "./repository/profile/ProfilePrismaRepositoryImpl";
import { UserPrismaRepositoryImpl } from "./repository/user/UserPrismaRepositoryImpl";
import { AssistanceGroupServiceImpl } from "./services/assistanceGroup/AssistanceGroupServiceImpl";
import { AuthServiceImpl } from "./services/auth/AuthServiceImpl";
import { ClassroomServiceImpl } from "./services/classroom/ClassroomServiceImpl";
import { PracticumClassroomsAndAssistantsServiceImpl } from "./services/facade/practicumClassroomsAndAssistantsService/PracticumClassroomsAndAssistantsServiceImpl";
import { MeetingServiceImpl } from "./services/meeting/MeetingServiceImpl";
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
const classroomRepository = new ClassroomPrismaRepositoryImpl();
const meetingRepository = new MeetingPrismaRepositoryImpl();
const assistanceGroupRepository = new AssistanceGroupPrismaRepositoryImpl();
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
const classRoomService = new ClassroomServiceImpl({
  classroomRepository,
  userRepository,
  meetingRepository,
});
const meetingService = new MeetingServiceImpl({
  meetingRepository,
  practicumRepository,
});
const assistanceGroupService = new AssistanceGroupServiceImpl({
  practicumRepository,
  assistanceGroupRepository,
});
// * validators
const schemaValidator = new JoiValidatorImpl();
// * handlers
const userHandler = new UserHandlerImpl(
  { authService, userService, profileService },
  schemaValidator
);
const practicumHandler = new PracticumHandlerImpl(
  {
    practicumService,
    practicumClassroomsAndAssistantsService,
    meetingService,
    assistanceGroupService,
  },
  schemaValidator
);
const ClassroomHandler = new ClassroomHandlerImpl(
  { classroomService: classRoomService, meetingService },
  schemaValidator
);
const meetingHandler = new MeetingHandlerImpl(
  { meetingService },
  schemaValidator
);
const assistanceGroupHandler = new AssistanceGroupHandlerImpl(
  {
    assistanceGroupService,
  },
  schemaValidator
);
// * middleware
const basicAuthMiddleware = new BasicAuthMiddleware(userService, hashImpl);
const authorizationMiddleware = new AuthorizationBearer(userService);
const getPracticumMeetingsMiddleware = new GetPracticumMeetingsMiddleware(
  meetingService
);
const getMeetingMiddleware = new GetMeetingMiddleware(meetingService);
const getPracticumAssistanceGroupMiddleware =
  new GetPracticumAssistanceGroupMiddleware(assistanceGroupService);
// * routers
const userRouter = new UserRouterImpl(
  userHandler,
  basicAuthMiddleware,
  authorizationMiddleware
);
const practicumRouter = new PracticumRouterImpl(
  practicumHandler,
  authorizationMiddleware,
  getPracticumMeetingsMiddleware,
  getPracticumAssistanceGroupMiddleware
);
const classRoomRouter = new ClassroomRouter(
  ClassroomHandler,
  basicAuthMiddleware,
  authorizationMiddleware
);
const meetingRouter = new MeetingRouter(
  meetingHandler,
  authorizationMiddleware,
  getMeetingMiddleware
);
const assistanceGroupRouter = new AssistanceGroupRouterImpl(
  assistanceGroupHandler,
  authorizationMiddleware
);

connectDatabase(prismaDb);

startServer([
  userRouter,
  practicumRouter,
  classRoomRouter,
  meetingRouter,
  assistanceGroupRouter,
]).start();
