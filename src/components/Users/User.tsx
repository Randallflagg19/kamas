import React from 'react'
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom'
import {UserType} from '../../types/types'

type Props = {
	user: UserType
	followingInProgress: Array<number>
	follow: (userId: number) => void
	unfollow: (userId: number) => void
}

const User: React.FC<Props> = ({user, followingInProgress, follow, unfollow}) => {
	return <div>
						<span>
							<div>
								<NavLink to={'/profile/' + user.id}>
									<img
										src={
											user.photos.small != null
												? user.photos.small
												: 'https://sun9-53.userapi.com/impg/bNplD2WLbd2xhA4gFG3R1I4esZkU4GcgVYavmQ/4MHGZSUBDcE.jpg?size=810x1080&quality=95&sign=d1b96dd8a382711518d2be8b8eebc7b2&type=album'
										}
										alt="User"
										className={styles.userImg}
									/>
								</NavLink>
							</div>
							<div>
								{user.followed ? (
									<button disabled={followingInProgress.some((id: any) => id === user.id)}
									        onClick={() => {unfollow(user.id)}}>
										Unfollow
									</button>
								) : (
									<button disabled={followingInProgress.some((id: any) => id === user.id)}

									        onClick={() => {follow(user.id)}}>
										Follow
									</button>
								)}
							</div>
						</span>

		<span>
							<div className={styles.infoContainer}>
								<span>
									<div>{user.name}</div>
									<div>{user.status}</div>
								</span>
								<span className={styles.locationInfo}>
											<div>{'user.location.country'}</div>
											<div>{'user.location.city'}</div>
								</span>
							</div>
						</span>
	</div>
}

export default User
