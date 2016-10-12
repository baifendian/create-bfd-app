import React, { Component } from 'react'
import { Nav, IndexNavItem, NavItem } from 'bfd/Nav'
import { Layout, LayoutSidebar, LayoutContent } from 'public/Layout'
import './index.less'

class Body extends Component {

  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  toggle(open) {
    this.setState({ open })
  }

  render() {
    const { open } = this.state
    const { children } = this.props
    return (
      <div className="body">
        <Layout open={open} onToggle={open => this.toggle(open)}>
          <LayoutSidebar>
            <Nav href="/" onItemClick={() => this.toggle(false)}>
              <NavItem href="overview" icon="th" title="概览" defaultOpen>
                <NavItem href="overview/todos" title="待办事项" />
              </NavItem>
            </Nav>
          </LayoutSidebar>
          <LayoutContent>{children}</LayoutContent>
        </Layout>
      </div>
    )
  }
}

export default Body