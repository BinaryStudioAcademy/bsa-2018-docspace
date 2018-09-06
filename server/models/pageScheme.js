const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')
const timestamps = require('mongoose-timestamp')
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

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    es_indexed: false
  }],

  usersLikes: [{
    type: Schema.Types.ObjectId,
    es_indexed: false,
    ref: 'User'
  }],

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

  modifiedVersions: {
    type: [{
      _id: {type: Schema.Types.ObjectId, ref: 'History'},
      version: Number,
      title: String,
      content: String
    }],
    es_indexed: false
  },

  // manualy set updatedAt and createdAt fields with es_indexes: true. They wil be indexing into Elasticsearch.
  // After all updates, mongoose-timestaps will change updatedAt field, that causes it's updates in elastic.
  // Strange: not working with createdAt, throw error while compoling

  updatedAt: {
    type: Date,
    es_indexed: true
  }

},
{ versionKey: false }
)

pageSchema.pre('findOneAndUpdate', async function () {
  let pageQuery = this
  let { version, title, content, modifiedVersions, isDeleted } = pageQuery.getUpdate()
  if (!isDeleted) {
    let newId = new mongoose.Types.ObjectId()
    await modifiedVersions.push({_id: newId, version, title, content})
    pageQuery.getUpdate().version += 1
  }
})

pageSchema.plugin(mongoosastic, {
  esClient: elasticClient,
  index: 'page'
})

pageSchema.plugin(timestamps)

pageSchema.post('findOneAndUpdate', function (page) {
  // cut html tags from page content and manualy indexing the page to elasticsearch
  if (page.content !== '' && page.content) {
    page.content = page.content.replace(/(<([^>]+)>)/ig, '')

    page.index(function (err, res) {
      page.emit('es-indexed', err, res)
    })
  }
})

const PageModel = mongoose.model('Page', pageSchema)

PageModel.search = Promise.promisify(PageModel.search, { context: PageModel })
PageModel.esSearch = Promise.promisify(PageModel.esSearch, { context: PageModel })

// TODO: change analyzer. Reason : more complex search using synonyms and part of words.
PageModel.createMapping({
  'settings': {
    'analysis': {
      'analyzer': {
        'default': {
          'type': 'custom',
          'char_filter': [ 'html_strip' ],
          'tokenizer': 'standard',
          'filter': [
            'standard',
            'lowercase'
          ]
        }
      }
    }
  }

}, function (err, mapping) {
  if (err) {
    console.log('ERROR WHILE MAPPING')
    console.log(err)
  } else {
    console.log('MAPPING SUCCESS:')
    console.log(mapping)
  }
})

module.exports = PageModel

// TODO: try to change mapping and set createdAt and updatedAt manual
// PageModel.createMapping({
// "settings": {
//   'analysis': {
//     'analyzer': {
//       'standard_with_html_strip': {
//         "type":"custom",
//         'char_filter': [ 'html_strip' ],
//         'tokenizer': 'standard',
//         'filter': [
//           'standard',
//           'lowercase'
//         ]
//       }
//     }
//   }
// },
// 'mapping': {
//   "page": {
//     "properties": {
//       "content": {
//         "type":     "text",
//         "analyzer": "standard",
//         "fields": {
//           "english": {
//             "type":     "text",
//             "analyzer": "std_english"
//           }
//         }
//       }
//     }
// }
// }, function (err, mapping) {
//   if (err) {
//     console.log('ERROR WHILE MAPPING')
//     console.log(err)
//   } else {
//     console.log('MAPPING SUCCESS:')
//     console.log(mapping)
//   }
// })
