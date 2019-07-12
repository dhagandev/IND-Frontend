import React, { Component } from 'react';
import './App.css';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import NeedLogin from '../../components/NeedLogin/NeedLogin';
import Landing from '../Landing/Landing';
import FAQ from '../FAQ/FAQ';
import Prices from '../Prices/Prices';
import Contact from '../Contact/Contact';
import ProjectTracker from '../UserPortal/ProjectTracker/ProjectTracker';
import StoryStructure from '../UserPortal/StoryStructure/StoryStructure';
import Characters from '../UserPortal/Characters/Characters';
import DialogueManager from '../UserPortal/DialogueManager/DialogueManager';
import History from '../UserPortal/History/History';
import WalkThrough from '../UserPortal/WalkThrough/WalkThrough';
import PrivateRoute from '../../utils/privateRoute';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { auth } from '../../utils/firebaseService'

class App extends Component {
	constructor() {
		super();
		this.state = {...this.getInitState()}
	}

	getInitState() {
		return {
			authenticated: false,
			user: null
		}
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({
					authenticated: true,
					user
				})
			} else {
				this.setState({
					authenticated: false,
					user: null
				})
			}
		})
	}

	render() {
		return (
			<Router>
				<div className="RedTaleApp">
					<TopNavBar 
						authenticated={this.state.authenticated}
					/>
					<Switch>
						<Route exact path="/" component={Landing}/>
						<Route path="/faq" component={FAQ}/>
						<Route path="/prices" component={Prices}/>
						<Route path="/contact" component={Contact}/>
						<PrivateRoute 
							authenticated={this.state.authenticated}
							user={this.state.user}
							showSideBar
							path="/portal/projects" 
							component={ProjectTracker} 
						/>
						<PrivateRoute 
							authenticated={this.state.authenticated}
							user={this.state.user}
							showSideBar
							project_id="?"
							path="/portal/projects/:project_id/story" 
							component={StoryStructure} 
						/>
						<PrivateRoute 
							authenticated={this.state.authenticated}
							user={this.state.user}
							showSideBar
							project_id="?"
							path="/portal/projects/:project_id/characters" 
							component={Characters} 
						/>
						<PrivateRoute 
							authenticated={this.state.authenticated}
							user={this.state.user}
							showSideBar
							project_id="?"
							path="/portal/projects/:project_id/dialogue" 
							component={DialogueManager} 
						/>
						<PrivateRoute 
							authenticated={this.state.authenticated}
							user={this.state.user}
							showSideBar
							project_id="?"
							path="/portal/projects/:project_id/history" 
							component={History} 
						/>
						<PrivateRoute 
							authenticated={this.state.authenticated}
							user={this.state.user}
							showSideBar
							project_id="?"
							path="/portal/projects/:project_id/read" 
							component={WalkThrough} 
						/>
	                    <Route path="/login" render={props => (
	                        <NeedLogin 
		                        {...props}
		                        authenticated={this.state.authenticated}
	                        />
	                    )} />
					</Switch>
					
				</div>
			</Router>
		)
	}
}

export default App;