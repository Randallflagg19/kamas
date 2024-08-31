import DialogItem from './DialogItem/DialogItem'
import styles from './Dialogs.module.css'
import Message from './Message/Message'

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

	let newMessageBody = state.newMessageBody

	let onSendMessage = () => {
		props.sendMessage()
	}

	let onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		let body = e.target.value
		props.updateNewMessage(body)
	}

	return (
		<div className={styles.dialogs}>
			<div className={styles.dialogsItems}>{dialogsElements}</div>
			<div className={styles.messages}>{messagesElements}</div>

			<div>
				<div>
          <textarea
	          value={newMessageBody}
	          onChange={onNewMessageChange}
	          placeholder="Enter your message"
          ></textarea>
				</div>
				<div>
					<button onClick={onSendMessage}>Send</button>
				</div>
			</div>
		</div>
	)
}
