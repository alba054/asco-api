# lending-system-api

cara run

1. install dependencies "npm install"
2. buat database dengan nama "lending_system"
3. ubah variable pada file .env DATABASE_URL=DATABASE_URL="mysql://<mysql_user>:<mysql_password>@localhost:3306/lending_system"
4. lalu run **npm run migrate "init migration"**
5. lalu run **npm run start::dev**
6. kalo gagal tanya Alif

## cara tambah student

untuk menambahkan data student pada database

1. ketik **npx prisma studio**
2. akses web yang berjalan
3. cari model student
4. lalu isi tabel menggunakan ui yang tersedia
5. tanya alif kalo gagal
   note: tidak ada api untuk menambah student, get student

## DEV LOG <17 July 2024>

1. (practicums.getPracticumStudentCards) /api/practicums/{practicumId}/students/{studentProfileId}/cards -> get student control cards based on the practicum (authorized for assistant and admin)
2. (practicums.getStudentPracticumControlCards) /api/cards/{controlCardId} -> get control card detail (authorized for assistant and student)
3. (cards.getControlCardDetail) /api/practicums/{practicumId}/cards -> get student own control cards (authorized for student)

## DEV LOG <20 July 2024>

1. (practicums.getStudentPracticumAttendancesByAdminAndAssistant) /api/practicums/{practicumId}/students/{studentProfileId}/attendances -> get student attendances based on the practicum (authorized for assistant and admin)
2. (meetings.addAttendanceForStudentInAMeeting) /api/meetings/{meetingId}/attendances -> post attendances based on the meeting
3. (practicums.getPracticumAttendancesForStudent) /api/practicums/{practicumId}/attendances -> get student own attendances (authorized for student)
4. (attendances.deleteAttendanceById) /api/attendances/{attendanceId} -> delete attendance by id (authorized for assistant and admin)
5. (users.getUserInfoByAdminAndAssistant) /api/users/{username} -> get user info (authorized for assistant and admin)

## DEV LOG <21 July 2024>

1. (practicums.removeAssistantFromPracticum) /api/practicums/{practicumId}/assistants/{username} -> remove assistants from practicum (authorized for admin)
2. (classrooms.deleteClassroomById) /api/classes/{classId} -> delete classroom by id (authorized for admin)

## DEV LOG <28 July 2024>

1. (assistance groups.removeStudentFromGroup) /api/groups/{groupId}/students/{username} -> remove students from group (authorized for admin)
2. (meetings.getAttendancesByMeetingId) /api/meetings/{meetingId}/attendances -> get students attendance list by meeting id (authorized for admin and assistant)
3. (meetings.insertAttendanceForAllStudentInMeeting) /api/meetings/{meetingId}/attendances/v2 -> add all students attendances in one meeting default status ABSENT (authorized for admin)
4. (practicums.getPracticumAttendances) /api/practicums/{practicumId}/meetings/attendances -> get practicum meetings (authorized for admin)

## DEV LOG <7 August 2024>

1. (attendace.getAttendanceById) /api/attendances/{attendanceId} -> get attendance by id (authorized for admin, asssistant, and student)
2. (meetings.addResponseOrQuizScore) /api/meetings/{meetingId}/scores -> add quiz or response score (authorizd for assistant)

## DEV LOG <11 August 2024>

1. (assistance.getAssistanceById) /api/assistances/{assistanceId} -> get assistance by id (authorized for admin, asssistant, and student)
2. (assistance.updateAssistance) /api/assistances/{assistanceId} -> update assistance (authorized for assistant)
