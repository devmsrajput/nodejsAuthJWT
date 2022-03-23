const express = require("express");
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
const path = require('path')
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL;
const cors = require('cors')
const mydb = require("./database/myDb.js");
const main = require("./routes/main.js");

mydb(DATABASE_URL);

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({extended: false}))

app.set("views", path.join(process.cwd(), "templates", "views"));
app.set("view engine", "ejs");

app.use("/", express.static(path.join(process.cwd(), "public")));
app.use("/sign-up", express.static(path.join(process.cwd(), "public")));
app.use("/sign-in", express.static(path.join(process.cwd(), "public")));
app.use("/user", express.static(path.join(process.cwd(), "public")));

app.use("/", main);

app.listen(PORT, '192.168.1.4', () => {
  console.log(`Server is listening at: http://192.168.1.4:${PORT}`);
});
