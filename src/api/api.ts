import axios from 'axios'
import {UserType} from '../types/types'

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'fc0fedd9-f046-4e76-b27c-fe00a05918eb'
	}
})

export enum ResultCodes {
	Success = 0,
	Error = 1
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10
}

export type  GetUsersItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | number
}

export type APIResponseType<D = {}, RC = ResultCodes> = {
	data: D
	messages: Array<string>
	resultCode: RC
}