const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

exports.uploadFile = async (path, file) => {
	try {
		await supabase.storage.from(`userfiles`).upload(path, file);
	} catch (error) {
		console.error(error);
	}
};

exports.generateDownloadLink = async (path) => {
	const { data, error } = await supabase.storage
		.from(`userfiles`)
		.createSignedUrl(path, 5, { download: true });
	return data.signedUrl;
};

exports.deleteFile = async (path) => {
	const { data, error } = await supabase.storage
		.from(`userfiles`)
		.remove([path]);
	if (error) {
		console.log(error);
		return null;
	}
};
