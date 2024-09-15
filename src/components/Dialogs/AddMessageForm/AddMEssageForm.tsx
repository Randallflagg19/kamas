import {maxLengthCreator, required} from '../../../utils/validate/validators'
// @ts-ignore
import {Field, reduxForm} from 'redux-form'
import {TextArea} from '../../common/FormsControls/FormsControls'

const maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={TextArea}
				       validate={[required, maxLength50]}
				       placeholder={'Enter your message'}
				       name={'newMessageBody'}/>
			</div>
			<div>
				<button>Send</button>
			</div>


		</form>
	)
}
export default reduxForm({form: 'dialog-add-message-form'})(AddMessageForm)