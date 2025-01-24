const db = require("../db/queries");
const { decode } = require("base64-arraybuffer");
const { uploadFile, generateDownloadLink } = require("../public/supabase");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

exports.uploadFile = (req, res) => {
	const { id } = req.params;
	const { buffer, originalname, size } = req.file;
	const path = `${req.user.id}/${originalname}`;
	const file = decode(buffer.toString("base64"));
	uploadFile(path, file); // uploads to supabase
	const { data } = supabase.storage.from(`userfiles`).getPublicUrl(path);
	db.addSingleFile(req.user.id, originalname, size, data.publicUrl, Number(id));
	res.redirect(`/myfiles/${id}`);
};

exports.downloadFile = async (req, res) => {
	const path = req.params[0];
	const url = await generateDownloadLink(path);
	res.redirect(url);
};
