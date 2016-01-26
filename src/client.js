import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'isomorphic-fetch'
import 'babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { useRouterHistory, Router, browserHistory } from 'react-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, history: browserHistory })

// Render the React application to the DOM
ReactDOM.render(
    (
        <Root store={store}>
            <Router history={browserHistory} routes={routes} />,
        </Root>
    ),
    document.getElementById('root')
)


if (process.env.NODE_ENV !== 'production') {
    window.React = React // enable debugger
    const reactRoot = window.document.getElementById('content')

    if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
    }
}
