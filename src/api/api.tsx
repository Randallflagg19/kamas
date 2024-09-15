import axios from 'axios'
import {setUserProfile} from '../redux/profileReducer'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'fc0fedd9-f046-4e76-b27c-fe00a05918eb'
	}
})

interface AuthResponse {
	resultCode: number;
	messages: string[];
	data: {
		id: number;
		email: string;
		login: string;
	};
}

export const usersAPI = {

	getUsers: async (currentPage = 3, pageSize = 10) => {
		const response = await instance.get(`users?page=
			${currentPage}&count=${pageSize}`
		)
		return response.data
	},

	followUser(userId: number) {
		return instance.post(`follow/${userId}`)
	},

	unfollowUser(userId: number) {
		return instance.delete(`follow/${userId}`)
	},

	getProfileUser: async (userId: number) => {
		console.warn('obsolete method. Please use profileAPI object.')
		return profileAPI.getProfileUser(userId)
	}
}

export const profileAPI = {

	getProfileUser: async (userId: number) => {
		return instance.get(`profile/` + userId)
	},

	getStatus: async (userId: number) => {
		return instance.get(`profile/status/` + userId)
	},

	updateStatus: async (status: string) => {
		return instance.put(`profile/status/`, {status: status})
	}

}

export const authAPI = {
	me: async () => {
		return instance.get(`auth/me`)
	},
	login: async (email: string, password: string, rememberMe: boolean = false) => {
		return instance.post(`auth/login`, {email, password, rememberMe})
	},
	logout: async () => {
		return instance.delete(`auth/login`)
	}

}