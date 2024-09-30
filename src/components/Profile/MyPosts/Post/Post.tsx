import React from 'react'
import styles from './Post.module.css'

type Props = {
	id: number
	message: string
	likesCount: number
}
const Post: React.FC<Props> = (props) => {
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
export default Post
