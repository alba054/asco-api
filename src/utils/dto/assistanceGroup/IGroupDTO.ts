import { AssistanceGroupEntity } from "../../../entity/assistanceGroup/AssistanceGroupEntity";

interface IGroupDTO {
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
}

export const GroupDTO = (group: AssistanceGroupEntity) => {
  return {
    assistant: {
      classOf: group.assistant?.classOf,
      fullname: group.assistant?.fullname,
      id: group.assistantId,
      nickname: group.assistant?.nickname,
      profilePic: group.assistant?.profilePic,
    },
    id: group.id,
    number: group.number,
    practicum: {
      badge: group.practicum?.badge,
      course: group.practicum?.course,
      id: group.practicumId,
    },
    students: group.students?.map((s) => ({
      classOf: s.classOf,
      fullname: s.fullname,
      id: s.id,
      nickname: s.nickname,
      profilePic: s.profilePic,
    })),
    studentsCount: group.students?.length,
  } as IGroupDTO;
};
