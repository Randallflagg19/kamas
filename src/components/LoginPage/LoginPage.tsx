import React from 'react'
import {Formik, Field, Form} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/authReducer'
import {Navigate} from 'react-router-dom'
import {AppDispatch, AppStateType} from '../../redux/reduxStore'
import style from './LoginPage.module.css'

export type LoginFormValuesType = {
	email: string;
	password: string;
	rememberMe: boolean;
	captcha: string;
};

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
			<Formik
				initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
				validate={values => {
					const errors: Partial<LoginFormValuesType> = {}
					if (!values.email) {
						errors.email = 'Введите адрес почты'
					}
					if (!values.password) {
						errors.password = 'Введите пароль'
					}
					if (captchaURL && !values.captcha) {
						errors.captcha = 'Введите символы с изображения'
					}
					return errors
				}}
				onSubmit={(values, {setSubmitting}) => {
					onSubmit(values)
					setSubmitting(false)
				}}
			>
				{({isSubmitting, touched, errors}) => (
					<Form>
						<div>
							<Field
								name="email"
								placeholder="Email"
								className={touched.email && errors.email ? style.errorInput : ''}
							/>
							{touched.email && errors.email && <div className={style.error}>{errors.email}</div>}
						</div>
						<div>
							<Field
								name="password"
								type="password"
								placeholder="Password"
								className={touched.password && errors.password ? style.errorInput : ''}
							/>
							{touched.password && errors.password &&
                  <div className={style.error}>{errors.password}</div>}
						</div>
						<div>
							<Field name="rememberMe" type="checkbox"/>
							<label htmlFor="rememberMe">remember me</label>
						</div>
						{captchaURL && (
							<div>
								<img src={captchaURL} alt="captcha"/>
								<Field
									name="captcha"
									placeholder="Symbols from image"
									className={touched.captcha && errors.captcha ? style.errorInput : ''}
								/>
								{touched.captcha && errors.captcha &&
                    <div className={style.error}>{errors.captcha}</div>}
							</div>
						)}
						<div>
							<button type="submit" disabled={isSubmitting}>Login</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}
