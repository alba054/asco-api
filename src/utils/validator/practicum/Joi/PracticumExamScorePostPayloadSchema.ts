import Joi from "joi";

export const PracticumExamScorePostPayloadSchema = Joi.object({
  studentId: Joi.string().required(),
  score: Joi.number().max(100).min(0).required(),
});
