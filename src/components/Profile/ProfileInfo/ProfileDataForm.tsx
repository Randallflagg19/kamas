import React from 'react'
import {
	createField,
	GetStringKeys,
	Input,
	TextArea
} from './../../common/FormsControls/FormsControls'
import {reduxForm, InjectedFormProps} from 'redux-form'
import styles from './ProfileInfo.module.css'
import style from '../../common/FormsControls/FormsControls.module.css'
import {ProfileType} from '../../../types/types'

type Props = {
	profile: ProfileType
}
type  ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, Props> & Props> =
	({handleSubmit, profile, error}) => {

		return (
			<form onSubmit={handleSubmit}>
				<button>Save</button>
				{error && (
					<div className={style.formSummaryError}>
						{error}
					</div>
				)}
				<div>
					<b>Полное имя</b>: {createField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}
				</div>
				<div>
					<b>Ищу работу: </b>
					{createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
				</div>
				<div>
					<b>Мои профессиональные навыки:</b>
					{createField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', [], TextArea)}
				</div>
				<div>
					<b>Обо мне:</b>
					{createField<ProfileTypeKeys>('Обо мне', 'aboutMe', [], TextArea)}
				</div>
				<div>
					<b>Контакты </b>:
					{Object.keys(profile.contacts).map(key => (
						<div key={key} className={styles.contact}>
							<b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
						</div>
					))}
				</div>
			</form>
		)
	}

const ProfileDataReduxForm = reduxForm<ProfileType, Props>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm
