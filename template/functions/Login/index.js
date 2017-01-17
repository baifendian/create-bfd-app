import React, { PropTypes, Component } from 'react'
import update from 'react-update'
import { browserHistory } from 'react-router'
import { Form, FormItem, FormSubmit, FormInput } from 'bfd/Form'
import Icon from 'bfd/Icon'
import auth from 'public/auth'
import './index.less'

class Login extends Component {

  constructor() {
    super()
    this.update = update.bind(this)
    this.rules = {
      username(v) {
        if (!v) return '请输入用户名'
      },
      password(v) {
        if (!v) return '请输入密码'
      }
    }
    this.state = {
      user: {}
    }
  }

  handleSuccess(user) {
    auth.register(user)
    const passState = this.props.location.state
    const referrer = passState && passState.referrer
    browserHistory.push(referrer || '/')
  }

  render() {
    const { user } = this.state
    return (
      <div className="login">
        <Form
          action="user/login"
          onSuccess={::this.handleSuccess}
          defaultData={user}
          labelWidth={0}
          rules={this.rules}
        >
          <div className="login__logo">
            SYSTEM NAME
          </div>
          <FormItem name="username" className="login__icon-item">
            <Icon type="user" className="login__icon-item-icon" />
            <FormInput placeholder="用户名" />
          </FormItem>
          <FormItem name="password" className="login__icon-item">
            <Icon type="lock" className="login__icon-item-icon" />
            <FormInput placeholder="密码" type="password" />
          </FormItem>
          <FormSubmit>登录</FormSubmit>
        </Form>
      </div>
    )
  }
}

export default Login
