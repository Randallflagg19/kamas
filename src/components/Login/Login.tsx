import React from 'react'
import style from './../common/FormsControls/FormsControls.module.css'
// @ts-ignore
import {InjectedFormProps, Field, reduxForm} from 'redux-form'
import {Input} from '../common/FormsControls/FormsControls'
import {required} from '../../utils/validate/validators'
import {connect} from 'react-redux'
import {login} from '../../redux/authReducer'
import {Navigate} from 'react-router-dom'

type LoginFormProps = {
	error: string | null;
};

const LoginForm: React.FC<InjectedFormProps<{}, LoginFormProps> & LoginFormProps> = ({
	handleSubmit,
	error
}) => {

	return <form onSubmit={handleSubmit}>
		<div>
			<Field placeholder={'Email'} name={'email'}
			       validate={[required]} component={Input}/>
		</div>
		<div>
			<Field placeholder={'Password'} name={'password'} type={'password'}
			       validate={[required]} component={Input}/>
		</div>
		<div>
			<Field type="checkbox" name={'rememberMe'} component={Input}/> remember me
		</div>
		{error && <div className={style.formSummaryError}>
			{error}
    </div>}
		<div>
			<button>Login</button>
		</div>

	</form>
}

const LoginReduxForm = reduxForm({
	form: 'login'
})(LoginForm)

const Login = (props: any) => {
	const onSubmit = (formData: any) => {
		(props.login(formData.email, formData.password, formData.rememberMe))
	}
	if (props.isAuth) {
		return <Navigate to={'/profile'}/>
	}
	return <div>
		<h1>Login</h1>
		<LoginReduxForm onSubmit={onSubmit}/>

	</div>
}

const mapStateToProps = (state: any) => ({
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)