import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {ProfileType} from '../../../types/types'
import styles from './ProfileInfo.module.css'
import {Input} from 'antd'
import TextArea from 'antd/es/input/TextArea'

type Props = {
	profile: ProfileType;
	handleSubmit: (formData: ProfileType) => Promise<void>;
};

const ProfileDataForm: React.FC<Props> = ({profile, handleSubmit}) => {
	return (
		<Formik
			initialValues={profile}
			validate={(values) => {
				const errors: Partial<ProfileType> = {}
				if (!values.fullName) {
					errors.fullName = 'Required'
				}
				return errors
			}}

			onSubmit={async (values) => {
				console.log(values)
				await handleSubmit(values)
			}}
		>
			{({errors, touched}) => (
				<Form>
					<button type="submit">Save</button>
					<div>
						<b>Full name</b>:
						<Field
							name="fullName"
							as={Input}
							className={touched.fullName && errors.fullName ? styles.errorInput : ''}
						/>
						<ErrorMessage name="fullName" component="div" className={styles.error}/>
					</div>

					<div>
						<b>Looking for a job:</b>
						<Field name="lookingForAJob" type="checkbox" as={Input}/>
					</div>

					<div>
						<b>My professional skills:</b>
						<Field name="lookingForAJobDescription"
						       as={TextArea}
						       className={touched.lookingForAJobDescription && errors.lookingForAJobDescription ? styles.errorInput : ''}
						/>
						<ErrorMessage name="lookingForAJobDescription" component="div"
						              className={styles.error}/>
					</div>

					<div>
						<b>About me:</b>
						<Field
							name="aboutMe"
							as={TextArea}
							className={touched.aboutMe && errors.aboutMe ? styles.errorInput : ''}
						/>
						<ErrorMessage name="aboutMe" component="div" className={styles.error}/>
					</div>

					<div>
						<b>Contacts:</b>
						{Object.keys(profile.contacts).map(key => {
							return <div key={key} className={styles.contact}>
								<b>{key}:</b>
								<Field
									name={`contacts.${key}`}
									as={Input}
								/>
							</div>
						})}
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default ProfileDataForm
