import formidable from 'formidable';
import fs from 'fs';
import AWS from 'aws-sdk';

export const config = {
	api: {
	  bodyParser: false,
	}
}

const params = {
	Bucket: 'devhong-s3',
	ACL: 'public-read',
}

const ImageHandler = async (req, res) => {
	console.log(req, 'req cehck')
    if (req.method === 'POST') {
        try {
            const form = new formidable.IncomingForm({
				encoding: 'utf-8',
    			multiples: true,
				keepExtensions: false
			})
			form.parse(req, (err, fields, files) => {
				params.Key = files.img.name
				params.Body = fs.createReadStream(files.img.path)
				const s3 = new AWS.S3({
					accessKeyId: process.env.S3_ACCESS_KEY,
					secretAccessKey: process.env.S3_SECRET_KEY,
					region: process.env.S3_REGION,
				})
				s3.upload(params, function(err, data) {
					let location = null
					if (err) {
						location = false
					} else {
						location = data.Location
					}
					return res.status(200).send({ location })
				})
			})
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
    }
}

export default ImageHandler