import { constants } from "../..";
import { AssistanceGroupEntity } from "../../../entity/assistanceGroup/AssistanceGroupEntity";

interface IStudentGroupDTO {
  githubRepoLink: string;
  practicum: {
    id: string;
    course: string;
    badge: string;
  };
  assistant: {
    id: string;
    fullname: string;
    classOf: string;
    nickname: string;
    profilePic: string;
  };
  students: {
    id: string;
    fullname: string;
    classOf: string;
    nickname: string;
    profilePic: string;
  }[];
  number: number;
  studentsCount: number;
  id: string;
  cards: {}[];
}

export const StudentGroupDTO = (group: AssistanceGroupEntity | null) => {
  return {
    githubRepoLink: group?.githubRepoLink ?? null,
    assistant: {
      classOf: group?.assistant?.classOf,
      fullname: group?.assistant?.fullname,
      id: group?.assistantId,
      nickname: group?.assistant?.nickname,
      profilePic: constants.GCS_OBJECT_BASE(group?.assistant?.profilePic),
    },
    id: group?.id,
    number: group?.number,
    practicum: {
      badge: constants.GCS_OBJECT_BASE(group?.practicum?.badge),
      course: group?.practicum?.course,
      id: group?.practicumId,
    },
    students: group?.students?.map((s) => ({
      classOf: s.classOf,
      fullname: s.fullname,
      id: s.id,
      nickname: s.nickname,
      profilePic: constants.GCS_OBJECT_BASE(s.profilePic),
    })),
    studentsCount: group?.students?.length,
  } as IStudentGroupDTO;
};
