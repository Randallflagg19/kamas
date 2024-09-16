import {Route, Routes} from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer, {withRouter} from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import {compose} from 'redux'
import Profile from './components/Profile/Profile'
import {initializeApp} from './redux/appReducer'
import {connect} from 'react-redux'
import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Preloader from './components/common/Preloader/Preloader'

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
				Profile
				<HeaderContainer/>
				<Navbar/>
				<div className="app-wrapper-content">
					<Routes>
						<Route path="/profile/:userId?"
						       element={<ProfileContainer/>}/>
						<Route path="/dialogs" element={<DialogsContainer/>}/>
						<Route path="/news" element={<Profile/>}/>
						<Route path="/music" element={<Profile/>}/>
						<Route path="/settings" element={<Profile/>}/>
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