import Joi from "joi";

export const ClassroomStudentsPutPayloadSchema = Joi.object({
  students: Joi.array().items(Joi.string()).min(1).required(),
});
