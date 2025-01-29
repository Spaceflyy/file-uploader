const db = require("../db/queries");
const { decode } = require("base64-arraybuffer");
const {
	uploadFile,
	generateDownloadLink,
	deleteFile,
} = require("../public/supabase");

exports.uploadFile = (req, res) => {
	const { id } = req.params;
	const { buffer, originalname, size } = req.file;
	const path = `${req.user.id}/${originalname}`;
	const file = decode(buffer.toString("base64"));
	uploadFile(path, file); // uploads to supabase
	db.addSingleFile(req.user.id, originalname, size, path, Number(id));
	res.redirect(`/myfiles/${id}`);
};

exports.downloadFile = async (req, res) => {
	const path = req.params[0];
	console.log(path);
	const url = await generateDownloadLink([path]);
	res.redirect(url);
};
//delete file work on this today
exports.deleteFile = async (req, res) => {
	const fileId = req.params.id;
	const { fileUrl } = await db.findFileById(Number(fileId));
	await deleteFile(fileUrl);
	await db.deleteSingleFile(Number(fileId));
	res.redirect("/myfiles");
};
