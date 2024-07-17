export interface IPostClassroomMeetingPayload {
  readonly number: number;
  readonly lesson: string;
  readonly meetingDate: number;
  readonly assistant: string;
  readonly coAssistant?: string;
  readonly module?: string;
  readonly assignment?: string;
  readonly assistanceDeadline?: number;
}
