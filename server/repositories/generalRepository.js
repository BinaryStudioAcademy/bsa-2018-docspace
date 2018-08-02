function Repository () {}

Repository.prototype.getAll = getAll
Repository.prototype.getById = getById
Repository.prototype.add = add
Repository.prototype.update = update
Repository.prototype.deleteOne = deleteOne

function getAll () {
  var model = this.model
  var query = model.find()
  return query
}

function getById (id) {
  var model = this.model
  var query = model.find({
    _id: id
  })
  return query
}

function add (data) {
  var model = this.model
  model.create(data)
}

function update (id, data) {
  var model = this.model
  var query = model.update({_id: id}, data)
  return query
}

function deleteOne (id) {
  var model = this.model
  var query = model.findOneAndDelete({_id: id})
  return query
}

module.exports = Repository
