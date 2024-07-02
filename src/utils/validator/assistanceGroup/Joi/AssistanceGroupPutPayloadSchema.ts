import Joi from "joi";

export const AssistanceGroupPutPayloadSchema = Joi.object({
  number: Joi.number().optional().min(0),
  mentor: Joi.string().optional(),
  mentees: Joi.array().items(Joi.string()).min(1).optional(),
});
