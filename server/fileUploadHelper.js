const AWS = require('aws-sdk')
// const multerS3 = require('multer-s3') //use multerS3 or multer for uploading files
require('dotenv').config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const bucketName = 'bsa-docspace'
const data = {
  'some key': 'some value'
}

module.exports = {
  uploadFile: () => {
    const params = {
      Bucket: bucketName,
      Key: 'simple.file',
      Body: JSON.stringify(data, null, 2)
    }

    s3.upload(params, function (s3Err, data) {
      if (s3Err) {
        console.log(s3Err)
      } else {
        console.log(`File uploaded successfully at ${data.Location}`)
      }
    })
  }
}
