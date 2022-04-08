import formidable from "formidable";
import fs from "fs";
import AWS from "aws-sdk";

export const config = {
	api: {
		bodyParser: false,
	},
};

const params = {
	Bucket: "devhong-s3",
	ACL: "public-read",
};

const ImageHandler = async (req, res) => {
	try {
		const form = new formidable.IncomingForm({
			encoding: "utf-8",
			multiples: true,
			keepExtensions: false,
		});
		form.parse(req, (err, fields, files) => {
			const s3 = new AWS.S3({
				accessKeyId: process.env.S3_ACCESS_KEY,
				secretAccessKey: process.env.S3_SECRET_KEY,
				region: process.env.S3_REGION,
			});
			let reqFile = null;
			!files.img.length ? (reqFile = [files.img]) : (reqFile = files.img);
			const location = [];
			for (const item of reqFile) {
				params.Key = item.name;
				params.Body = fs.createReadStream(item.path);
				s3.upload(params, function (err, data) {
					let response = null;
					if (err) {
						response = false;
					} else {
						response = data.Location;
						location.push(response);
						if (location.length === reqFile.length) {
							return res.status(200).send({ location });
						}
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export default ImageHandler;
