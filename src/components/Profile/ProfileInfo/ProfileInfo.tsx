import React from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

export default function ProfileInfo(props: any) {
	if (!props.profile) {
		return <Preloader/>
	}
	return (
		<div>
			<div className={styles.descriptionBlock}>
				<img src={props.profile.photos.large}/>
				<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
			</div>

		</div>
	)
}


