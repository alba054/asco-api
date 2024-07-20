export interface IPostClassroomAssistanceGroupPayload {
  readonly number: number;
  readonly mentor: string;
  readonly mentees: string[];
  readonly githubRepositoryUrl?: string;
}
