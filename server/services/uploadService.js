const uploadFileHelper = require('../fileUploadHelper')
const UserRepository = require('../repositories/UserRepository')

module.exports = {
  uploadAvatarFile: async (req, res) => {
    try {
      // buffer of file
      const buffer = req.file.buffer
      // time to be uniqe name of file
      const timestamp = Date.now().toString()
      // file name in amazon server
      const fileName = `${timestamp}${req.file.originalname}`
      const mimeType = req.file.mimetype
      // userId to save in mongoDb link to avatar
      const userId = JSON.parse(req.body.userId)
      // save file to amazon
      const data = await uploadFileHelper.uploadFile(buffer, fileName, mimeType)
      UserRepository.update({ _id: userId.userId }, { avatar: data.Location })
        .then(userWithAvatar => {
          // remove password return
          userWithAvatar = {
            spaces: userWithAvatar.spaces,
            _id: userWithAvatar._id,
            firstName: userWithAvatar.firstName,
            lastName: userWithAvatar.lastName,
            email: userWithAvatar.email,
            login: userWithAvatar.login,
            avatar: userWithAvatar.avatar
          }
          return res.status(200).send({user: userWithAvatar, message: 'User avatar added'})
        })
        .catch(err => res.status(400).send(err))
    } catch (err) {
      return res.status(400).send(err)
    }
  }
}
