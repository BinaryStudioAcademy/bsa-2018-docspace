class Repository {
  getAll () {
    var model = this.model
    var query = model.find()
    return query
  }

  getById (id) {
    var model = this.model
    var query = model.find({
      _id: id
    })
    return query
  }

  add (data) {
    var model = this.model
    model.create(data)
  }

  update (id, data) {
    var model = this.model
    var query = model.update({_id: id}, data)
    return query
  }
  deleteOne (id) {
    var model = this.model
    var query = model.findOneAndDelete({_id: id})
    return query
  }
}
module.exports = Repository
