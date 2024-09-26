import {usersAPI} from '../api/usersAPI'
import {updateObjectInArray} from '../utils/objectHelper'
import {UserType} from '../types/types'
import {Dispatch} from 'react'
import {AppStateType, BaseThunkType, InferActionsTypes} from './reduxStore'
import {ThunkAction} from 'redux-thunk'

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number> //array of user ids
}

type InitialState = typeof initialState

const userReducer = (state = initialState, action: ActionsType): InitialState => {
	switch (action.type) {

		case 'FOLLOW': {
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
			}
		}
		case 'UNFOLLOW': {
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
			}
		}
		case 'SET_USERS': {
			if (!Array.isArray(action.users)) {
				console.error('SET_USERS action requires an array of users.')
				return state
			}
			return {...state, users: [...action.users]}
		}
		case 'SET_CURRENT_PAGE': {

			return {...state, currentPage: action.currentPage}
		}
		case 'SET_TOTAL_USERS_COUNT': {

			return {...state, totalUsersCount: action.count}
		}
		case 'TOGGLE_IS_FETCHING': {
			return {...state, isFetching: action.isFetching}
		}
		case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
	followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
	unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
	setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
	setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
	setTotalUsersCount: (totalUsersCount: number) => ({
		type: 'SET_TOTAL_USERS_COUNT',
		count: totalUsersCount
	} as const),
	toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
	toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
		type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId
	} as const)
}
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

export const requestUsers = (currentPage: number, pageSize: number):
	ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setCurrentPage(currentPage))
		let data = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
		dispatch(actions.setTotalUsersCount(data.totalCount))
	}
}

const _followUnfollowFlow =
	async (dispatch: DispatchType, userId: number, apiMethod: any,
		actionCreator: (userId: number) => ActionsType) => {
		dispatch(actions.toggleFollowingProgress(true, userId))
		let response = await apiMethod(userId)
		if (response.data.resultCode === 0) {
			dispatch(actionCreator(userId))
		}
		dispatch(actions.toggleFollowingProgress(false, userId))
	}

export const follow = (userId: number):
	ThunkType => {
	return async (dispatch) => {
		await _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.followSuccess)
	}
}

export const unfollow = (userId: number): ThunkType => {
	return async (dispatch) => {
		await _followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.unfollowSuccess)
	}
}

export default userReducer
