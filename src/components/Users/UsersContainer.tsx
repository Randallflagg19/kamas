import {connect} from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import {
	unfollow, follow, setCurrentPage, toggleFollowingProgress,
	requestUsers
} from '../../redux/userReducer'
import React from 'react'
import Users from './Users'
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount, getUsers
} from '../../redux/usersSelectors'

interface User {
	id: number;
	name: string;
	status: string;
	followed: boolean;
	photos: { small: string | null };
	location?: { city: string; country: string }
}

interface UsersProps {
	users: User[];
	setCurrentPage: any,
	follow?: any;
	unfollow?: any;
	followSuccess?: any;
	unfollowSuccess?: any;
	location?: { city: string; country: string };
	totalUsersCount: any;
	pageSize: number;
	currentPage: number;
	isFetching: boolean;
	toggleFollowingProgress: any;
	followingInProgress: boolean;
	getUsersThunkCreator?: any,
	requestUsers: any
}

class UsersContainer extends React.Component<UsersProps> {
	componentDidMount() {
		this.props.requestUsers(this.props.currentPage, this.props.pageSize)
	}

	onPageChanged = (pageNumber: number) => {
		this.props.requestUsers(pageNumber, this.props.pageSize)
		this.props.setCurrentPage(pageNumber)
	}

	render() {

		return <>{this.props.isFetching ? <Preloader/> :
			<Users totalUsersCount={this.props.totalUsersCount}
			       pageSize={this.props.pageSize}
			       currentPage={this.props.currentPage}
			       onPageChanged={this.onPageChanged}
			       follow={this.props.follow}
			       unfollow={this.props.unfollow}
			       users={this.props.users}
			       followingInProgress={this.props.followingInProgress}/>
		}</>

	}
}

// let mapStateToProps = (state: any) => {
// 	return {
// 		users: state.usersPage.users,
// 		pageSize: state.usersPage.pageSize,
// 		totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 		isFetching: state.usersPage.isFetching,
// 		followingInProgress: state.usersPage.followingInProgress
// 	}
// }

let mapStateToProps = (state: any) => {
	return {
		// users: getUsers(state),
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}

export default connect(mapStateToProps, {
	follow, unfollow, setCurrentPage,
	toggleFollowingProgress, requestUsers
})(UsersContainer)



