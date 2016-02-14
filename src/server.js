import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'isomorphic-fetch'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom/server'
import path from 'path'
import routes from './routes'
import compression from 'compression'
import { Provider } from 'react-redux'
import { RouterContext, createMemoryHistory } from 'react-router'
import configureStore from './redux/configureStore'
import Html from './helpers/Html'
import Root from './containers/Root'
import { ReactServer, Template, Route, Response, serve, createServer, Middleware, Static, Favicon } from 'react-response'

const server = createServer(
    <ReactServer host="localhost" port={ parseInt(process.env.port, 10) }>
        <Route path="/">
            <Middleware use={ compression() }/>
            <Favicon path={ path.join(__dirname, '..', 'static', 'favicon.ico') }/>
            <Static path={ path.join(__dirname, '..', 'static') }/>
            <Template component={ Html }>
                <Response routes={ routes }>
                    {(renderProps, req, res) => {
                        if (__DEVELOPMENT__) {
                            // Do not cache webpack stats: the script file would change since
                            // hot module replacement is enabled in the development env
                            webpackIsomorphicTools.refresh()
                        }

                        const history = createMemoryHistory(req.url)
                        const store = configureStore({ initialState: {}, history })
                        const component = (
                            <Root store={store}>
                                <RouterContext { ...renderProps }  />
                            </Root>
                        )
                        const data = store.getState()
                        return { component, data, assets: webpackIsomorphicTools.assets() }
                    }}
                </Response>
            </Template>
        </Route>
    </ReactServer>
)
serve(server)