
const UploadController = {

addUpload(req, res) {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	const { image } = req.files;
	image.mv(`${__dirname}/image/lunch/${image.name}`, (err) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.send('File uploaded!');
	});
	return true;
}
}


module.exports = UploadController;
