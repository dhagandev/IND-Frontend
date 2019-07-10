import React, { Component } from 'react';

import {
    Route,
    Link,
    Switch,
    Redirect,
    BrowserRouter as Router
} from 'react-router-dom';

import {
    database,
    login,
    logout,
    auth,
    createTodo,
    removeTodo,
    updateComplete
} from './utils/firebaseService';


const linkStyle = {
    textDecoration: 'underline',
    color: 'rebeccapurple',
    cursor: 'pointer'
};

// Here's our Private Route

function PrivateRoute({ authenticated, component: Component, ...rest }) {
    return (
        <Route render={props => (
            authenticated
            ? <Component {...rest} {...props} />
            : <Redirect to="/login" />
        )}/>
    )
}



// Here's our child components

function Home() {
    return(
        <div>
            <h1>Welcome to React Firebase Todos</h1>
        </div>
    )
}

function Dashboard({
    user, 
    text,
    todos, 
    handleChange, 
    handleSubmit,
    handleRemove,
    handleComplete }) {
    return(
        <div>
            <h2>Welcome to your Dashboard</h2>
            <hr />
            <h5>Here's your todo items</h5>

            <ul style={{listStyle: 'none'}}>
                {
                    todos.map(({id, text, completed}) => (
                        <li key={id}>
                            <input 
                            type="checkbox" 
                            checked={completed} 
                            onChange={() => handleComplete(id)}
                            />&nbsp;|&nbsp;
                            <span onClick={() => handleRemove(id)}>X</span>
                            &nbsp;{text}
                        </li>
                    ))
                }
            </ul>

            <form onSubmit={handleSubmit}>
                <input name="text" value={text} onChange={handleChange} />
                <button>Add Todo</button>
            </form>
        </div>
    )
}

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


function Login({ authenticated }) {
    if(authenticated) return <Redirect to="/dashboard" />
    return(
        <div>
            <h2>You need to be logged in to see this page</h2>
            <button onClick={login}>Login With Google</button>
        </div>
    )
}



// Here's our Parent Component
class App extends Component {

    constructor() {
        super();
        this.state = {
            authenticated: false,
            user: null,
            text: "",
            todos: [],
            dbRef: null
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        const { dbRef, text } = this.state;
        e.preventDefault();
        createTodo(dbRef, {
            text
        }).then(() => this.setState({text: ""}));
    };

    handleRemove = todoId => {
        removeTodo(this.state.dbRef, todoId);
    };

    handleComplete = todoId => {
        updateComplete(this.state.dbRef, todoId);
    };

    handlePopulateTodos = () => {
        database.collection('todos').get()
        .then((snapshot) => {
          console.log(snapshot.docs)
          snapshot.docs.forEach(doc => {
            console.log(doc.data())
          })
        })
        //grab what you want to connect it to
        //Create elements for rendering
        //Do so by creating a function to render the doc, then in for each pass doc to that function, function uses dom manipulation
        //Access doc id by doc.id
        //Access fields by doc.data().name (property key in field)
    };

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
                this.setState({ 
                    authenticated: true,
                    user,
                    dbRef: `users/${user.uid}/todos`
                }, this.handlePopulateTodos);
            } else {
                this.setState({ 
                    authenticated: false,
                    user: null,
                    dbRef: null 
                });
            }
        })
    }

    render() {
        return (
            <Router>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    {
                        this.state.authenticated
                        &&
                        <li style={linkStyle}>
                            <span onClick={logout}>Logout</span>
                        </li>
                    }
                </ul>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute 
                    authenticated={this.state.authenticated}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleRemove={this.handleRemove}
                    handleComplete={this.handleComplete}
                    user={this.state.user}
                    text={this.state.text}
                    todos={this.state.todos}
                    path="/dashboard" 
                    component={Dashboard} 
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