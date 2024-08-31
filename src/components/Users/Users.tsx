import React from 'react'
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom'

function Users(props: any) {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return (
		<div>
			<div>
				{pages.map((page) => (
					<span
						key={page}
						className={props.currentPage === page ? styles.selectedPage : undefined}
						onClick={() => { props.onPageChanged(page) }}>
						{page}
					</span>
				))}
			</div>

			<div>
				{props.users.map((user: any) => (
					<div key={user.id} className={styles.wrapper}>
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
									<button disabled={props.followingInProgress.some((id: any) => id === user.id)}
									        onClick={() => {props.unfollow(user.id)}}>
										Unfollow
									</button>
								) : (
									<button disabled={props.followingInProgress.some((id: any) => id === user.id)}

									        onClick={() => {props.follow(user.id)}}>
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
				))}
			</div>
			<div className={styles.showMore}></div>
		</div>
	)
}

export default Users
