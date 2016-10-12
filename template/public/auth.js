/**
 * 当前用户状态
 */

import xhr from 'bfd/xhr'

const auth = {

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user'))
    // 用户处于登录状态的条件：本地存储以及 cookie 同时存在
    if (user && auth.isUserInCookie()) {
      auth.register(user)
      return true
    } else {
      return false
    }
  },

  isUserInCookie() {
    return document.cookie.match(/(^|; )user=/)
  },

  register(user) {
    auth.user = user
    // 用户信息（基本信息、权限等存放 localStorage，减少前后端通信）
    localStorage.setItem('user', JSON.stringify(user))
  },

  destroy() {
    auth.user = null
    localStorage.removeItem('user')
  }
}

if (__DEV__) {
  // 开发环境登录状态写死，方便开发
  document.cookie = 'user=0FAC6FBASDS3213AX'
  auth.register({
    name: 'DEMO'
  })
}

export default auth