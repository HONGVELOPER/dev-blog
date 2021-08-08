import AWS from 'aws-sdk';

const imageFunctions = {}

imageFunctions.uploadFile = async (params) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        region: process.env.S3_REGION,
    })

    const result = await s3.upload(params).promise()
    console.log(result, 'result')
    return result.Location
}

export default imageFunctions