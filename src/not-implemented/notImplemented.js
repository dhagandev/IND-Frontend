import React, {Component} from 'react';
import './notImplemented.css';

class NotImplemented extends Component {
	render() {
		return (
			<div className="NotImplemented">
				<div className="apology">
					Sorry!
				</div>
				<div className="apology-descrip">
					This feature has not been implemented yet. 
					We apologize for the inconvenience. 
				</div>
			</div>
		)
	}
}
export default NotImplemented;