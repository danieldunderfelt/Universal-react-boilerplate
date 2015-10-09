import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import favicon from 'serve-favicon'
import compression from 'compression'
import { createMemoryHistory } from 'history'
import path from 'path'
import config from './config'
import Html from './containers/Html'
import PrettyError from 'pretty-error'
import http from 'http'
import routes from './routes'
import { match, RoutingContext } from 'react-router'

const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)

app.use(compression())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))

app.use(require('serve-static')(path.join(__dirname, '..', 'static')))

app.use((req, res) => {
	if (__DEVELOPMENT__) {
		// Do not cache webpack stats: the script file would change since
		// hot module replacement is enabled in the development env
		webpackIsomorphicTools.refresh()
	}

	const history = createMemoryHistory()
	const location = history.createLocation(req.path, req.query)

	if (__DISABLE_SSR__) {
		res.send('<!doctype html>\n' +
			ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={null} />))
	} else {
		match({ routes, location }, (error, redirectLocation, renderProps) => {
			if (redirectLocation)
				res.status(301).redirect(redirectLocation.pathname + redirectLocation.search)
			else if (error)
				res.status(500).send(error.message)
			else if (renderProps == null)
				res.status(404).send('Not found')
			else
				res.status(200).send('<!doctype html>\n' + ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={ <RoutingContext {...renderProps} /> } />))
		})
	}
})

if (config.port) {
	server.listen(config.port, (err) => {
		if (err) {
			console.error(err)
		}
		console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', config.port)
	})
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified')
}
