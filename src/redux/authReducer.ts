import {
	ResultCodeForCaptcha,
	ResultCodes
} from '../api/api'

import {FormAction, stopSubmit} from 'redux-form'
import {authAPI} from '../api/authAPI'
import {securityAPI} from '../api/securityAPI'
import {BaseThunkType, InferActionsTypes} from './reduxStore'

let initialState = {
	userId: null as null | number,
	email: null as null | string,
	login: null as null | string,
	isAuth: false,
	captchaURL: null as null | string
}

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
	switch (action.type) {
		case 'gustav/auth/SET-USER-DATA':
		case 'gustav/auth/GET_CAPTCHA_URL_SUCCESS': {
			return {
				...state,
				...action.payload
			}
		}
		default:
			return state
	}
}

export const actions = {
	setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
		({type: 'gustav/auth/SET-USER-DATA', payload: {userId, email, login, isAuth} as const}),
	getCaptchaURLSuccess: (captchaURL: string) =>
		({type: 'gustav/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaURL} as const})
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
	let meData = await authAPI.me()
	if (meData.resultCode === ResultCodes.Success) {
		let {id, login, email} = meData.data
		dispatch(actions.setAuthUserData(id, email, login, true))
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
	async (dispatch) => {
		let loginData = await authAPI.login(email, password, rememberMe, captcha)
		if (loginData.resultCode === ResultCodes.Success) {
			dispatch(getAuthUserData())
		}
		else {
			if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
				dispatch(getCaptchaURL())
			}
			let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
			dispatch(stopSubmit('login', {_error: message}))
		}
	}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
	let data = await securityAPI.getCaptchaURL()
	const captchaURL = data.url
	dispatch(actions.getCaptchaURLSuccess(captchaURL))
}

export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout()
	if (response.data.resultCode === 0) {
		dispatch(actions.setAuthUserData(null, null, null, false))
	}
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>
