import React from 'react'
import Header, {MapProps, DispatchProps} from './Header'
import {connect} from 'react-redux'
import {logout} from '../../redux/authReducer'
import {AppStateType} from '../../redux/reduxStore'

class HeaderContainer extends React.Component<MapProps & DispatchProps> {

	render() {
		return <Header {...this.props} />
	}
}

const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
})

export default connect<MapProps, DispatchProps, {},
	AppStateType>(mapStateToProps, {logout})(HeaderContainer)