import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../../utils/firebaseService';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
}))

const NeedLogin = ({authenticated}) => {
	const classes = useStyles();

	if (authenticated) {
		return <Redirect to="/portal/projects"/>
	}

	return (
		<div className="need-login">
			<div className="need-login-text">
				You need to be logged in to view this page.
			</div>
			<Button variant="contained" className={classes.button} onClick={login}>Login with Google</Button>
		</div>
	)
}

export default NeedLogin;