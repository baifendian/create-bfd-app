/**
 * 前端路由配置
 */

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect } from 'react-router'
import { createHistory } from 'history'
import auth from 'public/auth'
import App from './functions/App'

// 用户登录验证
function requireAuth(nextState, replaceState) {
  const path = nextState.location.pathname
  const loginPath = '/login'
  if (!auth.loggedIn()) {
    path !== loginPath && replaceState({referrer: path}, '/login')
  }
}

export default render((
  <Router history={createHistory()} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App} onEnter={requireAuth}>
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