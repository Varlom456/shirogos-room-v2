import userService from '@/services/user.service'
import axios from 'axios'

const $api = axios.create({
  withCredentials: true,
  baseURL: "/api/"
})

$api.interceptors.request.use((config) => {
  // there is possible /api/api/ duplication due to incosistent use of axios
  if (config.url != undefined && config.url.startsWith('/api/')) {
    config.url = config.url.replace(/^\/api\//, '/');
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        await userService.refresh()
        return $api.request(originalRequest)
      } catch (e) {
        console.error('unauthorized')
      }
    }
    throw error
  }
)

export default $api
