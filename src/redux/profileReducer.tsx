import {profileAPI, usersAPI} from '../api/api'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

interface Profile {
	id: number;
	name: string;
	props: string;
	photos: {
		small: string | null;
		large: string | null;
	};
}

let initialState = {
	posts: [
		{
			id: 1,
			message: 'hi',
			likesCount: '23'
		},
		{
			id: 2,
			message: 'its my first post',
			likesCount: '203'
		},
		{
			id: 3,
			message: 'its my second post',
			likesCount: '230'
		},
		{
			id: 4,
			message: 'dadaa',
			likesCount: '2330'
		}
	],
	profile: null,
	status: ''
}

const profileReducer = (state: any = initialState, action: any) => {
	switch (action.type) {

		case ADD_POST: {
			let newPost = {
				id: 6,
				message: action.newPostText,
				likesCount: '0'
			}

			return {...state, posts: [...state.posts, newPost], newPostText: ''}
		}

		case SET_STATUS: {
			return {...state, status: action.status}
		}

		case SET_USER_PROFILE: {
			return {...state, profile: action.profile}
		}
		default:
			return state
	}
}

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile: Profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string) => ({type: SET_STATUS, status})

export const getUserProfile = (userId: number) => (dispatch: any) => {
	usersAPI.getProfileUser(userId)
		.then(response => {
			dispatch(setUserProfile(response.data))
		})
}

export const getStatus = (userId: number) => (dispatch: any) => {
	profileAPI.getStatus(userId)
		.then(response => {
			dispatch(setStatus(response.data))
		})
}

export const updateStatus = (status: string) => (dispatch: any) => {
	profileAPI.updateStatus(status)
		.then(response => {
			if (response.data.resultCode === 0) {}
			dispatch(setStatus(status))
		})
}

export default profileReducer
