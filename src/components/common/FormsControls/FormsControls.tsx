import styles from './FormsControls.module.css'
import {Field} from 'redux-form'
// @ts-ignore
const FormControl = ({meta: {touched, error}, children}) => {
	const hasError = touched && error
	return (
		<div className={styles.formControls + ' ' + (hasError ? styles.error : '')}>
			<div>
				{children}
			</div>
			{hasError && <span>{error}</span>}
		</div>
	)
}

export const TextArea = (props: any) => {
	const {input, meta, child, ...restProps} = props
	return <FormControl {...props}> <textarea {...input} {...restProps} />
	</FormControl>
}
export const Input = (props: any) => {
	const {input, meta, child, ...restProps} = props
	return <FormControl {...props}> <input {...input} {...restProps} />
	</FormControl>
}

export const createField = (
	placeholder: any,
	name: any,
	validators: any,
	component: any,
	props = {},
	text = '') => (<div>
	<Field placeholder={placeholder} name={name} validators={validators}
	       component={component} {...props} />
</div>)