class SelfStore {
  constructor() {
    this.user = null;
  }
  setUser(user) {
    this.user = user;
    return this.user;
  }
  getUser() {
    return this.user;
  }
}

const selfStore = new SelfStore();
export default selfStore;
