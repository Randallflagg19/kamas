import React from 'react'
import style from './../common/FormsControls/FormsControls.module.css'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, GetStringKeys, Input} from '../common/FormsControls/FormsControls'
import {required} from '../../utils/validate/validators'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/authReducer'
import {Navigate} from 'react-router-dom'
import {AppDispatch, AppStateType} from '../../redux/reduxStore'

type LoginFormOwnProps = {
	captchaURl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,
	LoginFormOwnProps> & LoginFormOwnProps> = ({
	handleSubmit, error, captchaURl
}) => {
	return (
		<form onSubmit={handleSubmit}>
			{createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
			{createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
			{createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
			{captchaURl && <img src={captchaURl} alt="captcha"/>}
			{captchaURl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}
			{error && <div className={style.formSummaryError}>{error}</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm<LoginFormValuesType,
	LoginFormOwnProps>({form: 'login'})(LoginForm)

export type  LoginFormValuesType = {
	captcha: string
	rememberMe: boolean,
	password: string
	email: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = () => {
	const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
	const dispatch: AppDispatch = useDispatch()

	const onSubmit = (formData: LoginFormValuesType) => {
		dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
	}

	if (isAuth) {
		return <Navigate to={'/profile'}/>
	}
	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaURl={captchaURL}/>
		</div>
	)
}

