import {Layout, Menu} from 'antd'
import {withSuspense} from './hoc/WithSuspense'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {UsersContainer} from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import {LoginPage} from './components/LoginPage/LoginPage'
import {compose} from 'redux'
import {initializeApp} from './redux/appReducer'
import {connect, Provider} from 'react-redux'
import React, {lazy, Suspense, useEffect} from 'react'
import './App.css'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppStateType} from './redux/reduxStore'
import Sider from 'antd/es/layout/Sider'
import {AppHeader} from './components/Header/Header'
import {useLocation} from 'react-router-dom'

const {Content, Footer} = Layout
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

const App: React.FC<MapPropsType & DispatchPropsType> = (props) => {
	const location = useLocation()

	useEffect(() => {
		props.initializeApp()
	}, [props])

	if (!props.initialized) {
		return <Preloader/>
	}

	return (
		<Layout>
			<AppHeader/>
			<Content style={{padding: '0 50px'}}>
				<Layout className="site-layout-background" style={{padding: '24px 0'}}>
					<Sider className="site-layout-background" width={200}
					       style={{backgroundColor: 'white'}}>
						<Menu
							mode="inline"
							defaultOpenKeys={['sub1']}
							selectedKeys={[location.pathname]}
							items={[
								{
									key: '/profile',
									label: <Link to="/profile">Profile</Link>
								},
								{
									key: '/dialogs',
									label: <Link to="/dialogs">Messages</Link>
								},
								{
									key: '/developers',
									label: <Link to="/developers">Developers</Link>
								},
								{
									key: '/chat',
									label: <Link to="/chat">Chat</Link>
								}
							]}/>
					</Sider>
					<Content style={{padding: '0 24px ', minHeight: 280}}>
						<Routes>
							<Route path="/profile/:userId?" element={<SuspendedProfile/>}/>
							<Route path="/dialogs" element={<SuspendedDialogs/>}/>
							<Route path="/news" element={<ProfileContainer/>}/>
							<Route path="/music" element={<ProfileContainer/>}/>
							<Route path="/settings" element={<ProfileContainer/>}/>
							<Route path="/developers" element={<UsersContainer pageTitle="samurai"/>}/>
							<Route path="/login" element={<LoginPage/>}/>
							<Route path="/chat"
							       element={<Suspense fallback={<Preloader/>}><ChatPage/></Suspense>}/>
							<Route path="/"
							       element={<Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}/>
							<Route path="*" element={<div>404 NOT FOUND</div>}/>
						</Routes>
					</Content>
				</Layout>
			</Content>
			<Footer style={{textAlign: 'center'}}>social-network</Footer>
		</Layout>
	)
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<React.StrictMode>
				<Provider store={store}>
					<AppContainer/>
				</Provider>
			</React.StrictMode>
		</BrowserRouter>
	)
}

export default SamuraiJSApp
