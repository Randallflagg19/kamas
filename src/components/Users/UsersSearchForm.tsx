import {Field, Form, Formik} from 'formik'
import React from 'react'
import {FilterType} from '../../redux/userReducer'
import {useSelector} from 'react-redux'
import {getUsers, getUsersFilter} from '../../redux/usersSelectors'

const usersSearchFormValidate = (formValues: any) => {
	const errors = {}
	return errors
}

type FriendType = 'true' | 'false' | 'null'

type  FormType = {
	term: string
	friend: FriendType
}

type Props = {
	onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<Props> = React.memo((props) => {

	const filter = useSelector(getUsersFilter)

	const submit = (values: FormType,
		{setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false

		}
		props.onFilterChanged(filter)
		setSubmitting(false)
	}

	return <div>
		<Formik
			enableReinitialize
			initialValues={{term: filter.term, friend: String(filter.friend)} as FormType}
			validate={usersSearchFormValidate}
			onSubmit={submit}
		>

			{({isSubmitting}) => (
				<Form>
					<Field type="text" name="term"/>
					<Field name="friend" as="select">
						<option value="null">All</option>
						<option value="true">Only followed</option>
						<option value="false">Only unfollowed</option>
					</Field>
					<button type="submit" disabled={isSubmitting}>
						find
					</button>
				</Form>
			)}

		</Formik>
	</div>
})