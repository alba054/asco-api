import Joi from "joi";

export const MeetingScorePutPayloadSchema = Joi.object({
  score: Joi.number().max(100).min(0).optional(),
});
