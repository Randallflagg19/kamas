import {stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from '../types/types'
import {profileAPI} from '../api/profileAPI'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {
	posts: [
		{id: 1, message: 'hi', likesCount: 23},
		{id: 2, message: 'its my first post', likesCount: 203},
		{id: 3, message: 'its my second post', likesCount: 230},
		{id: 4, message: 'dada', likesCount: 2330}
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: '',
	newPostText: ''
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {

	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 6,
				message: action.newPostText,
				likesCount: 0
			}
			return {...state, posts: [...state.posts, newPost], newPostText: ''}
		}

		case SET_STATUS: {
			return {...state, status: action.status}
		}

		case SET_USER_PROFILE: {
			return {...state, profile: action.profile}
		}
		case DELETE_POST: {
			return {...state, posts: state.posts.filter((post: any) => post.id !== action.id)}
		}
		case SAVE_PHOTO_SUCCESS: {
			return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
		}
		default:
			return state
	}
}

type AddPostActionCreatorActionType = {
	type: typeof ADD_POST,
	newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType =>
	({type: ADD_POST, newPostText})

type SetUserProfileActionType = {
	type: typeof SET_USER_PROFILE,
	profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType =>
	({type: SET_USER_PROFILE, profile})

type SetStatusActionType = {
	type: typeof SET_STATUS,
	status: string
}

export const setStatus = (status: string): SetStatusActionType =>
	({type: SET_STATUS, status})

// type DeletePostActionType = {
// 	type: typeof DELETE_POST,
// 	postId: number
// }
//
// export const deletePost = (postId: number): DeletePostActionType =>
// 	({type: DELETE_POST, postId})

type SavePhotoSuccessActionType = {
	type: typeof SAVE_PHOTO_SUCCESS,
	photos: PhotosType
}

export const savePhotoSuccess = (photos: any): SavePhotoSuccessActionType =>
	({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
	let res = await profileAPI.getProfileUser(userId)
	dispatch(setUserProfile(res))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
	const data = await profileAPI.getStatus(userId)
	dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
	const response = await profileAPI.updateStatus(status)
	if (response.data === 0) {}
	dispatch(setStatus(status))
}

export const savePhoto = (file: any) => async (dispatch: any) => {
	const data = await profileAPI.savePhoto(file)
	if (data.resultCode === 0) {}
	dispatch(savePhotoSuccess(data.data.photos))
}
export const saveProfile = (profile: ProfileType) =>
	async (dispatch: any, getState: any) => {
		const userId = getState().auth.userId
		const response = await profileAPI.saveProfile(profile)
		if (response.resultCode === 0) {
			dispatch(getUserProfile(userId))
		}
		else {
			dispatch(stopSubmit('edit-profile', {_error: response.messages[0]}))
			return Promise.reject(response.messages[0])
		}
	}

export default profileReducer
