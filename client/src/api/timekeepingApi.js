import axiosClient from './http-common'

const timekeepingApi = {
  get: () => {
    const url = `/timeline`
    return axiosClient.get(url)
  },
  sendLocation: (data) => {
    const url = '/location'
    return axiosClient.put(url, { lat: data[0], lon: data[1] })
  }
}

export default timekeepingApi
