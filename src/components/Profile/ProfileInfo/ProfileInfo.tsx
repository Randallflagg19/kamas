import React, {useState} from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileDataForm from './ProfileDataForm'

export default function ProfileInfo({
	profile,
	status,
	updateStatus,
	isOwner,
	savePhoto,
	saveProfile
}:
	{
		profile: any,
		status: any,
		updateStatus: any,
		isOwner: boolean,
		savePhoto: any,
		saveProfile: any,
	}) {
	let [editMode, setEditMode] = useState(false)
	if (!profile) {
		return <Preloader/>
	}

	let image = 'https://sun9-53.userapi.com/impg/bNplD2WLbd2xhA4gFG3R1I4esZkU4GcgVYavmQ/4MHGZSUBDcE.jpg?size=810x1080&quality=95&sign=d1b96dd8a382711518d2be8b8eebc7b2&type=album'

	const mainPhotoSelectedOn = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files.length > 0) {
			savePhoto(files[0])
		}
	}

	const onSubmit = (formData: any) => {
		saveProfile(formData).then(
			() => {
				setEditMode(false)
			}
		)
	}

	return (
		<div>
			<div className={styles.descriptionBlock}>
				<img
					src={profile.photos.large || image}
					className={styles.profileImage}/>
				{isOwner && <input type={'file'} onChange={mainPhotoSelectedOn}/>}
				{editMode
					? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
					:
					<ProfileData letEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}/>}


				<ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
			</div>

		</div>
	)
}

const ProfileData = ({profile, isOwner, letEditMode}: any) => {
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
				<Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
			))}
		</div>
	</div>
}

const Contact = ({contactTitle, contactValue}: any) => {
	return <div className={styles.contact}>
		<b>{contactTitle}</b>:{contactValue}
	</div>
}


