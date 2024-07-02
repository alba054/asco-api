import Joi from "joi";

export const PracticumMeetingPostPayloadSchema = Joi.object({
  number: Joi.number().required().min(1),
  lesson: Joi.string().required(),
  meetingDate: Joi.number().required().min(0),
  assistant: Joi.string().required(),
  coAssistant: Joi.string().optional(),
  module: Joi.string().optional(),
  assignment: Joi.string().optional(),
});
