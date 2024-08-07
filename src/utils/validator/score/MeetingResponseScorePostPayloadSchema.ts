import Joi from "joi";

export const MeetingScorePostPayloadSchema = Joi.object({
  studentId: Joi.string().required(),
  score: Joi.number().max(100).min(0).required(),
  type: Joi.string().required(),
});
