import DialogItem from './DialogItem/DialogItem'
import styles from './Dialogs.module.css'
import Message from './Message/Message'
import {Navigate} from 'react-router-dom'
// @ts-ignore
import {Field, reduxForm} from 'redux-form'
import AddMessageForm from './AddMessageForm/AddMEssageForm'

export default function Dialogs(props: any) {
	type Dialog = {
		key: number,
		id: number;
		name: string;
	};
	type Message = {
		key: number,
		id: number;
		message: string;
	};
	let state = props.dialogsPage

	let dialogsElements = state.dialogs.map((dialog: Dialog) => {
		return <DialogItem key={dialog.id} id={dialog.id} name={dialog.name}/>
	})

	let messagesElements = state.messages.map((message: Message) => {
		return <Message key={message.id} id={message.id} message={message.message}/>
	})

	let addNewMessage = (values: any) => {
		props.sendMessage(values.newMessageBody)
	}
	if (!props.isAuth) return <Navigate to={'/login'}/>
	return <div className={styles.dialogs}>
		<div className={styles.dialogsItems}>{dialogsElements}</div>
		<div className={styles.messages}>{messagesElements}</div>
		<AddMessageForm onSubmit={addNewMessage}/>
	</div>
}

