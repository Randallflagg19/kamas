import {PhotosType, ProfileType} from '../types/types'
import {instance, APIResponseType} from './api'

type SavePhotoResponseDataType = {
	photos: PhotosType
}

export const profileAPI = {
	getProfileUser: async (userId: number) => {
		return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
	},
	getStatus: async (userId: number) => {
		return instance.get<string>(`profile/status/` + userId).then(res => res.data)
	},
	updateStatus: async (status: string) => {
		return instance.put<APIResponseType>(`profile/status/`, {status: status}).then(res => res.data)
	},
	savePhoto: async (photoFile: File) => {
		let formData = new FormData()
		formData.append('image', photoFile)
		return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo/`, formData, {
			headers:
				{'Content-Type': 'multipart/form-data'}
		}).then(res => res.data)
	},
	saveProfile: async (profile: ProfileType) => {
		return instance.put<APIResponseType>(`profile`, profile).then(res => res.data)
	}
}