export interface IPostMeetingScore {
  type: "QUIZ" | "RESPONSE";
  studentId: string;
  score: number;
}
