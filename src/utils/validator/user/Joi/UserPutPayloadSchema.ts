import Joi from "joi";

export const UserPutPayloadSchema = Joi.object({
  username: Joi.string().optional(),
  password: Joi.string().optional(),
  role: Joi.string().optional(),
  classOf: Joi.string().min(4).max(5).optional(),
  fullname: Joi.string().optional(),
});
