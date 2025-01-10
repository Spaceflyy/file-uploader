const { body, validationResult } = require("express-validator");

exports.addUser = async (req, res) => {
	const { username, password } = req.body;

	res.redirect("/");
};

exports.renderHome = (req, res) => {
	res.render("index", { title: "Home", user: req.user });
};
