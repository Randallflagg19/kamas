import {
	updateNewMessageBodyCreator,
	sendMessageCreator
} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'

interface IDialogsPage {
	messages: { id: number, message: string }[];
	dialogs: { id: number, name: string }[];
	newMessageBody: string;
}

let mapStateToProps = (state: any): { dialogsPage: IDialogsPage } => {
	return {
		dialogsPage: state.dialogsPage
	}
}

let mapDispatchToProps = (dispatch: any) => {
	return {
		updateNewMessage: (body: string) => {
			dispatch(updateNewMessageBodyCreator(body))
		},
		sendMessage: () => {
			dispatch(sendMessageCreator())
		}
	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
