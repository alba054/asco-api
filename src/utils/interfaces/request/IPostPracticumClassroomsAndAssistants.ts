import { DAY } from "@prisma/client";

export interface IPostPracticumClassroomsAndAssistants {
  readonly classrooms: {
    readonly name: string;
    readonly meetingDay: DAY;
    readonly startTime: number;
    readonly endTime: number;
  }[];
  readonly assistants: string[];
}
