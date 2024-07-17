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
    nickname: string;
    classOf: string;
    profilePic: string;
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
      nickname: s.nickname,
      classOf: s.classOf,
      profilePic: !s.profilePic ? null : s.profilePic,
    })),
  } as IClassroomDTO;
};
