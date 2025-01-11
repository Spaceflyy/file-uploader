const { body } = require("express-validator");

const validateUser = [
	body("username")
		.trim()
		.isEmail()
		.withMessage("Please Enter a valid email address."),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Password cannot be empty.")
		.isLength({ min: 8, max: 100 })
		.withMessage("Password must be between 8 and 100 characters")
		.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
		.withMessage(
			"Password must contain at least one uppercase (A-Z), Symbol (!,$,#,%) and one Number (0-9)."
		),
	body("confirmPassword")
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage("Passwords do not match."),
];

module.exports = { validateUser };
