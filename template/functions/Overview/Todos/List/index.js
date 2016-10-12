import React, { Component, PropTypes } from 'react'
import Button from 'bfd/Button'
import './index.less'

class List extends Component {

  change(type, value) {
    this.props.onChange(type, value)
  }

  render() {
    const { data } = this.props
    return (
      <ul className="todos__list">
        {data.map((item, i) => (
          <li key={i}>
            {item}
            <Button size="sm" icon="remove" transparent onClick={() => {
              this.change('splice', i)
            }} />
          </li>
        ))}
      </ul>
    )
  }
}

List.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func.isRequired
}

export default List