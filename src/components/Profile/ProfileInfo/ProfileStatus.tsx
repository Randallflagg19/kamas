import React from 'react'

class ProfileStatus extends React.Component <any, any> {

	state = {
		editMode: false,
		status: this.props.status
	}
	activateEditMode = () => {
		this.setState({editMode: true})
	}

	deactivateEditMode = () => {
		this.setState({editMode: false})

		this.props.updateStatus(this.state.status)

	}

	onStatusChange = (e: any) => {
		this.setState({status: e.currentTarget.value})
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			})
		}
		let a = this.state
		let b = this.props
		console.log('componentDidUpdate')
	}

	render() {
		console.log('render')
		return (<div>
				{!this.state.editMode &&
            <div>
                <span onDoubleClick={this.activateEditMode}>   {this.props.status || '----'}</span>
            </div>}
				{this.state.editMode &&
            <div>
                <input onChange={this.onStatusChange} autoFocus={true} value={this.state.status}
                       onBlur={this.deactivateEditMode}/>
            </div>}
			</div>

		)
	}
}

export default ProfileStatus