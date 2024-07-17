import Joi from "joi";

export const PracticumPutPayloadSchema = Joi.object({
  course: Joi.string().optional(),
  badge: Joi.string().optional(),
  courseContract: Joi.string().optional(),
  examInfo: Joi.string().optional(),
});
