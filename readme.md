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
