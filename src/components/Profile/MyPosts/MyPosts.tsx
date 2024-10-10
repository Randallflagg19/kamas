import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import AddPostForm, {AddPostFormValuesType} from './AddPostForm/AddPostForm'
import {PostType} from '../../../types/types'

export type MapProps = {
	posts: Array<PostType>
}

export type DispatchProps = {
	addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapProps & DispatchProps> = props => {
	let postsElements = [...props.posts].reverse().map((post) => (
		<Post key={post.id} id={post.id} message={post.message} likesCount={post.likesCount}/>
	))
	const onAddPost = (values: AddPostFormValuesType) => {
		props.addPost(values.newPostText)
	}

	return (
		<div className={styles.postsBlock}>
			<h3>My posts</h3>
			<AddPostForm onSubmit={onAddPost}/>
			<div className={styles.posts}>{postsElements}</div>
		</div>
	)
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized
