import axiosClient from './http-common'

const issueApi = {
  get: (pid, iid) => {
    const url = `/projects/${pid}/issues/${iid}`
    return axiosClient.get(url)
  },
  create: (pid, data) => {
    const url = `/projects/${pid}/issues/create`
    return axiosClient.post(url, data)
  }
}

export default issueApi
