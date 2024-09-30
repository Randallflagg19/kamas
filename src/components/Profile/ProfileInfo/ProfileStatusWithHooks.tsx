import React, {useState, useEffect} from 'react'

type Props = {
	status: string
	updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<Props> = (props) => {

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
              <b>Status:</b><span onDoubleClick={activateEditMode}>
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