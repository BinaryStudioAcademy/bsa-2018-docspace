const GeneralRepository = require('./GeneralRepository')
const PermissionsModel = require('../models/permissions')

class PermissionsRepository extends GeneralRepository {
  updateManyInDifferentWay (req, res) {
    return new Promise((resolve, reject) => {
      const permissionsArr = req.body
      let updated = 0
      for (let i = 0; i < permissionsArr.length; i++) {
        this.model.update(permissionsArr[i])
          .then((permissions) => {
            console.log(permissions)
            ++updated
            if (updated === permissionsArr.length) {
              resolve()
            }
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      }
    })
  }
}

module.exports = new PermissionsRepository(PermissionsModel)
