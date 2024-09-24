import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

export default function Profile(props: any) {

	return (
		<div>
			<ProfileInfo savePhoto={props.savePhoto}
			             saveProfile={props.saveProfile}
			             isOwner={props.isOwner}
			             profile={props.profile}
			             status={props.status}
			             updateStatus={props.updateStatus}/>
			<MyPostsContainer/>
		</div>
	)
}
