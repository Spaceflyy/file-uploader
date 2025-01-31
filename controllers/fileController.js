const db = require("../db/queries");
const { decode } = require("base64-arraybuffer");
const { convertBytes } = require("../public/convertFileSize");
const {
	uploadFile,
	generateDownloadLink,
	deleteFile,
} = require("../public/supabase");

exports.uploadFile = (req, res) => {
	const { id } = req.params;
	const { buffer, originalname, size } = req.file;
	const fileSize = convertBytes(size);
	const path = `${req.user.id}/${originalname}`;
	const file = decode(buffer.toString("base64"));
	uploadFile(path, file); // uploads to supabase
	db.addSingleFile(req.user.id, originalname, fileSize, path, Number(id));
	if (id) {
		res.redirect(`/myfiles/${id}`);
	} else {
		res.redirect("/myfiles");
	}
};

exports.downloadFile = async (req, res) => {
	const path = req.params[0];
	console.log(path);
	const url = await generateDownloadLink([path]);
	res.redirect(url);
};

exports.deleteFile = async (req, res) => {
	const fileId = req.params.id;
	const { fileUrl } = await db.findFileById(Number(fileId));
	await deleteFile(fileUrl);
	await db.deleteSingleFile(Number(fileId));
	res.redirect("/myfiles");
};
