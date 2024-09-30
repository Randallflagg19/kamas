import {actions} from '../../../redux/profileReducer'
import MyPosts, {DispatchProps, MapProps} from './MyPosts'
import {connect} from 'react-redux'
import {AppStateType} from '../../../redux/reduxStore'

let mapStateToProps = (state: AppStateType) => {
	return {
		posts: state.profilePage.posts
	}
}

const MyPostsContainer = connect<MapProps, DispatchProps, {}, AppStateType>(mapStateToProps,
	{addPost: actions.addPostActionCreator})(MyPosts)

export default MyPostsContainer
