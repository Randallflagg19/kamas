import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getStatus, getUserProfile, updateStatus} from '../../redux/profileReducer'
import {useParams} from 'react-router-dom'
import withAuthRedirect from '../../hoc/WithAuthRedirect'
import {compose} from 'redux'

export function withRouter(Children: any) {
	return (props: any) => {
		const match = {params: useParams()}
		return <Children {...props} match={match}/>
	}
}

class ProfileContainer extends React.Component<any, any> {
	componentDidMount() {
		let userId = this.props.match?.params?.userId
		if (!userId) {
			userId = this.props.authorizedUserId
		}
		this.props.getUserProfile(userId)
		this.props.getStatus(userId)
	}

	render() {
		return <Profile {...this.props}
		                profile={this.props.profile}
		                status={this.props.status}
		                updateStatus={this.props.updateStatus}/>
	}
}

const mapStateToProps = (state: any) => {
	return ({
		profile: state.profilePage.profile,
		status:
		state.profilePage.status,
		authorizedUserId:
		state.auth.userId,
		isAuth:
		state.auth.isAuth
	})
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
	withRouter,
	withAuthRedirect
)(ProfileContainer)
