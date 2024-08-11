import { AssistanceHandlerImpl } from "./api/assistance/handler/AssistanceHandlerImpl";
import { AssistanceRouterImpl } from "./api/assistance/router/AssistanceRouter";
import { AssistanceGroupHandlerImpl } from "./api/assistanceGroup/handler/AssistanceGroupHandlerImpl";
import { AssistanceGroupRouterImpl } from "./api/assistanceGroup/router/AssistanceGroupRouter";
import { AttendanceHandlerImpl } from "./api/attendance/handler/AttendanceHandlerImpl";
import { AttendanceRouter } from "./api/attendance/router/AttendanceRouterImpl";
import { ClassroomHandlerImpl } from "./api/classroom/handler/ClassroomHandlerImpl";
import { ClassroomRouter } from "./api/classroom/router/ClassroomRouterImpl";
import { ControlCardHandlerImpl } from "./api/controlCard/handler/ControlCardHandlerImpl";
import { ControlCardRouter } from "./api/controlCard/router/ControlCardRouterImpl";
import { FileHandlerImpl } from "./api/file/handler/FileHandlerImpl";
import { FileRouterImpl } from "./api/file/router/FileRouterImpl";
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
import { publisher } from "./config/messaging";
import { GetMeetingMiddleware } from "./middleware/api/GetMeetingMiddleware";
import { GetPracticumAssistanceGroupMiddleware } from "./middleware/api/GetPracticumAssistanceGroupMiddleware";
import { GetPracticumMeetingsMiddleware } from "./middleware/api/GetPracticumMeetingMiddleware";
import { GetPracticumsMiddleware } from "./middleware/api/GetPracticumsMiddleware";
import { AuthorizationBearer } from "./middleware/auth/AuthorizationBearer";
import { BasicAuthMiddleware } from "./middleware/auth/BasicAuth";
import { AssistancePrismaRepositoryImpl } from "./repository/assistance/AssistancePrismaRepositoryImpl";
import { AssistanceGroupPrismaRepositoryImpl } from "./repository/assistanceGroup/AssistanceGroupPrismaRepositoryImpl";
import { AttendancePrismaRepositoryImpl } from "./repository/attendance/AttendancePrismaRepositoryImpl";
import { ClassroomPrismaRepositoryImpl } from "./repository/classroom/ClassroomPrismaRepositoryImpl";
import { ControlCardPrismaRepositoryImpl } from "./repository/controlCard/ControlCardPrismaRepositoryImpl";
import { AssistanceGroupAssistancePrismaRepositoryImpl } from "./repository/facade/assistanceGroupAssistanceRepository/AssistanceGroupAssistancePrismaRepositoryImpl";
import { AssistantGroupControlCardPrismaRepositoryImpl } from "./repository/facade/assistantGroupControlCardRepository/AssistantGroupControlCardPrismaRepositoryImpl";
import { ClassroomAssistantGroupPracticumPrismaRepositoryImpl } from "./repository/facade/classroomAssistantGroupPracticumRepository/ClassroomAssistantGroupPracticumPrismaRepositoryImpl";
import { ClassroomPracticumPrismaRepositoryImpl } from "./repository/facade/classroomPracticumRepository/ClassroomPracticumPrismaRepositoryImpl";
import { ClassroomPracticumStudentsPrismaRepositoryImpl } from "./repository/facade/classroomPracticumStudents/ClassroomPracticumStudentsPrismaRepositoryImpl";
import { PracticumClassroomsAndAssistantsPrismaRepository } from "./repository/facade/practicumClassroomsAndAssistantsRepository/PracticumClassroomsAndAssistantsPrismaRepository";
import { MeetingPrismaRepositoryImpl } from "./repository/meeting/MeetingPrismaRepositoryImpl";
import { PracticumPrismaRepositoryImpl } from "./repository/practicum/PracticumPrismaRepositoryImpl";
import { ProfilePrismaRepositoryImpl } from "./repository/profile/ProfilePrismaRepositoryImpl";
import { ScorePrismaRepositoryImpl } from "./repository/score/ScorePrismaRepositoryImpl";
import { UserPrismaRepositoryImpl } from "./repository/user/UserPrismaRepositoryImpl";
import { AssistanceServiceImpl } from "./services/assistance/AssistanceServiceImpl";
import { AssistanceGroupServiceImpl } from "./services/assistanceGroup/AssistanceGroupServiceImpl";
import { AttendanceServiceImpl } from "./services/attendance/AttendanceServiceImpl";
import { AuthServiceImpl } from "./services/auth/AuthServiceImpl";
import { ClassroomServiceImpl } from "./services/classroom/ClassroomServiceImpl";
import { ControlCardServiceImpl } from "./services/controlCard/ControlCardServiceImpl";
import { ClassroomPracticumStudentsServiceImpl } from "./services/facade/classroomPracticumStudents/ClassroomPracticumStudentsServiceImpl";
import { PracticumClassroomsAndAssistantsServiceImpl } from "./services/facade/practicumClassroomsAndAssistantsService/PracticumClassroomsAndAssistantsServiceImpl";
import { MeetingServiceImpl } from "./services/meeting/MeetingServiceImpl";
import { PracticumServiceImpl } from "./services/practicum/PracticumServiceImpl";
import { ProfileServiceImpl } from "./services/profile/ProfileServiceImpl";
import { ScoreServiceImpl } from "./services/score/ScoreServiceImpl";
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
const controlCardRepository = new ControlCardPrismaRepositoryImpl();
const classroomPracticumStudentsRepository =
  new ClassroomPracticumStudentsPrismaRepositoryImpl();
