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
import createRouterResponse from 'react-response-router'
import { ReactServer, Route, Response, Assets, serve, createServer, Middleware, Static, Favicon } from 'react-response'

const server = createServer(
    <ReactServer host="localhost" port={ process.env.port }>
        <Route path="/">
            <Middleware use={ compression() }/>
            <Favicon path={ path.join(__dirname, '..', 'static', 'favicon.ico') }/>

            <Response template={ Html } handler={ createRouterResponse(routes) }>
                {(renderProps, req, res) => {

                    const history = createMemoryHistory(req.url)
                    const store = configureStore({ initialState: {}, history })

                    const component = (
                        <Root store={store}>
                            <RouterContext { ...renderProps }  />
                        </Root>
                    )

                    return { component, store }
                }}
            </Response>
        </Route>
    </ReactServer>
)
serve(server)