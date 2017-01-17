import './index.less'
import React, { Component } from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

class App extends Component {

  render() {

    const { children, location, history, routes } = this.props

    let main = [
      <Header key="header" history={history} location={location} />,
      <Body key="body">{children}</Body>
    ]

    // 登录页和 404 页不渲染 Header
    if (routes[1]) {
      const path = routes[1].path
      if (path === 'login' || path === '*') {
        main = children
      }
    }

    return (
      <div className="wrapper">
        {main}
        <Footer />
      </div>
    )
  }
}

export default App
