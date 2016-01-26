import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

export default class Root extends React.Component {

	static propTypes = {
		store: PropTypes.object.isRequired
	};


	get devTools () {
		if (__DEVTOOLS__) {
			const DevTools = require('containers/DevTools')
			return <DevTools />
		}
	}

	render () {
		return (
			<Provider store={this.props.store}>
				<div style={{ height: '100%' }}>
					{this.props.children}
					{this.devTools}
				</div>
			</Provider>
		)
	}
}
