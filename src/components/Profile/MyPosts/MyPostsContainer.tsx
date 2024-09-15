import {
	addPostActionCreator
} from '../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'

let mapStateToProps = (state: any) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	}
}

let mapDispathToProps = (dispatch: any) => {
	return {
		addPost: (newPostText: any) => {
			dispatch(addPostActionCreator(newPostText))
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispathToProps)(MyPosts)

export default MyPostsContainer
