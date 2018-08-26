const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const GeneralRepository = require('./GeneralRepository')
const BlogModel = require('../models/blog')

class BlogRepository extends GeneralRepository {
  addPageToBlog (page) {
    return this.model.update(
      { _id: page.blogId },
      { $push: { 'pages': page._id } }
    )
  }

  deletePageFromBlog (blogId, pageId) {
    return this.model.update(
      { _id: blogId },
      { $pull: { 'pages': pageId } }
    )
  }

  getById (id) {
    return this.model.aggregate([
      {
        $match: { _id: ObjectId(id) }
      },
      {
        $lookup: {
          from: 'pages',
          localField: 'pages',
          foreignField: '_id',
          as: 'pages'
        }
      },

      {
        $project: {
          _id: 1,
          pages: {
            _id: 1,
            title: 1,
            createdAt: 1,
            isDeleted: 1
          }
        }
      },
      { $limit: 1 }
    ])
  }
}

module.exports = new BlogRepository(BlogModel)
