import {usersAPI} from '../api/api'
// import {toggleFollowingProgress, unfollowSuccess} from './userReducer'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

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
	newPostText: 'newPost',
	profile: null
}

const profileReducer = (state: any = initialState, action: any) => {
	switch (action.type) {

		case ADD_POST: {
			let newPost = {
				id: 6,
				message: state.newPostText,
				likesCount: '0'
			}

			return {...state, posts: [...state.posts, newPost], newPostText: ''}
		}

		case UPDATE_NEW_POST_TEXT: {
			return {...state, newPostText: action.newText}
		}

		case SET_USER_PROFILE: {
			return {...state, profile: action.profile}
		}
		default:
			return state
	}
}

// export const setProfileAva = (userId: number) => {
// 	return (dispatch: any) => {
// 		dispatch(toggleFollowingProgress(true, userId))
// 		usersAPI.unfollowUser(userId)
// 			.then((response) => {
// 				if (response.data.resultCode === 0) {
// 					dispatch(unfollowSuccess(userId))
// 				}
// 				dispatch(toggleFollowingProgress(false, userId))
// 			})
//
// 	}
// }

export const addPostActionCreator = () => ({type: ADD_POST})
export const setUserProfile = (profile: Profile) => ({type: SET_USER_PROFILE, profile})
export const getUserProfile = (userId: number) => (dispatch: any) => {
	usersAPI.getProfileUser(userId)
		.then(response => {
			dispatch(setUserProfile(response.data))
		})
}

export const updateNewPostTextActionCreator = (text: any) => {
	return {
		type: UPDATE_NEW_POST_TEXT,
		newText: text
	}
}

export default profileReducer
