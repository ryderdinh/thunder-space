import axiosClient from './http-common'

const notificationApi = {
  get: () => {
    const url = '/notifications'
    return axiosClient.get(url)
  }
}

export default notificationApi
