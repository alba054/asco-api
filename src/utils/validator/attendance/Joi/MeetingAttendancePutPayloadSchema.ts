import Joi from "joi";

export const MeetingAttendancePutPayloadSchema = Joi.object({
  attendanceStatus: Joi.string().optional(),
  extraPoint: Joi.number().optional().min(0),
  note: Joi.string().optional(),
});
