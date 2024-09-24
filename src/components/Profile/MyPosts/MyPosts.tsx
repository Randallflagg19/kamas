import React from 'react'
import styles from './MyPosts.module.css'
import {maxLengthCreator, minLengthCreator, required} from '../../../utils/validate/validators'
import Post from './Post/Post'
// @ts-ignore
import {Field, reduxForm} from 'redux-form'
import {TextArea} from '../../common/FormsControls/FormsControls'

const AddNewPostForm = reduxForm({form: 'ProfileAddNewPostForm'})((props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					name="newPostText"
					component={TextArea}
					placeholder={'Post message'}
					validate={[required, maxLengthCreator(10), minLengthCreator(2)]}
				/>
			</div>
			<button type="submit">Add post</button>
		</form>
	)
})

type MyPostsProps = {
	posts: Array<{
		id: number;
		message: string;
		likesCount: number;
	}>;
	addPost: (newPostText: string) => void;
};

const MyPosts: React.FC<MyPostsProps> = React.memo((props) => {

	let postsElements = [...props.posts].map((post) => (
		<Post key={post.id} id={post.id} message={post.message} likesCount={post.likesCount}/>
	))

	let onAddPost = (values: any) => {
		props.addPost(values.newPostText)
	}

	return (
		<div className={styles.postsBlock}>
			<h3>My posts</h3>
			<AddNewPostForm onSubmit={onAddPost}/>
			<div className={styles.posts}>{postsElements}</div>
		</div>
	)
})

export default MyPosts
