import {actions} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'

import {compose} from 'redux'
import withAuthRedirect from '../../hoc/WithAuthRedirect'

interface IDialogsPage {
	messages: { id: number, message: string }[];
	dialogs: { id: number, name: string }[];
	newMessageBody: string;
}

let mapStateToProps = (state: any) => {
	return {
		dialogsPage: state.dialogsPage
	}
}

let mapDispatchToProps = (dispatch: any) => {
	return {
		sendMessage: (newMessageBody: any) => {
			dispatch(actions.sendMessageCreator(newMessageBody))
		}
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
