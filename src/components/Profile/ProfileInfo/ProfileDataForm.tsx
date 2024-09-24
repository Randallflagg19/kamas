import React from 'react'
import {createField, Input, TextArea} from './../../common/FormsControls/FormsControls'
import {reduxForm, InjectedFormProps} from 'redux-form'
import styles from './ProfileInfo.module.css'
import style from '../../common/FormsControls/FormsControls.module.css'

// Определяем типы для значений формы
type ProfileDataFormValues = {
	fullName: string;
	lookingForAJob: boolean;
	lookingForAJobDescription: string;
	aboutMe: string;
	contacts: Record<string, string>;
};

// Определяем типы для пропсов формы
type ProfileDataFormProps = {
	profile: ProfileDataFormValues;
	error?: string; // Ошибка может быть не определена
};

// Объединяем InjectedFormProps и ProfileDataFormProps
type FormProps = InjectedFormProps<ProfileDataFormValues, any> & ProfileDataFormProps;

// Основной компонент формы
const ProfileDataForm: React.FC<FormProps> = ({handleSubmit, profile, error}) => {
	return (
		<form onSubmit={handleSubmit}>
			<button>Сохранить</button>
			{error && (
				<div className={style.formSummaryError}>
					{error}
				</div>
			)}

			<div>
				<b>Полное имя</b>: {createField('Полное имя', 'fullName', [], Input)}
			</div>

			<div>
				<b>Ищу работу: </b>
				{createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
			</div>

			<div>
				<b>Мои профессиональные навыки:</b>
				{createField('Мои профессиональные навыки', 'lookingForAJobDescription', [], TextArea)}
			</div>

			<div>
				<b>Обо мне:</b>
				{createField('Обо мне', 'aboutMe', [], TextArea)}
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

// Обертываем компонент в reduxForm, указывая, что 'ProfileDataFormValues' - это тип значений формы
const ProfileDataReduxForm = reduxForm<ProfileDataFormValues, ProfileDataFormProps>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm
