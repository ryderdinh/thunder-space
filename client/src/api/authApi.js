import axiosClient from './http-common'

const authApi = {
  authentication: (data) => {
    const url = '/token'
    return axiosClient.post(url, data)
  },
  authorization: () => {
    const url = '/login'
    return axiosClient.get(url)
  },
  logout: (type) => {
    return axiosClient.post(type === 'all' ? '/logout-all' : '/logout')
  }
}

export default authApi
