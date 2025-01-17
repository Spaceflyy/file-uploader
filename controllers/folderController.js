const db = require("../db/queries");
const { decode } = require("base64-arraybuffer");
const { uploadFile } = require("../public/supabase");

//TODO rewrite these functions
exports.deleteFolder = async (id) => {
	await db.deleteSingleFolder(id);
};
exports.createFolder = async (name, user) => {
	await db.createNewFolder(name, user);
};

exports.getAllFolders = async (user) => {
	const userFolders = await db.getAllFolders(user);
	return userFolders;
};

exports.getFolder = async (id) => {
	return await db.getSingleFolder(id);
};

exports.updateFolder = async (newName, id) => {
	return await db.updateSingleFolder(newName, id);
};
//move this to the file controller
exports.uploadFile = async (user, rawFile) => {
	const path = `${user.id}/${rawFile.originalname}`;
	const file = decode(rawFile.buffer.toString("base64"));
	uploadFile(path, file); // uploads to supabase

	res.redirect("/");
};
