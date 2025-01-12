const db = require("../db/queries");

const createFolder = async (req, res) => {};

async function getAllFolders(user) {
	const userFolders = await db.getAllFolders(user);
	return userFolders;
}

module.exports = { createFolder, getAllFolders };
