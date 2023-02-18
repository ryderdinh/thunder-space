import axiosClient from './http-common'

const userApi = {
  getProfile: () => {
    const url = '/user'
    return axiosClient.get(url)
  },
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
  changePassword: (data) => {
    const url = '/change-password'
    return axiosClient.put(url, data)
  },
  updateAvatar: (data) => {
    const url = '/upload/avatar'
    return axiosClient.put(url, data, {
      header: { 'content-type': 'multipart/form-data' }
    })
  }
}

export default userApi
