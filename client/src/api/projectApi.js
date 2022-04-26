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
  delete: (data) => {
    const url = '/projects'
    return axiosClient.put(url, data)
  }
}

export default projectApi
