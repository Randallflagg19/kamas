// Константы для действий
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY' as const
const SEND_MESSAGE = 'SEND-MESSAGE' as const

// Интерфейсы для сообщений и диалогов
interface IMessage {
	id: number;
	message: string;
}

interface IDialog {
	id: number;
	name: string;
}

interface IDialogsPage {
	messages: IMessage[];
	dialogs: IDialog[];
	newMessageBody: string;
}

interface UpdateNewMessageBodyAction {
	type: typeof UPDATE_NEW_MESSAGE_BODY;
	body: string;
}

interface SendMessageAction {
	type: typeof SEND_MESSAGE;
}

type DialogsActionTypes = UpdateNewMessageBodyAction | SendMessageAction;

// Начальное состояние
let initialState: IDialogsPage = {
	messages: [
		{id: 1, message: 'hi'},
		{id: 2, message: 'hihi'},
		{id: 3, message: 'hihihi'},
		{id: 4, message: 'hihihihi'}
	],
	dialogs: [
		{id: 1, name: 'firstDialog'},
		{id: 2, name: 'secondDialog'},
		{id: 3, name: 'thirdDialog'},
		{id: 4, name: 'forthDialog'},
		{id: 5, name: 'fifthDialog'},
		{id: 6, name: 'sixthDialog'}
	],
	newMessageBody: ''
}

const dialogsReducer = (
	state: IDialogsPage = initialState,
	action: DialogsActionTypes
): IDialogsPage => {
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY: {
			return {...state, newMessageBody: action.body}
		}
		case SEND_MESSAGE: {
			let body = state.newMessageBody
			return {
				...state,
				newMessageBody: '',
				messages: [...state.messages, {id: state.messages.length + 1, message: body}]
			}
		}
		default:
			return state
	}
}

// Action creators
export const sendMessageCreator = (): SendMessageAction => {
	return {type: SEND_MESSAGE}
}

export const updateNewMessageBodyCreator = (
	newBody: string
): UpdateNewMessageBodyAction => {
	return {
		type: UPDATE_NEW_MESSAGE_BODY,
		body: newBody
	}
}

export default dialogsReducer
