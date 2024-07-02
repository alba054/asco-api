import { PracticumEntity } from "../../../entity/practicum/PracticumEntity";

interface IListPracticumDTO {
  id: string;
  course: string;
  badge?: string;
  classroomsLength?: number;
}

export const ListPracticumDTO = (practicum: PracticumEntity) => {
  return {
    id: practicum.id,
    course: practicum.course,
    badge: practicum.badge,
    classroomsLength: practicum.classroomsLength ?? 0,
  } as IListPracticumDTO;
};
