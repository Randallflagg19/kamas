import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {createField, GetStringKeys, Input} from '../../../common/FormsControls/FormsControls'
import {required} from '../../../../utils/validate/validators'

type Props = {}

export type AddPostFormValuesType = {
	newPostText: string;
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm:
	React.FC<InjectedFormProps<AddPostFormValuesType, Props> & Props> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				{createField<AddPostFormValuesTypeKeys>('your post', 'newPostText', [required], Input)}
			</div>
			<div>
				<button>Add post</button>
			</div>
		</form>
	)
}

export default reduxForm<AddPostFormValuesType, Props>({form: 'profile-ass-post'})(AddPostForm)