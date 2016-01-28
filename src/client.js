import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'isomorphic-fetch'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, history: browserHistory })
const dest = document.getElementById('root')

const content = <Router history={browserHistory} routes={routes} />

const components = (
    <Root store={store}>
        { content }
    </Root>
)

ReactDOM.render(components, dest)

if (process.env.NODE_ENV !== 'production') {
    window.React = React // enable debugger
}
