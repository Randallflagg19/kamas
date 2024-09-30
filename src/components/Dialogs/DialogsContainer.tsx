import {actions} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'

import {compose} from 'redux'
import withAuthRedirect from '../../hoc/WithAuthRedirect'
import {AppStateType} from '../../redux/reduxStore'

let mapStateToProps = (state: AppStateType) => {
	return {
		dialogsPage: state.dialogsPage
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, {...actions}),
	withAuthRedirect)(Dialogs)

