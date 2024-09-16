import React from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

export default function ProfileInfo({profile, status, updateStatus}:
	{ profile: any, status: any, updateStatus: any }) {
	if (!profile) {
		return <Preloader/>
	}
	return (
		<div>
			<div className={styles.descriptionBlock}>
				<img src={profile.photos.large}/>
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
			</div>

		</div>
	)
}


