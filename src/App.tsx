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

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))

interface AppProps {
	initialized: boolean;
	initializeApp: () => void;
}

class App extends React.Component<AppProps> {
	componentDidMount() {
		this.props.initializeApp()
	}

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