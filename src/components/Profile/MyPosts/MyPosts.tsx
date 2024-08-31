import React, {useRef} from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'

export default function MyPosts(props: any) {
	const newPostElement = useRef<HTMLTextAreaElement>(null)
	type PostProps = {
		key: number,
		id: number;
		message: string;
		likesCount: number;
	}
	let postsElements = props.posts.map((post: PostProps) => {
		return (
			<Post key={post.id} id={post.id} message={post.message} likesCount={post.likesCount}/>
		)
	})

	let onAddPost = () => {
		props.addPost()
	}

	let onPostChange = () => {
		let text = newPostElement.current?.value
		if (text !== undefined) {
			props.updateNewPostText(text)
		}
	}

	return (
		<div className={styles.postsBlock}>
			<h3> My posts</h3>
			<div>
				<div>
          <textarea
	          onChange={onPostChange}
	          ref={newPostElement}
	          value={props.newPostText}
          />
				</div>
				<button onClick={onAddPost}>Add post</button>
			</div>
			<div className={styles.posts}>{postsElements}</div>
		</div>
	)
}
