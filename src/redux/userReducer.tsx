import {usersAPI} from '../api/api'
import {updateObjectInArray} from '../utils/objectHelper'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

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
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
				// users: state.users.map((user: any) => {
				// 	if (user.id === action.userId) {
				//
				// 		return {...user, followed: true}
				//
				// 	}
				// 	return user
				// })
			}
		}

		case UNFOLLOW: {
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
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

export const requestUsers = (currentPage: number, pageSize: number) => {
	return async (dispatch: any) => {
		dispatch(toggleIsFetching(true))
		dispatch(setCurrentPage(currentPage))

		let data = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setTotalUsersCount(data.totalCount))
	}
}

const followUnfollowFlow = async (dispatch: any, userId: any, apiMethod: any, actionCreator: any) => {
	dispatch(toggleFollowingProgress(true, userId))
	let response = await apiMethod(userId)
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
	return async (dispatch: any) => {
		await followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followSuccess)
	}
}

export const unfollow = (userId: number) => {
	return async (dispatch: any) => {
		await followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess)
	}
}

export default userReducer
