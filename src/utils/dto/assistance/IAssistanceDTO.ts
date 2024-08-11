import { AssistanceEntity } from "../../../entity/assistance/AssistanceEntity";

interface IAssistanceDTO {
  id: string;
  status: boolean;
  date: number;
  note: string;
  student: {
    id: string;
    username: string;
    fullname: string;
  };
}

export const AssistanceDTO = (assistance: AssistanceEntity) => {
  return {
    date: assistance.date ?? null,
    id: assistance.id ?? null,
    note: assistance.note ?? null,
    status: assistance.status,
    student: {
      fullname: assistance.controlCard?.student?.fullname,
      id: assistance.controlCard?.student?.id,
      username: assistance.controlCard?.student?.username,
    },
  } as IAssistanceDTO;
};
