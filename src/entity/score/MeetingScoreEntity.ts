export interface MeetingScoreEntity {
  id: string | null;
  student: {
    profilePic: string | null;
    username: string;
    fullname: string;
  };
  score: number | null;
}
