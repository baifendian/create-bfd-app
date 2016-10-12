import React, { Component } from 'react'
import update from 'react-update'
import Input from 'bfd/Input'
import Button from 'bfd/Button'
import List from './List'
import './index.less'

class Todos extends Component {

  constructor(props) {
    super()
    this.update = update.bind(this)
    this.state = {
      list: []
    }
  }

  handleListChange(type, value) {
    this.update(type, 'list', value)
  }

  render() {
    const { update, state } = this
    const { text, list } = state
    return (
      <div className="todos">
        <Input onChange={e => update('set', 'text', e.target.value)} />
        <Button onClick={() => update('push', 'list', text)}>添加</Button>
        <List data={list} onChange={::this.handleListChange} />
      </div>
    )
  }
}

export default Todos