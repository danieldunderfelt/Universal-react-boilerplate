import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom/server'
import path from 'path'
import routes from './routes'
import compression from 'compression'
import { RouterContext } from 'react-router'
import Html from './helpers/Html'
import createRouterResponse from 'react-response-router'
import { ReactServer, Route, Response, Assets, serve, createServer, Middleware, Static, Favicon } from 'react-response'

const server = createServer(
  <ReactServer host="localhost" port={ process.env.port }>
    <Route path="/">
      <Middleware use={ compression() } />
      <Favicon path={ path.join(__dirname, '..', 'static', 'favicon.ico') } />
      <Static path={ path.join(__dirname, '..', 'static') } />

      <Response template={ Html } handler={ createRouterResponse(routes) }>
        { (renderProps) => <RouterContext { ...renderProps } /> }
      </Response>
    </Route>
  </ReactServer>
)

serve(server)
