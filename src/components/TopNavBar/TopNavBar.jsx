import React from 'react';
import './TopNavBar.css'
import { login, logout } from '../../utils/firebaseService';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const TopNavBar = ({authenticated}) => {
	const classes = useStyles();
	
	return (
		<div className="{classes.root} top-nav">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<Button component={Link} to="/" color="inherit" style={{fontSize: '.75em', fontWeight: 'bolder'}}>
							
								Red Tale
						</Button>
					</Typography>
					<Button component={Link} to="/faq" color="inherit">
						FAQ
					</Button>
					<Button component={Link} to="/prices" color="inherit">Prices</Button>
					<Button component={Link} to="/contact" color="inherit">Contact</Button>
					{
						authenticated ? (
							<div className="logged-in-buttons">
								<Redirect to="/portal/projects"/>
								<Button component={Link} to="/portal/projects" color="inherit">Projects</Button>
								<Button component={Link} to="/" color="inherit" onClick={logout}>Logout</Button>
							</div>
						) : (
							<Button component={Link} to="/" color="inherit" onClick={login}>Login</Button>
						)
					}
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default TopNavBar;