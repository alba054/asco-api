import Joi from "joi";

export const PracticumAssistanceGroupPostPayloadSchema = Joi.object({
  number: Joi.number().required().min(0),
  mentor: Joi.string().required(),
  mentees: Joi.array().items(Joi.string()).min(1).optional(),
});
