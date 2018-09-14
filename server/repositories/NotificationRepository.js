const GeneralRepository = require('./GeneralRepository')
const Notification = require('../models/notification')

class NotificationRepository extends GeneralRepository {
  removeReceiverFromNotifications (notificationsIds, userId) {
    return super.updateMany({ _id: {$in: notificationsIds} }, {
      $pull: { 'receivers': userId }
    })
  }
}

module.exports = new NotificationRepository(Notification)
