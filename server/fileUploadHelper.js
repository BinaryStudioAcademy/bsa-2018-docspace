const AWS = require('aws-sdk')
// const fs = require('fs');
// const multerS3 = require('multer-s3'
require('dotenv').config()
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const bucketName = 'docspace'
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
      if (s3Err) throw s3Err
      console.log(`File uploaded successfully at ${data.Location}`)
    })
  },
  downloadFile: () => {}
}
