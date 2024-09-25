import {
	authAPI,
	ResultCodeForCaptcha,
	ResultCodes,
	securityAPI
} from '../api/api'

import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'gustav/auth/SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'gustav/auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
	userId: null as null | number,
	email: null as null | number,
	login: null as null | number,
	isAuth: false,
	captchaURL: null as null | string
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS: {
			return {
				...state,
				...action.payload
			}
		}
		default:
			return state
	}
}

type SetAuthUserDataActionPayloadType = {
	userId: number | null
	email: string | null
	login: string | null
	isAuth: boolean
}

type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA,
	payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
	return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

type GetCaptchaURLSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaURL: string }
}

export const getCaptchaURLSuccess = (captchaURL: string): GetCaptchaURLSuccessActionType => {
	return {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaURL}}
}

export const getAuthUserData = () => async (dispatch: any) => {
	let meData = await authAPI.me()
	if (meData.resultCode === ResultCodes.Success) {
		let {id, login, email} = meData.data
		dispatch(setAuthUserData(id, email, login, true))
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) =>
	async (dispatch: any) => {
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

export const getCaptchaURL = () => async (dispatch: any) => {
	let response = await securityAPI.getCaptchaURL()
	const captchaURL = response.data.url
	dispatch(getCaptchaURLSuccess(captchaURL))
}

export const logout = () => async (dispatch: any) => {
	let response = await authAPI.logout()
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false))
	}
}

export default authReducer
