import axios from 'axios'
import {setUserProfile} from '../redux/profileReducer'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '816d54f9-3c7c-4209-91f4-37d328c678cd'
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
		return instance.get(`profile/` + userId)
	}
}

export const authAPI = {
	me: async () => {
		return instance.get(`auth/me`)
	}

}