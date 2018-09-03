const space = require('./space')
const user = require('./user')
const page = require('./page')
const signup = require('./auth/signup')
const login = require('./auth/login')
const logout = require('./auth/logout')
const reset = require('./auth/reset')
const category = require('./category')
const comment = require('./comment')
const autologin = require('./auth/autologin')
const blog = require('./blog')
const group = require('./group')
const history = require('./history')
const permissions = require('./permissions')
const uploadFiles = require('./uploadFile')
const upload = require('./upload')
const SearchService = require('../../services/searchService')
// const search = require('./search')

module.exports = (app, verifyJWTMiddleware) => {
  app.use('/api/signup', signup)
  app.use('/api/login', login)
  app.use('/api/autologin', verifyJWTMiddleware, autologin)
  app.use('/api/logout', logout)
  app.use('/api/pages', verifyJWTMiddleware, page)
  // app.use('/api/search', search)
  app.use('/api/user', verifyJWTMiddleware, user)
  app.use('/api/spaces', verifyJWTMiddleware, space)
  app.use('/api/category', verifyJWTMiddleware, category)
  app.use('/api/comments', verifyJWTMiddleware, comment)
  app.use('/api/blog', verifyJWTMiddleware, blog)
  app.use('/reset', reset)
  app.use('/api/groups', verifyJWTMiddleware, group)
  app.use('/api/history', verifyJWTMiddleware, history)
  app.use('/api/permissions', verifyJWTMiddleware, permissions)
  app.use('/api/uploadFiles', uploadFiles)
  app.use('/api/upload', verifyJWTMiddleware, upload)
  app.post('/api/search', verifyJWTMiddleware, SearchService.handleSearch)
}
