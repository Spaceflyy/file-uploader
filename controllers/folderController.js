const db = require("../db/queries");
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
