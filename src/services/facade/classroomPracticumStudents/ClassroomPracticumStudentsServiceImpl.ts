import { USER_ROLE } from "@prisma/client";
import { NotFoundError } from "../../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../../utils";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { ClassroomPracticumStudentsService } from "./ClassroomPracticumStudentsService";
import { IPutClassroomStudents } from "../../../utils/interfaces/request/IPutClassroomsStudents";

export class ClassroomPracticumStudentsServiceImpl extends ClassroomPracticumStudentsService {
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

      if (
        user.profile?.practicums
          ?.map((p) => p.id)
          .includes(classroom.practicumId)
      ) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "cannot assign student to this classroom has been assigned to another classroom in this practicum"
        );
      }

      if (user.role !== USER_ROLE.STUDENT) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "there is at least one username not student"
        );
      }
    }

    await this.classroomPracticumStudentsRepository.addStudentsToClassroomAndPracticum(
      classroomId,
      classroom.practicumId!,
      payload
    );
  }
}
