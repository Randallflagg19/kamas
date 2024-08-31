import React from 'react'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import {Route, Routes} from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'

function App(props: any) {
	return (
		<div className="app-wrapper">
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
				</Routes>
			</div>
		</div>
	)
}

export default App
