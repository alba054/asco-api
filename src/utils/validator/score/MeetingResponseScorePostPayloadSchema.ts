import Joi from "joi";

export const MeetingResponseScorePostPayloadSchema = Joi.object({
  studentId: Joi.string().required(),
  score: Joi.number().max(100).min(0).required(),
});
