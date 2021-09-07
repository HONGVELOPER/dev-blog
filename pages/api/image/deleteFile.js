import { sql_query } from '../../../lib/db';
import AWS from 'aws-sdk';

const params = {
	Bucket: 'devhong-s3',
}

const ImageHandler = async (req, res) => {
    if (req.method === 'PUT') {
		try {
            console.log(req.body, 'first')
            if (req.body.deleteFilesInDB) {
                for (const deleteFile of req.body.deleteFilesInDB) {
                    await sql_query(`   
                        delete from ${process.env.DB_DATABASE}.file where F_IMG = '${deleteFile}';
                    `)
                    await sql_query(`
                        ALTER TABLE ${process.env.DB_DATABASE}.file AUTO_INCREMENT=1;
                    `)
                    await sql_query(`
                        SET @CNT = 0;
                    `)
                    await sql_query(`
                        UPDATE ${process.env.DB_DATABASE}.file SET ${process.env.DB_DATABASE}.file.F_ID = @CNT:=@CNT+1;
                    `)
                }
            }
            const results = req.body.deleteFiles.map(delFile => delFile.split('com/')[1])
            const s3 = new AWS.S3({
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
                region: process.env.S3_REGION,
            })
            let success = null
            for (const result of results) {
                params.Key = result
                s3.deleteObject(params, function(err, data) {
                    if (err) {
                        success = false
                    } else {
                        success = true
                        console.log(data, 'data check')
                    }
                })
            }
            return res.status(200).send(success)
		} catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
	}
}

export default ImageHandler