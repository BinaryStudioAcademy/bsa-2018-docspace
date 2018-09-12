const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NotificationSchema = new Schema({
  type: {
    type: String
  },
  message: {
    type: String,
    required: 'Message code is required!'
  },
  icon: {
    type: String
  },
  receivers: [Schema.Types.ObjectId],
  createdDate: {
    type: Date,
    default: new Date()
  }
})

NotificationSchema.post('updateOne', notification => {
  console.log('INSIDE NOTIFICATION POST UPDATE HOOOK')
  console.log(notification)
  console.log('THIS __________')
  console.log(this)
  if (!notification.receivers.length) {
    // удалить уведомление из базы
    // notification.remove()
    // notification.remove().exec()
  }
})

module.exports.Notification = mongoose.model('Notification', NotificationSchema)
