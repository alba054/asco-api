import Joi from "joi";

export const MeetingAttendancePostPayloadSchema = Joi.object({
  profileId: Joi.string().required(),
  attendanceStatus: Joi.string().required(),
  extraPoint: Joi.number().optional().min(0),
  note: Joi.string().optional(),
});

export const MeetingAttendancePutPayloadSchema = Joi.object({
  profileId: Joi.string().required(),
  attendanceStatus: Joi.string().required(),
  extraPoint: Joi.number().optional().min(0),
  note: Joi.string().optional(),
});
