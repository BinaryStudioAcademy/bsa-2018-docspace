module.exports = passport => (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, authUser, info) => {
    console.log('IN VERIFY JWT MIDDLEWARE')
    console.log('authUser')
    console.log(authUser)
    console.log('err')
    console.log(err)
    if (err) return res.json({ isLoggedIn: false, message: 'Not authorized' })
    if (!authUser) return res.status.json({ isLoggedIn: false, message: 'Can not find user' })

    let user = {
      spaces: authUser.spaces,
      _id: authUser._id,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      email: authUser.email,
      login: authUser.login
    }
    req.user = user
    next()
  })(req, res, next)
}
