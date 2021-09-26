class Auth {
  constructor() {
    this.authenticated = localStorage.getItem("userInfo") ? true : false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }
  logout(cb) {
    this.authenticated = false;
    localStorage.clear();
    cb();
  }
  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
