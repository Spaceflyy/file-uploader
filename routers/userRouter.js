const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const { userLogout, addUser, userLogin } = userController;

router.get("/logout", userLogout);
router.get("/login", (req, res) => {
	res.render("login", { title: "Login" });
});
router.post("/login", userLogin);
router.post("/signup", addUser);

router.get("/", (req, res) => {
	res.render("index", { title: "Home", user: req.user });
});

module.exports = router;
