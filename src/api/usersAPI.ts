import {GetUsersItemsType, instance, APIResponseType} from './api'

export const usersAPI = {
	getUsers: async (currentPage = 3, pageSize = 10) => {
		const response = await instance.get<GetUsersItemsType>(`users?page=
			${currentPage}&count=${pageSize}`)
		return response.data
	},
	followUser(userId: number) {
		return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
	},
	unfollowUser(userId: number) {
		return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
	}
}