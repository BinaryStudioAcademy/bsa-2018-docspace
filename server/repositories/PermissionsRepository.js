const GeneralRepository = require('./GeneralRepository')
const PermissionsModel = require('../models/permissions')

class PermissionsRepository extends GeneralRepository {
  updateManyInDifferentWay(permissionsArr) {
    return new Promise( (resolve, reject) => {
            const permissionsArr = req.body
            const updated = 0;
            for( i = 0; i < permissionsArr.length; i++){
              this.model.update(permissionsArr[i])
                .then( (permssionsi) => {
                  console.log(permissions)
                  ++updated
                  if(updated === permissionsArr.length){
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
