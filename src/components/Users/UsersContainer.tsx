import {useSelector} from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import React from 'react'
import {Users} from './Users'
import {getIsFetching} from '../../redux/usersSelectors'

type UserPagePropsType = { pageTitle: string }

export const UsersContainer: React.FC<UserPagePropsType> = (props) => {
	const isFetching = useSelector(getIsFetching)
	return <>
		<h2>{props.pageTitle}</h2>
		{isFetching ? <Preloader/> : null}
		<Users/>
	</>
}





