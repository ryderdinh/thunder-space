import axiosClient from './http-common'

const todoApi = {
  createTodo: (data) => {
    const url = '/tasks'
    return axiosClient.post(url, data)
  },
  getTodos: () => {
    const url = '/tasks'
    return axiosClient.get(url)
  },
  updateIndexTodo: (data) => {
    console.log(true)
    const url = '/tasks'
    return axiosClient.patch(url, data)
  },
  updateTodoItem: (id, data) => {
    const url = `/tasks/${id}`
    return axiosClient.patch(url, data)
  },
  removeTodoItem: (id) => {
    const url = `/tasks`
    return axiosClient.delete(url, { data: [id] })
  }
}

export default todoApi
