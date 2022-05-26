import axios from 'axios'
import queryString from 'query-string'
import { getCookie } from 'units/cookieWeb'

const API_URL = process.env.REACT_APP_API_URL

// Set up default config for http requests
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
    throw error.response.data
  }
)

export default axiosClient
