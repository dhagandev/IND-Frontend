import React from 'react';
import SideNavBar from '../../../components/SideNavBar/SideNavBar';

const ProjectTracker = ({authenticated, user, showSideBar}) => {
	return (
		<div className="projectTracker">
			<SideNavBar
				authenticated
				user
				showSideBar
			/>
			<h3>tracker</h3>
		</div>
	)
}

export default ProjectTracker;