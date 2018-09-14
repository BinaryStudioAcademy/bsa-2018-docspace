const UserRepository = require('../repositories/UserRepository')
const NotificationRepository = require('../repositories/NotificationRepository')

module.exports = {
  deleteForUser: (req, res) => {
    Promise.all([
      UserRepository.clearUsersNotifications(req.params.id),
      NotificationRepository.removeReceiverFromNotifications(req.body.notificationsIds, req.params.id)
    ])
      .then(() => res.status(200).end())
      .catch(err => {
        console.log(err)
        res.status(400).end()
      })
  }
}
