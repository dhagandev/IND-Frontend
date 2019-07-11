import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../utils/firebaseService';

class Login extends Component {
	render() {
		if (this.props.authenticated) {
			return <Redirect to="/portal"/>
		}
		return(
			<div className="need-login-view">
				<div className="need-login-text">
					You need to be logged in to view this page.
				</div>
				<button onClick={login}>Login with Google</button>
			</div>
		)
	}
}

export default Login;