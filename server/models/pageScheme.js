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
  }
},
{ versionKey: false, timestamps: true }
)

pageSchema.plugin(mongoosastic, {
  esClient: elasticClient,
  index: 'page'
})

pageSchema.post('save', function (page) {
  console.log('Inside a document post save')
  console.log('________________________________________')
  console.log(page)
  // cut html tags from page content and manualy indexing the page to elasticsearch
  if (page.content !== '' && page.content) {
    page.content = page.content.replace(/(<([^>]+)>)/ig, '')
    console.log(page)
    page.index(function (err, res) {
      page.emit('es-indexed', err, res)
    })
  }
})

const PageModel = mongoose.model('Page', pageSchema)

PageModel.search = Promise.promisify(PageModel.search, { context: PageModel })
PageModel.esSearch = Promise.promisify(PageModel.esSearch, { context: PageModel })

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
