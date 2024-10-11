import React from 'react'
import styles from './Header.module.css'
import {Link, NavLink} from 'react-router-dom'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/authSelectors'
import {logout} from '../../redux/authReducer'
import {AppDispatch} from '../../redux/reduxStore'

export const AppHeader: React.FC = (props) => {

	const isAuth = useSelector(selectIsAuth)
	const login = useSelector(selectCurrentUserLogin)

	const dispatch: AppDispatch = useDispatch()

	const logoutCallBack = () => {
		dispatch(logout())
	}

	const {Header} = Layout
	return (
		<Header className="header">
			<Row>
				<Col span={17}>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}
						items={[{
							key: '1',
							label: <Link to="/developers">Developers</Link>
						}]}/>

				</Col>

				{isAuth ?
					<><Col span={3}>
						<span style={{color: 'white'}}> {login}</span>
					</Col><Col span={2}>
						<Avatar alt={login || ''} style={{backgroundColor: '#87d068'}}
						        icon={<UserOutlined/>}/>
					</Col>

						<Col span={2}>
							<Button onClick={logoutCallBack}>Log out</Button>
						</Col></>
					:
					<Col span={6}>
						<Button><Link to={'/login'}>Login</Link></Button>

					</Col>}
			</Row>
		</Header>
	)
}