const { Router } = require("express");
const {
	deleteFolder,
	createFolder,
	getAllFolders,
} = require("../controllers/folderController");
const router = Router();
router.post("/delete/:folder", async (req, res) => {
	const { folder } = req.params;
	await deleteFolder(Number(folder));
	res.redirect("/folders");
});
router.post("/create", async (req, res) => {
	const { folderName } = req.body;
	await createFolder(folderName, req.user.id);
	res.redirect("/folders");
});
router.get("/create", (req, res) => {
	res.render("create", { title: "Add Folder" });
});

//TODO: need to implement this properly
router.get("/:id", (req, res) => {
	const { id } = req.params;
	res.send(`This is folder number: ${id}`);
});

router.get("/", async (req, res) => {
	const userFolders = await getAllFolders(req.user.id);

	res.render("folders", { title: "My Folders.", folders: userFolders });
});

module.exports = router;
