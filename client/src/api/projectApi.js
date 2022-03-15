import axiosClient from './http-common'

const projectApi = {
  get: (id) => {
    const url = '/project'
    let params = { id }

    return axiosClient.get(url, { params })
  },
  gets: (search = null) => {
    const url = '/projects'
    let params = { search }

    return axiosClient.get(url, { params })
  },
  create: (data) => {
    const url = '/project/create'
    return axiosClient.post(url, data)
  }
}

export default projectApi
