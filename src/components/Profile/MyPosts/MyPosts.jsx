import React, { useRef } from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import {updateNewPostTextActionCreator, addPostActionCreator} from "../../../redux/profileReducer"


export default function MyPosts(props) {
  let newPostElement = useRef(null);

  let postsElements = props.posts.map((post) => {
    return (
      <Post id={post.id} message={post.message} likesCount={post.likesCount} />
    );
  });

  let addPost = () => {
    let action = addPostActionCreator()
    props.dispatch(action);
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    let action = updateNewPostTextActionCreator(text)
    props.dispatch(action);
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
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={styles.posts}>{postsElements}</div>
    </div>
  );
}
