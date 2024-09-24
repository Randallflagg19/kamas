import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './redux/reduxStore'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

root.render(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<React.StrictMode>
			<Provider store={store}>
				<App/>
			</Provider>
		</React.StrictMode>
	</BrowserRouter>
)
