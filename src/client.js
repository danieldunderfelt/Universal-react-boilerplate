import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory} from 'react-router'
import routes from './routes'

ReactDOM.render(
    <Router history={ browserHistory } routes={ routes } />,
    document.getElementById('root')
)

if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger
}
