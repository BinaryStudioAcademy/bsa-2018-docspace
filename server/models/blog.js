const mongoose = require('mongoose')
const { Schema } = mongoose

const BlogSchema = new mongoose.Schema({
  pages: [ Schema.Types.ObjectId ]
},
{
  versionKey: false
})

const BlogModel = mongoose.model('Blog', BlogSchema)

module.exports = BlogModel
