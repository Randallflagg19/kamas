let currentStatus: StatusType = 'pending'
let isReconnecting = false
const subscribers = {
	'messages-received': [] as MessagesReceivedSubscriberType[],
	'status-changed': [] as StatusChangedSubscriberType[]
}

let webSocket: WebSocket | null = null
type EventsNamesType = 'messages-received' | 'status-changed'

const closeHandler = () => {
	console.log('WebSocket connection closed')
	if (!isReconnecting) {
		isReconnecting = true // Устанавливаем флаг
		notifySubscribersAboutStatus('pending')
		setTimeout(() => {
			createChannel() // Повторная попытка подключения
		}, 3000)
	}
}

const messageHandler = (e: MessageEvent) => {
	const newMessages = JSON.parse(e.data)
	subscribers['messages-received'].forEach((s) => s(newMessages))
}
const openHandler = () => {
	console.log('WebSocket connection established')
	notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
	console.error('WebSocket error observed:')
	notifySubscribersAboutStatus('error')
	isReconnecting = false // Сбрасываем флаг, чтобы можно было попытаться подключиться снова
}

const cleanUp = () => {
	webSocket?.removeEventListener('close', closeHandler)
	webSocket?.removeEventListener('message', messageHandler)
	webSocket?.removeEventListener('open', openHandler)
	webSocket?.removeEventListener('error', errorHandler)

}

const notifySubscribersAboutStatus = (status: StatusType) => {
	if (currentStatus !== status) {
		currentStatus = status
		console.log(`Status changed to: ${status}`)
		subscribers['status-changed'].forEach(s => s(status))
	}
}

function createChannel() {
	cleanUp()
	webSocket?.close()
	webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

	// notifySubscribersAboutStatus('pending')

	webSocket.addEventListener('close', closeHandler)
	webSocket.addEventListener('message', messageHandler)
	webSocket.addEventListener('open', openHandler)
	webSocket.addEventListener('error', errorHandler)
}

export const chatAPI = {
	start() {
		createChannel()
	},
	stop() {
		subscribers['messages-received'] = []
		subscribers['status-changed'] = []
		cleanUp()
		webSocket?.close()
	},
	subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
		// @ts-ignore
		if (!subscribers[eventName].includes(callback)) {
			// @ts-ignore
			subscribers[eventName].push(callback)
		}
		return () => {
			// @ts-ignore
			subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
		}
	},
	unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
		// @ts-ignore
		subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
	},
	sendMessage: async (message: string) => {
		webSocket?.send(message)
	}
}

export type ChatMessageAPIType = {
	userId: number,
	userName: string,
	message: string,
	photo: string
}
export type StatusType = 'pending' | 'ready' | 'error'
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
