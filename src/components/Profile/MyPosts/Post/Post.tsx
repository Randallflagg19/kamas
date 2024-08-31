import React from 'react'
import styles from './Post.module.css'

type PostProps = {
	key: number,
	id: number;
	message: string;
	likesCount: number;
}
export default function Post(props: PostProps) {
	return (
		<div className={styles.item}>
			<img className={styles.image} src="https://rog.asus.com/media/1719369630894.jpg"/>
			{props.message}
			<div>
				<span>like {props.likesCount}</span>
			</div>
		</div>
	)
}
