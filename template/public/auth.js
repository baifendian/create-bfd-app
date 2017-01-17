/**
 * 当前用户状态
 */

const auth = {

  USER_KEY: '__user__',

  isLoginIn() {
    const user = JSON.parse(localStorage.getItem(auth.USER_KEY))
    // 用户处于登录状态的条件：本地存储以及 cookie 同时存在
    if (user) {
      auth.user = user
      return true
    } else {
      return false
    }
  },

  register(user) {
    auth.user = user
    // 用户信息（基本信息、权限等存放 localStorage，减少前后端通信）
    localStorage.setItem(auth.USER_KEY, JSON.stringify(user))
  },

  destroy() {
    localStorage.removeItem(auth.USER_KEY)
  }
}

if (__DEV__) {
  // 开发环境登录状态写死，方便开发
  auth.register({
    name: 'DEMO'
  })
}

export default auth
