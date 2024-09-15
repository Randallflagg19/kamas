import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'

interface HeaderProps {
	id: number | null;
	email: string | null;
	login: string | null;
}

export default function Header(props: any) {

	return (
		<header className={styles.header}>
			<img
				src="https://avatars.mds.yandex.net/i?id=1394fddc1c1dad6261477b2158ee1f24f7f26959-8496968-images-thumbs&n=13"
				alt=""
			/>
			<div className={styles.loginBlock}>
				{props.isAuth ?
					<div> {props.login}
						<button onClick={props.logout}>Logout</button>
					</div> :
					<NavLink to={'/login'}>Login</NavLink>}
			</div>
		</header>
	)
}
