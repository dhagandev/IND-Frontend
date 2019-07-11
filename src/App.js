import React, { Component } from 'react';
import Login from './Login/login'
import Home from './Home/home'
import TopNav from './TopNav/topnav'
import Portal from './Portal/portal'
import PrivateRoute from './utils/PrivateRoute/privateRoute'

import {
    Route,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom';

import {
    auth
} from './utils/firebaseService';

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


//Example of saving data using cafe example
// Form add event listener for submit
// Take the event and call preventDefault() 
// Save to form: db.collection('cafes').add({
//   document properties, access them through the form''s values, ie: form.name.value
// })
// Doesnt update in visual but does in db. I think its cause he's not using react.
// just in case, he suggests using dom manipulation to fix it.

//Deleting data from firestore
// Need some dom element to trigger the delete
// dom element add event listener, click event
// e.stopPropogation(); id = e.target.parentElement.getAttribute('data-id') - getting doc id
// db.collection('cafe').doc(id).delete()
// frontend nothing happens, not hooked up to realtime updates from db
// Thats it for delete

//Retrieve docs filtered by something
//db.collection('cafes').get().then(snapshot).etc etc
// tag on db.collection('cafes').where('field', 'evaluation, ie ==', 'value').get().then(snapshot).etc etc
//values are case sensitive
//can use < and > with strings, get things before/after value

//Ordering data
//Currently retrieving with no order
//db.collection('cafes').orderBy('property').get().then(snapshot).etc etc
//CASE SENSITIVE
//where comes before orderby
//Firebase sometimes makes you create an index, fb error will fo it for you, usually occurs with where and orderby in same deal

//Setting up realtime data/frontend response
//Essentially need a listen to db
//Realtime listener instead of .get()
//db.collection('cafes').onSnapshot(snapshot => {
//   let changes = snapshot.docChanges()
//   console.log(changes)
//    cycle through changes. if type is "added", display it. if it is "removed", do not render.
//    if (change.type === 'added') {render method (change.doc)}, if remove delete from dom:
// let li = cafeList.querySelector(by data-id equaling change.doc.id)
// cafeList.removeChild(li)
// }
//Init docs in db are "added"

//Updating data
// db.collection('cafes').doc('id').update({
// name: 'new value'
// })
//update completes with refresh

//Set - complete override with new props. 
//Called by .set({}), can lead to null/empty values
