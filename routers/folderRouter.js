const { Router } = require("express");
const {
	deleteFolder,
	createFolder,
	getAllFolders,
	getFolder,
	updateFolder,
} = require("../controllers/folderController");
const { getAllUserFilesByFolder, getSingleFolder } = require("../db/queries");

const router = Router();

router.post("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { newName } = req.body;
	await updateFolder(newName, Number(id));
	res.redirect("/myfiles");
});
router.post("/delete/:id", async (req, res) => {
	const { id } = req.params;
	await deleteFolder(Number(id));
	res.redirect("/myfiles");
});
router.post("/create", async (req, res) => {
	const { folderName } = req.body;
	await createFolder(folderName, req.user.id);
	res.redirect("/myfiles");
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
router.get("/:id", async (req, res) => {
	const { id } = req.params;

	const { name, files } = await getSingleFolder(Number(id));

	res.render("folder", { title: "Folder", folderName: name, files: files });
});

router.get("/", async (req, res) => {
	const userFolders = await getAllFolders(req.user.id);
	const userFiles = await getAllUserFilesByFolder(req.user.id, null);
	console.log(userFiles);
	res.render("myfiles", {
		title: "My Files",
		folders: userFolders,
		files: userFiles,
	});
});

module.exports = router;
