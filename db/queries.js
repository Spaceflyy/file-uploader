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
	const folders = await prisma.folder.findMany({ where: { authorId: userId } });
	return folders;
};
