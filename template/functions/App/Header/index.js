import './index.less'
import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'bfd/Layout'
import { Link } from 'react-router'
import xhr from 'bfd/xhr'
import auth from 'public/auth'

class Header extends Component {

  handleLogout(e) {
    e.preventDefault()
    xhr({
      url: 'auth/logout',
      success: () => {
        auth.destroy()
        this.props.history.pushState({
          referrer: this.props.location.pathname
        }, '/login')
      }
    })
  }

  render() {
    return (
      <Row className="header" fluid>
        <Col>
          <Link to="/" className="header__logo">
            SYSTEM NAME
          </Link>
        </Col>
        <Col className="header__right" right>
          欢迎您，{auth.user.name} &nbsp;|&nbsp;
          <a href="" onClick={::this.handleLogout}>安全退出</a>
        </Col>
      </Row>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Header