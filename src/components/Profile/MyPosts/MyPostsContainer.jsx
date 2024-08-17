import {
  updateNewPostTextActionCreator,
  addPostActionCreator,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

export default function MyPostsContainer(props) {
    let state = props.store.getState()

  let addPost = () => {
    let action = addPostActionCreator();
    props.store.dispatch(action);
  };

  let onPostChange = (text) => {
    let action = updateNewPostTextActionCreator(text);
    props.store.dispatch(action);
  };

  return (
    <MyPosts
      updateNewPostText={onPostChange}
      addPost={addPost}
      posts={state.profilePage.posts}
      newPostText = {state.profilePage.newPostText}
    />
  );
}
