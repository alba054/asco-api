import { USER_ROLE } from "@prisma/client";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ClassRoomRepository } from "../../repository/classroom/ClassroomRepository";
import { UserRepository } from "../../repository/user/UserRepository";
import { ERRORCODE } from "../../utils";
import { IPutClassroomStudents } from "../../utils/interfaces/request/IPutClassroomsStudents";
import { ClassroomService } from "./ClassroomService";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { ClassroomEntity } from "../../entity/classroom/ClassroomEntity";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { MeetingRepository } from "../../repository/meeting/MeetingRepository";
import { ClassroomPracticumRepository } from "../../repository/facade/classroomPracticumRepository/ClassroomPracticumRepository";
import { ClassroomAssistantGroupPracticumRepository } from "../../repository/facade/classroomAssistantGroupPracticumRepository/ClassroomAssistantGroupPracticumRepository";
import { AssistanceGroupRepository } from "../../repository/assistanceGroup/AssistanceGroupRepository";

export class ClassroomServiceImpl extends ClassroomService {
  constructor(repository: {
    classroomRepository: ClassRoomRepository;
    userRepository: UserRepository;
    meetingRepository: MeetingRepository;
    classroomPracticumRepository: ClassroomPracticumRepository;
    classroomAssistantGroupPracticumRepository: ClassroomAssistantGroupPracticumRepository;
  }) {
    super(repository);
  }

  async deleteClassroomById(classroomId: string): Promise<void> {
    const classroom = await this.classroomRepository.getClassroomById(
      classroomId
    );

    if (!classroom) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "classroom's not found"
      );
    }

    await this.classroomAssistantGroupPracticumRepository.deleteClassrooomById(
      classroomId,
      classroom.practicumId!,
      classroom.students!.map((s) => s.username)
    );
  }

  async getStudentClassroomMeetingsById(
    classroomId: string,
    username: string
  ): Promise<MeetingEntity[]> {
    const classroom = await this.classroomRepository.getClassroomById(
      classroomId
    );

    if (!classroom) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "classroom's not found"
      );
    }

    if (!classroom.students.find((s) => s.username === username)) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "you are not authorized to view this classroom's meetings"
      );
    }

    return await this.meetingRepository.getMeetingsByClassroomId(classroomId);
  }

  async getClassroomsByStudentUsername(
    username: string
  ): Promise<ClassroomEntity[]> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundError(
        ERRORCODE.USER_NOT_FOUND_ERROR,
        "user's not found"
      );
    }

    return this.classroomRepository.getClassroomByStudentUsername(username);
  }

  async getClassroomById(classroomId: string): Promise<ClassroomEntity> {
    const classroom = await this.classroomRepository.getClassroomById(
      classroomId
    );

    if (!classroom) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "classroom's not found"
      );
    }

    return classroom;
  }

  async removeStudentFromClassroom(
    classroomId: string,
    username: string
  ): Promise<void> {
    const classroom = await this.classroomRepository.getClassroomById(
      classroomId
    );

    if (!classroom) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "classroom's not found"
      );
    }

    await this.classroomPracticumRepository.removeStudentFromPracticumAndClassroom(
      classroomId,
      classroom.practicumId,
      username
    );
  }

  async addStudentToClassroom(
    classroomId: string,
    payload: IPutClassroomStudents
  ): Promise<void> {
    const classroom = await this.classroomRepository.getClassroomById(
      classroomId
    );

    if (!classroom) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "classroom's not found"
      );
    }

    let isNotStudent = false;

    for (let i = 0; i < payload.students.length; i++) {
      const user = await this.userRepository.getUserByUsername(
        payload.students[i]
      );

      if (!user) {
        throw new NotFoundError(
          ERRORCODE.USER_NOT_FOUND_ERROR,
          "user's not found"
        );
      }

      if (user.role !== USER_ROLE.STUDENT) {
        isNotStudent = true;
      }
    }

    if (isNotStudent) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "there is at least one username not student"
      );
    }

    await this.classroomRepository.addStudents(classroomId, payload);
  }
}
