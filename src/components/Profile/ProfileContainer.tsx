import React, {useEffect} from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {
	getStatus,
	getUserProfile,
	updateStatus,
	savePhoto,
	saveProfile, ThunkType
} from '../../redux/profileReducer'
import {useParams, useNavigate} from 'react-router-dom'
import withAuthRedirect from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from '../../redux/reduxStore'
import {ProfileType} from '../../types/types'

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	getUserProfile: (userId: number) => void;
	getStatus: (userId: number) => void;
	updateStatus: (text: string) => void;
	savePhoto: (file: File) => void;
	saveProfile: (profile: ProfileType) => ThunkType
};

type PropsType = MapPropsType & DispatchPropsType

const ProfileContainer: React.FC<PropsType> = ({
	profile, status, authorizedUserId, getUserProfile,
	getStatus, updateStatus, savePhoto
}) => {
	const {userId} = useParams<{ userId: string }>()
	const navigate = useNavigate()

	const refreshProfile = () => {
		let id: number | null = userId ? +userId : null
		if (!id) {
			id = authorizedUserId
			if (!id) {
				navigate('/login')
				return
			}
		}
		if (!id) {
			throw new Error('id should exist')
		}
		else {
			getUserProfile(id)
			getStatus(id)
		}
	}

	useEffect(() => {
		refreshProfile()
	}, [userId, authorizedUserId])

	return (
		<Profile
			saveProfile={saveProfile}
			isOwner={!userId}
			profile={profile}
			status={status}
			updateStatus={updateStatus}
			savePhoto={savePhoto}
		/>
	)
}

const mapStateToProps = (state: AppStateType) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
	connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
	withAuthRedirect
)(ProfileContainer)
