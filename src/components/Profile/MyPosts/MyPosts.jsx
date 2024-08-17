import React, { useRef } from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

export default function MyPosts(props) {
  let newPostElement = useRef(null);

  let postsElements = props.posts.map((post) => {
    return (
      <Post id={post.id} message={post.message} likesCount={post.likesCount} />
    );
  });

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

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
  );
}
