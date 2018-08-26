import * as actionTypes from './blogActionTypes'

// GET
export const getBlogRequest = (id) => ({
  type: actionTypes.GET_BLOG_REQUEST,
  payload: id
})

export const getBlogSuccess = (blog) => ({
  type: actionTypes.GET_BLOG_SUCCESS,
  payload: { ...blog }
})

export const getBlogError = () => ({
  type: actionTypes.GET_BLOG_ERROR
})
