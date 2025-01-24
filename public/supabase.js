const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

//TODO: figure out how to catch supabase errors properly
exports.uploadFile = async (path, file) => {
	try {
		const { data, error } = await supabase.storage
			.from(`userfiles`)
			.upload(path, file);

		console.log(error);
	} catch (error) {
		console.error(error);
	}
};

exports.generateDownloadLink = async (path) => {
	const { data, error } = await supabase.storage
		.from(`userfiles`)
		.createSignedUrl(path, 60, { download: true });

	return data.signedUrl;
};

exports.getFileURL = async (path) => {
	const { data } = await supabase.storage.from(`userfiles`).getPublicUrl(path);
};
