import React, {useEffect, useRef, useState} from 'react'
import {ChatMessageAPIType} from '../../api/chatAPI'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chatReducer'
import {AppDispatch, AppStateType} from '../../redux/reduxStore'

const ChatPage: React.FC = () => {
	return <div>
		<Chat/>
	</div>
}

const Chat: React.FC = () => {

	const dispatch: AppDispatch = useDispatch()

	const status = useSelector((state: AppStateType) => state.chat.status)

	useEffect(() => {
		dispatch(startMessagesListening())
		return (() => {
			dispatch(stopMessagesListening())
		})
	}, [])

	dispatch(startMessagesListening())

	return <div>
		{status === 'error' &&
        <div>Some error occurred. Please refresh the page.</div>}
		<>
			<Messages/>
			<AddMessageForm/>
		</>

	</div>
}

const Messages: React.FC = () => {
	console.log('Messages')
	const messages = useSelector((state: AppStateType) =>
		state.chat.messages)
	const messagesRef = useRef<HTMLDivElement>(null)
	const [isAutoScroll, setIsAutoScroll] = useState(false)

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		let element = e.currentTarget
		if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
			!isAutoScroll && setIsAutoScroll(true)
		}
		else {isAutoScroll && setIsAutoScroll(false)}
	}

	useEffect(() => {
		if (isAutoScroll) {messagesRef.current?.scrollIntoView({behavior: 'smooth'})}

	}, [messages])

	return (
		<div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
			{messages.map((m, index) => <Message key={m.id} message={m}/>)}
			<div ref={messagesRef}></div>
		</div>
	)
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
	console.log('Message')
	return <div>
		<img src={message.photo} style={{width: 40}}/><b>{message.userName}</b>
		<br/>
		{message.message}
		<hr/>
	</div>
})

const AddMessageForm: React.FC = () => {
	const [message, setMessage] = useState('')
	const dispatch: AppDispatch = useDispatch()

	const status = useSelector((state: AppStateType) => state.chat.status)

	const sendMessageHandler = () => {
		if (!message) {
			return
		}
		dispatch(sendMessage(message))
		setMessage('')
	}

	return <div>
		<div><textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
		</div>
		<div>
			<button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send
			</button>
		</div>
	</div>
}

export default ChatPage