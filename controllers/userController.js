const { validationResult } = require("express-validator");
const { validateUser } = require("../public/validators");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const passport = require("passport");

exports.addUser = [
	validateUser,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("signup", {
				title: "Home",
				user: req.user,
				errors: errors.array(),
			});
		}

		const { username, password } = req.body;
		bcrypt.hash(password, 10, async (err, hashedPassword) => {
			try {
				await db.createUser(username, hashedPassword);

				res.redirect("/");
			} catch (err) {
				next(err);
			}
		});
	},
];

exports.userLogout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};

exports.userLogin = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/",
	failureMessage: true,
});

exports.renderMyFiles = async (req, res) => {
	const { folders, files } = await db.getUser(req.user.id);
	const filesNoFolder = files.filter((f) => {
		if (f.folderId === null) {
			return f;
		}
	});

	res.render("myfiles", {
		title: "My Files",
		folders: folders,
		files: filesNoFolder,
		userId: req.user.id,
	});
};
