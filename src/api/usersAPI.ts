import {GetUsersItemsType, instance, APIResponseType} from './api'

export const usersAPI = {
	getUsers: async (currentPage = 3, pageSize = 10, term: string = '', friend: null | boolean = null) => {
		const response = await instance.get<GetUsersItemsType>(`users?page=
			${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
		return response.data
	},
	followUser: async (userId: number) => {
		return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
	},
	unfollowUser: async (userId: number) => {
		return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
	}
}