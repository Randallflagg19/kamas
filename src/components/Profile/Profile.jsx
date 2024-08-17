import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

export default function Profile(props) {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer store={props.store} />
    </div>
  );
}
