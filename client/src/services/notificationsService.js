import { callWebApi } from 'src/helpers/requestHelper'

class NotificationsService {
  clearNotifications (userId, notificationsIds) {
    const args = {
      endpoint: `/api/user/${userId}/notifications`,
      method: 'DELETE',
      body: JSON.stringify({ notificationsIds })}
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
}

export default new NotificationsService()
