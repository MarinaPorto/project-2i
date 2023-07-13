import $host from "../http";

export default class AuthService {
  static async login(email, password) {
    return $host.post("/api/user/login", { email, password })
  }

  static async logout() {
    return $host.post("/api/user/logout")
  }
}