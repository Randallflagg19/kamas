import React from 'react'
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom'

function User({
	user, followingInProgress, follow, unfollow
}: { user: any, followingInProgress: any, follow: any, unfollow: any }) {

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
									{user.location && (
										<>
											<div>{user.location.country}</div>
											<div>{user.location.city}</div>
										</>
									)}
								</span>
							</div>
						</span>
	</div>

}

export default User
