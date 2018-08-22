import * as actionTypes from './blogActionTypes'
import { DELETE_BLOG_PAGE_SUCCESS, UPDATE_BLOG_PAGE_SUCCESS } from 'src/components/page/logic/pageActionTypes'

const initialState = {}

export default function blog (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_BLOG_SUCCESS:
      return action.payload

    case UPDATE_BLOG_PAGE_SUCCESS:
      const { _id, title, createdAt } = action.payload
      const newPageForBlog = { _id, title, createdAt }
      const pages = state.pages
      let updatedPages = [ newPageForBlog ]
      if (pages) {
        if (pages.some((page) => page._id === _id)) {
          updatedPages = pages.map(page => page._id === _id ? newPageForBlog : page)
        } else updatedPages = [ ...pages, newPageForBlog ]
      }

      return {
        ...state,
        pages: updatedPages
      }

    case DELETE_BLOG_PAGE_SUCCESS: {
      return {
        ...state,
        pages: state.pages.filter(page => page._id !== action.payload._id)
      }
    }

    default: return state
  }
}
