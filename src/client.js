import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'
import { createHistory } from 'history'

ReactDOM.render((
		<Router history={ createHistory() }>
			{ routes }
		</Router>
),
document.getElementById('content'))


if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger
  const reactRoot = window.document.getElementById('content')

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
  }
}
