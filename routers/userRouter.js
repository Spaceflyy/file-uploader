const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const { addUser, renderHome } = userController;
router.post("/signup", addUser);
router.get("/", renderHome);

module.exports = router;
