import React from 'react'
import "./Toast.css"

class Toast extends React.Component {
	componentDidMount() {
		setTimeout(this.turnOff, 3000);
	}

	turnOff = () => {
			this.props.handleToast();
	}

	render() {
		return (
			<div className="toast-container">
				<div className="message-container">
					<small>{this.props.message}</small>
				</div>
			</div>
		)
	}
}

export default Toast;