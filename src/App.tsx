import {Route, Routes} from 'react-router-dom'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer, {withRouter} from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import {compose} from 'redux'
import {initializeApp} from './redux/appReducer'
import {connect} from 'react-redux'
import React, {lazy, Suspense} from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Preloader from './components/common/Preloader/Preloader'
// import DialogsContainer from './components/Dialogs/DialogsContainer'

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))

interface AppProps {
	initialized: boolean;
	initializeApp: () => void;
}

class App extends React.Component<AppProps> {
	catchAllUnhandledErrors = (PromiseRejectionEvent: any) => {
		alert('Some error occured')
	}

	componentDidMount() {
		this.props.initializeApp()
		// window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}

	// componentWillUnmount() {
	// 	window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	// }

	render() {
		if (!this.props.initialized) { return <Preloader/>}

		return (
			<div className="app-wrapper">
				<HeaderContainer/>
				<Navbar/>
				<div className="app-wrapper-content">

					<Routes>

						<Route path="/profile/:userId?"
						       element={<ProfileContainer/>}/>
						<Route
							path="/dialogs"
							element={
								<Suspense fallback={<Preloader/>}>
									<DialogsContainer/>
								</Suspense>
							}
						/>
						<Route path="/news" element={<ProfileContainer/>}/>
						<Route path="/music" element={<ProfileContainer/>}/>
						<Route path="/settings" element={<ProfileContainer/>}/>
						<Route path="/users" element={<UsersContainer/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/" element={<Suspense fallback={<Preloader/>}>
							<ProfileContainer/></Suspense>}/>
						<Route path="*" element={<div>404 NOT FOUND</div>}/>
					</Routes>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	initialized: state.app.initialized
})

export default compose(
	withRouter,
	connect(mapStateToProps, {initializeApp}))(App)