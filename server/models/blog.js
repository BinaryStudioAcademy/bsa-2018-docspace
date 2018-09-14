const mongoose = require('mongoose')
const { Schema } = mongoose

const BlogSchema = new mongoose.Schema({
  pages: [{type: Schema.Types.ObjectId, ref: 'Page'}]
},
{
  versionKey: false
})

const BlogModel = mongoose.model('Blog', BlogSchema)

module.exports = BlogModel
