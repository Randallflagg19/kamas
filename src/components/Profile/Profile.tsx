import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

// interface Profile {
// 	id: number;
// 	name: string;
// 	props: string;
// 	photos: {
// 		small: string | null;
// 		large: string | null;
// 	};
// }

export default function Profile(props: any) {
	return (
		<div>
			<ProfileInfo profile={props.profile}/>
			<MyPostsContainer/>
		</div>
	)
}
