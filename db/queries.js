const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.getUser = async (id) => {
	return await prisma.user.findUnique({
		where: { id: id },
		include: { folders: true, files: true },
	});
};
exports.createUser = async (username, password) => {
	await prisma.user.create({ data: { username: username, password: password } });
};

exports.createNewFolder = async (name, userId, parentId) => {
	await prisma.folder.create({
		data: { name: name, authorId: userId, parentId },
	});
};

exports.getSingleFolder = async (folderId) => {
	return await prisma.folder.findUnique({
		where: { id: folderId },
		include: {
			files: true,
			childFolders: true,
		},
	});
};

exports.deleteSingleFolder = async (folderId) => {
	await prisma.folder.delete({ where: { id: folderId } });
};

exports.updateSingleFolder = async (newName, folderId) => {
	await prisma.folder.update({
		where: { id: folderId },
		data: { name: newName },
	});
};

exports.addSingleFile = async (userId, fileName, size, url, folderId) => {
	await prisma.file.create({
		data: {
			authorId: userId,
			name: fileName,
			size: size,
			fileUrl: url,
			folderId: folderId,
		},
	});
};
