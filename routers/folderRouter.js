const { Router } = require("express");
const {
	deleteFolder,
	createFolder,
	getAllFolders,
	getFolder,
	updateFolder,
} = require("../controllers/folderController");
const { getAllUserFiles } = require("../db/queries");

const router = Router();

router.post("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { newName } = req.body;
	await updateFolder(newName, Number(id));
	res.redirect("/folders");
});
router.post("/delete/:id", async (req, res) => {
	const { id } = req.params;
	await deleteFolder(Number(id));
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

router.get("/update/:id", async (req, res) => {
	const { id } = req.params;
	const folder = await getFolder(Number(id));
	res.render("update", { title: "Update Folder", folder: folder });
});

//TODO: need to implement this properly
router.get("/:id", (req, res) => {
	const { id } = req.params;
	res.send(`This is folder number: ${id}`);
});

router.get("/", async (req, res) => {
	const userFolders = await getAllFolders(req.user.id);
	const userFiles = await getAllUserFiles(req.user.id);
	res.render("folders", {
		title: "My Folders.",
		folders: userFolders,
		files: userFiles,
	});
});

module.exports = router;
