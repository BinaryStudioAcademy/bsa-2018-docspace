module.exports = passport => (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, authUser, info) => {
    if (err) {
      return res.json({ isLoggedIn: false, message: 'Not authorized' })
    }
    if (!authUser) {
      return res.status(500).json({ isLoggedIn: false, message: 'Can not find user' })
    }

    let user = {
      spaces: authUser.spaces,
      _id: authUser._id,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      email: authUser.email,
      login: authUser.login,
      avatar: authUser.avatar
    }
    req.user = user
    next()
  })(req, res, next)
}
