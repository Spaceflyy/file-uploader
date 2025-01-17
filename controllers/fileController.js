const db = require("../db/queries");
const { decode } = require("base64-arraybuffer");
const { getFileURL, uploadFile } = require("../public/supabase");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

exports.uploadFile = (req, res) => {
	const { id } = req.user;
	const { buffer, originalname, size } = req.file;
	const path = `${id}/${originalname}`;

	// const file = decode(buffer.toString("base64"));
	// uploadFile(path, file); // uploads to supabase

	const { data } = supabase.storage.from(`userfiles`).getPublicUrl(path);

	db.addSingleFile(id, originalname, size, data.publicUrl);

	res.redirect("/");
};

exports.getAllfiles = async () => {};