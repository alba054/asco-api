import { DAY, USER_ROLE } from "@prisma/client";
import { PracticumEntity } from "../../../entity/practicum/PracticumEntity";
import { constants } from "../..";

interface IPracticumDTO {
  id: string;
  badge?: string;
  courseContract?: string;
  course: string;
  assistants: {
    id: string;
    nickname: string;
    fullname: string;
    username: string;
    classOf: string;
    profilePic: string;
  }[];
  classrooms: {
    id: string;
    name: string;
    meetingDay: DAY;
    startTime: number;
    endTime: number;
  }[];
  examInfo: string;
}

export const PracticumDTO = (practicum: PracticumEntity) => {
  return {
    badge: constants.GCS_OBJECT_BASE(practicum.badge),
    courseContract: constants.GCS_OBJECT_BASE(practicum.courseContract),
    id: practicum.id,
    course: practicum.course,
    assistants: practicum.participants
      .filter((a) => a.user?.role === USER_ROLE.ASSISTANT)
      .map((a) => ({
        fullname: a.fullname,
        id: a.id,
        nickname: a.nickname,
        classOf: a.classOf,
        profilePic: !a.profilePic ? null : a.profilePic,
        username: a.username,
      })),
    classrooms: practicum.classrooms.map((c) => ({
      endTime: c.endTime,
      id: c.id,
      meetingDay: c.meetingDay,
      name: c.name,
      startTime: c.startTime,
    })),
    examInfo: practicum.examInfo ?? null,
  } as IPracticumDTO;
};
