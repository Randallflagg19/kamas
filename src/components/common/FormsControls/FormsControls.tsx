import styles from './FormsControls.module.css'

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

// @ts-ignore
export const TextArea = (props) => {
	const {input, meta, child, ...restProps} = props
	return <FormControl {...props}> <textarea {...input} {...restProps} />
	</FormControl>
}
// @ts-ignore
export const Input = (props) => {
	const {input, meta, child, ...restProps} = props
	return <FormControl {...props}> <input {...input} {...restProps} />
	</FormControl>
}