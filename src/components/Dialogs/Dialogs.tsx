import DialogItem from './DialogItem/DialogItem'
import styles from './Dialogs.module.css'
import Message from './Message/Message'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import React from 'react'
import {InitialStateType} from '../../redux/dialogsReducer'

type PropsType = {
	dialogsPage: InitialStateType,
	sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
	newMessageBody: string,
}

const Dialogs: React.FC<PropsType> = (props) => {

	let state = props.dialogsPage

	let dialogsElements = state.dialogs.map((dialog) => {
		return <DialogItem key={dialog.id} id={dialog.id} name={dialog.name}/>
	})

	let messagesElements = state.messages.map((message) => {
		return <Message key={message.id} id={message.id} message={message.message}/>
	})

	let addNewMessage = (values: NewMessageFormValuesType) => {
		props.sendMessage(values.newMessageBody)
	}
	// if (!props.isAuth) return <Navigate to={'/login'}/>
	return <div className={styles.dialogs}>
		<div className={styles.dialogsItems}>{dialogsElements}</div>
		<div className={styles.messages}>{messagesElements}</div>
		<AddMessageForm onSubmit={addNewMessage}/>
	</div>
}

export default Dialogs
