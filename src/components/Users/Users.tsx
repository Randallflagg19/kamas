import React, {useEffect} from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import {UserType} from '../../types/types'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, follow, requestUsers, unfollow} from '../../redux/userReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
	getCurrentPage, getFollowingInProgress,
	getPageSize, getTotalUsersCount, getUsers,
	getUsersFilter
} from '../../redux/usersSelectors'
import {AppDispatch} from '../../redux/reduxStore'
import {useLocation, useNavigate} from 'react-router-dom'

export const Users: React.FC = () => {
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPageNumber = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const users = useSelector(getUsers)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingInProgress)

	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const params = new URLSearchParams(location.search)
		let actualPage = currentPageNumber
		let actualFilter = filter

		if (params.get('page') != null) actualPage = Number(params.get('page'))

		const term = params.get('term')
		if (term !== null) actualFilter = {...actualFilter, term}

		switch (params.get('friend')) {
			case 'null':
				actualFilter = {...actualFilter, friend: null}
				break
			case 'true':
				actualFilter = {...actualFilter, friend: true}
				break
			case 'false':
				actualFilter = {...actualFilter, friend: false}
				break
		}

		dispatch(requestUsers(actualPage, pageSize, actualFilter))
	}, [dispatch, location.search])

	useEffect(() => {
		const params: string[] = []
		if (filter.term) {
			params.push(`term=${filter.term}`)
		}
		if (filter.friend !== null) {
			params.push(`friend=${filter.friend}`)
		}
		if (currentPageNumber !== 1) {
			params.push(`page=${currentPageNumber}`)
		}

		navigate(`/users${params.length ? `?${params.join('&')}` : ''}`)
	}, [filter, currentPageNumber, navigate])

	const onPageChanged = (pageNumber: number) => {
		dispatch(requestUsers(pageNumber, pageSize, filter))
	}

	const onFilterChanged = (filter: FilterType) => {
		dispatch(requestUsers(1, pageSize, filter))
	}

	const followUser = (userId: number) => {
		dispatch(follow(userId))
	}

	const unfollowUser = (userId: number) => {
		dispatch(unfollow(userId))
	}

	return (
		<div>
			<UsersSearchForm onFilterChanged={onFilterChanged}/>
			<Paginator
				currentPageNumber={currentPageNumber}
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				onPageChanged={onPageChanged}
			/>
			{users.map((user: UserType) => (
				<User
					user={user}
					followingInProgress={followingInProgress}
					follow={followUser}
					unfollow={unfollowUser}
					key={user.id}
				/>
			))}
		</div>
	)
}
