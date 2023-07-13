import axios from "axios";

export const $authHost = axios.create({
  withCredentials: true,
  baseURL: "http://178.172.173.84:5000"
})

const authInterceptor = config => {

  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)


export default $authHost