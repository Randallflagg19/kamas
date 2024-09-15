import {authAPI} from '../api/api'

// @ts-ignore
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET-USER-DATA'

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false
}

const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_USER_DATA: {
			return {
				...state,
				...action.payload
			}
		}
		default:
			return state
	}
}

export const setAuthUserData = (userId: any, email: any, login: any, isAuth: boolean) => {
	return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

export const getAuthUserData = () => (dispatch: any) => {
	return authAPI.me()
		.then((response) => {
			if (response.data.resultCode === 0) {
				let {id, login, email} = response.data.data
				dispatch(setAuthUserData(id, email, login, true))
			}
		})

}

export const login = (email: string, password: string, rememberMe: any) => (dispatch: any) => {

	authAPI.login(email, password, rememberMe)
		.then((response) => {
			if (response.data.resultCode === 0) {
				dispatch(getAuthUserData())
			}
			else {
				let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
				dispatch(stopSubmit('login', {_error: message}))

			}
		})
}

export const logout = () => (dispatch: any) => {
	authAPI.logout()
		.then((response) => {
			if (response.data.resultCode === 0) {
				dispatch(setAuthUserData(null, null, null, false))
			}
		})
}

export default authReducer
