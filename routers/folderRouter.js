const { Router } = require("express");
const { getAllFolders } = require("../controllers/folderController");
const router = Router();
//consider moving these to own file router / controller
// router.post("/create", createFolder); //TODO create createFolder function
// router.get("/:id", getSingleFolder); // view the folder clicked on
router.get("/", async (req, res) => {
	const userFolders = await getAllFolders(req.user.id);

	res.render("folders", { title: "My Folders.", folders: userFolders });
});

module.exports = router;
