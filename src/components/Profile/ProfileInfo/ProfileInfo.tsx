import React, {useState} from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileDataForm from './ProfileDataForm'
import {ContactsType, ProfileType} from '../../../types/types'
import {ThunkType} from '../../../redux/profileReducer'

type Props = {
	profile: ProfileType | null
	status: string
	updateStatus: (status: string) => void
	isOwner: boolean
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => ThunkType
}

const ProfileInfo: React.FC<Props> = ({
	profile, status, updateStatus,
	isOwner, savePhoto, saveProfile
}) => {
	let [editMode, setEditMode] = useState(false)
	if (!profile) {
		return <Preloader/>
	}

	let image = 'https://sun9-53.userapi.com/impg/bNplD2WLbd2xhA4gFG3R1I4esZkU4GcgVYavmQ/4MHGZSUBDcE.jpg?size=810x1080&quality=95&sign=d1b96dd8a382711518d2be8b8eebc7b2&type=album'

	const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			savePhoto(e.target.files[0])
		}
	}

	const onSubmit = async (formData: ProfileType) => {
		console.log('Submitted form data:', formData) // Добавьте это для отладки
		try {
			await saveProfile(formData)
			setEditMode(false)
		}
		catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<div className={styles.descriptionBlock}>
				<img
					src={profile.photos.large || image}
					className={styles.profileImage}/>
				{isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
				{editMode
					? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
					:
					<ProfileData letEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}/>}
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
			</div>

		</div>
	)
}

type ProfileDataProps = {
	profile: ProfileType
	isOwner: boolean
	letEditMode: () => void
}

const ProfileData: React.FC<ProfileDataProps> = ({profile, isOwner, letEditMode}) => {
	return <div>
		{isOwner &&
        <button onClick={letEditMode}>Edit</button>}
		<div>
			<b> Full name:</b> {profile.fullName}
		</div>
		<div>
			Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
		</div>
		{profile.lookingForAJob && <div>
        My professional skills: {profile.lookingForAJobDescription}
    </div>}
		<div>
			<b>About me: {profile.aboutMe}</b>
		</div>
		<div>
			<b>Contacts: </b>
			{Object.keys(profile.contacts).map(key => (
				<Contact key={key} contactTitle={key}
				         contactValue={profile.contacts[key as keyof ContactsType]}/>
			))}
		</div>
	</div>
}

type ContactsProps = {
	contactTitle: string
	contactValue: string
}

const Contact: React.FC<ContactsProps> = ({contactTitle, contactValue}) => {
	return <div className={styles.contact}>
		<b>{contactTitle}</b>:{contactValue}
	</div>
}

export default ProfileInfo


