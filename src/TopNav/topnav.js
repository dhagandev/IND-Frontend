import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, logout } from '../utils/firebaseService';

const linkStyle = {
    textDecoration: 'underline',
    color: 'rebeccapurple',
    cursor: 'pointer'
};

class TopNav extends Component {
	render() {
		return(
	        <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/portal">Portal</Link>
                    </li>
                    {
                        this.props.authenticated ?
                        <li style={linkStyle}>
                            <span onClick={logout}>Logout</span>
                        </li>
                        : 
                        <li style={linkStyle}>
                            <span onClick={login}>Login</span>
                        </li>
                    }
                </ul>
	        </div>
	    )
	}
}

export default TopNav;