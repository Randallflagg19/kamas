import {FormAction, stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from '../types/types'
import {profileAPI} from '../api/profileAPI'
import {BaseThunkType, InferActionsTypes} from './reduxStore'

let initialState = {
	posts: [
		{id: 1, message: 'hi', likesCount: 23},
		{id: 2, message: 'its my first post', likesCount: 203},
		{id: 3, message: 'its my second post', likesCount: 230},
		{id: 4, message: 'dada', likesCount: 2330}
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: ''
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		case 'SN/PROFILE/ADD-POST': {
			let newPost = {
				id: 6,
				message: action.newPostText,
				likesCount: 0
			}
			return {...state, posts: [...state.posts, newPost]}
		}

		case 'SN/PROFILE/SET-STATUS': {
			return {...state, status: action.status}
		}

		case 'SN/PROFILE/SET-USER-PROFILE': {
			return {...state, profile: action.profile}
		}
		case 'SN/PROFILE/DELETE-POST': {
			return {...state, posts: state.posts.filter(post => post.id !== action.postId)}
		}
		case 'SN/PROFILE/SAVE-PHOTO-SUCCESS': {
			return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
		}
		default:
			return state
	}
}

export const actions = {
	addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
	setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET-USER-PROFILE', profile} as const),
	setStatus: (status: string) => ({type: 'SN/PROFILE/SET-STATUS', status} as const),
	deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE-POST', postId} as const),
	savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE-PHOTO-SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
	let res = await profileAPI.getProfileUser(userId)
	dispatch(actions.setUserProfile(res))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getStatus(userId)
	dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
	const response = await profileAPI.updateStatus(status)
	if (response.data === 0) {}
	dispatch(actions.setStatus(status))
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
	const data = await profileAPI.savePhoto(file)
	if (data.resultCode === 0) {}
	dispatch(actions.savePhotoSuccess(data.data.photos))
}

export const saveProfile = (profile: ProfileType): ThunkType =>
	async (dispatch, getState) => {
		const userId = getState().auth.userId
		const data = await profileAPI.saveProfile(profile)
		if (data.resultCode === 0) {
			if (userId) {await dispatch(getUserProfile(userId))}
			else {throw new Error('UserId can\'t be null')}
		}
		else {
			dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
			return Promise.reject(data.messages[0])
		}
	}

export default profileReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType | FormAction>
