const GeneralRepository = require('./GeneralRepository')
const Notification = require('../models/notification')

class NotificationRepository extends GeneralRepository {
  removeReceiver (notificationId, userId) {
    return super.updateOne(notificationId, {
      $pull: { 'receivers': userId }
    })
  }
}

module.exports = new NotificationRepository(Notification)
