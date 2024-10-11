import React, {useEffect, useState} from 'react'

export type ChatMessage = {
	userId: number,
	userName: string,
	message: string,
	photo: string
}

const ChatPage: React.FC = () => {
	return <div>
		<Chat/>
	</div>
}

const Chat: React.FC = () => {
	const [ws, setWs] = useState<WebSocket | null>(null)

	useEffect(() => {
		let webSocket: WebSocket

		const closeHandler = () => {
			console.log('CLOSE WS')
			setTimeout(createChannel, 3000)
		}

		function createChannel() {

			webSocket?.removeEventListener('close', closeHandler)
			webSocket?.close()

			webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
			webSocket.addEventListener('close', closeHandler)
			setWs(webSocket)
		}

		createChannel()

		return () => {
			webSocket.removeEventListener('close', closeHandler)
			webSocket.close()
		}
	}, [])

	useEffect(() => {

	}, [ws])

	return <div>
		<Messages ws={ws}/>
		<AddMessageForm ws={ws}/>
	</div>
}

const Messages: React.FC<{ ws: WebSocket | null }> = ({ws}) => {
	const [messages, setMessages] = useState<ChatMessage[]>([])

	useEffect(() => {
		const messageHandler = (e: MessageEvent) => {
			let newMessages = JSON.parse(e.data)
			setMessages((prevMessages) => [...prevMessages, ...newMessages])
		}
		ws?.addEventListener('message', messageHandler)

		return () => {
			ws?.removeEventListener('message', messageHandler)
		}
	}, [ws])
	return (
		<div style={{height: '400px', overflowY: 'auto'}}>
			{messages.map((m, index) => <Message key={index} message={m}/>)}
		</div>
	)
}

const Message: React.FC<{ message: ChatMessage }> = ({message}) => {
	return <div>
		<img src={message.photo} style={{width: 40}}/><b>{message.userName}</b>
		<br/>
		{message.message}
		<hr/>
	</div>
}

const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ws}) => {
	const [message, setMessage] = useState('')
	const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

	useEffect(() => {
		const openHandler = () => {
			setReadyStatus('ready')
		}
		ws?.addEventListener('open', openHandler)
		return () => {
			ws?.removeEventListener('open', openHandler)
		}
	}, [ws])

	const sendMessage = () => {
		if (!message) {
			return
		}
		ws?.send(message)
		setMessage('')
	}

	return <div>
		<div><textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
		</div>
		<div>
			<button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
		</div>
	</div>
}

export default ChatPage