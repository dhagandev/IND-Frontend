import React, { Component } from 'react';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null
		}
	}

	render() {
		return(
	        <div>
	            <h1>Welcome to React Firebase App</h1>
	            {this.state.data}
	        </div>
	    )
	}
}

export default Home;