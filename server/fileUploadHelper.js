const AWS = require('aws-sdk')
// const multerS3 = require('multer-s3') //use multerS3 or multer for uploading files
require('dotenv').config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

console.log('AWS Key is availble: ', Boolean(process.env.AWS_ACCESS_KEY_ID))

const bucketName = 'bsa-docspace'

module.exports = {
  uploadFile: (buffer, name, type) => {
    const params = {
      Bucket: bucketName,
      Key: `${name}`,
      ContentType: type,
      Body: buffer
    }
    return s3.upload(params).promise()
  }
}
