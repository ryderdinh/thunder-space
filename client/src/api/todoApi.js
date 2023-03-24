import axiosClient from './http-common'

const todoApi = {
  getTodos: () => {
    const url = '/tasks'
    return axiosClient.get(url)
  },
  updateIndexTodo: (data) => {
    const url = '/tasks'
    return axiosClient.patch(url, data)
  },
  updateTodoItem: (id, data) => {
    const url = `/tasks/${id}`
    return axiosClient.patch(url, data)
  },
  removeTodoItem: (id) => {
    const url = `/tasks/${id}`
    return axiosClient.delete(url)
  }
}

export default todoApi
