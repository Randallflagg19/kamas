import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import {maxLengthCreator} from '../../../utils/validate/validators'
import {NewMessageFormValuesType} from '../Dialogs'

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<{
	onSubmit: (values: NewMessageFormValuesType) => void
}> = ({onSubmit}) => {
	return (
		<Formik
			initialValues={{newMessageBody: ''}}
			validate={values => {
				const errors: Partial<NewMessageFormValuesType> = {}
				if (!values.newMessageBody) {
					errors.newMessageBody = 'Напиши что нибудь)'
				}
				else if (maxLength50(values.newMessageBody)) {
					errors.newMessageBody = maxLength50(values.newMessageBody)
				}
				return errors
			}}
			onSubmit={(values, {resetForm}) => {
				onSubmit(values)
				resetForm()
			}}
		>
			{({isSubmitting}) => (
				<Form>
					<div>
						<Field name="newMessageBody" placeholder="New message"/>
						<ErrorMessage name="newMessageBody" component="div"/>
					</div>
					<div>
						<button type="submit" disabled={isSubmitting}>Send</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default AddMessageForm
