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
