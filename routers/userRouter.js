const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const { createFolder, userLogout, addUser, userLogin } = userController;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//consider moving these to own file router / controller
router.post("/create", createFolder); //TODO create createFolder function
router.post("/upload", upload.single("file"), (req, res) => {
	res.redirect("/");
});

router.post("/login", userLogin);
router.post("/signup", addUser);

router.get("/logout", userLogout);
router.get("/create", (req, res) => {});
router.get("/signup", (req, res) => {
	res.render("signup", { title: "Register" });
});
router.get("/", (req, res) => {
	res.render("index", { title: "Home", user: req.user });
});

module.exports = router;
