import {usersAPI} from '../api/api'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

// type User = {
// 	name: string,
// 	id: number,
// 	uniqueUrlName: null | string,
// 	photos: {
// 		small: string | null,
// 		large: string | null
// 	},
// 	follow: boolean,
// 	status: null | string,
// };

// let initialStateUsers = {
// 	users: [] as User[],
// 	pageSize: 5,
// 	totalUsersCount: 20000,
// 	currentPage: 1,
// 	isFetching: false,
// 	followingInProgress: [],
// 	error: null
// }

let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: []
}

const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		//Диспатчи
		case FOLLOW: {
			return {
				...state,
				users: state.users.map((user: any) => {
					if (user.id === action.userId) {

						return {...user, followed: true}

					}
					return user
				})
			}
		}

		case UNFOLLOW: {
			return {
				...state, users: state.users.map((user: any) => {
					if (user.id === action.userId) {
						return {...user, followed: false}
					}
					return user
				})
			}
		}

		case SET_USERS: {
			if (!Array.isArray(action.users)) {
				console.error('SET_USERS action requires an array of users.')
				return state
			}

			return {...state, users: [...action.users]}
		}
		case SET_CURRENT_PAGE: {

			return {...state, currentPage: action.currentPage}
		}
		case SET_TOTAL_USERS_COUNT: {

			return {...state, totalUsersCount: action.count}
		}
		case TOGGLE_IS_FETCHING: {
			return {...state, isFetching: action.isFetching}
		}
		case TOGGLE_IS_FOLLOWING_PROGRESS: {
			return {
				...state
				,
				followingInProgress: action.isFetching ?
					[...state.followingInProgress, action.userId] :
					state.followingInProgress.filter(id => id !== action.userId)
			}
		}
		default:
			return state
	}
}

export const followSuccess = (userId: any) => {
	return {
		type: FOLLOW, userId
	}
}
export const unfollowSuccess = (userId: any) => {
	return {
		type: UNFOLLOW, userId
	}
}
export const toggleIsFetching = (isFetching: any) => {
	return {type: TOGGLE_IS_FETCHING, isFetching}
}
export const toggleFollowingProgress = (isFetching: any, userId: any) => {
	return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}
export const setUsers = (users: any) => {
	return {type: SET_USERS, users}
}
export const setCurrentPage = (currentPage: any) => {
	return {type: SET_CURRENT_PAGE, currentPage}
}
export const setTotalUsersCount = (totalUsersCount: any) => {
	return ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
}

//thunks

export const getUsers = (currentPage: number, pageSize: number) => {
	return (dispatch: any) => {
		dispatch(toggleIsFetching(true))

		usersAPI.getUsers(currentPage, pageSize).then((data: any) => {
			dispatch(toggleIsFetching(false))
			dispatch(setUsers(data.items))
			dispatch(setTotalUsersCount(data.totalCount))
		})
	}
}

export const follow = (userId: number) => {
	return (dispatch: any) => {
		dispatch(toggleFollowingProgress(true, userId))
		usersAPI.followUser(userId)
			.then((response) => {
				if (response.data.resultCode === 0) {
					dispatch(followSuccess(userId))
				}
				dispatch(toggleFollowingProgress(false, userId))
			})

	}
}

export const unfollow = (userId: number) => {
	return (dispatch: any) => {
		dispatch(toggleFollowingProgress(true, userId))
		usersAPI.unfollowUser(userId)
			.then((response) => {
				if (response.data.resultCode === 0) {
					dispatch(unfollowSuccess(userId))
				}
				dispatch(toggleFollowingProgress(false, userId))
			})

	}
}

export default userReducer
