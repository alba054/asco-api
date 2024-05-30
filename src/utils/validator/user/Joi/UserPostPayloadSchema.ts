import Joi from "joi";

export const UserPostPayloadSchema = Joi.object({
  data: Joi.array()
    .items(
      Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        classOf: Joi.string().min(4).max(5).required(),
        fullname: Joi.string().required(),
      })
    )
    .required(),
});
