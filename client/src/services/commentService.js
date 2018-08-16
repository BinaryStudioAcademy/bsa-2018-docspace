import { callWebApi } from 'src/helpers/requestHelper'

class CommentService {
    getComments = (commentsId) => {
      const args = {endpoint: '/api/comments/get', method: 'POST', body: JSON.stringify(commentsId)}
      const apiResult = callWebApi(args)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
      return apiResult
    }

    createComment = (comment) => {
      const args = {endpoint: '/api/comments', method: 'POST', body: JSON.stringify(comment)}
      const apiResult = callWebApi(args)
        .then(res => res.json())
        .catch(err => console.log(`Error: ${err}`))
      return apiResult
    }

    editComment = (comment) => (
      fetch(`/api/comments/${comment._id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(comment)
      })
        .then(res => res.json())
        .then(updatedPage => updatedPage)
        .catch(err => console.log(`Can't edit comment: ${err}`))
    )

    deletePage = (id) => (
      fetch(`/api/comments/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(`Can't delete comment: ${err}`))
    )
}

export const commentService = new CommentService()
