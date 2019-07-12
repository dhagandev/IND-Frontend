import React, { Component } from 'react';
import Login from './Login/login'
import Home from './Home/home'
import TopNav from './TopNav/topnav'
import Portal from './Portal/portal'
import PrivateRoute from './utils/privateRoute'
import { auth } from './utils/firebaseService';
import {
    Route,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom';


class App extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
            user: null
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
              console.log(user.uid)
              console.log(user.displayName)
              console.log(user.email)
              console.log(user.photoURL)
              console.log(user.emailVerified)
              this.setState({ 
                  authenticated: true,
                  user,
              });
            } else {
              this.setState({ 
                  authenticated: false,
                  user: null
              });
            }
        })
    }

    render() {
        return (
            <Router>
                <TopNav 
                  authenticated={this.state.authenticated}
                />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute 
                      authenticated={this.state.authenticated}
                      user={this.state.user}
                      path="/portal" 
                      component={Portal} 
                    />
                    <Route path="/login" render={props => (
                        <Login 
                          {...props}
                          authenticated={this.state.authenticated}
                        />
                    )} />
                </Switch>
            </Router>
        );
    }
}

export default App;