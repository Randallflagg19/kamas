import {maxLengthCreator, required} from '../../../utils/validate/validators'
// @ts-ignore
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Input, TextArea} from '../../common/FormsControls/FormsControls'
import {NewMessageFormValuesType} from '../Dialogs'
import React from 'react'
import {LoginFormValuesType} from '../../Login/Login'

const maxLength50 = maxLengthCreator(50)

type  NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type  PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				{createField<NewMessageFormValuesKeysType>('new message',
					'newMessageBody', [required, maxLength50], Input)}

			</div>
			<div>
				<button>Send</button>
			</div>


		</form>
	)
}
export default reduxForm<NewMessageFormValuesType>({form: 'dialog-add-message-form'})(AddMessageForm)