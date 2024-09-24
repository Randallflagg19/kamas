import React from 'react'
import style from './../common/FormsControls/FormsControls.module.css'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Input} from '../common/FormsControls/FormsControls'
import {required} from '../../utils/validate/validators'
import {connect} from 'react-redux'
import {login} from '../../redux/authReducer'
import {Navigate} from 'react-router-dom'

type LoginFormProps = {
	error?: string | null; // Make error optional
	captchaURL?: string;
};

type LoginFormValues = {
	email: string;
	password: string;
	rememberMe: boolean;
	captcha?: string;
};

const LoginForm: React.FC<InjectedFormProps<LoginFormValues, LoginFormProps> & LoginFormProps> = ({
	handleSubmit,
	error,
	captchaURL
}) => {
	return (
		<form onSubmit={handleSubmit}>
			{createField('Email', 'email', [required], Input)}
			{createField('Password', 'password', [required], Input, {type: 'password'})}
			{createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
			{captchaURL && <img src={captchaURL} alt="captcha"/>}
			{captchaURL && createField('Symbols from image', 'captcha', [required], Input, {})}
			{error && <div className={style.formSummaryError}>{error}</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm<LoginFormValues, LoginFormProps>({
	form: 'login'
})(LoginForm)

const Login: React.FC<any> = (props) => {
	const onSubmit = (formData: LoginFormValues) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
	}

	if (props.isAuth) {
		return <Navigate to={'/profile'}/>
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}
			                error={props.error}/> {/* Pass the error prop here */}
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	captchaURL: state.auth.captchaURL,
	isAuth: state.auth.isAuth,
	error: state.auth.error // Assuming the error is stored in auth reducer
})

export default connect(mapStateToProps, {login})(Login)
