const { Router } = require("express");
const {
	deleteFolder,
	createFolder,
	updateFolder,
	renderFolder,
	renderUpdateForm,
} = require("../controllers/folderController");
const { renderMyFiles } = require("../controllers/userController");
const { downloadFile, deleteFile } = require("../controllers/fileController");

const router = Router();

router.post("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { newName } = req.body;
	await updateFolder(newName, Number(id));
	res.redirect("/myfiles");
});

router.get("/download/*", downloadFile);
router.post("/delete/:id", deleteFolder);
router.post("/delete/file/:id", deleteFile);

router.post("/create/:id?", createFolder);
router.get("/update/:id", renderUpdateForm);

router.get("/:id", renderFolder);

router.get("/", renderMyFiles);

module.exports = router;
