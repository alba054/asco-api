import { DAY } from "@prisma/client";
import { ClassroomEntity } from "../../../entity/classroom/ClassroomEntity";

interface IClassroomDTO {
  id: string;
  name: string;
  meetingDay: DAY;
  practicumName: string;
  startTime: number;
  endTime: number;
  students: {
    fullname: string;
    username: string;
  }[];
}

export const ClassroomDTO = (classroom: ClassroomEntity) => {
  return {
    id: classroom.id,
    endTime: classroom.endTime,
    meetingDay: classroom.meetingDay,
    name: classroom.name,
    practicumName: classroom.practicum?.course,
    startTime: classroom.startTime,
    students: classroom.students.map((s) => ({
      fullname: s.fullname,
      username: s.username,
    })),
  } as IClassroomDTO;
};
