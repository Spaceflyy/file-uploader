const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const { userLogout, addUser, userLogin } = userController;
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req, res) => {});

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
