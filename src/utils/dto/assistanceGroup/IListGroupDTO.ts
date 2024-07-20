import { constants } from "../..";
import { AssistanceGroupEntity } from "../../../entity/assistanceGroup/AssistanceGroupEntity";

interface IListGroupDTO {
  githubRepoLink: string;
  practicum: {
    id: string;
    course: string;
    badge: string;
    classroomsCount: number;
  };
  number: number;
  assistantName: string;
  studentsCount: number;
  id: string;
  students: {
    id: string;
    fullname: string;
    classOf: string;
    nickname: string;
    profilePic: string;
    username: string;
  }[];
}

export const ListGroupDTO = (group: AssistanceGroupEntity) => {
  return {
    githubRepoLink: group.githubRepoLink ?? null,
    assistantName: group.assistant?.fullname,
    id: group.id,
    number: group.number,
    practicum: {
      badge: constants.GCS_OBJECT_BASE(group.practicum?.badge),
      classroomsCount: group.practicum?.classroomsLength,
      course: group.practicum?.course,
      id: group.practicumId,
    },
    studentsCount: group.students?.length,
    students: group.students?.map((s) => ({
      classOf: s.classOf,
      fullname: s.fullname,
      id: s.id,
      nickname: s.nickname,
      profilePic: constants.GCS_OBJECT_BASE(s.profilePic),
      username: s.username,
    })),
  } as IListGroupDTO;
};
