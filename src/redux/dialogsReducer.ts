const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY' as const
const SEND_MESSAGE = 'SEND-MESSAGE' as const

type DialogType = {
	id: number
	name: string
}

type MessageType = {
	id: number
	message: string
}

let initialState = {
	dialogs: [
		{id: 1, name: 'firstDialog'},
		{id: 2, name: 'secondDialog'},
		{id: 3, name: 'thirdDialog'},
		{id: 4, name: 'forthDialog'},
		{id: 5, name: 'fifthDialog'},
		{id: 6, name: 'sixthDialog'}
	] as Array<DialogType>,
	messages: [
		{id: 1, message: 'hi'},
		{id: 2, message: 'hihi'},
		{id: 3, message: 'hihihi'},
		{id: 4, message: 'hihihihi'}
	] as Array<MessageType>
}

export type iInitialStateType = typeof initialState;

const dialogsReducer = (
	state = initialState,
	action: any
): iInitialStateType => {
	switch (action.type) {
		// case UPDATE_NEW_MESSAGE_BODY: {
		// 	return {...state, newMessageBody: action.body}
		// }
		case SEND_MESSAGE: {
			let body = action.newMessageBody
			return {
				...state,
				messages: [...state.messages, {id: state.messages.length + 1, message: body}]
			}
		}
		default:
			return state
	}
}

type SendMessageCreatorActionType = {
	type: typeof SEND_MESSAGE
	newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => {
	return {type: SEND_MESSAGE, newMessageBody}
}

// type UpdateNewMessageBodyCreatorActionType = {
// 	type: typeof UPDATE_NEW_MESSAGE_BODY
// 	body: string
// }
//
// export const updateNewMessageBodyCreator = (
// 	newBody: string
// ): UpdateNewMessageBodyCreatorActionType => {
// 	return {
// 		type: UPDATE_NEW_MESSAGE_BODY,
// 		body: newBody
// 	}
// }

export default dialogsReducer
