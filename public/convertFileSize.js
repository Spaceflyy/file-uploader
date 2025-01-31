exports.convertBytes = (bytes) => {
	const suffix = ["Bytes", "KB", "MB", "GB"];
	let value = bytes;
	let unit = 0;

	while (value >= 1000 && unit < suffix.length - 1) {
		value /= 1000;
		unit++;
	}

	return `${value.toFixed(1)} ${suffix[unit]}`;
};
