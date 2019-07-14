import React from 'react';
import './NotImplemented.css'

const NotImplemented = () => {
	return (
		<div className="not-implemented">
			<img src="https://via.placeholder.com/500x300" alt="sad fox"/>
			<div className="text-area">
				<div className="apology">
					Sorry!
				</div>
				<div className="explanation">
					This feature is not implented yet. We are currently in v0, but have plans to implement this in the future, so check back often!
				</div>
			</div>
		</div>
	)
}

export default NotImplemented;