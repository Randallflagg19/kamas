import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import React from 'react'
import {ProfileType} from '../../types/types'
import {ThunkType} from '../../redux/profileReducer'

type Props = {
	profile: ProfileType | null
	status: string
	updateStatus: (status: string) => void
	isOwner: boolean
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => ThunkType
}

const Profile: React.FC<Props> = (props) => {
	return (
		<div>
			<ProfileInfo savePhoto={props.savePhoto}
			             isOwner={props.isOwner}
			             profile={props.profile}
			             status={props.status}
			             saveProfile={props.saveProfile}
			             updateStatus={props.updateStatus}/>
			<MyPostsContainer/>
		</div>
	)
}
export default Profile