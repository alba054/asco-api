import { DAY } from "@prisma/client";
import { ClassroomEntity } from "../../../entity/classroom/ClassroomEntity";
import { constants } from "../..";

interface IListClassroomDTO {
  practicum: {
    course: string;
    badge: string;
    id: string;
  };
  id: string;
  name: string;
  meetingDay: DAY;
  startTime: number;
  endTime: number;
  studentsCount: number;
}

export const ListClassroomDTO = (classroom: ClassroomEntity) => {
  return {
    endTime: classroom.endTime,
    id: classroom.id,
    meetingDay: classroom.meetingDay,
    name: classroom.name,
    practicum: {
      badge: constants.GCS_OBJECT_BASE(classroom.practicum?.badge),
      course: classroom.practicum?.course,
      id: classroom.practicum?.id,
    },
    startTime: classroom.startTime,
    studentsCount: classroom.studentsCount,
  } as IListClassroomDTO;
};
