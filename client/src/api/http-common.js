import { setCheckLogin } from 'actions'
import axios from 'axios'
import { env } from 'config/environment'
import queryString from 'query-string'
import store from 'store'
import { getCookie } from 'units/cookieWeb'

const API_URL = env.apiUrl

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
})

axiosClient.interceptors.request.use((config) => {
  // Handle token
  const { token } = getCookie()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    //Handle error
    const originalRequest = error.response.data
    if (originalRequest.message === 'jwt expired') {
      store.dispatch(setCheckLogin(false))
    }

    throw originalRequest
  }
)

export default axiosClient
