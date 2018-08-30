const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')
const Promise = require('bluebird')

const elasticClient = require('../db/connections').elasticClient
const { Schema } = mongoose

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    es_indexed: true,
    es_type: 'text'
  },
  content: {
    type: String,
    es_indexed: true,
    es_type: 'text'
  },
  spaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Space',
    es_indexed: true,
    es_type: 'text'
  },
  blogId: {
    type: Schema.Types.ObjectId,
    es_indexed: true,
    es_type: 'text'
  },
  created: {
    date: {
      type: Date
    },
    userId: Schema.Types.ObjectId,
    es_indexed: false
  },
  comments: {
    type: [Schema.Types.ObjectId],
    es_indexed: false
  },
  usersLikes: {
    type: [Schema.Types.ObjectId],
    es_indexed: false
  },
  isDeleted: {
    type: Boolean,
    default: false,
    es_indexed: true
  },
  version: {
    type: Number,
    default: 0,
    es_indexed: false
  },
  modifiedVersions: [{
    _id: {type: Schema.Types.ObjectId, ref: 'History'},
    version: Number,
    title: String,
    content: String,
    es_indexed: false
  }]
},
{ versionKey: false, timestamps: true }
)

pageSchema.pre('findOneAndUpdate', async function () {
  let pageQuery = this
  let newId = new mongoose.Types.ObjectId()
  let { version, title, content, modifiedVersions } = pageQuery.getUpdate()
  await modifiedVersions.push({_id: newId, version, title, content})
  pageQuery.getUpdate().version += 1
})

pageSchema.plugin(mongoosastic, {
  esClient: elasticClient,
  index: 'page'
})

const PageModel = mongoose.model('Page', pageSchema)

PageModel.search = Promise.promisify(PageModel.search, { context: PageModel })

PageModel.createMapping({
  'analysis': {
    'analyzer': {
      'standard_with_html_strip': {
        'char_filter': [ 'html_strip' ],
        'tokenizer': 'standard',
        'filter': [
          'standard',
          'lowercase'
        ]
      }
    }
  }
}, function (err, mapping) {
  if (err) {
    console.log('ERROR WHILE MAPPING')
    console.log(err)
  }
  console.log('MAPPING SUCCESS:')
  console.log(mapping)
})

module.exports = PageModel
