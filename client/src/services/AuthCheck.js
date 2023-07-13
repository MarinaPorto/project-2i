import axios from "axios";

export default async function checkAuth() {
  try {
    const response = await axios.get('http://178.172.173.84:5000/api/user/refresh', { withCredentials: true })
    localStorage.setItem('token', response.data.accessToken);
    return response;
  }
  catch (e) {
    console.log(e.response?.data?.message)
  }
}