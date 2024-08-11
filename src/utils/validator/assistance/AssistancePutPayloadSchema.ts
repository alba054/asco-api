import Joi from "joi";

export const AssistancePutPayloadSchema = Joi.object({
  status: Joi.boolean().required(),
  note: Joi.string().optional(),
  date: Joi.number().required().min(0),
});
