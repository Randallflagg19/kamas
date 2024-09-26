import {instance, APIResponseType, ResultCodeForCaptcha, ResultCodes} from './api'

type MeResponseDataType = {
	id: number,
	email: string,
	login: string
}
type LoginResponseDataType = {
	userId: number
}
export const authAPI = {
	me: async () => {
		return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
			.then(response => response.data)
	},
	login: async (email: string, password: string,
		rememberMe: boolean = false, captcha: null | string = null) => {
		return instance.post<APIResponseType<LoginResponseDataType, ResultCodes | ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
			.then(response => response.data)
	},
	logout: async () => {
		return instance.delete(`auth/login`)
	}
}