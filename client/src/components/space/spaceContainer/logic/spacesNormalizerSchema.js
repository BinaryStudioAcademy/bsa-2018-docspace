import { schema } from 'normalizr'

export const spaces = new schema.Entity(
  'byId',
  {},
  { idAttribute: '_id' }
)

export const spacesArray = new schema.Array(spaces)
