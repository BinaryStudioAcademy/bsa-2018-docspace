import { schema } from 'normalizr'

export const pages = new schema.Entity(
  'byId',
  {},
  { idAttribute: '_id' }
)

export const pagesArray = new schema.Array(pages)
