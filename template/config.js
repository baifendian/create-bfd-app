/**
 * 全局配置
 */

import xhr from 'bfd/xhr'
import message from 'bfd/message'
import auth from 'public/auth'
import { browserHistory } from 'react-router'

// AJAX 全局配置
xhr.baseUrl = (typeof __HOST__ !== undefined) ? __HOST__ : '' + '/api/'

xhr.success = (res, option) => {
  if (typeof res !== 'object') {
    message.danger(option.url + ': response data should be JSON')
    return
  }
  switch (res.code) {
    case 200:
      option.success && option.success(res.data)
      break
    case 401:
      auth.destroy()
      browserHistory.push('/login')
      break
    default:
      message.danger(res.message || 'unknown error')
  }
}
