import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import {thunk} from 'redux-thunk'

const thunkMiddleware = thunk

// export interface RootState {
// 	dialogsPage: {
// 		messages: {
// 			id: number,
// 			message: string
// 		}[],
// 		dialogs: {
// 			id: number,
// 			message: string
// 		}[],
// 		newMessageBody: string
// 	},
// 	profilePage: {
// 		posts: {
// 			id: number,
// 			message: string,
// 			likesCount: number,
// 		}[],
// 		newPostsText: string,
// 		profile: {
// 			aboutMe: string,
// 			contacts: {
// 				facebook: string,
// 				website: null | string,
// 				vk: string,
// 				twitter: string,
// 				instagram: string,
// 				youtube: null | string,
// 				github: string,
// 				mainLink: null | string
// 			},
// 			lookingForAJob: boolean,
// 			lookingForAJobDescription: string,
// 			fullName: string,
// 			userId: number,
// 			photos: {
// 				small: string,
// 				large: string
// 			};
// 		}
//
// 	},
// 	usersPage: {
// 		users: {
// 			name: string,
// 			id: number,
// 			uniqueURLName: string | null,
// 			photos: {
// 				small: string,
// 				large: string
// 			},
// 			status: number,
// 			followed: boolean
// 		}[],
//
// 		pageSize: number;
// 		totalUsersCount: any;
// 		currentPage: number;
// 		isFetching: boolean;
// 		error: number | null
// 	}
//
// }

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: userReducer,
    auth: authReducer
})

// declare global {
// 	interface Window {
// 		store: typeof store;
// 	}
// }
let store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store

export default store
