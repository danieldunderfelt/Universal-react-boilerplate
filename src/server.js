import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'babel-polyfill'

import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import favicon from 'serve-favicon'
import compression from 'compression'
import path from 'path'
import config from './config'
import Html from './helpers/Html'
import PrettyError from 'pretty-error'
import http from 'http'
import routes from './routes'
import { match, RouterContext } from 'react-router'

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

	function hydrateOnClient() {
		res.send('<!doctype html>\n' +
			ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} />));
	}

	if (__DISABLE_SSR__) {
		hydrateOnClient();
		return;
	}

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

		if (redirectLocation) {
			res.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (error) {
			console.error('ROUTER ERROR:', pretty.render(error));
			res.status(500)
			hydrateOnClient()
		} else {

			const component = (
				<RouterContext {...renderProps} />
			)

			res.send('<!doctype html>\n' +
				ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} />));
		}
	})
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
