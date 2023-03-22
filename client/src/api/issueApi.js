import axiosClient from './http-common'

const issueApi = {
  get: (iid) => {
    const url = `/issues/${iid}`
    return axiosClient.get(url)
  },
  create: (pid, data) => {
    const url = `/projects/${pid}/issues/create`
    return axiosClient.post(url, data)
  },
  update: (iid, data) => {
    const url = `/issues/${iid}`
    return axiosClient.put(url, data)
  },
  updateStatus: (iid, status) => {
    const url = `/issues/${iid}`
    return axiosClient.patch(url, { status })
  },
  delete: (iid) => {
    const url = `/issues/${iid}`
    return axiosClient.delete(url)
  }
}

export default issueApi
