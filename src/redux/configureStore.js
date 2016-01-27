import { applyMiddleware, compose, createStore } from 'redux'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

function withDevTools (middleware) {
	const devTools = window.devToolsExtension
		? window.devToolsExtension()
		: require('containers/DevTools').instrument()
	return compose(middleware, devTools)
}

export default function configureStore ({ initialState = {}, history }) {
	// Sync with router via history instance (main.js)
	const routerMiddleware = syncHistory(history)

	// Compose final middleware and use devtools in debug environment
	let middleware = applyMiddleware(thunk, routerMiddleware)
	if (__DEVTOOLS__) middleware = withDevTools(middleware)

	// Create final store and subscribe router in debug env ie. for devtools
	const store = middleware(createStore)(rootReducer, initialState)
	if (__DEVTOOLS__) routerMiddleware.listenForReplays(store, ({ router }) => router.location)

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers')

			store.replaceReducer(nextRootReducer)
		})
	}
	return store
}
