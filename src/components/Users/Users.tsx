import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

interface UsersProps {
	currentPage: number;
	totalUsersCount: number;
	pageSize: number;
	onPageChanged: (pageNumber: number) => void;
	users: any;
	followingInProgress: any;
	follow: (userId: number) => void;
	unfollow: (userId: number) => void;
}

function Users({
	currentPage,
	totalUsersCount,
	pageSize,
	onPageChanged,
	users,
	followingInProgress,
	follow,
	unfollow
}: UsersProps) {
	let pagesCount = Math.ceil(totalUsersCount / pageSize)

	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return <div>
		<Paginator currentPage={currentPage}
		           totalUsersCount={totalUsersCount}
		           pageSize={pageSize}
		           onPageChanged={onPageChanged}/>

		{users.map((user: any) => <User user={user}
		                                followingInProgress={followingInProgress}
		                                follow={follow}
		                                unfollow={unfollow}
		                                key={user.id}/>)}
	</div>
}

export default Users
