import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './redux/reduxStore'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

root.render(
	<BrowserRouter>
		<React.StrictMode>

			{/*оборачивает компонент  и через контекст React передает Redux-хранилище всем компонентам*/}
			<Provider store={store}>
				<App/>
			</Provider>
		</React.StrictMode>
	</BrowserRouter>
)
