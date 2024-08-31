import React from 'react'
import Profile from './Profile'
import axios from 'axios'
// import {usersAPI} from '../../api/api'
import {connect} from 'react-redux'
import {getUserProfile} from '../../redux/profileReducer'
import {
	useParams
} from 'react-router-dom'

export function withRouter(Children: any) {
	return (props: any) => {
		const match = {params: useParams()}
		return <Children {...props} match={match}/>
	}
}

class ProfileContainer extends React.Component<any, any> {

	componentDidMount() {
		let userId = this.props.match.params.userId
		if (!userId) {
			userId = 2
		}
		this.props.getUserProfile(userId)
	}

	render() {
		return <Profile {...this.props} profile={this.props.profile}/>
	}
}

let mapStateToProps = (state: any) => ({profile: state.profilePage.profile})

export default connect(mapStateToProps, {getUserProfile})(withRouter(ProfileContainer))
