import axios from 'axios'

export const getUserData = id => {
  return axios.get(`/api/recipes/${id}`)
}
