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
	portionSize?: number;
}

function Users({
	currentPage,
	totalUsersCount,
	pageSize,
	onPageChanged,
	users,
	followingInProgress,
	follow,
	unfollow,
	portionSize = 10 // Указываем значение по умолчанию (например, 10)
}: UsersProps) {
	let pagesCount = Math.ceil(totalUsersCount / pageSize)

	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return <div>
		<Paginator currentPage={currentPage}
		           totalItemsCount={totalUsersCount}
		           pageSize={pageSize}
		           onPageChanged={onPageChanged}
		           portionSize={portionSize}/>

		{users.map((user: any) => <User user={user}
		                                followingInProgress={followingInProgress}
		                                follow={follow}
		                                unfollow={unfollow}
		                                key={user.id}/>)}
	</div>
}

export default Users
