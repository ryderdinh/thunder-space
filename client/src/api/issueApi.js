import axiosClient from './http-common'

const issueApi = {
  get: (id) => {
    const url = `/issue`
    const params = { id }
    return axiosClient.get(url, { params })
  },
  create: (data) => {
    const url = `/issue/create`
    return axiosClient.post(url, data)
  }
}

export default issueApi