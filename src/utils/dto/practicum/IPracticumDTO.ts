import { USER_ROLE } from "@prisma/client";
import { PracticumEntity } from "../../../entity/practicum/PracticumEntity";

interface IPracticumDTO {
  id: string;
  badge?: string;
  courseContract?: string;
  course: string;
  assistants: {
    id: string;
    nickname: string;
    fullname: string;
  }[];
}

export const PracticumDTO = (practicum: PracticumEntity) => {
  return {
    badge: practicum.badge,
    courseContract: practicum.courseContract,
    id: practicum.id,
    course: practicum.course,
    assistants: practicum.participants
      .filter((a) => a.user?.role === USER_ROLE.ASSISTANT)
      .map((a) => ({
        fullname: a.fullname,
        id: a.id,
        nickname: a.nickname,
      })),
  } as IPracticumDTO;
};
