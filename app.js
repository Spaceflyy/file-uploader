const path = require("node:path");
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("./public/passport");
const userRouter = require("./routers/userRouter");
const folderRouter = require("./routers/folderRouter");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());

app.use(
	session({
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: 2 * 60 * 1000,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);
app.use(passport.session());
app.use("/myfiles", folderRouter);
app.use("/", userRouter);

app.listen(3000, () => {
	console.log("App is now listening on port 3000");
});
