import React from 'react';
import './CardArea.css'
import HomeCard from './HomeCard/HomeCard'

const CardArea = () => {
	return (
		<div className="card-area">
			<HomeCard 
				text="Organize your projects and chapters"
				icon="fa fa-folder-open fa-3x card-icon"
			/>
			<HomeCard 
				text="Design branching narratives"
				icon="fa fa-sitemap fa-3x card-icon"
			/>
			<HomeCard 
				text="Create your dialogue"
				icon="fa fa-comment-dots fa-3x card-icon"
			/>
			<HomeCard 
				text="Construct elaborate characters"
				icon="fa fa-id-card fa-3x card-icon"
			/>
			<HomeCard 
				text="Store your notes and inspiration"
				icon="fa fa-database fa-3x card-icon"
			/>
			<HomeCard 
				text="Export to Word and Google docs"
				icon="fa fa-file-download fa-3x card-icon"
			/>
		</div>
	)
}

export default CardArea;