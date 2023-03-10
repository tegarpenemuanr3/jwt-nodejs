\# Inisialisasi Project

npm init -y

\# Menginstal modul yang dibutuhkan

express, untuk framework nodejs.

jsonwebtoken, untuk jwt.

nodemon, untuk melakukan perubahan secara realtime.

npm i express jsonwebtoken --save

npm i nodemon --save-dev

\# Setting script di package.json

agar memudahkan pemanggilan nodemon kita akan set script di package.json.

package.json

"script": {

`	`"dev": "nodemon index.js"

}

\# Membuat file Entry Point

index.js

\# Setting Express

index.js

const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (req,res,nexr) => {

`	`res.json({

`		`message: "Hello mas broo.."

`	`});

});

app.listen(3000, () => {

`	`console.log("http://localhost:3000");

});

\# Jalankan app

buka di terminal dan ketikan `npm run dev`

buka `http://localhost:3000` di browser dan hasilnya akan seperti ini:

{

`	`message: "Hello mas broo.."

}

\# Membuat respon POST

ketikan script di titik-titik berikut:

app.use(express.json());

...

app.listen(3000, () => {console.log("http://localhost:3000");});

untuk membuat respon POST seperti berikut:

app.post('/', (req,res,nexr) => {

`	`res.json({

`		`message: "Hello mas broo..ini method POST loh.."

`	`});

});

\# Definisikan jsonwebtoken

const jwt = require("jsonwebtoken");

...

app.post("/login",(req,res,next) => {

`	`const user = {

`		`id: 1,

`		`username: "admin",

`		`email: "admin@mail.com"

`	`}

`	`jwt.sign(user,"secret", (err,token) => {

`		`if(err) {

`			`console.log(err);

`			`res.sendStatus(304);

`			`return

`		`}

`		`const tokenGenerate = token;

`		`res.json({

`			`user: user,

`			`token: tokenGenerate

`		`});

`	`}) ;

});

\# Cek token

Buka terminal dan ketikan:

npm run dev

masuk ke end point `http://localhost:3000/login` lewat postman atau thunder client.

Sekarang kita akan coba memberikan setiap akses pada End Point yang mengharuskan untuk ada token agar bisa mengaksesnya. sebagai contoh kita ambil request methor POST.

Before:

app.post('/', (req,res,nexr) => {

`	`res.json({

`		`message: "Hello mas broo..ini method POST loh..";

`	`});

});

After:

app.post('/', verifyUser, (req,res,nexr) => {

`	`res.json({

`		`message: "Hello mas broo..ini method POST loh.."

`	`});

});

\# Membuat function `verifyUser` untuk verifikasi

function verifyUser(req,res,next) {

`	`const bearer = req.headers.bearer;

`	`jwt.verify(bearer, 'secret', (err,data) => {

`		`if(err) {

`			`console.log(err.message);

`			`res.json(err);

`		`}

`		`req.body = data;

`		`next();

`	`})

}

dan edit hingga menjadi:

app.post('/', verifyUser, (req,res,nexr) => {

`	`res.json({

`		`message: "Hello mas broo..ini method POST loh..",

`		`data: req.body

`	`});

});

\# Tes

http://localhost:3000/login

Content-Type: application/json

bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2Nzg0NjI4OTZ9.978vw2CZ7hY27fgUAfRLwNsBT_MfdHDqRyjtSR8NDDc

\# Mengatur Expired Token

app.post("/login",(req,res,next) => { //ini hanya contoh ga perlu di copy paste

`	`const user = {

`		`id: 1,

`		`username: "admin",

`		`email: "admin@mail.com"

`	`}

`	`jwt.sign(user, "secret", { expiresIn: '30s' }, (err,token) => {

`		`if(err) {

`			`console.log(err);

`			`res.sendStatus(304);

`			`return

`		`}

`		`const tokenGenerate = token;

`		`res.json({

`			`user: user,

`			`token: tokenGenerate

`		`});

`	`});

}) ;

\# Tes

http://localhost:3000/login
