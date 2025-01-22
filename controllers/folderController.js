const db = require("../db/queries");

exports.deleteFolder = async (req, res) => {
	const { id } = req.params;
	await db.deleteSingleFolder(Number(id));
	res.redirect("/myfiles");
};
exports.createFolder = async (req, res) => {
	const { folderName } = req.body;

	await db.createNewFolder(folderName, req.user.id, Number(req.params.id));
	res.redirect("/myfiles");
};

exports.updateFolder = async (newName, id) => {
	return await db.updateSingleFolder(newName, id);
};

exports.renderUpdateForm = async (req, res) => {
	const { id } = req.params;
	const folder = await db.getSingleFolder(Number(id));
	res.render("update", { title: "Update Folder", folder: folder });
};

exports.renderFolder = async (req, res) => {
	const folder = await db.getSingleFolder(Number(req.params.id));
	res.render("folder", {
		title: folder.name,
		folder: folder,
		files: folder.files,
		folders: folder.childFolders,
	});
};
