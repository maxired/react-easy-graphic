import React, {Component} from 'react'
import {render} from 'react-dom'

import ReactEasyGraphic from '../../src'

export default class Demo extends Component {
  render() {
    return <div>
      <h1>react-easy-graphic Demo</h1>
      <ReactEasyGraphic />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