const classroomPracticumRepository =
  new ClassroomPracticumPrismaRepositoryImpl();
const attendanceRepository = new AttendancePrismaRepositoryImpl();
const assistanceGroupAssistanceRepository =
  new AssistanceGroupAssistancePrismaRepositoryImpl();
const classroomAssistantGroupPracticumRepository =
  new ClassroomAssistantGroupPracticumPrismaRepositoryImpl();
const scoreRepository = new ScorePrismaRepositoryImpl();
const assistanceRepository = new AssistancePrismaRepositoryImpl();
// * services
const userService = new UserServiceImpl({ userRepository });
const authService = new AuthServiceImpl();
const profileService = new ProfileServiceImpl({ profileRepository });
const practicumService = new PracticumServiceImpl({
  practicumRepository,
  userRepository,
});
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
  classroomPracticumRepository,
  classroomAssistantGroupPracticumRepository,
});
const meetingService = new MeetingServiceImpl({
  meetingRepository,
  practicumRepository,
  profileRepository,
});
const assistantGroupControlCardRepository =
  new AssistantGroupControlCardPrismaRepositoryImpl();
const assistanceGroupService = new AssistanceGroupServiceImpl(
  {
    practicumRepository,
    assistanceGroupRepository,
    assistanceGroupAssistanceRepository,
    assistantGroupControlCardRepository,
  },
  publisher
);
const controlCardService = new ControlCardServiceImpl({
  practicumRepository,
  controlCardRepository,
});
const classroomPracticumStudentsService =
  new ClassroomPracticumStudentsServiceImpl({
    userRepository,
    classroomRepository,
    classroomPracticumStudentsRepository,
  });
const attendanceService = new AttendanceServiceImpl({
  practicumRepository,
  attendanceRepository,
  meetingRepository,
  classroomRepository,
});
const scoreService = new ScoreServiceImpl({
  classroomRepository,
  meetingRepository,
  scoreRepository,
});
const assistanceService = new AssistanceServiceImpl({ assistanceRepository });
// * validators
const schemaValidator = new JoiValidatorImpl();
// * handlers
const userHandler = new UserHandlerImpl(
  { authService, userService, profileService, meetingService },
  schemaValidator
);
const practicumHandler = new PracticumHandlerImpl(
  {
    practicumService,
    practicumClassroomsAndAssistantsService,
    meetingService,
    assistanceGroupService,
    controlCardService,
    attendanceService,
  },
  schemaValidator
);
const ClassroomHandler = new ClassroomHandlerImpl(
  {
    classroomService: classRoomService,
    meetingService,
    classroomPracticumStudentsService,
  },
  schemaValidator
);
const meetingHandler = new MeetingHandlerImpl(
  { meetingService, attendanceService, scoreService },
  schemaValidator
);
const assistanceGroupHandler = new AssistanceGroupHandlerImpl(
  {
    assistanceGroupService,
  },
  schemaValidator
);
const fileHandler = new FileHandlerImpl();
const controlCardHandler = new ControlCardHandlerImpl(
  { controlCardService },
  schemaValidator
);
const attendanceHandler = new AttendanceHandlerImpl(
  { attendanceService },
  schemaValidator
);
const assistanceHandler = new AssistanceHandlerImpl(
  { assistanceService },
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
const getPracticumsMiddleware = new GetPracticumsMiddleware(practicumService);
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
  getPracticumAssistanceGroupMiddleware,
  getPracticumsMiddleware
);
const classRoomRouter = new ClassroomRouter(
  ClassroomHandler,
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
const fileRouter = new FileRouterImpl(fileHandler, authorizationMiddleware);
const cardRouter = new ControlCardRouter(
  controlCardHandler,
  authorizationMiddleware
);
const attendanceRouter = new AttendanceRouter(
  attendanceHandler,
  authorizationMiddleware
);
const assistanceRouter = new AssistanceRouterImpl(
  assistanceHandler,
  authorizationMiddleware
);

connectDatabase(prismaDb);

startServer([
  userRouter,
  practicumRouter,
  classRoomRouter,
  meetingRouter,
  assistanceGroupRouter,
  fileRouter,
  cardRouter,
  attendanceRouter,
  assistanceRouter,
]).start();
