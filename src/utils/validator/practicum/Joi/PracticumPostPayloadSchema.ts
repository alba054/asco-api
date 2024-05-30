import Joi from "joi";

export const PracticumPostPayloadSchema = Joi.object({
  course: Joi.string().required(),
  badge: Joi.string().optional(),
  courseContract: Joi.string().optional(),
});
