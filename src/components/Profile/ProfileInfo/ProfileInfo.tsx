import React from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../Preloader/Preloader'

export default function ProfileInfo(props: any) {
	if (!props.profile) {
		return <Preloader/>
	}
	return (
		<div>
			<div>
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ80P6r9XiTwfHKhlH3NqiJfI3pmMFPvPx8Q&s"/>
			</div>
			<div className={styles.descriptionBlock}>
				<img src={props.profile.photos.large}/></div>
		</div>
	)
}


