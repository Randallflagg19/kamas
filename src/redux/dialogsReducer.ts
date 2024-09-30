import {InferActionsTypes} from './reduxStore'

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

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'SN/DIALOGS/SEND-MESSAGE': {
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

export const actions = {
	sendMessage: (newMessageBody: string) =>
		({type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>