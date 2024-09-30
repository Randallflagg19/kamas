import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import {compose} from 'redux'
import {initializeApp} from './redux/appReducer'
import {connect, Provider} from 'react-redux'
import React, {lazy, Suspense} from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppStateType} from './redux/reduxStore'
import {withSuspense} from './hoc/WithSuspense'

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))

interface AppProps {
	initialized: boolean;
	initializeApp: () => void;
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
	initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {
	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		alert('Some error occured')
	}

	componentDidMount() {
		this.props.initializeApp()
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}

	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}

	render() {
		if (!this.props.initialized) { return <Preloader/>}

		return (
			<div className="app-wrapper">
				<HeaderContainer/>
				<Navbar/>
				<div className="app-wrapper-content">

					<Routes>

						<Route path="/profile/:userId?" element={<SuspendedProfile/>}/>
						<Route path="/dialogs" element={<SuspendedDialogs/>}/>
						<Route path="/news" element={<ProfileContainer/>}/>
						<Route path="/music" element={<ProfileContainer/>}/>
						<Route path="/settings" element={<ProfileContainer/>}/>
						<Route path="/users" element={<UsersContainer pageTitle="samurai"/>}/>
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

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
	return <BrowserRouter basename={process.env.PUBLIC_URL}>
		<React.StrictMode>
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		</React.StrictMode>
	</BrowserRouter>
}

export default SamuraiJSApp