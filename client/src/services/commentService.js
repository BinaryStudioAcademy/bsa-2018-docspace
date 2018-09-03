import { callWebApi } from 'src/helpers/requestHelper'

class CommentService {
    getComments = (commentsId) => {
      const args = {endpoint: '/api/comments/get', method: 'POST', body: JSON.stringify(commentsId)}
      const apiResult = callWebApi(args)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
      return apiResult
    }

    createComment = (comment, pageId) => {
      const args = {endpoint: '/api/comments', method: 'POST', body: JSON.stringify({comment, pageId: pageId})}
      const apiResult = callWebApi(args)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
      return apiResult
    }

    editComment = (id, comment) => {
      const args = {endpoint: `/api/comments/${id}`, method: 'PUT', body: JSON.stringify({comment})}
      const apiResult = callWebApi(args)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
      return apiResult
    }
    // toAdd = true - adds LIKE , false - removes LIKE
    likeComment = (id, userId, toAdd) => {
      const args = {endpoint: `/api/comments/like/${id}`, method: 'PUT', body: JSON.stringify({userId, toAdd})}
      const apiResult = callWebApi(args)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
      return apiResult
    }

    deleteComment = (id, pageId) => {
      const args = {endpoint: `/api/comments/${id}`, method: 'DELETE', body: JSON.stringify({pageId})}
      const apiResult = callWebApi(args)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
      return apiResult
    }
}

export const commentService = new CommentService()
