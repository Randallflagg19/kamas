import React from 'react'
import {Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppStateType} from '../redux/reduxStore'

let mapStateToPropsForRedirect = (state: AppStateType) => ({
	isAuth: state.auth.isAuth
})

type MapPropsType = {
	isAuth: boolean,
}

type  DispatchPropsType = {}

export default function WithAuthRedirect<WCP extends object>(WrappedComponent: React.ComponentType<WCP>) {

	const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {

		let {isAuth, ...restProps} = props

		if (!isAuth) return <Navigate to="/login"/>

		return <WrappedComponent {...restProps as WCP} />
	}

	let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>
	(mapStateToPropsForRedirect, {})
	(RedirectComponent)

	return ConnectedAuthRedirectComponent
}

