import axiosClient from './http-common'

const projectApi = {
  get: (id) => {
    const url = `/projects/${id}`

    return axiosClient.get(url)
  },
  gets: (search = null) => {
    const url = '/projects'
    let params = { search }

    return axiosClient.get(url, { params })
  },
  create: (data) => {
    const url = '/projects/create'
    return axiosClient.post(url, data)
  },
  update: (data) => {
    const url = '/projects'
    return axiosClient.put(url, data)
  },
  delete: (id) => {
    const url = `/projects/${id}`
    return axiosClient.delete(url)
  },
  updateRole: (pid, uid, role) => {
    const url = `/projects/${pid}/members/${uid}`
    return axiosClient.patch(url, { role: role === 1 ? 'manager' : 'normal' })
  }
}

export default projectApi
