export interface IPostMeetingScore {
  type: "QUIZ" | "RESPONSE" | "ASSIGNMENT";
  studentId: string;
  score: number;
}
