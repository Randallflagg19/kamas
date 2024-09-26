import {connect} from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import {
	unfollow, follow,
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
import {UserType} from '../../types/types'
import {AppStateType} from '../../redux/reduxStore'

type MapStatePropsType = {
	currentPageNumber: number
	pageSize: number
	isFetching: boolean
	totalUsersCount: number
	users: Array<UserType>
	followingInProgress: Array<number>

}

type MapDispatchPropsType = {
	requestUsers: (currentPageNumber: number, pageSize: number) => void
	follow: (userId: number) => void;
	unfollow: (userId: number) => void;
}

type OwnPropsType = {
	pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		const {currentPageNumber, pageSize} = this.props
		this.props.requestUsers(currentPageNumber, pageSize)
	}

	onPageChanged = (pageNumber: number) => {
		const {pageSize} = this.props
		this.props.requestUsers(pageNumber, pageSize)
	}

	render() {

		return <>
			<h1>{this.props.pageTitle}</h1>
			{this.props.isFetching ? <Preloader/> :
				<Users totalUsersCount={this.props.totalUsersCount}
				       pageSize={this.props.pageSize}
				       currentPageNumber={this.props.currentPageNumber}
				       onPageChanged={this.onPageChanged}
				       follow={this.props.follow}
				       unfollow={this.props.unfollow}
				       users={this.props.users}
				       followingInProgress={this.props.followingInProgress}/>
			}</>

	}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPageNumber: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, {follow, unfollow, requestUsers})(UsersContainer)



