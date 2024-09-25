import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import {UserType} from '../../types/types'

type PropsType = {
	totalUsersCount: number;
	pageSize: number;
	currentPageNumber: number;
	onPageChanged: (pageNumber: number) => void;
	users: Array<UserType>;
	followingInProgress: Array<number>;
	follow: (userId: number) => void;
	unfollow: (userId: number) => void;
}

const Users: React.FC<PropsType> = ({
	currentPageNumber,
	totalUsersCount,
	pageSize,
	onPageChanged,
	users,
	followingInProgress,
	follow,
	unfollow
}) => {
	let pagesCount = Math.ceil(totalUsersCount / pageSize)

	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return <div>
		<Paginator currentPageNumber={currentPageNumber}
		           totalItemsCount={totalUsersCount}
		           pageSize={pageSize}
		           onPageChanged={onPageChanged}
		/>

		{users.map((user: UserType) => <User user={user}
		                                     followingInProgress={followingInProgress}
		                                     follow={follow}
		                                     unfollow={unfollow}
		                                     key={user.id}/>)}
	</div>
}

export default Users
