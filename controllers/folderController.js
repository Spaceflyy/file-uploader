const db = require("../db/queries");
const { deleteFile } = require("../public/supabase");
exports.deleteFolder = async (req, res) => {
	const { id } = req.params;
	const { files } = await db.getFileUrlFromFolder(Number(id));
	const fileurls = files.map((url) => url.fileUrl);
	await deleteFile(fileurls);
	await db.deleteSingleFolder(Number(id));
	res.redirect("/myfiles");
};
exports.createFolder = async (req, res) => {
	const { folderName } = req.body;
	await db.createNewFolder(folderName, req.user.id);
	res.redirect("/myfiles");
};

exports.updateFolder = async (newName, id) => {
	return await db.updateSingleFolder(newName, id);
};

exports.renderUpdateForm = async (req, res) => {
	const { id } = req.params;
	const folder = await db.getSingleFolder(Number(id));
	res.render("update", {
		title: "Update Folder",
		folder: folder,
		user: req.user,
	});
};

exports.renderFolder = async (req, res) => {
	const folder = await db.getSingleFolder(Number(req.params.id));
	res.render("folder", {
		title: folder.name,
		folder: folder,
		files: folder.files,
		user: req.user,
	});
};
