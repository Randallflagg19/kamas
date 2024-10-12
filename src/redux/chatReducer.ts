import {InferActionsTypes} from './reduxStore'
import {chatAPI, ChatMessageAPIType, StatusType} from '../api/chatAPI'
import {ThunkType} from './profileReducer'
import {Dispatch} from 'redux'
import {v1} from 'uuid'

type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType
}

export type  InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'SN/CHAT/MESSAGES_RECEIVED': {
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages.map(m =>
					({...m, id: v1()}))].filter((m, index, array) =>
					index >= array.length - 100)
			}
		}
		case 'SN/CHAT/STATUS_CHANGED': {
			return {
				...state,
				status: action.payload.status
			}
		}
		default:
			return state
	}
}

const actions = {
	messagesReceived: (messages: ChatMessageAPIType[]) => ({
		type: 'SN/CHAT/MESSAGES_RECEIVED', payload: {messages}
	} as const),
	statusChanged: (status: StatusType) => ({
		type: 'SN/CHAT/STATUS_CHANGED', payload: {status}
	} as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = (messages) => {
			dispatch(actions.messagesReceived(messages))
		}
	}
	return _newMessageHandler
}
let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = (status) => {
			dispatch(actions.statusChanged(status))
		}
	}
	return _statusChangedHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
	chatAPI.start()
	//тут пендинг
	chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
	chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
	chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
	chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
	chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async () => {
	await chatAPI.sendMessage(message)
}

export default chatReducer
