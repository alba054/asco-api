// id                 String      @id @default(uuid())
//   student            Profile     @relation(fields: [profileId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   meeting            Meeting     @relation(fields: [meetingId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   firstAssistance    Assistance? @relation(name: "control_card_first_assistance", fields: [firstAssistanceId], references: [id])
//   secondAssistance   Assistance? @relation(name: "control_card_second_assistance", fields: [secondAssistanceId], references: [id])
//   createdAt          DateTime    @default(now())
//   updatedAt          DateTime    @default(now()) @updatedAt
//   profileId          String
//   meetingId          String
//   firstAssistanceId  String?     @unique
//   secondAssistanceId String?     @unique
//   practicum          Practicum?  @relation(fields: [practicumId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   practicumId        String?

export interface IControlCardPayload {
  studentId?: string;
  meetings?: (string | undefined)[];
  practicumId?: string;
}
