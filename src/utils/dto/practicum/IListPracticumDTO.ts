import { DAY } from "@prisma/client";
import { constants } from "../..";
import { PracticumEntity } from "../../../entity/practicum/PracticumEntity";

interface IListPracticumDTO {
  id: string;
  course: string;
  badge?: string;
  classroomsLength?: number;
  meetingsLength?: number;
  classrooms: {
    id: string;
    name: string;
    meetingDay: DAY;
    startTime: number;
    endTime: number;
    studentsLength: number;
  }[];
}

export const ListPracticumDTO = (practicum: PracticumEntity) => {
  return {
    id: practicum.id,
    course: practicum.course,
    badge: constants.GCS_OBJECT_BASE(practicum.badge),
    meetingsLength: practicum.meetingsLength ?? 0,
    classroomsLength: practicum.classroomsLength ?? 0,
    classrooms: practicum.classrooms.map((c) => ({
      endTime: c.endTime,
      id: c.id,
      meetingDay: c.meetingDay,
      name: c.name,
      startTime: c.startTime,
      studentsLength: c.studentsCount,
    })),
  } as IListPracticumDTO;
};
