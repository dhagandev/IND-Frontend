import React from 'react';
import './HomeCard.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const HomeCard = ({text, icon}) => {

	return (
		<Card className="{classes.card} home-card">
			<CardContent>
				<span className={icon}></span>
				<Typography className="card-text" variant="h6" component="h2">
					{text}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default HomeCard;