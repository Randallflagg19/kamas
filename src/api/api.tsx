import axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'fc0fedd9-f046-4e76-b27c-fe00a05918eb'
	}
})

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
	},

	savePhoto: async (photoFile: string) => {
		let formData = new FormData()
		formData.append('image', photoFile)
		return instance.put(`profile/photo/`, formData, {
			headers:
				{'Content-Type': 'multipart/form-data'}
		})
	},
	saveProfile: async (profile: any) => {
		return instance.put(`profile`, profile)
	}

}

export const authAPI = {
	me: async () => {
		return instance.get(`auth/me`)
	},
	login: async (email: string, password: string, rememberMe: boolean = false, captcha: any) => {
		return instance.post(`auth/login`, {email, password, rememberMe, captcha})
	},
	logout: async () => {
		return instance.delete(`auth/login`)
	}
}

export const securityAPI = {
	getCaptchaURL() {
		return instance.get(`security/get-captcha-url`)
	}
}
