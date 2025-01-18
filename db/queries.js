const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createUser = async (username, password) => {
	await prisma.user.create({ data: { username: username, password: password } });
};

exports.getUser = async (username) => {
	const user = await prisma.user.findFirst({ where: { username: username } });
	return user;
};

exports.getAllFolders = async (userId) => {
	return await prisma.folder.findMany({
		where: { authorId: userId },
	});
};

exports.createNewFolder = async (name, userId) => {
	await prisma.folder.create({ data: { name: name, authorId: userId } });
};

exports.getSingleFolder = async (folderId) => {
	return await prisma.folder.findUnique({
		where: { id: folderId },
		include: {
			files: true,
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
			//Need to figure out how to make folder id optional
			folderId: folderId,
		},
	});
};

exports.getAllUserFilesByFolder = async (userId, folderId) => {
	return (folders = await prisma.file.findMany({
		where: { authorId: userId, folderId: folderId },
	}));
};
