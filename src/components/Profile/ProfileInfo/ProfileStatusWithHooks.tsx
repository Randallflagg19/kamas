import React, {useState, useEffect} from 'react'

const ProfileStatusWithHooks = (props: any) => {

	let [editMode, setEditMode] = useState(false)
	let [status, setStatus] = useState(props.status)

	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

	let activateEditMode = () => {
		setEditMode(true)
	}

	let deactivateEditMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}

	const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}

	return (
		<div>
			{!editMode &&
          <div>
					<span onDoubleClick={activateEditMode}>
						{props.status || '----'}</span>
          </div>}
			{editMode && <div>
          <input autoFocus={true}
                 value={status}
                 onChange={onStatusChange}
                 onBlur={deactivateEditMode}
          />
      </div>}
		</div>

	)
}

export default ProfileStatusWithHooks