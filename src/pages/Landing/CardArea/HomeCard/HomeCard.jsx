import React from 'react';
import './HomeCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	card: {
		width: 350,
	}
});

const HomeCard = ({text, icon}) => {
	const classes = useStyles();

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