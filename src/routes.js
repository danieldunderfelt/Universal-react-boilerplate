import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Home from './components/Home'

export default  (
	<Route component={App}>
		<Route component={Home} path="/"></Route>
	</Route>
)
