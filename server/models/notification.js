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
  link: String,
  receivers: [Schema.Types.ObjectId],
  createdDate: {
    type: Date,
    default: new Date()
  }
})

const NotificationModel = mongoose.model('Notification', NotificationSchema)

module.exports = NotificationModel
