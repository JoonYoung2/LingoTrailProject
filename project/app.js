const express = require("express");
const bodyParser = require("body-parser");
const sessionConfig = require("./config/session/session_config");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser("아무값이나키로설정"));
app.use(session(sessionConfig.sessionConfig));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = require("./src/routers/router")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", router);
app.use("/static", express.static(__dirname+"/public"));    // css, js같은 파일 경로

app.listen(3000, () => {console.log("3000 port start!!")});