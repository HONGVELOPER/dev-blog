import { sql_query } from '../../../lib/db';
import AWS from 'aws-sdk';

const params = {
	Bucket: 'dev-hong-bucket',
}

const ImageHandler = async (req, res) => {
    console.log(req.method, 'deleteFile.js 진입')
    if (req.method === 'PUT') {
		try {
            if (req.body.deleteFilesInDB) {
                for (const deleteFile of req.body.deleteFilesInDB) {
                    await sql_query(`   
                        delete from devhong_db.file where F_IMG = '${deleteFile}';
                    `)
                    await sql_query(`
                        ALTER TABLE devhong_db.file AUTO_INCREMENT=1;
                    `)
                    await sql_query(`
                        SET @CNT = 0;
                    `)
                    await sql_query(`
                        UPDATE devhong_db.file SET devhong_db.file.F_ID = @CNT:=@CNT+1;
                    `)
                }
            }
            const result = req.body.deleteFiles.map(delFile => delFile.split('com/')[1])
            const s3 = new AWS.S3({
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
                region: process.env.S3_REGION,
            })
            for (const i of result) {
                params.Key = i
                s3.deleteObject(params, function(err, data) {
                    let success = null
                    if (err) {
                        success = false
                    } else {
                        success = true
                        return res.status(200).send({})
                    }
                })
            }
		} catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
	}
}

export default ImageHandler