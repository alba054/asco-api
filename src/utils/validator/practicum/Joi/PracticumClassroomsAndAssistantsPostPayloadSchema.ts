import Joi from "joi";

export const PracticumClassroomsAndAssistantsPostPayloadSchema = Joi.object({
  classrooms: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().max(3).required(),
        startTime: Joi.number().min(0).required(),
        endTime: Joi.number().min(0).required(),
        meetingDay: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
  assistants: Joi.array().items(Joi.string()).min(1).required(),
});
