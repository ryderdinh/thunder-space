import axiosClient from './http-common'

const todoApi = {
  getTodos: () => {
    const url = '/tasks'
    return axiosClient.get(url)
  }
}

export default todoApi
