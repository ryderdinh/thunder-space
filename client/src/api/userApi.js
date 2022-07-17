import axiosClient from './http-common'

const userApi = {
  getUsers: () => {
    const url = '/users'
    return axiosClient.get(url)
  },
  getById: (id) => {
    const url = `/users/${id}`
    return axiosClient.get(url)
  },
  searchByEmail: (keyword) => {
    const url = `/search/users?email=${keyword}`
    return axiosClient.get(url)
  },
  updatePassword: (data) => {
    const url = '/users/update-password'
    return axiosClient.put(url, data)
  },
  updateAvatar: (data) => {
    const url = '/users/update-avatar'
    return axiosClient.put(url, data, {
      header: { 'content-type': 'multipart/form-data' }
    })
  }
}

export default userApi
