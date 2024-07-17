import Joi from "joi";

export const PracticumMeetingPutPayloadSchema = Joi.object({
  number: Joi.number().optional().min(1),
  lesson: Joi.string().optional(),
  meetingDate: Joi.number().optional().min(0),
  assistanceDeadline: Joi.number().optional().min(0),
  assistant: Joi.string().optional(),
  coAssistant: Joi.string().optional(),
  module: Joi.string().optional(),
  assignment: Joi.string().optional(),
});
