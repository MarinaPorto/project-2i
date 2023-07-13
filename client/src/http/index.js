import axios from "axios";

export const $host = axios.create({
  withCredentials: true,
  baseURL: "http://178.172.173.84:5000"
})

$host.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})


$host.interceptors.response.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}, async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get('http://178.172.173.84:5000/api/user/refresh', { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken)
      return $host.request(originalRequest)
    } catch (e) {
      console.log("Не авторизован")
    }
  }
  throw error;
})

export default $host