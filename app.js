const path = require("node:path");
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require("./public/passport");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// app.use(
// 	session({
// 		secret: process.env.COOKIE_SECRET,
// 		resave: false,
// 		saveUninitialized: false,
// 		store: new PrismaSessionStore(new PrismaClient(), {
// 			checkPeriod: 2 * 60 * 1000,
// 			dbRecordIdIsSessionId: true,
// 			dbRecordIdFunction: undefined,
// 		}),
// 		cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
// 	})
// );
// app.use(passport.session());
app.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});
app.listen(3000, () => {
	console.log("App is now listening on port 3000");
});
