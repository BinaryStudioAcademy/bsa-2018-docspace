const GeneralRepository = require('./GeneralRepository')
const scheme = require('../models/historyScheme')

class HistoryRepository extends GeneralRepository {
  // Possibility to delete history for current Page or Space etc
  deleteAllHistoryInCriteria (criteriaId) {
    return this.deleteMany({criteriaId})
  }

  getCurrentUserHistory (id) {
    return this.getAllByCriteria({userId: id})
  }

  getCurrentPageHistory (id, version) {
    return this.getAllByCriteria({ pageId: id, modifiedVersion: version })
  }

  getUserHistory (id) {
    return this.model.aggregate([{'$match': {userId: id,
      action: { $in: [/PAGE/, /BLOG/] }}},
    {
      $lookup:
            {
              from: 'pages',
              localField: 'pageId',
              foreignField: '_id',
              as: 'page'
            }
    },
    { '$unwind': '$page' },
    {
      $lookup:
            {
              from: 'spaces',
              localField: 'spaceId',
              foreignField: '_id',
              as: 'space'
            }
    },
    { '$unwind': '$space' },
    {
      $group:
              {
                _id: {pageId: '$pageId', action: '$action'},
                uniqueIds: {$addToSet: '$_id'},
                date: {$last: '$date'},
                pageId: {'$first': '$page._id'},
                title: {'$first': '$page.title'},
                isDeleted: {'$first': '$page.isDeleted'},
                spaceId: {'$first': '$space._id'},
                name: {'$first': '$space.name'}}},
    {$sort: {date: -1}},
    {$limit: 8}
    ])
  }
}

module.exports = new HistoryRepository(scheme.History)
/* db.histories.aggregate([{'$match': {userId : ObjectId('5b8e8c46e88b5974dcf99578'),
action: { $in: [/PAGE/, /BLOG/] }}},
    {
      $lookup:
        {
          from: 'pages',
          localField: 'pageId',
          foreignField: '_id',
          as: 'page'
        }
      },
      { '$unwind': '$page' },
      {
        $lookup:
        {
          from: 'spaces',
          localField: 'spaceId',
          foreignField: '_id',
          as: 'space'
        }
      },
      { '$unwind': '$space' },
      {
        $group:
          {
            _id: {pageId: '$pageId', action: '$action'},
            uniqueIds: {$addToSet: '$_id'},
            date: {$last: '$date'},
            pageId: {'$first': '$page._id'},
            title: {'$first': '$page.title'},
            isDeleted: {'$first': '$page.isDeleted'},
            spaceId: {'$first': '$space._id'},
            name: {'$first': '$space.name'}}},
          {$sort: {date: -1}},
        {$limit: 8}
    ]) */
