/**
 * 前端路由配置
 */

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import process from 'nprogress'
import auth from 'public/auth'
import App from './functions/App'

// 用户登录验证
function requireAuth(nextState, replace) {
  const path = nextState.location.pathname
  const loginPath = '/login'
  if (!auth.isLoginIn()) {
    path !== loginPath && replace({
      pathname: '/login',
      state: {
        referrer: path
      }
    })
  }
}

export default render((
  <Router
    history={browserHistory}
    onUpdate={() => {
      process.done()
      window.scrollTo(0, 0)
    }}
  >
    <Route
      path="/"
      onEnter={(...args) => {
        requireAuth(...args)
        process.start()
      }}
      onChange={() => process.start()}
      component={App}
     >
      <IndexRedirect to="/overview/todos" />
      <Route path="overview">
        <Route path="todos" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/Overview/Todos').default)
          })
        }} />
      </Route>
      <Route path="login" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Login').default)
        })
      }} />
      <Route path="*" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/NotFound').default)
        })
      }}/>
    </Route>
  </Router>
), document.getElementById('app'))
