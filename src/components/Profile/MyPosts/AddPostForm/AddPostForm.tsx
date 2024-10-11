import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik'

export type AddPostFormValuesType = {
	newPostText: string;
};

const AddPostForm: React.FC<{
	onSubmit: (values: AddPostFormValuesType) => void
}> = ({onSubmit}) => {
	return (
		<Formik
			initialValues={{newPostText: ''}}
			onSubmit={(values, {resetForm}) => {
				onSubmit(values)
				resetForm()
			}}
		>
			{({isSubmitting}) => (
				<Form>
					<div>
						<Field name="newPostText" placeholder="Your post"/>
						<ErrorMessage name="newPostText" component="div"/>
					</div>
					<div>
						<button type="submit" disabled={isSubmitting}>Add post</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default AddPostForm
