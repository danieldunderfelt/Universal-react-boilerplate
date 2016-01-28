import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/Home'

export default  (
	<Route component={App} path="/">
		<IndexRoute component={Home}></IndexRoute>
	</Route>
)
