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
  update: (id,data) => {
    const url = `/projects/${id}`
    return axiosClient.put(url, data)
  },
  delete: (id) => {
    const url = `/projects/${id}`
    return axiosClient.delete(url)
  },
  addUser: (pid, email) => {
    const url = `/projects/${pid}/members/add`
    return axiosClient.patch(url, {
      email,
      role: 'normal'
    })
  },
  removeUser: (pid, uid) => {
    const url = `/projects/${pid}/members/${uid}`
    return axiosClient.delete(url)
  },
  updateRole: (pid, uid, role) => {
    const url = `/projects/${pid}/members/${uid}`
    return axiosClient.patch(url, { role: role === 1 ? 'manager' : 'normal' })
  },
  acceptInvite: (pid) => {
    const url = `/projects/${pid}/invitations/accept`
    return axiosClient.patch(url)
  },
  rejectInvite: (pid) => {
    const url = `/projects/${pid}/invitations/reject`
    return axiosClient.patch(url)
  }
}

export default projectApi
