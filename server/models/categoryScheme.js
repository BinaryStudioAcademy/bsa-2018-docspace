const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  spaces: [Schema.Types.ObjectId]
},
{
  versionKey: false
})

const Category = mongoose.model('Category', categorySchema)

module.exports.Category = Category
