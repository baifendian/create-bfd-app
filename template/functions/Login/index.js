import React, { Component } from 'react'
import update from 'react-update'
import { Form, FormItem, FormSubmit, FormInput } from 'bfd/Form'
import { Checkbox } from 'bfd/Checkbox'
import Button from 'bfd/Button'
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
    let referrer = passState && passState.referrer
    this.props.history.push(referrer || '/')
  }

  handleRemember(e) {
    this.update('set', 'user.remember', e.target.checked)
  }

  render() {
    const { isLogin, user } = this.state
    return (
      <div className="login">
        <Form 
          action="auth"
          onSuccess={::this.handleSuccess} 
          defaultData={user} 
          labelWidth={0} 
          rules={this.rules}
        >
          <div className="login__logo">
            SYSTEM NAME
          </div>
          <FormItem name="username">
            <FormInput placeholder="用户名" />
          </FormItem>
          <FormItem name="password">
            <FormInput placeholder="密码" type="password" />
          </FormItem>
          <FormItem name="remember">
            <Checkbox onChange={::this.handleRemember}>下次自动登录</Checkbox>
          </FormItem>
          <FormSubmit>登录</FormSubmit>
        </Form>
      </div>
    )
  }
}

export default Login